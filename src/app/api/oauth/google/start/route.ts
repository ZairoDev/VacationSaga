import { NextRequest, NextResponse } from "next/server";
import { generateRandomString, sha256Base64Url } from "@/helper/oauthPkce";

type OAuthStartPayload = {
  state: string;
  codeVerifier: string;
  role: "Owner" | "Traveller";
  redirect: string;
};

function base64UrlFromUtf8(input: string) {
  return Buffer.from(input, "utf8")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const roleParam = url.searchParams.get("role");
  const redirectParam = url.searchParams.get("redirect") || "/";

  if (roleParam !== "Owner" && roleParam !== "Traveller") {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("error", "missing_role");
    return NextResponse.redirect(loginUrl);
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const redirectUri ="https://vacationsaga.com/api/oauth/google/callback";
  if (!clientId || !redirectUri) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("role", roleParam);
    loginUrl.searchParams.set("error", "missing_google_config");
    return NextResponse.redirect(loginUrl);
  }

  const state = generateRandomString(32);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = sha256Base64Url(codeVerifier);

  const payload: OAuthStartPayload = {
    state,
    codeVerifier,
    role: roleParam,
    redirect: redirectParam,
  };

  const authorizeUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authorizeUrl.searchParams.set("client_id", clientId);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "openid email profile");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  authorizeUrl.searchParams.set("prompt", "select_account");

  const response = NextResponse.redirect(authorizeUrl);

  response.cookies.set("google_oauth", base64UrlFromUtf8(JSON.stringify(payload)), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10, // 10 minutes
    // domain: process.env.DOMAIN,
  });

  return response;
}

