import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import { sendUserDetailsToCompany } from "../../../helper/gmailMailer";

connectDb();

export async function POST(req) {
  try {
    const { email, price, name, phone } = await req.json();

    const userDetails = {
      name,
      phone,
      email,
      price,
    };

    await sendUserDetailsToCompany(userDetails);

    return NextResponse.json(
      { message: "User details sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { message: "Failed to send user details" },
      { status: 500 }
    );
  }
}
