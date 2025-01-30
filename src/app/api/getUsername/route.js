import Users from "../../../models/user";
import { NextResponse } from "next/server";
import { connectDb } from "../../../helper/db";

connectDb();

export async function POST(request) {
  const { userId, email } = await request.json();
  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    let user;
    if (email) {
      user = await Users.findOne({ email: email });
    }
    if (!user) {
      user = await Users.findById(userId);
    }
    return NextResponse.json(user);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}
