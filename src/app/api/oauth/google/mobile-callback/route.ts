import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectDb } from "@/helper/db";
import { signAppToken } from "@/helper/authToken";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const role = url.searchParams.get("role") as "Owner" | "Traveller";
  const codeVerifier = url.searchParams.get("code_verifier");

  // Redirect back to app with error if anything missing
  const appError = (msg: string) =>
    NextResponse.redirect(`myapp://google-auth?error=${msg}`);

  if (!code || !state || !codeVerifier || !role) {
    return appError("missing_params");
  }

  const clientId = process.env.GOOGLE_CLIENT_ID!;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET!;
  const redirectUri = "https://vacationsaga.com/api/oauth/google/mobile-callback";

  try {
    await connectDb();

    // Exchange code for tokens
    const body = new URLSearchParams({
      code,
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: "authorization_code",
      code_verifier: codeVerifier,
    });

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body,
    });

    if (!tokenRes.ok) throw new Error("token_exchange_failed");
    const { access_token } = await tokenRes.json();

    // Get user info
    const userRes = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { authorization: `Bearer ${access_token}` },
    });
    if (!userRes.ok) throw new Error("userinfo_failed");
    const userInfo = await userRes.json();

    const email = userInfo.email?.toLowerCase().trim();
    if (!email) throw new Error("missing_email");

    const existing = await User.findOne({ email });
    if (existing && existing.role !== role) {
      return appError("role_mismatch");
    }

    const user = existing ?? new User({ email, role });
    user.name = userInfo.name || "Google User";
    user.profilePic = userInfo.picture || "";
    user.isVerified = true;
    user.authProvider = "google";
    user.oauthProvider = "google";
    user.oauthProviderId = userInfo.sub;
    await user.save();

    const token = signAppToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });

    // ✅ Redirect back to app WITH token
    return NextResponse.redirect(
      `myapp://google-auth?token=${token}&role=${user.role}`
    );
  } catch (err: any) {
    return appError(err.message || "oauth_failed");
  }
}