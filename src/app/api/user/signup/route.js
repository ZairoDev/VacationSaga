import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";
import { sendEmail } from "../../../../helper/mailer";
import Travellers from "../../../../models/traveller";

await connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { name, email, password, role, sendDetails, phone } = reqBody;
    console.log(reqBody);

    const SignupUser =
      role === "Traveller"
        ? await Travellers.findOne({ email })
        : await User.findOne({ email });

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
        { message: "All fields are required" },
        { status: 400 },
        { success: false }
      );
    }

    const newUser =
      role === "Traveller"
        ? new Travellers({ name, email, password: hashedPassword, role, phone })
        : new User({ name, email, password: hashedPassword, role, phone });

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
  } catch (error) {
    console.error("Error while creating user:", error);
    return NextResponse.json(
      { message: "Error while creating user" },
      { status: 500 }
    );
  }
}
