import { NextResponse } from "next/server";
import { connectDb } from "../../../../helper/db";
import { Properties } from "../../../../models/property";

connectDb();

export async function POST(req) {
  try {
    const { propertyId } = await req.json();

    const property = await Properties.findOne({ _id: propertyId });

    let blockedDates = [];

    for (let i = 0; i < 12; i++) {
      for (let j = 0; j < 31; j++) {
        if (property.pricePerDay[i][j] < 0) {
          const dt = new Date();
          dt.setMonth(i + 1);
          dt.setDate(j + 1);
          blockedDates.push(new Date(dt));
        }
      }
    }

    // console.log("blockedDates: ", blockedDates);

    return NextResponse.json({ data: blockedDates }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Error getting blocked dates" },
      { status: 500 }
    );
  }
}
