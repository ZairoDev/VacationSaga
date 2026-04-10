import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

// Safe helper: returns user id or null instead of throwing when token is missing/invalid
export const getDataFromToken = (request: NextRequest): string | null => {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) return null;

    const secret = process.env.TOKEN_SECRET;
    if (!secret) return null;

    const decodedToken: any = jwt.verify(token, secret);
    return decodedToken?.id ?? null;
  } catch {
    return null;
  }
};
