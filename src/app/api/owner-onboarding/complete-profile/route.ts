import { NextRequest, NextResponse } from "next/server";
import { connectDb } from "@/helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import Users from "@/models/user";
import {
  applyOwnerProfileCompletionState,
  validateOwnerProfilePayload,
} from "@/lib/owner-profile";

connectDb();

export async function POST(req: NextRequest) {
  try {
    const userId = getDataFromToken(req);
    if (!userId) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = await req.json();
    const user = await Users.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const validation = validateOwnerProfilePayload(body);
    if (!validation.valid || !validation.normalized) {
      return NextResponse.json(
        { error: "Please complete all required fields", errors: validation.errors },
        { status: 400 },
      );
    }

    const { normalized } = validation;
    user.name = normalized.name;
    user.phone = normalized.phone;
    user.address = normalized.address;
    user.nationality = normalized.nationality;
    user.spokenLanguage = normalized.spokenLanguage;
    user.bankDetails = normalized.bankDetails;
    if (body.gender) user.gender = String(body.gender).trim();

    applyOwnerProfileCompletionState(user);

    await user.save();

    return NextResponse.json({
      success: true,
      isProfileComplete: user.isProfileComplete,
      ownerProfileCompletedAt: user.ownerProfileCompletedAt,
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone,
        address: user.address,
        nationality: user.nationality,
        bankDetails: user.bankDetails,
        spokenLanguage: user.spokenLanguage,
        ownerProfileCompletedAt: user.ownerProfileCompletedAt,
      },
    });
  } catch (error) {
    console.error("complete-profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 },
    );
  }
}
