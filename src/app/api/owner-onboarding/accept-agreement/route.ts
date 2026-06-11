import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { Properties } from "@/models/property";

connectDb();

type AgreementType = "service" | "partner";

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { propertyId, type } = (await req.json()) as {
      propertyId?: string;
      type?: AgreementType;
    };

    if (!propertyId || (type !== "service" && type !== "partner")) {
      return NextResponse.json(
        { error: "propertyId and type (service|partner) are required" },
        { status: 400 },
      );
    }

    const property = await Properties.findOne({
      _id: propertyId,
      userId: String(userId),
      listingSource: "short_term_owner_sheet",
    });

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 });
    }

    const now = new Date();
    if (type === "service") {
      property.ownerOnboarding = property.ownerOnboarding || {};
      property.ownerOnboarding.serviceAgreementAcceptedAt = now;
    } else {
      property.ownerOnboarding = property.ownerOnboarding || {};
      property.ownerOnboarding.partnerAgreementAcceptedAt = now;
    }

    await property.save();

    return NextResponse.json({
      success: true,
      ownerOnboarding: property.ownerOnboarding,
    });
  } catch (error) {
    console.error("accept-agreement:", error);
    return NextResponse.json(
      { error: "Failed to save agreement" },
      { status: 500 },
    );
  }
}
