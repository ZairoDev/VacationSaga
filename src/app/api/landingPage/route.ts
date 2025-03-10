import { NextRequest, NextResponse } from "next/server";
import landingPageForm from "@/models/landing-page-form";
import { connectDb } from "@/helper/db";

connectDb();

export async function PATCH(req: NextRequest) {
  try {
    const { name, phone, email, budget, destination } = await req.json();
    // console.log("name: ", name, phone, email, budget, destination);

    if (!name || !phone || !email || !budget || !destination) {
      return NextResponse.json(
        { errors: { general: "All fields are required" } },
        { status: 400 }
      );
    }

    const existingUser = await landingPageForm.findOne({ email });
    if (!existingUser) {
      return NextResponse.json({ error: "Email not verified" }, { status: 400 });
    }

    await landingPageForm.findOneAndUpdate(
      { email: email },
      { $set: { name, budget, destination } }
    );

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
