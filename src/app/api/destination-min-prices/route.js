import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import { Properties } from "@/models/property";

export async function GET(req) {
  await connectDb();

  const url = new URL(req.url);
  const place = (url.searchParams.get("place") || "").trim();

  if (!place) {
    return NextResponse.json(
      { message: "Missing place param", minShortTerm: 0, minLongTerm: 0 },
      { status: 400 }
    );
  }

  const searchRegex = new RegExp(place, "i");
  const BIG = 1e15;
  const MIN_EUR = 10;

  try {
    const [result] = await Properties.aggregate([
      {
        $match: {
          isLive: true,
          $or: [{ city: searchRegex }, { country: searchRegex }, { state: searchRegex }],
        },
      },
      {
        $group: {
          _id: null,
          minShortTerm: {
            $min: {
              $cond: [{ $gt: ["$basePrice", MIN_EUR] }, "$basePrice", BIG],
            },
          },
          minLongTerm: {
            $min: {
              $cond: [{ $gt: ["$basePriceLongTerm", MIN_EUR] }, "$basePriceLongTerm", BIG],
            },
          },
        },
      },
      {
        $project: {
          _id: 0,
          minShortTerm: { $cond: [{ $eq: ["$minShortTerm", BIG] }, 0, "$minShortTerm"] },
          minLongTerm: { $cond: [{ $eq: ["$minLongTerm", BIG] }, 0, "$minLongTerm"] },
        },
      },
    ]);

    return NextResponse.json({
      place,
      minShortTerm: result?.minShortTerm ?? 0,
      minLongTerm: result?.minLongTerm ?? 0,
    });
  } catch (error) {
    console.log("destination-min-prices error:", error);
    return NextResponse.json(
      { message: "Failed to fetch min prices", minShortTerm: 0, minLongTerm: 0 },
      { status: 500 }
    );
  }
}

