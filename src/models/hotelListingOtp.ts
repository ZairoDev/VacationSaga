import mongoose, { Schema, Document, models, model } from "mongoose";

const hotelListingOtpSchema = new Schema({
  phone: { type: String, required: true, default: "" },
  otp: { type: String, required: true, default: "" },
  createdAt: { type: Date, default: Date.now, expires: "10m" }, // Document will be removed after 10 minutes
});
export default models.hotelListingOtp ||
  model<Document>("hotelListingOtp", hotelListingOtpSchema);
