import { BookingDataType } from "@/data/types";
import { connectDb } from "@/helper/db";
import { Bookings } from "@/models/bookings";
import { NextRequest, NextResponse } from "next/server";

connectDb();

const createICalFeed = (bookings: BookingDataType[], propertyId: string) => {
  // let icalFeed =
  //   "BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Vacation Saga//Hosting Calendar//EN\r\nCALSCALE:GREGORIAN\r\nVERSION:2.0\r\n";

  let icalFeed =
    "BEGIN:VCALENDAR\r\n" +
    "VERSION:2.0\r\n" +
    "PRODID:-//VacationSaga//Property Bookings//EN\r\n" +
    `X-WR-CALNAME:VacationSaga Bookings for Property ${propertyId}\r\n`;

  bookings.forEach((booking) => {
    const startDate = formatDate(new Date(booking.startDate));
    const endDate = formatDate(new Date(booking.endDate));
    const now = formatDate(new Date());

    icalFeed +=
      "BEGIN:VEVENT\r\n" +
      `UID:${booking._id}@vacationsaga.com\r\n` +
      `DTSTAMP:${now}\r\n` +
      "SUMMARY:Booked\r\n" +
      `DTSTART;VALUE=DATE:${startDate}\r\n` +
      `DTEND;VALUE=DATE:${endDate}\r\n` +
      "END:VEVENT\r\n";
  });

  icalFeed += "END:VCALENDAR";
  return icalFeed;
};

const formatDate = (date: Date) => {
  return date.toISOString().replace(/[-:]/g, "").split("T")[0];
};

export async function GET(
  request: NextRequest,
  { params }: { params: { propertyId: string } }
) {
  const { propertyId } = params;
  console.log("propertyId: ", propertyId);

  try {
    const confirmedBookings = await Bookings.find({
      propertyId,
      bookingStatus: "confirmed",
    });

    const icalFeed = createICalFeed(confirmedBookings, propertyId);
    console.log("icalFeed: ", icalFeed);

    return new NextResponse(icalFeed, {
      status: 200,
      headers: {
        "Content-Type": "text/calendar",
        "Content-Disposition": `attachment; filename="property_${propertyId}_calendar.ics"`,
      },
    });
  } catch (error) {
    console.error("Error serving iCal feed:", error);
    return NextResponse.json(
      { error: "Error in serving iCal feed" },
      { status: 500 }
    );
  }
}
