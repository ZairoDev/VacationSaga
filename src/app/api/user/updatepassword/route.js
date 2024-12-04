import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

await connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { userId, currentPassword, newPassword, confirmPassword } = reqBody;

    // Validate request
    if (!userId || !currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        { error: "New password and confirm password do not match" },
        { status: 400 }
      );
    }

    // Find user by userId
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 400 }
      );
    }

    // Check if current password is correct
    const isPasswordValid = await bcryptjs.compare(
      currentPassword,
      user.password
    );
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 400 }
      );
    }

    // Hash the new password
    const salt = await bcryptjs.genSalt(10);
    const hashedNewPassword = await bcryptjs.hash(newPassword, salt);

    // Update user password
    user.password = hashedNewPassword;
    await user.save();

    return NextResponse.json({
      message: "Password changed successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error while changing password:", error);
    return NextResponse.json(
      { error: "Error while changing password" },
      { status: 500 }
    );
  }
}
