import { NextResponse } from "next/server";

import { Properties } from "@/models/property";

import { connectDb } from "../../../helper/db";

connectDb();

export async function POST(request) {
  try {
    const filters = await request.json();

    // Get pagination parameters
    const page = parseInt(filters.page) || 1;
    const limit = parseInt(filters.limit) || 12;
    const skip = (page - 1) * limit;

    // console.log("filterCriteria: ", filters);

    const query = { isLive: true };

    if (filters.beds) query["beds"] = { $gte: filters.beds };
    if (filters.rentalForm) query["rentalForm"] = filters.rentalForm;
    if (filters.bedrooms) query["bedrooms"] = { $gte: filters.bedrooms };
    if (filters.bathroom) query["bathroom"] = { $gte: filters.bathroom };
    if (filters.propertyType) query["propertyType"] = filters.propertyType;
    if (filters.country && filters.country.trim()) {
      query["$or"] = [
        { city: new RegExp(filters.country, "i") },
        { state: new RegExp(filters.country, "i") },
        { country: new RegExp(filters.country, "i") },
      ];
    }

    // Only apply rentalType filter if it's explicitly provided
    if (filters.rentalType) {
      query["rentalType"] = filters.rentalType;
      
      // Apply price filters based on rental type
      if (filters.rentalType === "Long Term") {
        if (filters.minPrice) query["basePriceLongTerm"] = { $gte: filters.minPrice };
        if (filters.maxPrice) query["basePriceLongTerm"] = { $lte: filters.maxPrice };
      } else if (filters.rentalType === "Short Term") {
        if (filters.minPrice) query["basePrice"] = { $gte: filters.minPrice };
        if (filters.maxPrice) query["basePrice"] = { $lte: filters.maxPrice };
      }
    } else {
      // If no rentalType specified, apply to basePrice (short term default)
      if (filters.minPrice) query["basePrice"] = { $gte: filters.minPrice };
      if (filters.maxPrice) query["basePrice"] = { $lte: filters.maxPrice };
    }

    console.log("Applied filter:", query);
    console.log("Page:", page, "Limit:", limit);
    
    // Apply pagination
    const results = await Properties.find(query)
      .skip(skip)
      .limit(limit);

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
