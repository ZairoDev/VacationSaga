import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/helper/db";
import landingPageForm from "@/models/landing-page-form";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const { email, otp } = await req.json();

    if (!email) {
      return NextResponse.json(
        { errors: { general: "Email is required" } },
        { status: 400 }
      );
    }

    const existingUser = await landingPageForm.findOne({ email });

    if (!existingUser) {
      return NextResponse.json({ error: "Email not found" }, { status: 409 });
    }

    if (existingUser.emailOTP != otp) {
      return NextResponse.json({ error: "Incorrect OTP" }, { status: 409 });
    }

    await landingPageForm.findOneAndUpdate(
      { email: email },
      { $unset: { emailOTP: "" } }
    );

    return NextResponse.json(
      { message: "Email verified successfully", success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error verifying email:", error);
    return NextResponse.json(
      { message: "Server error, please try again later" },
      { status: 500 }
    );
  }
}
