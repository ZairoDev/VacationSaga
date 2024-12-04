import { connectDb } from "@/helper/db";
import { Property } from "@/models/listing";
import { NextRequest, NextResponse } from "next/server";

connectDb();

export const POST = async (request) => {
  const propertyData = await request.json();
	const {_id} = propertyData;

  try {
    
		const updatedProperty = await Property.findByIdAndUpdate(_id, propertyData, { new: true });

		return NextResponse.json(updatedProperty);
  } catch (error) {
		console.log("error: ", error);
	}
};
