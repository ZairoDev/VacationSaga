import { connectDb } from "@/helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { sendDetailsExchangeMail } from "@/helper/gmailMailer";
import { Bookings } from "@/models/bookings";
import { Properties } from "@/models/property";
import Travellers from "@/models/traveller";
import Users from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json();
    // console.log(bookingId);

    const travellerId = await getDataFromToken(request);
    if (!travellerId) {
      return NextResponse.json(
        { error: "You must login as a traveller for Payment" },
        { status: 401 }
      );
    }
    // console.log(travellerId);

    if (!bookingId) {
      return NextResponse.json(
        { error: "Error in exchanging in details of owner  " },
        { status: 400 }
      );
    }

    const booking = await Bookings.findById(bookingId);
    if (!booking) {
      return NextResponse.json(
        { error: "Error in exhnaging details of owner  " },
        { status: 400 }
      );
    }

    const traveller = await Travellers.findById(travellerId);

    if (!traveller) {
      return NextResponse.json(
        { error: "Traveller not found" },
        { status: 400 }
      );
    }

    const proeprtyId = booking.propertyId;
    const property = await Properties.findById(proeprtyId);

    if (!property) {
      return NextResponse.json({ error: "Property not found" });
    }

    const ownerEmail = property?.email;

    const owner = await Users.findOne({ email: ownerEmail });

    // console.log(bookingId, owner, traveller);

    try {
      const detailsExchangeEmailResponse = await sendDetailsExchangeMail(
        owner,
        traveller,
        bookingId
      );
    } catch (err: any) {
      return NextResponse.json(
        { error: "Error in exchanging details" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Details exchanged successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("err: ", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
