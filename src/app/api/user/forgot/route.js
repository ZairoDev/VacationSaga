import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import { sendEmail } from "../../../../helper/mailer";

connectDb();

export async function POST(request) {
  try {
    const { email } = await request.json();
    const user = await User.findOne({ email });
    console.log("user", user);

    if (user) {
      await sendEmail({ email, emailType: "RESET", userId: user._id });
    }

    return new Response(
      JSON.stringify({
        message:
          "If a matching account was found, an email was sent to reset your password.",
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "An error occurred. Please try again later." }),
      {
        status: 500,
      }
    );
  }
}
