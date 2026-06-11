import { connectDb } from "@/helper/db";
import { Properties } from "@/models/property";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  const { propertyId } = await request.json();

  if (!propertyId) {
    return NextResponse.json(
      { error: "Property ID is required" },
      { status: 401 }
    );
  }

  try {
    const property = await Properties.findOne({
      _id: propertyId,
      isLive: true,
    });

    if (!property) {
      return NextResponse.json(
        { error: "Property not found or not available" },
        { status: 404 }
      );
    }
    return NextResponse.json({ property }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Error in fetching property" },
      { status: 500 }
    );
  }
}
