import bcryptjs from "bcryptjs";
import nodemailer from "nodemailer";

import {
  VerificationTemplate,
  ResetPasswordTemplate,
  PropertyListedTemplate,
} from "@/app/emailTemplate/email";
import Travellers from "@/models/traveller";
import landingPageForm from "@/models/landing-page-form";

import Users from "../models/user";
import { OtpTemplate } from "./EmailTemplate/email";

interface SendEmailOptions {
  email: string;
  emailType: string;
  userId: string;
  password?: string;
}

interface SendEmailParams {
  email: string;
  emailType: "VERIFY" | "RESET" | "OTP" | "NEWPASSWORD";
  userId: string;
  password?: string;
  newPassword?: string;
  otp?: number;
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

      const user = await Users.findById(userId);

      if (user) {
        await Users.findByIdAndUpdate(userId, {
          $set: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
          },
        });
      } else {
        const traveller = await Travellers.findByIdAndUpdate(userId, {
          $set: {
            forgotPasswordToken: hashedToken,
            forgotPasswordTokenExpiry: new Date(Date.now() + 3600000),
          },
        });
      }

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

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error(error.message);
  }
};

export const verifyLandingPageEmail = async ({
  email,
  emailType,
  otp,
  userId,
}: SendEmailParams): Promise<{ success: boolean; message: string }> => {
  // let otp: number | null = null;
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    const encodedToken = encodeURIComponent(hashedToken);
    // Update user record in DB based on email type
    switch (emailType) {
      case "OTP":
        otp = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
        await landingPageForm.findOneAndUpdate(
          { email: email },
          {
            $set: {
              emailOTP: otp,
              // otpTokenExpiry: new Date(Date.now() + 300000), // 5 minutes
            },
          }
        );
        break;
      // case "VERIFY":
      //   await Employees.findByIdAndUpdate(userId, {
      //     $set: {
      //       verifyToken: hashedToken,
      //       verifyTokenExpiry: new Date(Date.now() + 3600000), // 1 hour
      //     },
      //   });
      //   break;
    }

    // Configure nodemailer transporter
    let transporter = nodemailer.createTransport({
      // service: "gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "no-reply@vacationsaga.com",
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    // Prepare email template and subject based on the type of email
    let templateContent: string;
    let subject: string;

    switch (emailType) {
      case "OTP":
        templateContent = OtpTemplate(otp ?? 0);
        subject = "Verify Your Email";
        break;
      // case "VERIFY":
      //   templateContent = VerificationTemplate(encodedToken, password || "", email);
      //   subject = "Verify your email";
      //   break;
      default:
        console.log("invalid email Type");
        throw new Error("Invalid email type");
    }

    const mailOptions = {
      from: "No Reply <no-reply@vacationsaga.com>",
      to: email,
      subject,
      html: templateContent,
    };

    // Send the email
    const mailResponse = await transporter.sendMail(mailOptions);
    // console.log("mailResponse: ", mailResponse);

    // Check if the email was rejected
    if (mailResponse.rejected.length > 0) {
      console.log("Email rejected:", mailResponse.rejected);
      return { success: false, message: "Email does not exist." };
    }

    console.log("Email sent successfully");
    return { success: true, message: "Email sent successfully." };
  } catch (error: any) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email: " + error.message);
  }
};
