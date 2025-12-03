// TODO: You have to remove the mailer functions and use gmailmailer

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import {
  DetailsExchangeTemplate,
  OwnerBookingTemplate,
  sendBookingCancellationEmailToTravellerTemplate,
  TravellerBookingConfirmationTemplate,
  TravellerBookingTemplate,
} from "@/app/emailTemplate/email";

export const sendEmail = async ({ email, subject, text, price }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    // Set up email options
    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: email,
      subject: subject,
      SelectedPrice: price,
      text: text,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    console.log("No-reply email sent successfully");
  } catch (error) {
    console.error("Error sending no-reply email:", error);
    throw new Error("Could not send no-reply email");
  }
};

export const sendUserDetailsToCompany = async (userDetails) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    let subject, text;

    if (userDetails.price !== undefined) {
      subject = "User's selected price details";
      text = `
        Name: ${userDetails.name}
        Email: ${userDetails.email}
        Phone: ${userDetails.phone}
        Selected Plan: ${userDetails.price}
        Someone has choosen a plan, details are above.
      `;
    } else {
      subject = "User's Details";
      text = `
        Name: ${userDetails.name}
        Email: ${userDetails.email}
        Phone: ${userDetails.phone}
        VSID: ${userDetails.VSID}
        Link: ${userDetails.Link}
        Someone has listed a property, contact details are above.
      `;
    }

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: process.env.COMPANY_EMAIL,
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);

    console.log("User details sent to company email successfully");
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    throw new Error("Could not send user details to company email");
  }
};

export const sendContactEmail = async (userDetails) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "User Contact Details and Query";
    const text = `
        Name: ${userDetails.name}
        Email: ${userDetails.email}
        Phone: ${userDetails.phone}
        Message: ${userDetails.message}
      `;

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: "support@vacationsaga.com",
      subject: subject,
      text: text,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Your query has been delievered to the company" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

// export const sendBookingEmail = async (bookingId, emails) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "zairo.developer@gmail.com",
//         pass: "gwlz rnrv gpio uzcp",
//       },
//     });

//     const subject = "Booking Confirmation!";

//     const templateContent = BookingTemplate(bookingId);

//     const mailOptions = {
//       from: `No Reply <no-reply@yourdomain.com>`,
//       to: Array.isArray(emails) ? emails.join(", ") : emails,
//       subject: subject,
//       html: templateContent,
//     };
//     const mailResponse = await transporter.sendMail(mailOptions);
//     console.log("mail sent: ", mailResponse);
//     return NextResponse.json(
//       { message: "Confirm Booking Mail sent" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error sending user details to company email:", error);
//     return NextResponse.json(
//       { error: "Could not send user contact details to company email" },
//       { status: 400 }
//     );
//   }
// };

