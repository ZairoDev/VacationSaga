import { connectDb } from "@/helper/db";
import { Properties } from "@/models/property";
import { NextResponse } from "next/server";

connectDb();

export async function POST(request) {
  const { commonId } = await request.json();

  if (!commonId) {
    return NextResponse.json({ error: "Common Id not found" }, { status: 400 });
  }

  try {
    const commonIdProperties = await Properties.find({ commonId });

    if (!commonIdProperties) {
      return NextResponse.json(
        { message: "No other porperties are there with this CommonId" },
        { status: 200 }
      );
    }
    return NextResponse.json({ commonIdProperties }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: "Something went wrong!" },
      { status: 400 }
    );
  }
}
