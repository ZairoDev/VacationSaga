import { NextRequest, NextResponse } from "next/server";
import Hotel from "@/models/hotel";
import { connectDb } from "@/helper/db";

export async function POST(request: NextRequest) {
  await connectDb();

  try {
    const { ownerDetails, propertyDetails, roomDetails, policies } =
      await request.json();

    const newHotel = new Hotel({
      ownerDetails,
      propertyDetails,
      roomDetails,
      policies,
    });

    console.log("new hotel object: ", newHotel);

    await newHotel.save();
    console.log("Hotel listing created successfully", newHotel);
    return NextResponse.json(
      { message: "Hotel listing created successfully", hotelId: newHotel._id },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error creating hotel listing", error);
    return NextResponse.json(
      { message: "Server error", error: error.message },
      { status: 500 }
    );
  }
}
