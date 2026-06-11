import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Users from "@/models/user";
import { Properties } from "@/models/property";
import {
  computePropertyOnboardingSteps,
  isPropertyOnboardingComplete,
  needsShortTermOwnerOnboarding,
  ownerRequiresOnboarding,
} from "@/lib/owner-onboarding";

connectDb();

export async function GET(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const user = await Users.findById(userId).select("-password").lean();
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if ((user as { role?: string }).role !== "Owner") {
      return NextResponse.json({
        requiresOnboarding: false,
        properties: [],
      });
    }

    const properties = await Properties.find({
      userId: String(userId),
      listingSource: "short_term_owner_sheet",
      isLive: { $ne: true },
    }).lean();

    const pending = properties.filter((p) =>
      needsShortTermOwnerOnboarding(p as Parameters<typeof needsShortTermOwnerOnboarding>[0]),
    );

    const mapped = pending.map((property) => {
      const steps = computePropertyOnboardingSteps(
        user as Parameters<typeof computePropertyOnboardingSteps>[0],
        property as Parameters<typeof computePropertyOnboardingSteps>[1],
      );
      const prop = property as {
        _id?: unknown;
        icalLinks?: Map<string, string> | Record<string, string>;
        ownerOnboarding?: { icalSkippedAt?: Date | null };
      };
      const icalLinks =
        prop.icalLinks instanceof Map
          ? Object.fromEntries(prop.icalLinks.entries())
          : prop.icalLinks ?? {};

      const baseUrl =
        process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
        "https://www.vacationsaga.com";

      return {
        propertyId: String(property._id),
        vsid: (property as { VSID?: string }).VSID,
        name:
          (property as { placeName?: string }).placeName ||
          (property as { propertyName?: string }).propertyName ||
          "Your property",
        commonId: (property as { commonId?: string }).commonId,
        icalLinks,
        icalSkippedAt: prop.ownerOnboarding?.icalSkippedAt ?? null,
        exportIcalUrl: `${baseUrl}/api/ical/${String(property._id)}`,
        steps,
        complete: isPropertyOnboardingComplete(
          user as Parameters<typeof isPropertyOnboardingComplete>[0],
          property as Parameters<typeof isPropertyOnboardingComplete>[1],
        ),
      };
    });

    return NextResponse.json({
      requiresOnboarding: ownerRequiresOnboarding(
        user as Parameters<typeof ownerRequiresOnboarding>[0],
        pending as Parameters<typeof ownerRequiresOnboarding>[1],
      ),
      ownerProfileCompletedAt: (user as { ownerProfileCompletedAt?: Date })
        .ownerProfileCompletedAt,
      properties: mapped,
    });
  } catch (error) {
    console.error("owner-onboarding status:", error);
    return NextResponse.json(
      { error: "Failed to load onboarding status" },
      { status: 500 },
    );
  }
}
