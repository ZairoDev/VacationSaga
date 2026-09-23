import Razorpay from "razorpay";
import { NextResponse } from "next/server";

function getRazorpay() {
  const key_id = process.env.RAZORPAY_API_KEY;
  const key_secret = process.env.RAZORPAY_APT_SECRET;
  if (!key_id || !key_secret) {
    throw new Error("Razorpay credentials are not configured");
  }
  return new Razorpay({ key_id, key_secret });
}

export async function POST(request) {
  const { amount, currency } = await request.json();
  console.log(amount, currency);
  const options = {
    amount: amount,
    currency: currency,
    receipt: "rcp1",
  };
  const razorpay = getRazorpay();
  const order = await razorpay.orders.create(options);
  console.log("order:", order);
  return NextResponse.json({ orderId: order.id }, { status: 200 });
}
