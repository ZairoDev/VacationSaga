import twilio from "twilio";
import { NextRequest, NextResponse } from "next/server";

import { connectDb } from "@/helper/db";
import landingPageForm from "@/models/landing-page-form";

connectDb();

const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const authToken = process.env.TWILIO_AUTH_TOKEN;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioPhone = process.env.TWILIO_PHONE_NUMBER;

const client = twilio(accountSid, authToken);

export async function POST(req: NextRequest) {
  try {
    const { name, phone, budget, duration, destination, email } = await req.json();
    console.log("duration in verify phone: ", duration);

    if (!email && !phone) {
      return NextResponse.json(
        { errors: { general: "Either email or phone is required" } },
        { status: 400 }
      );
    }

    let existingUser;
    existingUser = await landingPageForm.findOne({ phone });

    if (existingUser) {
      return NextResponse.json({ message: "Phone already exist" }, { status: 409 });
    }

    if (email) {
      existingUser = await landingPageForm.findOne({ email });
    }

    const newOTP = generateOTP();

    if (!existingUser) {
      // console.log("user does not exist: ", name, email, phone, budget, destination);
      await landingPageForm.create({
        name: name ?? "a",
        phone: phone,
        email: email != "" ? email : "a",
        budget: budget ?? 0,
        duration:
          duration?.to && duration?.from
            ? duration
            : { from: new Date(), to: new Date() },
        destination: destination ?? "a",
        phoneOTP: newOTP,
      });
    } else {
      await landingPageForm.findOneAndUpdate(
        { email: email },
        { $set: { phone: phone, phoneOTP: newOTP } }
      );
    }

    // console.log("phone: ", phone);
    client.messages.create({
      messagingServiceSid: "MG5b053ac4666ff04ad3946b4b939f5548",
      // from: "whatsapp:+447897037080",
      to: `whatsapp:${phone}`,
      // body: `Your OTP code is ${newOTP}. Please use it to complete your verification process.`,
      contentSid: "HXfe4d03946bf3e5b41bf5c98e9bcab1fa",
      contentVariables: JSON.stringify({
        "1": newOTP,
      }),
    });
    // console.log("message sent");

    return NextResponse.json(
      { message: "Form submitted successfully", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "Server error, please try again later" },
      { status: 500 }
    );
  }
}
