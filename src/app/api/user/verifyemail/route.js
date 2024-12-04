import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const token = reqBody.token;
    console.log(token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid token details" },
        { status: 400 }
      );
    }
    console.log(user);
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;
    await user.save();
    return NextResponse.json(
      { message: "Email verified successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "failed to verify email" },
      { status: 500 }
    );
  }
}
