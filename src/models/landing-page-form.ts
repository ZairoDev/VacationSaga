import mongoose from "mongoose";

const landingPageFormSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true }, 
  email: { type: String, required: true, unique: true },
  budget: { type: Number, required: true },
  destination: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.landingPageForm || mongoose.model("landingPageForm", landingPageFormSchema);
