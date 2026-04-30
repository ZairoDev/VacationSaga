import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import { Property } from "@/models/listing";
import { Properties } from "@/models/property";

export async function GET(req) {
  await connectDb();
  const url = new URL(req.url);
  const pathNameList = url.pathname.split("/");
  const guestsCount = 1;
  const searchedCountry = pathNameList[pathNameList.length - 1];

  const searchRegex = new RegExp(searchedCountry, "i");

  const page = parseInt(url.searchParams.get("page")) || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 5;
  const skip = (page - 1) * limit;

  try {
    const searchedProperties = await Properties.find({
      $and: [
        {
          $or: [
            { city: searchRegex },
            { country: searchRegex },
            { state: searchRegex },
          ],
        },
        { guests: { $gte: guestsCount } },
        { isLive: true },
      ],
    })
      .skip(skip)
      .limit(limit);

    return NextResponse.json(searchedProperties);
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "Failed to fetch properties",
    });
  }
}
