import mongoose from "mongoose";

const landingPageFormSchema = new mongoose.Schema({
  name: { type: String, required: true, default: "" },
  phone: { type: Number, required: true, default: 0 },
  email: { type: String, required: true },
  budget: { type: Number, required: true, default: 0 },
  budgetType: { type: String, required: true, default: "night" },
  duration: { type: Object, required: true },
  destination: { type: String, required: true, default: "" },
  createdAt: { type: Date, default: Date.now },
  phoneOTP: { type: Number },
  emailOTP: { type: Number },
});

export default mongoose.models.landingPageForm ||
  mongoose.model("landingPageForm", landingPageFormSchema);
