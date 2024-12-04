import Users from "../../../models/user";
import { NextResponse } from "next/server";
import { connectDb } from "../../../helper/db";

connectDb();

export async function POST(request) {
  const { userId } = await request.json();
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await Users.findOne({ _id: userId });
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}
