import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import bcryptjs from "bcryptjs";

import { authOptions } from "@/lib/authConfig";
import { connectDb } from "@/helper/db";
import Users from "@/models/user";
import Travellers from "@/models/traveller";
import { signAppToken } from "@/helper/authToken";

type NormalizedRole = "Owner" | "Traveller";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const redirect = url.searchParams.get("redirect") || "/";
  const roleParam = url.searchParams.get("role") || "Traveller";
  const role: NormalizedRole = roleParam === "Owner" ? "Owner" : "Traveller";

  const session = await getServerSession(authOptions);
  const email = session?.user?.email || "";
  const name = session?.user?.name || "";
  const image = (session?.user as any)?.image || "";
  const googleSub = (session as any)?.googleSub as string | undefined;

  if (!email) {
    return NextResponse.redirect(new URL(`/login?role=${role}`, url.origin));
  }

  await connectDb();

  const Model = role === "Traveller" ? Travellers : Users;

  const existing =
    (googleSub
      ? await (Model as any).findOne({
          oauthProvider: "google",
          oauthProviderId: googleSub,
        })
      : null) || (await (Model as any).findOne({ email }));

  const displayName = name || email.split("@")[0];

  let userDoc = existing;
  if (!userDoc) {
    const salt = await bcryptjs.genSalt(10);
    const randomPassword = await bcryptjs.hash(
      (googleSub || email) + Date.now().toString(),
      salt
    );

    userDoc = await new (Model as any)({
      name: displayName,
      email,
      profilePic: image || "",
      isVerified: true,
      role,
      authProvider: "google",
      oauthProvider: "google",
      oauthProviderId: googleSub || "",
      // satisfy credentials-required fields when authProvider is credentials
      password: randomPassword,
      phone: "",
    }).save();
  } else {
    const needsLink =
      (!userDoc.oauthProvider && !userDoc.oauthProviderId) ||
      userDoc.oauthProvider !== "google" ||
      (googleSub ? userDoc.oauthProviderId !== googleSub : false);

    if (needsLink) {
      userDoc.oauthProvider = "google";
      userDoc.oauthProviderId = googleSub || userDoc.oauthProviderId || "";
      userDoc.authProvider = userDoc.authProvider || "google";
      if (!userDoc.profilePic && image) userDoc.profilePic = image;
      if (!userDoc.name && displayName) userDoc.name = displayName;
      await userDoc.save();
    }
  }

  const token = signAppToken({
    id: userDoc._id.toString(),
    name: userDoc.name,
    email: userDoc.email,
  });

  const res = NextResponse.redirect(new URL(redirect, url.origin));
  res.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return res;
}

