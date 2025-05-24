import { NextResponse } from "next/server";

import { Properties } from "@/models/property";

import { connectDb } from "../../../helper/db";

connectDb();

export async function POST(request) {
  try {
    const filters = await request.json();

    // console.log("filterCriteria: ", filters);

    const query = { isLive: true };

    if (filters.beds) query["beds"] = { $gte: filters.beds };
    if (filters.rentalForm) query["rentalForm"] = filters.rentalForm;
    if (filters.bedrooms) query["bedrooms"] = { $gte: filters.bedrooms };
    if (filters.bathroom) query["bathroom"] = { $gte: filters.bathroom };
    if (filters.propertyType) query["propertyType"] = filters.propertyType;
    if (filters.country.trim()) {
      query["$or"] = [
        { city: new RegExp(filters.country, "i") },
        { state: new RegExp(filters.country, "i") },
        { country: new RegExp(filters.country, "i") },
      ];
    }

    if (filters.rentalType === "Long Term") {
      query["rentalType"] = "Long Term";
    } else query["rentalType"] = "Short Term";

    if (filters.rentalType === "Long Term") {
      if (filters.minPrice) query["basePriceLongTerm"] = { $gte: filters.minPrice };
      if (filters.maxPrice) query["basePriceLongTerm"] = { $lte: filters.maxPrice };
    } else {
      if (filters.minPrice) query["basePrice"] = { $gte: filters.minPrice };
      if (filters.maxPrice) query["basePrice"] = { $lte: filters.maxPrice };
    }

    console.log("Applied filter:", query);
    console.log(Object.keys(query).length);
    const results =
      Object.keys(query).length > 0
        ? await Properties.find(query)
        : await Properties.find();

    console.log("results: ", results.length);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Error filtering properties: ", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
