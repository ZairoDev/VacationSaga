import Razorpay from "razorpay";
import { NextRequest, NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_APT_SECRET,
});

export async function POST(request) {
  const { amount, currency } = await request.json();
  console.log(amount, currency);
  var options = {
    amount: amount,
    currency: currency,
    receipt: "rcp1",
  };
  const order = await razorpay.orders.create(options);
  console.log("order:", order);
  return NextResponse.json({ orderId: order.id }, { status: 200 });
}
