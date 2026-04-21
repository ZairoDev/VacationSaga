import { NextRequest, NextResponse } from "next/server";
import { generateRandomString, sha256Base64Url } from "@/helper/oauthPkce";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const roleParam = url.searchParams.get("role");

  if (roleParam !== "Owner" && roleParam !== "Traveller") {
    return NextResponse.json({ error: "missing_role" }, { status: 400 });
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  // This must be registered in Google Console
  const redirectUri = "https://vacationsaga.com/api/oauth/google/mobile-callback";

  const state = generateRandomString(32);
  const codeVerifier = generateRandomString(64);
  const codeChallenge = sha256Base64Url(codeVerifier);

  const authorizeUrl = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  authorizeUrl.searchParams.set("client_id", clientId!);
  authorizeUrl.searchParams.set("redirect_uri", redirectUri);
  authorizeUrl.searchParams.set("response_type", "code");
  authorizeUrl.searchParams.set("scope", "openid email profile");
  authorizeUrl.searchParams.set("state", state);
  authorizeUrl.searchParams.set("code_challenge", codeChallenge);
  authorizeUrl.searchParams.set("code_challenge_method", "S256");
  authorizeUrl.searchParams.set("prompt", "select_account");

  // Return everything to the app — no cookies needed
  return NextResponse.json({
    authorizeUrl: authorizeUrl.toString(),
    state,
    codeVerifier,
  });
}