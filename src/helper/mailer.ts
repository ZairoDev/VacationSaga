import nodemailer from "nodemailer";
import User from "../models/user";
import bcryptjs from "bcryptjs";
import Users from "../models/user";
import {
  PropertyListedTemplate,
  ResetPasswordTemplate,
  VerificationTemplate,
} from "@/app/emailTemplate/email";

interface SendEmailOptions {
  email: string;
  emailType: string;
  userId: string;
  password?: string;
}

export const sendEmail = async ({
  email,
  emailType,
  userId,
  password,
}: SendEmailOptions) => {
  try {
    if (!email || typeof email !== "string" || !email.includes("@")) {
      throw new Error("Invalid email address");
    }

    let templateContent;

    if (emailType === "VERIFY") {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      const encodedToken = encodeURIComponent(hashedToken);

      await Users.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date(Date.now() + 3600000),
        },
      });

      templateContent = VerificationTemplate(encodedToken, password, email);
    } else if (emailType === "RESET") {
      const hashedToken = await bcryptjs.hash(userId.toString(), 10);
      const encodedToken = encodeURIComponent(hashedToken);

      await Users.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
        },
      });

      templateContent = ResetPasswordTemplate(encodedToken);
    } else if (emailType === "PROPERTY_LISTED") {
      // For PROPERTY_LISTED, no token updates needed, just send the email
      templateContent = PropertyListedTemplate(userId, email);
    } else {
      throw new Error("Invalid email type");
    }

    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "no-reply@vacationsaga.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "No Reply <no-reply@vacationsaga.com>",
      to: email,
      subject:
        emailType === "VERIFY"
          ? "Verify your email"
          : emailType === "RESET"
          ? "Reset Your Password"
          : "Property Listed Successfully",
      html: templateContent,
    };

    console.log("Sending email with options:", mailOptions); // Debug log

    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("Email sent response:", mailResponse); // Debug log
    return mailResponse;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error(error.message);
  }
};
