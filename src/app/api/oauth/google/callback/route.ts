import { NextRequest, NextResponse } from "next/server";
import User from "@/models/user";
import { connectDb } from "@/helper/db";
import { withAuthCookie, signAppToken } from "@/helper/authToken";

type OAuthStartPayload = {
  state: string;
  codeVerifier: string;
  role: "Owner" | "Traveller";
  redirect: string;
};

function utf8FromBase64Url(input: string) {
  const base64 = input.replace(/-/g, "+").replace(/_/g, "/");
  const pad = base64.length % 4 === 0 ? "" : "=".repeat(4 - (base64.length % 4));
  return Buffer.from(base64 + pad, "base64").toString("utf8");
}

async function exchangeCodeForTokens(args: {
  code: string;
  codeVerifier: string;
  redirectUri: string;
  clientId: string;
  clientSecret: string;
}) {
  const body = new URLSearchParams();
  body.set("code", args.code);
  body.set("client_id", args.clientId);
  body.set("client_secret", args.clientSecret);
  body.set("redirect_uri", args.redirectUri);
  body.set("grant_type", "authorization_code");
  body.set("code_verifier", args.codeVerifier);

  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`token_exchange_failed:${res.status}:${text}`);
  }

  return (await res.json()) as {
    access_token: string;
    expires_in: number;
    id_token?: string;
    token_type: string;
    scope?: string;
    refresh_token?: string;
  };
}

async function fetchGoogleUserInfo(accessToken: string) {
  const res = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
    headers: { authorization: `Bearer ${accessToken}` },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`userinfo_failed:${res.status}:${text}`);
  }
  return (await res.json()) as {
    sub: string;
    name?: string;
    given_name?: string;
    family_name?: string;
    picture?: string;
    email: string;
    email_verified?: boolean;
  };
}

function redirectToLogin(request: NextRequest, params: Record<string, string>) {
  // Prefer the explicit env var; fall back to the origin of the incoming request
  // so that local dev redirects stay on localhost instead of jumping to production.
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL ||
    request.nextUrl.origin ||
    "https://vacationsaga.com";
  const loginUrl = new URL("/login", baseUrl);
  for (const [k, v] of Object.entries(params)) loginUrl.searchParams.set(k, v);
  return NextResponse.redirect(loginUrl);
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const oauthError = url.searchParams.get("error");

  if (oauthError) {
    return redirectToLogin(request, { error: "google_denied" });
  }
  if (!code || !state) {
    return redirectToLogin(request, { error: "missing_code" });
  }

  const cookieVal = request.cookies.get("google_oauth")?.value;
  if (!cookieVal) {
    return redirectToLogin(request, { error: "missing_oauth_cookie" });
  }

  let payload: OAuthStartPayload | null = null;
  try {
    payload = JSON.parse(utf8FromBase64Url(cookieVal)) as OAuthStartPayload;
  } catch {
    payload = null;
  }

  if (!payload || payload.state !== state) {
    const res = redirectToLogin(request, { error: "oauth_state" });
    res.cookies.delete("google_oauth");
    return res;
  }

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const clientSecret = process.env.GOOGLE_CLIENT_SECRET;
  // Must match the URI used in /start and registered in Google Cloud Console.
  const redirectUri =
    process.env.GOOGLE_REDIRECT_URI ||
    "https://vacationsaga.com/api/oauth/google/callback";

  if (!clientId || !clientSecret || !redirectUri) {
    const res = redirectToLogin(request, {
      role: payload.role,
      error: "missing_google_config",
    });
    res.cookies.delete("google_oauth");
    return res;
  }

  try {
    await connectDb();

    const tokenResponse = await exchangeCodeForTokens({
      code,
      codeVerifier: payload.codeVerifier,
      redirectUri,
      clientId,
      clientSecret,
    });

    const userInfo = await fetchGoogleUserInfo(tokenResponse.access_token);
    const email = (userInfo.email || "").toLowerCase().trim();
    if (!email) {
      throw new Error("missing_email");
    }

    const name =
      userInfo.name ||
      [userInfo.given_name, userInfo.family_name].filter(Boolean).join(" ") ||
      "Google User";

    const profilePic = userInfo.picture || "";
    const providerId = userInfo.sub || "";

    const existing = await User.findOne({ email });
    if (existing && existing.role !== payload.role) {
      throw new Error("role_mismatch");
    }

    const user =
      existing ??
      new User({
        email,
        role: payload.role,
      });

    user.name = name;
    user.profilePic = profilePic;
    user.isVerified = true;
    user.authProvider = "google";
    user.oauthProvider = "google";
    user.oauthProviderId = providerId;

    await user.save();

    const redirectTarget = payload.redirect || "/";

    // Mobile deep-link redirect: custom scheme (e.g. myapp://) can't receive cookies.
    // Only enter this branch for non-http(s) schemes like myapp://, vacationsaga://, etc.
    // A plain web path like "/" or "/dashboard" must NOT enter here — it has no scheme at all.
    const isMobileDeepLink =
      redirectTarget.includes("://") && !/^https?:\/\//i.test(redirectTarget);

    if (isMobileDeepLink) {
      const token = signAppToken({
        id: user._id.toString(),
        name: user.name,
        email: user.email,
      });

      const qs = new URLSearchParams({
        token,
        _id: user._id.toString(),
        name: user.name || "",
        email: user.email || "",
        profilePic: user.profilePic || "",
        role: user.role || payload.role,
      });

      const mobileRedirect = NextResponse.redirect(`${redirectTarget}?${qs.toString()}`);
      mobileRedirect.cookies.delete("google_oauth");
      return mobileRedirect;
    }

    // Normal web redirect — set session cookie as usual.
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://vacationsaga.com";
    const successRedirect = NextResponse.redirect(new URL(redirectTarget, baseUrl));

    // Clear temporary cookie.
    successRedirect.cookies.delete("google_oauth");

    // Issue app session cookie (JWT).
    const authed = withAuthCookie(
      { success: true },
      { id: user._id.toString(), name: user.name, email: user.email }
    );

    // Carry over JWT cookie onto redirect response.
    const setCookie = authed.headers.get("set-cookie");
    if (setCookie) {
      successRedirect.headers.append("set-cookie", setCookie);
    }

    return successRedirect;
  } catch (err: any) {
    // Log the real cause so server logs show what actually failed
    // (e.g. token_exchange_failed:400:{"error":"redirect_uri_mismatch",...})
    console.error(
      "[Google OAuth callback] error:",
      err?.message ?? String(err),
      "| redirectUri used:",
      process.env.GOOGLE_REDIRECT_URI ||
        "https://vacationsaga.com/api/oauth/google/callback (fallback)",
      "| clientId present:",
      !!process.env.GOOGLE_CLIENT_ID,
      "| clientSecret present:",
      !!process.env.GOOGLE_CLIENT_SECRET
    );

    if (err?.message === "role_mismatch") {
      const res = redirectToLogin(request, {
        role: payload.role,
        error: "oauth_role_mismatch",
      });
      res.cookies.delete("google_oauth");
      return res;
    }

    // Surface a more specific error code when the token exchange failed so the
    // login page can show a more helpful message.
    const errorCode =
      typeof err?.message === "string" && err.message.startsWith("token_exchange_failed")
        ? "oauth_token_exchange"
        : "oauth_failed";

    const res = redirectToLogin(request, {
      role: payload.role,
      error: errorCode,
    });
    res.cookies.delete("google_oauth");
    return res;
  }
}

