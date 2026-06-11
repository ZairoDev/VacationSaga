import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { Properties } from "@/models/property";
import { parseIcalFromUrl, validateIcalUrl } from "@/lib/ical-sync";

connectDb();

const ALLOWED_PLATFORMS = new Set(["Airbnb", "Booking.com", "Booking", "Other"]);

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { propertyId, platform, url } = (await req.json()) as {
      propertyId?: string;
      platform?: string;
      url?: string;
    };

    if (!propertyId || !platform || !url) {
      return NextResponse.json(
        { error: "propertyId, platform, and url are required" },
        { status: 400 },
      );
    }

    const platformKey = platform.trim();
    if (!ALLOWED_PLATFORMS.has(platformKey)) {
      return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
    }

    const validation = validateIcalUrl(url);
    if (!validation.valid || !validation.url) {
      return NextResponse.json(
        { error: validation.error ?? "Invalid calendar URL" },
        { status: 400 },
      );
    }

    try {
      const events = await parseIcalFromUrl(validation.url);
      if (events.length === 0) {
        return NextResponse.json(
          {
            error:
              "Calendar link works but contains no events. Check the URL or try again later.",
          },
          { status: 400 },
        );
      }
    } catch (err) {
      return NextResponse.json(
        {
          error:
            err instanceof Error
              ? err.message
              : "Could not read calendar from that URL",
        },
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

    if (!property.icalLinks) {
      property.icalLinks = new Map();
    }
    if (property.icalLinks instanceof Map) {
      property.icalLinks.set(platformKey, validation.url);
    } else {
      property.icalLinks = {
        ...(property.icalLinks as Record<string, string>),
        [platformKey]: validation.url,
      };
    }

    property.ownerOnboarding = property.ownerOnboarding || {};
    property.ownerOnboarding.icalSkippedAt = null;
    property.markModified("icalLinks");
    property.markModified("ownerOnboarding");
    await property.save();

    const icalLinksObj =
      property.icalLinks instanceof Map
        ? Object.fromEntries(property.icalLinks.entries())
        : property.icalLinks;

    return NextResponse.json({
      success: true,
      icalLinks: icalLinksObj,
      ownerOnboarding: property.ownerOnboarding,
    });
  } catch (error) {
    console.error("save-ical:", error);
    return NextResponse.json(
      { error: "Failed to save calendar link" },
      { status: 500 },
    );
  }
}
