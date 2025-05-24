const HotelSchema = new mongoose.Schema({
  ownerDetails: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    alternateContact: { type: String },
    aadharCard: { type: String },
    managerName: { type: String },
    managerContact: { type: String },
  },

  propertyDetails: {
    propertyName: { type: String, required: true },
    numberOfRooms: { type: Number, required: true },
    roomTypes: [
      {
        type: { type: String, required: true },
        quantity: { type: Number, required: true },
      }
    ],
    starRating: { type: Number, min: 1, max: 5 },
    amenities: [{ type: String }],
    propertyPhotos: [{ type: String }],
    coverPhotos: [{ type: String }],
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      country: { type: String },
      latitude: { type: Number },
      longitude: { type: Number },
    },
    checkInTime: { type: String },
    checkOutTime: { type: String },
    operatingSince: { type: Date },
    isAvailable: { type: Boolean, default: true },
    description: { type: String },
  },

  roomDetails: [
    {
      roomType: { type: String, required: true },
      bedType: { type: String },
      maxOccupancy: { type: Number, required: true },
      pricePerNight: { type: Number, required: true },
      roomPhotos: [{ type: String }],
      isAvailable: { type: Boolean, default: true },
    }
  ],

  pricing: {
    basePrice: { type: Number },
    seasonalPricing: [
      {
        season: { type: String },
        pricePerNight: { type: Number },
      }
    ],
    weekendPriceModifier: { type: Number }, 
  },

  policies: {
    cancellationPolicy: { type: String },
    houseRules: { type: String },
    allowPets: { type: Boolean, default: false },
    allowSmoking: { type: Boolean, default: false },
  },

  meta: {
    slug: { type: String },
    metaTitle: { type: String },
    metaDescription: { type: String },
  },

  adminFlags: {
    isFeatured: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    listedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Hotel", HotelSchema);
