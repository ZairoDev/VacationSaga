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

    return response;
  } catch {}
}
