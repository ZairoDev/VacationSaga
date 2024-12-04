import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import { sendContactEmail } from "@/helper/gmailMailer";

connectDb();

export async function POST(request) {
  const reqBody = await request.json();
  const { name, email, message } = reqBody;
  try {
    await sendContactEmail({ name, email, message });
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
