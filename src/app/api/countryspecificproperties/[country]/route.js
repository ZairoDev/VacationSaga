import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
import { Properties } from "@/models/property";

export async function GET(req) {
  await connectDb();
  const url = new URL(req.url);
  const pathNameList = url.pathname.split("/");
  const searchedCountry = pathNameList[pathNameList.length - 1];

  const page  = parseInt(url.searchParams.get("page"))  || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 12;
  const skip  = (page - 1) * limit;

  // Search-form params passed from the hero form
  const guests   = parseInt(url.searchParams.get("guests"))    || 1;
  const bedrooms = parseInt(url.searchParams.get("bedrooms"))  || 0;
  const bathrooms = parseInt(url.searchParams.get("bathrooms")) || 0;

  const searchRegex = new RegExp(decodeURIComponent(searchedCountry), "i");

  const query = {
    $and: [
      {
        $or: [
          { city:    searchRegex },
          { country: searchRegex },
          { state:   searchRegex },
        ],
      },
      { guests:  { $gte: guests  } },
      { isLive:  true             },
    ],
  };

  if (bedrooms  > 0) query.$and.push({ bedrooms:  { $gte: bedrooms  } });
  if (bathrooms > 0) query.$and.push({ bathroom:  { $gte: bathrooms } }); // schema field is "bathroom"

  try {
    const searchedProperties = await Properties.find(query)
      .skip(skip)
      .limit(limit);

    return NextResponse.json(searchedProperties);
  } catch (error) {
    console.error("countryspecificproperties error:", error);
    return NextResponse.json({ message: "Failed to fetch properties" }, { status: 500 });
  }
}
