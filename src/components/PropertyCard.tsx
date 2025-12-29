"use client";

import Link from "next/link";
import { Route } from "next";
import React, { FC } from "react";

import { PropertyDataType } from "@/data/types";
import BtnLikeIcon from "@/components/BtnLikeIcon";
import PropertyGallerySlider from "@/components/PropertyGallerySlider";

// import axios from "axios";
// import Badge from "@/shared/Badge";
// import { Properties } from "@/app/page";
// import { useRouter } from "next/navigation";
// import StartRating from "@/components/StartRating";
// import SaleOffBadge from "@/components/SaleOffBadge";
// import { DEMO_STAY_LISTINGS } from "@/data/listings";
// import GallerySlider from "@/components/GallerySlider";
// import CustomGallerySlider from "@/components/CustomGallerySlider";

// const DEMO_DATA = DEMO_STAY_LISTINGS[0];

export interface extendedPropertyCard extends PropertyDataType {
  basePriceLongTerm?: number;
  availability?: string;
}

interface propertiesCardProps {
  key?: string | number;
  size?: string;
  className?: string;
  // data?: PropertyDataType;
  data?: extendedPropertyCard;
  index?: number;
}

const PropertyCard: FC<propertiesCardProps> = ({
  size = "default",
  className = "",
  data = "",
  index = 0,
}) => {
  const {
    _id,
    VSID,
    propertyType,
    city,
    postalCode,
    country,
    propertyCoverFileUrl,
    propertyPictureUrls,
    propertyImages,
    beds,
    basePrice,
    rentalType,
    basePriceLongTerm,
    availability
  } = data as extendedPropertyCard;

  const cardImages: string[] = [
    ...(propertyCoverFileUrl ? [propertyCoverFileUrl] : []),
    ...(propertyPictureUrls ? propertyPictureUrls : []),
    ...(propertyImages ? propertyImages : []),
  ].filter((item) => item != "");
  // const customHref = `/listing-stay-detail/${_id}`;
  // const customRoute = { pathname: "/listing-stay-detail/[id]", query: { id: _id } };

  const renderSliderGallery = () => {
    const arr: string[] = [
      ...(propertyCoverFileUrl ? [propertyCoverFileUrl] : []),
      ...(propertyPictureUrls ? propertyPictureUrls : []),
      ...(propertyImages ? propertyImages : []),
    ].filter((item) => item != "");

    return (
      // <Link
      //   href={{
      //     pathname: "/listing-stay-detail",
      //     query: { id: _id },
      //   }}
      //   key={index}
      // >
      <div className="relative w-full">
        <PropertyGallerySlider
          uniqueID={`StayCard2_${_id}`}
          ratioClass="aspect-w-12 aspect-h-11"
          galleryImgs={arr}
          imageClass="rounded-lg"
          // href={href}
          href={`/listing-stay-detail/${_id}` as Route}
          propertyPictureUrls={cardImages ? cardImages : propertyPictureUrls}
          id={_id}
        />
        <BtnLikeIcon isLiked={false} className="absolute right-3 top-3 z-[1]" />
        
        {/* Rented Badge */}
        {(availability === "Not Available" || availability === "not available") && (
          <div className="absolute top-0 left-0 z-[2] pointer-events-none overflow-hidden rounded-tl-lg">
            <div 
              className="relative bg-gradient-to-br from-orange-500 to-orange-600 transform -rotate-45 origin-top-left shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              style={{
                width: '180px',
                height: '32px',
                marginTop: '75px',
                marginLeft: '-50px'
              }}
            >
              {/* Border accent */}
              <div className="absolute inset-1.5 border border-white/30"></div>
              
              {/* Text */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span 
                  className="text-white font-black text-xs uppercase select-none" 
                  style={{ 
                    textShadow: '0 1px 4px rgba(0,0,0,0.3)',
                    letterSpacing: '0.15em',
                    fontWeight: 800
                  }}
                >
                  RENTED
                </span>
              </div>
              
              {/* Subtle gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
            </div>
          </div>
        )}
        
        {/* {saleOff && <SaleOffBadge className="absolute left-3 top-3" />} */}
        {/* {monthlyDiscount?.length && (
          <SaleOffBadge
            className="absolute left-3 top-3"
            discount={monthlyDiscount[0]}
          />
        )} */}
      </div>
      // </Link>
    );
  };

  const renderContent = () => {
    return (
      <Link
        // href={{
        //   pathname: "/listing-stay-detail",
        //   query: { id: _id },
        // }}
        href={`/listing-stay-detail/${_id}`}
        key={index}
      >
        <div
          className={size === "default" ? "mt-3 space-y-3" : "mt-2 space-y-2"}
        >
          <div className="space-y-2">
            <span className="text-sm text-neutral-500 dark:text-neutral-400">
              {/* {listingCategory.name} · {bedrooms} beds */}
              {(beds?.length && beds[0]) || beds} beds
            </span>
            <div className="flex items-center space-x-2">
              {/*               {isAds && <Badge name="ADS" color="green" />} */}
              <h2
                className={`font-semibold capitalize text-neutral-900 dark:text-white ${size === "default" ? "text-base" : "text-base"
                  }`}
              >
                {/* <span className="line-clamp-1">{title}</span> */}
                <span className="line-clamp-1">
                  {/*                   {placeName}, {propertyType} */}
                  VS ID - {VSID}, {propertyType}
                </span>
              </h2>
            </div>
            <div className="flex items-center text-neutral-500 dark:text-neutral-400 text-sm space-x-1.5">
              {size === "default" && (
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              )}
              {/* <span className="">{address}</span> */}
              <span className="">
                {postalCode} {city} {country}
              </span>
            </div>
          </div>
          <div className="w-14 border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex justify-between items-center">
            <span className="text-base font-semibold">
              {/* {price}€{(basePrice?.length && basePrice[0]) || basePrice} */}
              € {rentalType === "Long Term" ? `${basePriceLongTerm}/month` : `${basePrice}/night`}
            </span>
            {/* {!!reviewStart && (
              <StartRating reviewCount={reviewCount} point={reviewStart} />
            )} */}
          </div>
        </div>
      </Link>
    );
  };

  return (
    <div className={`nc-StayCard2 group relative ${className}`}>
      {renderSliderGallery()}
      <Link
        // href={{
        //   pathname: "/listing-stay-detail",
        //   query: { id: _id },
        // }}
        href={`/listing-stay-detail/${_id}`}
      >
        {renderContent()}
      </Link>
    </div>
  );
};

export default PropertyCard;
