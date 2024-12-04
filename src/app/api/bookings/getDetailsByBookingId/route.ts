import { connectDb } from "@/helper/db";
import { Bookings } from "@/models/bookings";
import { Properties } from "@/models/property";
import Travellers from "@/models/traveller";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const { bookingId } = await request.json();

    const booking = await Bookings.findById(bookingId);

    if (!booking) {
      return NextResponse.json(
        { error: "There is no Booking for this id" },
        { status: 400 }
      );
    }

    const traveller = await Travellers.findById(booking.travellerId);

    if (!traveller) {
      return NextResponse.json(
        { error: "There is no Traveller for this id" },
        { status: 400 }
      );
    }

    const property = await Properties.findById(booking.propertyId);

    if (!property) {
      return NextResponse.json(
        { error: "There is no Property for this id" },
        { status: 400 }
      );
    }

    return NextResponse.json({ traveller, property, booking }, { status: 200 });
  } catch (err: any) {
    console.log("error in fetching traveller: ", err);
    return NextResponse.json(
      { error: "Error in fetching traveller" },
      { status: 500 }
    );
  }
}
