import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import { Property } from "@/models/listing";

connectDb();

export async function POST(request) {
  try {
    const filterCriteria = await request.json();

    console.log("filterCriteria: ", filterCriteria);

    const {
      rentalForm,
      propertyType,
      minPrice,
      maxPrice,
      bedrooms,
      bathrooms,
      beds,
      country,
      rentalType,
    } = filterCriteria;

    // const filter = {};
    const filter = { isLive: true };
    // Add criteria to the filter only if they are provided
    if (country) filter.country = country;
    if (rentalType) filter.rentalType = rentalType;
    if (rentalForm) filter.rentalForm = rentalForm;
    if (propertyType) filter.propertyType = propertyType;

    // if (minPrice && maxPrice) {
    //   filter.basePrice = {};
    //   if (minPrice) filter.basePrice.$gte = minPrice;
    //   if (maxPrice) filter.basePrice.$lte = maxPrice;
    // }
    if (minPrice && maxPrice) {
      filter["basePrice.0"] = {
        $gte: minPrice,
        $lte: maxPrice,
      };
    }

    if (bedrooms) filter.bedrooms = { $gte: bedrooms };
    if (bathrooms) filter.bathroom = { $gte: bathrooms };
    if (beds) filter.beds = { $gte: beds };

    console.log("Applied filter:", filter);
    console.log(Object.keys(filter).length);
    const results =
      Object.keys(filter).length > 0
        ? await Property.find(filter)
        : await Property.find();

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
