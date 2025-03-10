import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/helper/db";
import landingPageForm from "@/models/landing-page-form";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone) {
      return NextResponse.json(
        { errors: { general: "Phone is required" } },
        { status: 400 }
      );
    }

    const existingUser = await landingPageForm.findOne({ phone });

    if (!existingUser) {
      return NextResponse.json({ error: "Phone not found" }, { status: 409 });
    }

    if (existingUser.phoneOTP != otp) {
      return NextResponse.json({ error: "Incorrect OTP" }, { status: 409 });
    }

    await landingPageForm.findOneAndUpdate(
      { phone: phone },
      { $unset: { phoneOTP: "" } }
    );

    return NextResponse.json(
      { message: "Phone verified successfully", success: true },
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
