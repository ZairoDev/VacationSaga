import { connectDb } from "@/helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import {
  expandEventsToDateKeys,
  parseIcalFromUrl,
  validateIcalUrl,
} from "@/lib/ical-sync";

connectDb();

export async function POST(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const { url } = await request.json();
    const validation = validateIcalUrl(url);
    if (!validation.valid || !validation.url) {
      return NextResponse.json(
        { error: validation.error ?? "Invalid calendar URL" },
        { status: 400 },
      );
    }

    const events = await parseIcalFromUrl(validation.url);
    const blockedDateKeys = Array.from(expandEventsToDateKeys(events));

    return NextResponse.json({
      message: "Calendar fetched successfully",
      eventCount: events.length,
      blockedNightCount: blockedDateKeys.length,
      blockedDateKeys,
      events: events.map((e) => ({
        start: e.start.toISOString(),
        end: e.end.toISOString(),
        summary: e.summary,
      })),
    });
  } catch (error) {
    console.error("ical fetch:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch calendar data",
      },
      { status: 400 },
    );
  }
}
