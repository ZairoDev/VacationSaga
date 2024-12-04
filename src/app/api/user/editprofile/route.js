import { connectDb } from "../../../../helper/db";
import User from "../../../../models/user";
import { NextResponse } from "next/server";

connectDb();

export async function PUT(request) {
  const { _id, ...body } = await request.json();

  if (!_id) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }
  try {
    const updateData = {};
    if (body.profilePic) updateData.profilePic = body.profilePic;
    if (body.nationality) updateData.nationality = body.nationality;
    if (body.name) updateData.name = body.name;
    if (body.profilePic) updateData.profilePic = body.profilePic;
    if (body.gender) updateData.gender = body.gender;
    if (body.spokenLanguage) updateData.spokenLanguage = body.spokenLanguage;
    if (body.bankDetails) updateData.bankDetails = body.bankDetails;
    if (body.phone) updateData.phone = body.phone;
    if (body.address) updateData.address = body.address;

    const user = await User.findOneAndUpdate(
      { _id },
      { $set: updateData },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json({
      message: "User profile updated successfully",
      success: true,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
