import { connectDb } from "@/helper/db";
import {
  sendBookingCancellationEmailToCompany,
  sendBookingCancellationEmailToTraveller,
} from "@/helper/gmailMailer";
import { Bookings } from "@/models/bookings";
import Travellers from "@/models/traveller";
import Users from "@/models/user";
import { NextRequest, NextResponse } from "next/server";
connectDb();

export async function POST(request: NextRequest) {
  try {
    const {
      travellerName,
      bookingId,
      ownerEmail,
      travellerEmail,
      cancellationReason,
    } = await request.json();

    console.log(bookingId, ownerEmail, travellerEmail, cancellationReason);

    const booking = await Bookings.findOneAndUpdate(
      { _id: bookingId },
      { $set: { bookingStatus: "cancelled" } }
    );
    await Users.updateOne(
      { email: ownerEmail },
      {
        $pull: { myUpcommingRequests: bookingId },
        $push: { declinedRequests: { bookingId, reason: cancellationReason } },
      },
      { new: true }
    );

    try {
      const cancellationResponseToCompany =
        await sendBookingCancellationEmailToCompany(
          ownerEmail,
          travellerEmail,
          bookingId,
          cancellationReason
        );
    } catch (error: any) {
      console.log("Something went wrong while sending a email", error);
    }

    try {
      const cancellationResponseToTraveller =
        await sendBookingCancellationEmailToTraveller(
          travellerName,
          bookingId,
          travellerEmail
        );
    } catch (error: any) {
      console.log("Something went wrong while sending a email", error);
    }

    return NextResponse.json(
      { message: "Booking Status Updated Successfully!" },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Booking cannot be cancelled!" },
      { status: 401 }
    );
  }
}
