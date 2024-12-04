import { connectDb } from "../../../../helper/db";
import { Properties } from "../../../../models/property";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  const { commonId, Ids, commonFields, portionFields } = await request.json();

  if (!commonId || !Ids || !commonFields || !portionFields) {
    return NextResponse.json(
      {
        error:
          "Common Id, VSID, common fields, and portion fields are required",
      },
      { status: 400 }
    );
  }

  try {
    try {
      const commonFieldUpdate = await Properties.updateMany(
        { commonId },
        { $set: { ...commonFields } },
        { new: true }
      );
    } catch (err) {
      console.log("error in updating common fields: ", err);
      return NextResponse.json(
        { error: "Error in updating common fields" },
        { status: 400 }
      );
    }

    try {
      for (let i = 0; i < Ids.length; i++) {
        const portionFieldUpdate = await Properties.updateOne(
          { _id: Ids[i] },
          {
            $set: { ...portionFields[i] },
          },
          { returnDocument: "after" }
        );
      }
    } catch (err) {
      return NextResponse.json(
        { error: "Error in updating portion fields" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "Property updated successfully" },
      { status: 200 }
    );
  } catch (err) {
    console.log("Error in updating property: ", err);
    return NextResponse.json(
      { error: "Error in updating property" },
      { status: 400 }
    );
  }
}
