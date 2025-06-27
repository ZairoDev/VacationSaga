import { ObjectId } from "mongodb";
import { StaticImageData } from "next/image";

import { Route } from "@/routers/types";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: Route<string> | string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: Route<string> | string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string | StaticImageData;
  bgImage?: string | StaticImageData;
  email?: string;
  count: number;
  desc: string;
  // jobName: string;
  href: Route<string>;
  starRating?: number;
}

export interface PostDataType {
  _id?: string;
  banner?: string;
  maintext?: string;
  content?: string;

  tags?: string[];
  totalWords?: number;
  createdAt?: string;
  updatedAt?: string;

  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  categories: TaxonomyType[];
  title: string;
  featuredImage: StaticImageData | string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  bedrooms: number;
  bathrooms: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

export interface BookingDataType {
  _id: ObjectId;
  propertyId: ObjectId;
  ownerId: ObjectId;
  travellerId: ObjectId;
  startDate: Date;
  endDate: Date;
  guests: number;
  bookingStatus?: string;
}

export interface TokenDataType {
  _id: string;
  name: string;
  email: string;
  role: "Owner" | "Traveller";
  iat?: number;
  exp?: number;
}

export interface PropertyDataType {
  _id?: string;
  id?: string;
  userId?: string;
  VSID?: string;

  propertyType?: string;
  placeName?: string;
  rentalType?: string;
  rentalForm?: string;
  numberOfPortions?: number;

  street?: string;
  postalCode?: string;
  city?: string;
  state?: string;
  country?: string;
  center?: object;

  portionName?: string[];
  portionSize?: number[];
  guests?: number[];
  bedrooms?: number[];
  beds?: number[];
  bathroom?: number[];
  kitchen?: number[];
  childrenAge?: number[];

  basePrice?: number[];
  weekendPrice?: number[];
  monthlyDiscount?: number[];
  currency?: string;

  generalAmenities?: object;
  otherAmenities?: object;
  safeAmenities?: object;

  smoking?: string;
  pet?: string;
  party?: string;
  cooking?: string;
  additionalRules?: string[];

  reviews?: string[];

  propertyCoverFileUrl?: string;
  propertyPictureUrls?: string[];
  portionCoverFileUrls?: string[];
  portionPictureUrls?: string[][];
  propertyImages?: string[];

  night?: number[];
  time?: number[];
  datesPerPortion?: number[][];

  isLive?: boolean;
}

interface nearbyLocationInterface {
  nearbyLocationName: string[];
  nearbyLocationDistance: number[];
  nearbyLocationTag: string[];
  nearbyLocationUrl: string[];
}

// properties data type
export interface PropertiesDataType {
  _id: string;
  VSID: string;
  commonId: string;
  email: string;
  userID: string;
  portionNo: string;
  rentalType: string;
  isInstantBooking: boolean;
  propertyType: string;
  rentalForm: string;
  propertyName: string;
  placeName: string;
  newPlaceName: string;
  street: string;
  postalCode: string;
  city: string;
  state: string;
  country: string;
  center: object;
  size: number;
  guests: number;
  bedrooms: number;
  beds: number;
  bathroom: number;
  kitchen: number;
  childrenAge: number;
  basePrice: number;
  weekendPrice: number;
  weeklyDiscount: number;
  pricePerDay: number[][];
  basePriceLongTerm: number;
  monthlyDiscount: number;
  currency: string;
  icalLinks: object;
  generalAmenities: object;
  otherAmenities: object;
  safeAmenities: object;
  smoking: string;
  pet: string;
  party: string;
  cooking: string;
  additionalRules: string[];
  reviews: string;
  newReviews: string;
  propertyImages: string[];
  propertyCoverFileUrl: string;
  propertyPictureUrls: string[];
  night: number[];
  time: number[];
  datesPerPortion: [];
  area?: string;
  subarea?: string;
  neighbourhood?: string;
  floor?: string;
  isTopFloor?: boolean;
  orientation?: string;
  levels?: number;
  zones?: string;
  propertyStyle?: string;
  constructionYear?: number;
  isSuitableForStudents?: boolean;
  monthlyExpenses?: number;
  heatingType?: string;
  heatingMedium?: string;
  energyClass?: string;
  nearbyLocations: nearbyLocationInterface;
  hostedFrom?: string;
  hostedBy?: string;
  listedOn?: string[];
  lastUpdatedBy?: string[];
  lastUpdates?: string[];
  isLive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface QuickListingInterface {
  QID: string;
  ownerName: string;
  ownerMobile: string;
  propertyName: string;
  propertyImages: string[];
  description: string;
  basePrice: number;
  address: string;
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

export interface UserDataType {
  _id: string;
  name: string;
  email: string;
  profilePic: string;
  nationality: string;
  gender: string;
  spokenLanguage: string;
  bankDetails: object;
  phone: string;
  myRequests: string[];
  myBookings?: string[];
  myUpcommingRequests: string[];
  declinedRequests: string[];
  address: string;
  role: string;
  isVerified: boolean;
  Payment?: object;
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: Route<string>;
  title: string;
  featuredImage: StaticImageData | string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: (StaticImageData | string)[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}
