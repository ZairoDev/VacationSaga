import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { Properties } from "@/models/property";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { propertyId } = (await req.json()) as { propertyId?: string };

    if (!propertyId) {
      return NextResponse.json(
        { error: "propertyId is required" },
        { status: 400 },
      );
    }

    const property = await Properties.findOne({
      _id: propertyId,
      userId: String(userId),
      listingSource: "short_term_owner_sheet",
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    property.ownerOnboarding = property.ownerOnboarding || {};
    property.ownerOnboarding.icalSkippedAt = new Date();
    property.markModified("ownerOnboarding");
    await property.save();

    return NextResponse.json({
      success: true,
      ownerOnboarding: property.ownerOnboarding,
    });
  } catch (error) {
    console.error("skip-ical:", error);
    return NextResponse.json(
      { error: "Failed to skip calendar step" },
      { status: 500 },
    );
  }
}
