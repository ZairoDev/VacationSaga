import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import Travellers from "../../../../models/traveller";

connectDb();

export async function POST(request) {
  try {
    const reqBody = await request.json();
    const { email, password, role } = reqBody;
    // console.log(reqBody);

    if (!role) {
      return NextResponse.json(
        { error: "Please Select A Role before Login" },
        { status: 401 }
      );
    }

    const LoginUser =
      role === "Traveller"
        ? await Travellers.findOne({ email })
        : await User.findOne({ email });

    if (!LoginUser) {
      return NextResponse.json(
        { error: "Please Enter valid email or password" },
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
    });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
