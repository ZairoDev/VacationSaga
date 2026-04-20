import { connectDb } from "../../../../helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import Travellers from "@/models/traveller";

export async function POST(request) {
  try {
    await connectDb();
  } catch (error) {
    return NextResponse.json(
      { error: "Database connection failed. Please try again later." },
      { status: 503 }
    );
  }
  const userId = getDataFromToken(request);

  if (!userId) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  let user = await User.findOne({ _id: userId }).select("-password");

  // Legacy: traveller accounts created before unified `users` collection
  if (!user) {
    user = await Travellers.findOne({ _id: userId }).select("-password");
  }

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "User found",
    data: user,
  });
}
