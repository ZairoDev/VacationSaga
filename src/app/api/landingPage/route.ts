import { NextRequest, NextResponse } from "next/server";
import landingPageForm from "@/models/landing-page-form";
import { connectDb } from "@/helper/db";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, budget, destination } = await req.json();

    if (!name || !phone || !email || !budget || !destination) {
      return NextResponse.json(
        { errors: { general: "All fields are required" } }, 
        { status: 400 }
      );
    }

    const existingUser = await landingPageForm.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { message: "Phone number already exists. Please use a different number." }, 
        { status: 409 }
      );
    }

    await landingPageForm.create({
      name,
      phone,
      email,
      budget,
      destination,
    });

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
