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
    // Always prefer the property owner's userId. Many listings can share the same
    // email (support/admin), which would otherwise return the wrong "host".
    let user = await Users.findById(userId);

    if (!user && email) {
      user = await Users.findOne({ email });
    }

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const name =
      user?.name ||
      user?.username ||
      user?.fullName ||
      user?.firstName ||
      null;

    return NextResponse.json({ name });
  } catch (error) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }
}
