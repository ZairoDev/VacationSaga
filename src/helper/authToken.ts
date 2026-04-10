import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export type AppAuthTokenData = {
  id: string;
  name: string;
  email: string;
};

export function signAppToken(tokenData: AppAuthTokenData) {
  const secret = process.env.TOKEN_SECRET;
  if (!secret) {
    throw new Error("TOKEN_SECRET is not set");
  }
  return jwt.sign(tokenData, secret, { expiresIn: "1d" });
}

export function withAuthCookie(
  payload: Record<string, unknown>,
  tokenData: AppAuthTokenData
) {
  const token = signAppToken(tokenData);
  const response = NextResponse.json({
    ...payload,
    token,
  });

  response.cookies.set("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24, // 1 day
  });

  return response;
}

