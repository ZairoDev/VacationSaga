import { connectDb } from "../../../../helper/db";
import { NextResponse } from "next/server";
connectDb();

export async function GET(request) {
  try {
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
