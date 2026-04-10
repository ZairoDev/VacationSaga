import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import bcryptjs from "bcryptjs";

import { connectDb } from "@/helper/db";
import Users from "@/models/user";
import Travellers from "@/models/traveller";
import { signAppToken } from "@/helper/authToken";

type GoogleUserInfo = {
  sub: string;
  email: string;
  email_verified?: boolean;
  name?: string;
  given_name?: string;
  family_name?: string;
  picture?: string;
};

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");

  const cookieState = request.cookies.get("oauth_state")?.value;
  const codeVerifier = request.cookies.get("oauth_code_verifier")?.value;
  const role = request.cookies.get("oauth_role")?.value || "Traveller";
  const redirect = request.cookies.get("oauth_redirect")?.value || "/";

  // Clear transient cookies early
  const clearCookies = (res: NextResponse) => {
    ["oauth_state", "oauth_code_verifier", "oauth_role", "oauth_redirect"].forEach(
      (name) => {
        res.cookies.set(name, "", { path: "/", maxAge: 0 });
      }
    );
  };

  if (!code || !state) {
    const res = NextResponse.redirect(new URL(`/login?role=${role}`, url.origin));
    clearCookies(res);
    return res;
  }

  if (!cookieState || state !== cookieState) {
    const res = NextResponse.redirect(new URL(`/login?role=${role}`, url.origin));
    clearCookies(res);
    return res;
  }

  if (!codeVerifier) {
    const res = NextResponse.redirect(new URL(`/login?role=${role}`, url.origin));
    clearCookies(res);
    return res;
  }

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${url.protocol}//${url.host}`;

  if (!clientId || !clientSecret) {
    const res = NextResponse.redirect(new URL(`/login?role=${role}`, url.origin));
    clearCookies(res);
    return res;
  }

  const callbackUrl = new URL("/api/oauth/google/callback", appUrl);

  try {
    await connectDb();

    // Exchange code for tokens
    const tokenRes = await axios.post(
      "https://oauth2.googleapis.com/token",
      new URLSearchParams({
        client_id: clientId,
        client_secret: clientSecret,
        code,
        code_verifier: codeVerifier,
        grant_type: "authorization_code",
        redirect_uri: callbackUrl.toString(),
      }).toString(),
      {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      }
    );

    const accessToken: string | undefined = tokenRes.data?.access_token;
    if (!accessToken) {
      const res = NextResponse.redirect(new URL(`/login?role=${role}`, url.origin));
      clearCookies(res);
      return res;
    }

    // Fetch user profile
    const userInfoRes = await axios.get<GoogleUserInfo>(
      "https://www.googleapis.com/oauth2/v3/userinfo",
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );

    const profile = userInfoRes.data;
    if (!profile?.email) {
      const res = NextResponse.redirect(new URL(`/login?role=${role}`, url.origin));
      clearCookies(res);
      return res;
    }

    const normalizedRole = role === "Owner" ? "Owner" : "Traveller";
    const Model = normalizedRole === "Traveller" ? Travellers : Users;

    // Find existing by provider id or email
    const existing =
      (await Model.findOne({ oauthProvider: "google", oauthProviderId: profile.sub })) ||
      (await Model.findOne({ email: profile.email }));

    const displayName =
      profile.name ||
      [profile.given_name, profile.family_name].filter(Boolean).join(" ") ||
      profile.email.split("@")[0];

    let userDoc = existing;
    if (!userDoc) {
      const salt = await bcryptjs.genSalt(10);
      const randomPassword = await bcryptjs.hash(profile.sub + Date.now().toString(), salt);

      userDoc = await new Model({
        name: displayName,
        email: profile.email,
        profilePic: profile.picture || "",
        isVerified: true,
        role: normalizedRole,
        authProvider: "google",
        oauthProvider: "google",
        oauthProviderId: profile.sub,
        // satisfy existing schemas for credentials-only users
        password: randomPassword,
        phone: "",
      }).save();
    } else {
      // Link provider if needed
      const needsLink =
        !userDoc.oauthProvider ||
        !userDoc.oauthProviderId ||
        userDoc.oauthProvider !== "google" ||
        userDoc.oauthProviderId !== profile.sub;

      if (needsLink) {
        userDoc.oauthProvider = "google";
        userDoc.oauthProviderId = profile.sub;
        userDoc.authProvider = userDoc.authProvider || "google";
        if (!userDoc.profilePic && profile.picture) {
          userDoc.profilePic = profile.picture;
        }
        if (!userDoc.name && displayName) {
          userDoc.name = displayName;
        }
        await userDoc.save();
      }
    }

    const tokenData = {
      id: userDoc._id.toString(),
      name: userDoc.name,
      email: userDoc.email,
    };

    const payload = {
      message: "Login successful",
      success: true,
      tokenData: {
        _id: userDoc._id,
        name: userDoc.name,
        email: userDoc.email,
        role: normalizedRole,
        isVerified: true,
        profilePic: userDoc?.profilePic ?? "",
      },
    };
    const token = signAppToken(tokenData);
    const res = NextResponse.redirect(new URL(redirect, url.origin));
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24, // 1 day
    });
    clearCookies(res);
    return res;
  } catch (err) {
    const res = NextResponse.redirect(new URL(`/login?role=${role}`, url.origin));
    clearCookies(res);
    return res;
  }
}

