import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import { Property } from "@/models/listing";
import { sendUserDetailsToCompany } from "../../../helper/gmailMailer";
connectDb();

connectDb();

export async function POST(request) {
  const {
    userId,
    email,
    phone,
    name,
    propertyType,
    placeName,
    rentalForm,
    numberOfPortions,
    street,
    postalCode,
    city,
    state,
    country,
    center,
    portionName,
    portionSize,
    guests,
    bedrooms,
    beds,
    bathroom,
    kitchen,
    childrenAge,
    basePrice,
    weekendPrice,
    monthlyDiscount,
    currency,
    generalAmenities,
    otherAmenities,
    safeAmenities,
    smoking,
    pet,
    party,
    cooking,
    additionalRules,
    reviews,
    propertyCoverFileUrl,
    propertyPictureUrls,
    portionCoverFileUrls,
    portionPictureUrls,
    night,
    time,
    datesPerPortion,

    rentalType,
    basePriceLongTerm,
    monthlyDiscountLongTerm,
    longTermMonths,

    isLive,
  } = await request.json();

  const property = new Property({
    userId,
    email,
    propertyType,
    placeName,
    rentalForm,
    numberOfPortions,
    street,
    postalCode,
    city,
    state,
    country,
    center,
    portionName,
    portionSize,
    guests,
    bedrooms,
    beds,
    bathroom,
    kitchen,
    childrenAge,
    basePrice,
    weekendPrice,
    monthlyDiscount,
    currency,
    generalAmenities,
    otherAmenities,
    safeAmenities,
    smoking,
    pet,
    party,
    cooking,
    additionalRules,
    reviews,
    propertyCoverFileUrl,
    propertyPictureUrls,
    portionCoverFileUrls,
    portionPictureUrls,
    night,
    time,
    datesPerPortion,

    rentalType,
    basePriceLongTerm,
    monthlyDiscountLongTerm,
    longTermMonths,

    isLive,
  });

  try {
    const createdProperty = await property.save();
    const VSID = createdProperty.VSID;
    const propertyId = createdProperty._id;
    await sendUserDetailsToCompany({
      // name: userId,
      email: email,
      phone: phone,
      name: name,
      VSID: VSID,
      Link: `https://www.vacationsaga.com/listing-stay-detail?id=${propertyId}`,
    });

    const response = NextResponse.json(createdProperty, { status: 200 });
    console.log("Response: ", response);
    return response;
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({
      message: "Failed to create property",
      error: error.message,
    });
  }
}
