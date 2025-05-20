import mongoose, { Schema, Document } from "mongoose"

export interface IHotel extends Document {
  hotelName: string
  hotelType: string
  starRating?: number
  description: string
  contactNumber: string
  email: string
  website?: string
  ownerName: string

  address: {
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    country: string
    pincode: string
    latitude?: number
    longitude?: number
  }

  coverImage: string
  galleryImages?: string[]
  videoUrl?: string

  numberOfRooms: number

  roomTypes: {
    type: string
    pricePerNight: number
    maxOccupancy: number
    amenities: string[]
    refundable: boolean
    extraBedPrice?: number
    images?: string[]
  }[]

  amenities: string[]
  checkInTime: string
  checkOutTime: string
  paymentOptions?: string[]
  languagesSpoken?: string[]
  petFriendly?: boolean

  cancellationPolicy: string
  houseRules: string
  ageRestriction?: number
  acceptsForeignGuests?: boolean

  listedByUserId: mongoose.Types.ObjectId
  isVerified: boolean
  isLive: boolean
  createdAt: Date
  updatedAt: Date
}

const HotelSchema: Schema = new Schema<IHotel>(
  {
    hotelName: { type: String, required: true },
    hotelType: { type: String, required: true },
    starRating: { type: Number },

    description: { type: String, required: true },
    contactNumber: { type: String, required: true },
    email: { type: String, required: true },
    website: { type: String },
    ownerName: { type: String, required: true },

    address: {
      addressLine1: { type: String, required: true },
      addressLine2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      country: { type: String, required: true },
      pincode: { type: String, required: true },
      latitude: { type: Number },
      longitude: { type: Number },
    },

    coverImage: { type: String, required: true },
    galleryImages: [{ type: String }],
    videoUrl: { type: String },

    numberOfRooms: { type: Number, required: true },

    roomTypes: [
      {
        type: { type: String, required: true },
        pricePerNight: { type: Number, required: true },
        maxOccupancy: { type: Number, required: true },
        amenities: [{ type: String, required: true }],
        refundable: { type: Boolean, required: true },
        extraBedPrice: { type: Number },
        images: [{ type: String }],
      },
    ],

    amenities: [{ type: String, required: true }],
    checkInTime: { type: String, required: true },
    checkOutTime: { type: String, required: true },
    paymentOptions: [{ type: String }],
    languagesSpoken: [{ type: String }],
    petFriendly: { type: Boolean },

    cancellationPolicy: { type: String, required: true },
    houseRules: { type: String, required: true },
    ageRestriction: { type: Number },
    acceptsForeignGuests: { type: Boolean },

    // listedByUserId: { type: mongoose.Types.ObjectId, required: true, ref: "Users" },
    isVerified: { type: Boolean, default: false },
    isLive: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
)

export default mongoose.models.Hotel || mongoose.model<IHotel>("Hotel", HotelSchema)
