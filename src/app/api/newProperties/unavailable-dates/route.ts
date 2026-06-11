import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { Properties } from "@/models/property";
import {
  getUnavailableDateKeysForProperty,
  type PropertyForAvailability,
} from "@/lib/ical-sync";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const { propertyId } = await req.json();
    if (!propertyId) {
      return NextResponse.json(
        { error: "propertyId is required" },
        { status: 400 },
      );
    }

    const property = await Properties.findById(propertyId).lean();
    if (!property || (property as { isLive?: boolean }).isLive !== true) {
      return NextResponse.json(
        { error: "Property not found or not available" },
        { status: 404 },
      );
    }

    const keys = await getUnavailableDateKeysForProperty(
      property as PropertyForAvailability,
    );
    const dates = Array.from(keys).map((k) => {
      const [y, m, d] = k.split("-").map(Number);
      return new Date(y, m - 1, d).toISOString();
    });

    return NextResponse.json({ data: dates, dateKeys: Array.from(keys) });
  } catch (err) {
    console.error("unavailable-dates:", err);
    return NextResponse.json(
      { error: "Error getting unavailable dates" },
      { status: 500 },
    );
  }
}
