import { NextRequest, NextResponse } from "next/server";
import CryptoJS from "crypto-js";

export async function POST(request) {
  const { amount } = await request.json();
  console.log(amount);

  try {
    const encryptedAmount = CryptoJS.AES.encrypt(
      amount.toString(),
      process.env.PAYMENT_TOKEN_SECRET
    ).toString();
    console.log(encryptedAmount);
    return NextResponse.json(
      { encryptedAmount: encryptedAmount },
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json({ status: 400 });
  }
}
