import { connectDb } from "../../../helper/db";
import { NextResponse } from "next/server";
import { Properties } from "@/models/property";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Returns real property counts for given destination names.
// Query:
// - names: comma-separated list of destination names
// - match: "country" | "city" | "either" (default: "either")
//
// Response:
// { counts: { [name: string]: number } }
export async function GET(req) {
  await connectDb();

  const { searchParams } = new URL(req.url);
  const namesParam = (searchParams.get("names") || "").trim();
  const match = (searchParams.get("match") || "either").toLowerCase();

  const names = namesParam
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean)
    .slice(0, 50);

  if (!names.length) {
    return NextResponse.json({ counts: {} });
  }

  try {
    const counts = {};

    // Sequential queries keep this simple and reliable.
    for (const name of names) {
      const regex = new RegExp(`^${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`, "i");

      let filter = { isLive: true };
      if (match === "country") {
        filter = { ...filter, country: regex };
      } else if (match === "city") {
        filter = { ...filter, city: regex };
      } else {
        filter = { ...filter, $or: [{ country: regex }, { city: regex }] };
      }

      // Properties collection is used by /api/allproperties already.
      // This produces the "real" count in DB for that destination.
      // eslint-disable-next-line no-await-in-loop
      counts[name] = await Properties.countDocuments(filter);
    }

    return NextResponse.json({ counts });
  } catch (error) {
    console.error("Error fetching destination counts:", error);
    return NextResponse.json(
      { message: "Failed to fetch destination counts" },
      { status: 500 }
    );
  }
}

