import { connectDb } from "../../../helper/db";
import { NextRequest, NextResponse } from "next/server";
import { NextApiRequest } from "next";
import { Properties } from "@/models/property";

connectDb();

export async function GET(req) {
  const url = req.url;
  const urlList = url.split("limit=");
  const limit = urlList[1];
  const queryLimit = limit ? parseInt(limit, 10) : undefined;

  try {
    const allProperties = await Properties.aggregate([
      { $match: { isLive: true } },
      { $sample: { size: queryLimit || 0 } },
    ]);
    return NextResponse.json(allProperties);
  } catch (error) {
    console.error("Error fetching properties: ", error);

    return NextResponse.json(
      { message: "Failed to fetch properties from the database" },
      { status: 400 }
    );
  }
}
