import { connectDb } from "@/helper/db";
import { NextResponse } from "next/server";
// import { Property } from "@/models/listing";
import { Properties } from "@/models/property";

connectDb();

export async function POST(req) {
  const reqBody = await req.json();
  const { propertyType, country, params } = reqBody;
  console.log("propertyType: ", params, propertyType, country);

  // const searchRegex = new RegExp(propertyType, country, "i");
  // console.log("searchRegex: ", searchRegex);
  // console.log(searchRegex);
  const regexObj = {
    $and: [
      { propertyType: `${propertyType}` },
      // country: `${country}`,
      {
        $or: [{ city: country }, { country: country }, { state: country }],
      },
    ],
  };
  console.log(regexObj);

  const url = new URL(req.url);
  // console.log("url: ", url);
  const page = parseInt(url.searchParams.get("page")) || params?.page || 1;
  const limit = parseInt(url.searchParams.get("limit")) || 12;
  const skip = (page - 1) * limit;

  // console.log(page, limit, skip);

  try {
    const searchedProperties = await Properties.find(
      // propertyType: regexObj,
      regexObj
    )
      .skip(skip)
      .limit(limit);
    // console.log(searchedProperties);

    return NextResponse.json(searchedProperties);
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "Failed to fetch properties",
    });
  }
}
