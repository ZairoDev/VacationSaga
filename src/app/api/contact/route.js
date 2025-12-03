import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import { sendContactEmail } from "@/helper/gmailMailer";

connectDb();

export async function POST(request) {
  const reqBody = await request.json();
  const { name, email, phone, message } = reqBody;
  if (!name || !email || !phone) {
    return NextResponse.json(
      { error: "Missing required contact information" },
      { status: 400 }
    );
  }
  try {
    await sendContactEmail({ name, email, phone, message });
    return NextResponse.json(
      { message: "Thank you for contacting us. We will get back to you soon." },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Failed to send Email" },
      { status: 400 }
    );
  }
}
