import { NextResponse } from "next/server";
import { Properties } from "@/models/property";
import { connectDb } from "../../../helper/db";

export async function POST(request) {
  try {
    await connectDb();

    const filters = await request.json();

    const page  = parseInt(filters.page)  || 1;
    const limit = parseInt(filters.limit) || 12;
    const skip  = (page - 1) * limit;

    const query = { isLive: true };

    // --- Location ---
    if (filters.country && filters.country.trim()) {
      query["$or"] = [
        { city:    new RegExp(filters.country, "i") },
        { state:   new RegExp(filters.country, "i") },
        { country: new RegExp(filters.country, "i") },
      ];
    }

    // --- Capacity (from hero search form) ---
    if (filters.guests    && filters.guests    > 0) query["guests"]    = { $gte: filters.guests    };
    if (filters.bedrooms  && filters.bedrooms  > 0) query["bedrooms"]  = { $gte: filters.bedrooms  };
    if (filters.bathrooms && filters.bathrooms > 0) query["bathroom"]  = { $gte: filters.bathrooms }; // schema field is "bathroom"

    // --- Tab filter fields ---
    if (filters.rentalForm)   query["rentalForm"]   = filters.rentalForm;
    if (filters.propertyType) query["propertyType"] = filters.propertyType;
    if (filters.houserool)    query["houserool"]     = filters.houserool;

    // --- Rental type + price (fix: build price range object properly) ---
    if (filters.rentalType) {
      query["rentalType"] = filters.rentalType;

      const priceField = filters.rentalType === "Long Term" ? "basePriceLongTerm" : "basePrice";
      const priceQuery = {};
      if (filters.minPrice && filters.minPrice > 0)       priceQuery["$gte"] = filters.minPrice;
      if (filters.maxPrice && filters.maxPrice < 999999)  priceQuery["$lte"] = filters.maxPrice;
      if (Object.keys(priceQuery).length > 0) query[priceField] = priceQuery;
    } else {
      const priceQuery = {};
      if (filters.minPrice && filters.minPrice > 0)       priceQuery["$gte"] = filters.minPrice;
      if (filters.maxPrice && filters.maxPrice < 999999)  priceQuery["$lte"] = filters.maxPrice;
      if (Object.keys(priceQuery).length > 0) query["basePrice"] = priceQuery;
    }

    console.log("Applied filter:", JSON.stringify(query, null, 2));

    const results = await Properties.find(query).skip(skip).limit(limit);

    console.log("Results:", results.length);
    return NextResponse.json(results);
  } catch (error) {
    console.error("Filter error:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
