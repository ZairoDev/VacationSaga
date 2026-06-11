import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import { Properties } from "@/models/property";
import { NextResponse } from "next/server";
import {
  applyOwnerProfileCompletionState,
  normalizeBankDetails,
  validateOwnerProfilePayload,
} from "@/lib/owner-profile";

connectDb();

export async function PUT(request) {
  const { _id, bankdetails, bankDetails: bankDetailsBody, ...body } =
    await request.json();

  if (!_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const user = await User.findById(_id);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const bankRaw = bankDetailsBody ?? bankdetails ?? body.bankDetails;

    const payload = {
      name: body.name ?? user.name,
      phone: body.phone ?? user.phone,
      address: body.address ?? user.address,
      nationality: body.nationality ?? user.nationality,
      spokenLanguage: body.spokenLanguage ?? user.spokenLanguage,
      bankDetails: bankRaw ?? user.bankDetails,
    };

    if (body.profilePic) user.profilePic = body.profilePic;
    if (body.gender) user.gender = body.gender;

    const hasShortTermDraft = await Properties.exists({
      userId: String(_id),
      listingSource: "short_term_owner_sheet",
      isLive: { $ne: true },
    });

    if (hasShortTermDraft) {
      const validation = validateOwnerProfilePayload(payload);
      if (!validation.valid || !validation.normalized) {
        return NextResponse.json(
          {
            error: "Please complete all required profile fields",
            errors: validation.errors,
          },
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
      applyOwnerProfileCompletionState(user);
    } else {
      if (body.name) user.name = body.name;
      if (body.phone) user.phone = body.phone;
      if (body.address) user.address = body.address;
      if (body.nationality) user.nationality = body.nationality;
      if (body.spokenLanguage) user.spokenLanguage = body.spokenLanguage;
      const bank = normalizeBankDetails(bankRaw);
      if (bank) user.bankDetails = bank;
    }

    await user.save();

    return NextResponse.json({
      message: "User profile updated successfully",
      success: true,
      ownerProfileCompletedAt: user.ownerProfileCompletedAt,
      isProfileComplete: user.isProfileComplete,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
