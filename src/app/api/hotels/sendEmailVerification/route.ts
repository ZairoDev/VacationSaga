import { NextResponse, NextRequest } from "next/server";
import { connectDb } from "@/helper/db";
import nodemailer from "nodemailer";
// import jwt from "jsonwebtoken";
// import Hotel from "@/models/hotel";
import EmailOtp from "@/models/listingEmailOtp";

export async function POST(request: NextRequest) {

  await connectDb();
  const { email } = await request.json();

  if (!email) {
    return NextResponse.json(
      { error: "Email is required" },
      { status: 400 }
    );
  }

  const otp= Math.floor(100000 + Math.random() * 900000).toString();
   await EmailOtp.create({ email, otp });

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "no-reply@vacationsaga.com",
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
  console.log("Sending verification email to:", email);
  await transporter.sendMail({
    from: "no-reply@vacationsaga.com",
    to: email,
    subject: "Verify email address",
    html: `
      <h1>Verify your email address</h1>
        <p>Your Email Otp is ${otp} its valid for 5 minutes</p>`
      
  });
  return NextResponse.json(
    { message: "Verification email sent successfully" },
    { status: 200 }
  );
}
