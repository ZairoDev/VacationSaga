import { connectDb } from "@/helper/db";
import { Properties } from "@/models/property";
import { quicklisting } from "@/models/quicklisting";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const { propertyId } = await req.json();

    if (!propertyId) {
      return NextResponse.json(
        { error: "Property ID is required" },
        { status: 400 }
      );
    }

    let property = await Properties.findById(propertyId);

    if (!property) {
      property = await quicklisting.findById(propertyId);
    }

    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ property }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
