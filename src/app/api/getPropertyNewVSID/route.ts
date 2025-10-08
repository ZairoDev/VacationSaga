import mongoose from "mongoose";
import { Properties } from "@/models/property";
import { Property } from "@/models/listing";
import { connectDb } from "@/helper/db";
import { NextRequest, NextResponse } from "next/server";

interface ListingDoc {
  VSID: string;
  userId: string;
  propertyCoverFileUrl: string;
}

export async function POST(req: NextRequest) {
  await connectDb();

  try {
    const { listingVSID } = await req.json();

    if (!listingVSID) {
      return NextResponse.json({ success: false, error: "listingVSID is required" }, { status: 400 });
    }

    const listing = await Property.findOne({ VSID: listingVSID }).lean<ListingDoc>();
    if (!listing) {
      return NextResponse.json({ success: false, error: "Listing not found" }, { status: 404 });
    }

    const result = await Properties.aggregate([
      {
        $match: {
          userId: listing.userId,
          propertyCoverFileUrl: listing.propertyCoverFileUrl,
        },
      },
      {
        $project: {
          _id: 1,
          VSID: 1,
        },
      },
    ]);

    return NextResponse.json({ success: true, data: result });
  } catch (err: any) {
    console.error("Error finding property for listing:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
