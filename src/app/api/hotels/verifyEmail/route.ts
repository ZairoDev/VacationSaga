import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import EmailOtp from "@/models/listingEmailOtp";

export async function POST(request: NextRequest) {
  await connectDb();
  console.log("trying to get otp");
  const { email, otp } = await request.json();
  console.log("he got email and the otp", email, otp);  
  if (!email || !otp) {
    return NextResponse.json(
      { message: "Email and OTP are required" },
      { status: 400 }
    );
  }

  const record = await EmailOtp.findOne({ email, otp });

  if (!record) {
    return NextResponse.json(
      { message: "Invalid or expired OTP" },
      { status: 400 }
    );
  }

  await EmailOtp.deleteOne({ email, otp });

  return NextResponse.json(
    { message: "OTP verified successfully" },
    { status: 200 }
  );
}
