import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { Properties } from "@/models/property";

connectDb();

const ALLOWED_FIELDS = new Set([
  "icalLinks",
  "isInstantBooking",
  "pricePerDay",
  "basePrice",
  "weekendPrice",
  "weeklyDiscount",
]);

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { propertyId, updatedData } = await req.json();
    if (!propertyId || !updatedData) {
      return NextResponse.json(
        { error: "propertyId and updatedData are required" },
        { status: 400 },
      );
    }

    const patch: Record<string, unknown> = {};
    for (const key of Object.keys(updatedData)) {
      if (ALLOWED_FIELDS.has(key)) {
        patch[key] = updatedData[key];
      }
    }

    if (Object.keys(patch).length === 0) {
      return NextResponse.json(
        { error: "No allowed fields to update" },
        { status: 400 },
      );
    }

    const property = await Properties.findOneAndUpdate(
      {
        _id: propertyId,
        userId: String(userId),
      },
      { $set: patch },
      { new: true },
    );

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    return NextResponse.json({ property });
  } catch (error) {
    console.error("updateOwnerProperty:", error);
    return NextResponse.json(
      { error: "Failed to update property" },
      { status: 500 },
    );
  }
}
