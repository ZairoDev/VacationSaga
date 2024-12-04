// TODO : The above code is working fine without decoded feature

import User from "@/models/user";
import bcryptjs from "bcryptjs";

export async function POST(request) {
  try {
    const { token, newPassword } = await request.json();

    // Decode the token received from the request
    const decodedToken = decodeURIComponent(token);

    const user = await User.findOne({
      forgotPasswordToken: decodedToken,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
        status: 400,
      });
    }
    const hashedPassword = await bcryptjs.hash(newPassword, 10);
    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Password reset successful" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