export const sendBookingConfirmationEmailToCompany = async (
  ownerName,
  ownerEmail,
  travellerName,
  travellerEmail,
  propertyId,
  propertyVSID
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Booking Confirmation!";

    const html = `
    Owner ( ${ownerName} - ${ownerEmail} ) <br> has confirmed the Booking for the <br> Property ( VS ID - ${propertyVSID} , Property Id - ${propertyId} ), <br> booked by Traveller ( ${travellerName} - ${travellerEmail} ) 
    `;

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: process.env.COMPANY_EMAIL,
      subject: subject,
      html: html,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

export const sendBookingConfirmationEmailToOwner = async (
  ownerName,
  ownerEmail
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Booking Confirmation!";

    const text = `
    Hello ${ownerName}, You had Confirmed the Booking Request!
    `;

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: ownerEmail,
      subject: subject,
      text: text,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

export const sendBookingConfirmationEmailToTraveller = async (
  propertyId,
  travellerName,
  travellerEmail,
  bookingId,
  startDate,
  endDate,
  price,
  paymentToken
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Booking Confirmation!";

    const templateContent = TravellerBookingConfirmationTemplate(
      propertyId,
      travellerName,
      bookingId,
      startDate,
      endDate,
      price,
      paymentToken
    );

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: travellerEmail,
      subject: subject,
      html: templateContent,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

export const sendBookingEmailToCompany = async (
  ownerEmail,
  travellerEmail,
  propertyId,
  propertyVSID
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Booking Confirmation!";

    const text = `
      Owner Email: ${ownerEmail},
      Traveller Email: ${travellerEmail},
      Property Id: ${propertyId},
      Property VSID: ${propertyVSID},
    `;

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: process.env.COMPANY_EMAIL,
      subject: subject,
      text: text,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

export const sendBookingEmailToOwner = async (
  propertyId,
  ownerName,
  bookingId,
  startDate,
  endDate,
  price,
  emails
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Booking Confirmation!";

    const templateContent = OwnerBookingTemplate(
      ownerName,
      bookingId,
      startDate,
      endDate,
      price
    );

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: Array.isArray(emails) ? emails.join(", ") : emails,
      subject: subject,
      html: templateContent,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

export const sendBookingEmailToTraveller = async (
  startDate,
  endDate,
  price,
  travellerName,
  emails
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Booking Confirmation!";

    const templateContent = TravellerBookingTemplate(
      startDate,
      endDate,
      price,
      travellerName
    );

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: Array.isArray(emails) ? emails.join(", ") : emails,
      subject: subject,
      html: templateContent,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

export const sendBookingCancellationEmailToTraveller = async (
  travellerName,
  bookingId,
  emails
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Booking Cancellation!";

    const templateContent = sendBookingCancellationEmailToTravellerTemplate(
      bookingId,
      travellerName
    );

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: Array.isArray(emails) ? emails.join(", ") : emails,
      subject: subject,
      html: templateContent,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

export const sendBookingCancellationEmailToCompany = async (
  ownerEmail,
  travellerEmail,
  bookingId,
  cancellationReason
) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Booking Cancellation!";

    const text = `
      Owner Email: ${ownerEmail},
      Traveller Email: ${travellerEmail},
      Booking Id: ${bookingId},
      Cancellation Reason: ${cancellationReason},
    `;
    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: process.env.COMPANY_EMAIL,
      subject: subject,
      text: text,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};

// export const sendBookingCancellationEmail = async (emails) => {
//   try {
//     let transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "zairo.developer@gmail.com",
//         pass: "gwlz rnrv gpio uzcp",
//       },
//     });

//     const subject = "Booking Confirmation!";

//     const templateContent = BookingCancellationTemplate(
//       "aviralm55555@gmail.com"
//     );

//     const mailOptions = {
//       from: `No Reply <no-reply@yourdomain.com>`,
//       to: Array.isArray(emails) ? emails.join(", ") : emails,
//       subject: subject,
//       html: templateContent,
//     };
//     const mailResponse = await transporter.sendMail(mailOptions);
//     console.log("mail sent: ", mailResponse);
//     return NextResponse.json(
//       { message: "Confirm Booking Mail sent" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error sending user details to company email:", error);
//     return NextResponse.json(
//       { error: "Could not send user contact details to company email" },
//       { status: 400 }
//     );
//   }
// };

export const sendDetailsExchangeMail = async (owner, traveller, bookingId) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "zairo.developer@gmail.com",
        pass: "gwlz rnrv gpio uzcp",
      },
    });

    const subject = "Details Exchange Mail";

    const templateContent = DetailsExchangeTemplate(
      owner,
      traveller,
      bookingId
    );

    const mailOptions = {
      from: `No Reply <no-reply@yourdomain.com>`,
      to: [owner.email, traveller.email].join(", "),
      subject: subject,
      html: templateContent,
    };
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log("mail sent: ", mailResponse);
    return NextResponse.json(
      { message: "Confirm Booking Mail sent" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending user details to company email:", error);
    return NextResponse.json(
      { error: "Could not send user contact details to company email" },
      { status: 400 }
    );
  }
};
