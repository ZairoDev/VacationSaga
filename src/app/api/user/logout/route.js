import { connectDb } from "../../../../helper/db";
import { NextResponse } from "next/server";

export async function GET(request) {
  try {
    // Optional, but keep consistent: don't hang if DB is down.
    await connectDb().catch(() => null);
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { success: true }
    );
    response.cookies.delete("token");

    await response.cookies.delete({
      name: "token",
      path: "/",
      sameSite: "none",
      secure: true,
    });

    response.headers.set("Cache-Control", "no-store");

    return response;
  } catch {}
}
