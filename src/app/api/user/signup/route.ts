import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import bcryptjs from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import { sendEmail } from "../../../../helper/mailer";

export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const reqBody = await request.json();
    const { name, email, password, role, sendDetails, phone } = reqBody;
    console.log(reqBody);

    const SignupUser = await User.findOne({ email });

    if (SignupUser) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    if (
      name == "" ||
      email == "" ||
      password == "" ||
      role == "" ||
      phone == ""
    ) {
      console.log("not complete");
      return NextResponse.json(
        { message: "All fields are required", success: false },
        { status: 400 }
      );
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phone,
    });

    const savedUser = await newUser.save();
    console.log(savedUser);

    if (sendDetails) {
      await sendEmail({
        email,
        emailType: "VERIFY",
        userId: savedUser._id,
        password: reqBody.password,
      });
      return NextResponse.json({
        message:
          "User created successfully. Please check your email for verification.",
        success: true,
        savedUser,
      });
    } else {
      return NextResponse.json({
        message: "User created successfully and automatically verified.",
        success: true,
        savedUser,
      });
    }
  } catch (error: any) {
    console.error("Error while creating user:", error);
    if (
      error?.name === "MongooseServerSelectionError" ||
      `${error?.message || ""}`.includes("ENOTFOUND") ||
      `${error?.message || ""}`.includes("ECONNREFUSED")
    ) {
      return NextResponse.json(
        { message: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { message: "Error while creating user" },
      { status: 500 }
    );
  }
}