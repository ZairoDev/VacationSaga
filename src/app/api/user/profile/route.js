import { connectDb } from "../../../../helper/db";
import { getDataFromToken } from "@/helper/getDataFromToken";
import User from "../../../../models/user";
import { NextResponse } from "next/server";
import Travellers from "@/models/traveller";

connectDb();

export async function POST(request) {
  const userId = await getDataFromToken(request);
  const user = await User.findOne({ _id: userId }).select("-password");

  if (!user) {
    const traveller = await Travellers.findOne({ _id: userId }).select("-password");
    if (traveller) {
      return NextResponse.json(
        { message: "User found", data: traveller },
        { status: 200 }
      );
    }
  }

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    message: "User found ",
    data: user,
  });
}
