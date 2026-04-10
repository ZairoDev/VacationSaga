import { NextRequest, NextResponse } from "next/server";
import { generateRandomString, sha256Base64Url } from "@/helper/oauthPkce";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const role = url.searchParams.get("role") || "Traveller";
  const redirect = url.searchParams.get("redirect") || "/";

  const clientId = process.env.GOOGLE_OAUTH_CLIENT_ID;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || `${url.protocol}//${url.host}`;

  if (!clientId) {
    return NextResponse.json(
      { error: "Google OAuth is not configured" },
      { status: 500 }
    );
  }

  const state = generateRandomString(24);
  const codeVerifier = generateRandomString(48);
  const codeChallenge = sha256Base64Url(codeVerifier);

  const callbackUrl = new URL("/api/oauth/google/callback", appUrl);

  const authUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authUrl.searchParams.set("client_id", clientId);
  authUrl.searchParams.set("redirect_uri", callbackUrl.toString());
  authUrl.searchParams.set("response_type", "code");
  authUrl.searchParams.set("scope", "openid email profile");
  authUrl.searchParams.set("state", state);
  authUrl.searchParams.set("code_challenge", codeChallenge);
  authUrl.searchParams.set("code_challenge_method", "S256");
  authUrl.searchParams.set("prompt", "select_account");

  const res = NextResponse.redirect(authUrl.toString());

  // short-lived, httpOnly cookies to complete the OAuth flow securely
  res.cookies.set("oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });
  res.cookies.set("oauth_code_verifier", codeVerifier, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });
  res.cookies.set("oauth_role", role, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });
  res.cookies.set("oauth_redirect", redirect, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  return res;
}

