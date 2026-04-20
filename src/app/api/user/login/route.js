import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";
import { NextResponse } from "next/server";

import User from "../../../../models/user";
import { connectDb } from "../../../../helper/db";

export async function POST(request) {
  try {
    await connectDb();
    const reqBody = await request.json();
    const { email, password, role } = reqBody;
    // console.log(reqBody);

    if (!role) {
      return NextResponse.json(
        { error: "Please Select A Role before Login" },
        { status: 401 }
      );
    }

    const LoginUser = await User.findOne({ email });

    if (!LoginUser) {
      return NextResponse.json(
        { error: "Please Enter valid email or password" },
        { status: 400 }
      );
    }

    if (LoginUser.role !== role) {
      return NextResponse.json(
        {
          error: `This account is registered as ${LoginUser.role}. Please log in with that role.`,
        },
        { status: 400 }
      );
    }

    if (!LoginUser.isVerified) {
      return NextResponse.json(
        { error: "Please verify your email before logging in" },
        { status: 400 }
      );
    }

    // Check if password is correct
    const validPassword = await bcryptjs.compare(password, LoginUser.password);
    if (!validPassword) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 400 }
      );
    }

    // Create token data
    const tokenData = {
      id: LoginUser._id,
      name: LoginUser.name,
      email: LoginUser.email,
    };

    // Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Login successful",
      success: true,
      token, // Include the token in the response data
      tokenData: {
        _id: LoginUser._id,
        name: LoginUser.name,
        email: LoginUser.email,
        role: role,
        isVerified: LoginUser.isVerified,
        profilePic: LoginUser?.profilePic ?? "",
      },
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    if (
      error?.name === "MongooseServerSelectionError" ||
      `${error?.message || ""}`.includes("ENOTFOUND") ||
      `${error?.message || ""}`.includes("ECONNREFUSED")
    ) {
      return NextResponse.json(
        { error: "Database connection failed. Please try again later." },
        { status: 503 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
