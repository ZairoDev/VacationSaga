import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import landingPageForm from "@/models/landing-page-form";
import hotelListingOtp from "@/models/hotelListingOtp";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    console.log("Verification in verify phone:", phone);
    console.log("OTP in verify phone:", otp);

    // Validate phone input
    if (!phone) {
      return NextResponse.json(
        { errors: { general: "Phone is required" } },
        { status: 400 }
      );
    }

    // Check if phone exists in hotelListingOtp
    const existingUser = await hotelListingOtp.findOne({ phone });
    console.log("existingUser in verify phone:", existingUser);

    if (!existingUser) {
      return NextResponse.json(
        { error: "Phone not found" },
        { status: 409 }
      );
    }

    // Validate OTP
    if (existingUser.otp != otp) {
      return NextResponse.json(
        { error: "OTP is incorrect" },
        { status: 409 }
      );
    }

    
    await landingPageForm.findOneAndDelete({ phone });

    return NextResponse.json(
      { message: "Phone verified successfully", success: true },
      { status: 200 }
    );

  } catch (error) {
    console.error("Error verifying phone:", error);
    return NextResponse.json(
      { message: "Server error, please try again later" },
      { status: 500 }
    );
  }
}

