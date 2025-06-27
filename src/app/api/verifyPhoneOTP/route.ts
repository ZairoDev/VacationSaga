import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import landingPageForm from "@/models/landing-page-form";
import twilio from "twilio";

connectDb();

// Twilio credentials
const accountSid = process.env.TWILIO_ACCOUNT_SID!;
const authToken = process.env.TWILIO_AUTH_TOKEN!;
const verifySid = process.env.TWILIO_VERIFY_SERVICE_SID!;
const client = twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  try {
    const { phone, otp } = await req.json();

    if (!phone || !otp) {
      return NextResponse.json({ error: "Phone and OTP are required" }, { status: 400 });
    }

    const existingUser = await landingPageForm.findOne({ phone });
    if (!existingUser) {
      return NextResponse.json({ error: "Phone not found" }, { status: 404 });
    }

    // Verify OTP via Twilio Verify
    const verificationCheck = await client.verify.v2
      .services(verifySid)
      .verificationChecks.create({ to: phone, code: otp });

    if (verificationCheck.status !== "approved") {
      return NextResponse.json({ error: "Incorrect OTP" }, { status: 401 });
    }

    // Update DB to mark phone as verified (optional)
    await landingPageForm.updateOne(
      { phone },
      { $unset: { phoneOTP: "" }, $set: { isPhoneVerified: true } }
    );

    return NextResponse.json({ message: "Phone verified successfully", success: true });
  } catch (error) {
    console.error("Error verifying phone OTP:", error);
    return NextResponse.json({ error: "Failed to verify OTP" }, { status: 500 });
  }
}
