import { connectDb } from "@/helper/db";
import {
  sendBookingConfirmationEmailToCompany,
  sendBookingConfirmationEmailToOwner,
  sendBookingConfirmationEmailToTraveller,
} from "@/helper/gmailMailer";
import { Bookings } from "@/models/bookings";
import { Property } from "@/models/listing";
import { Properties } from "@/models/property";
import Travellers from "@/models/traveller";
import Users from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
  const { booking, propertyId, travellerEmail, paymentToken } =
    await request.json();
  console.log(booking, propertyId, travellerEmail);

  if (!booking || !propertyId) {
    return NextResponse.json(
      { error: "Please provide all the fields." },
      { status: 401 }
    );
  }

  try {
    const property = await Properties.findById(booking.propertyId);
    if (!property) {
      console.log("property not found");
      return NextResponse.json(
        { error: "Property not found" },
        { status: 401 }
      );
    }

    const owner = await Users.findOne({ email: property.email });
    if (!owner) {
      console.log("owner not found");
      return NextResponse.json(
        { error: "Owner does not exists" },
        { status: 401 }
      );
    }

    const traveller = await Travellers.findOne({ email: travellerEmail });
    if (!traveller) {
      console.log("traveller not found");
      return NextResponse.json(
        { error: "Please register as a Traveller first" },
        { status: 400 }
      );
    }

    const updateBookingState = await Bookings.findOneAndUpdate(
      { _id: booking._id },
      { $set: { bookingStatus: "confirmed" } }
    );

    try {
      const companyEmailResponse = await sendBookingConfirmationEmailToCompany(
        owner.name,
        owner.email,
        traveller.name,
        traveller.email,
        propertyId,
        property.VSID
      );
    } catch (err: any) {
      return NextResponse.json(
        { error: "Booking Confirmation Email not sent to company" },
        { status: 401 }
      );
    }

    try {
      const ownerEmailResponse = await sendBookingConfirmationEmailToOwner(
        owner.name,
        owner.email
      );
      console.log("owner email Response: ", ownerEmailResponse);
    } catch (err: any) {
      return NextResponse.json(
        { error: "Booking Confirmation Email not sent ot Owner" },
        { status: 401 }
      );
    }

    try {
      const travellerEmailResponse =
        await sendBookingConfirmationEmailToTraveller(
          booking?.propertyId,
          traveller.name,
          traveller.email,
          booking?._id,
          booking?.startDate,
          booking?.endDate,
          booking?.price,
          paymentToken
        );
      console.log("traveller email response: ", travellerEmailResponse);
    } catch (err: any) {
      return NextResponse.json(
        { error: "Booking Confirmation Email not sent to Traveller" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json(
      { error: "Error in confirming booking" },
      { status: 401 }
    );
  }
}
