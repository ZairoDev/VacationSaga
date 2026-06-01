"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";

import { TaxonomyType } from "@/data/types";
import BgGlassmorphism from "@/components/BgGlassmorphism";
import SectionHowItWork from "@/components/SectionHowItWork";
import SectionClientSay from "@/components/SectionClientSay";
import BackgroundSection from "@/components/BackgroundSection";
import SectionHero from "@/app/(server-components)/SectionHero";
import SectionOurFeatures from "@/components/SectionOurFeatures";
import SectionGridAuthorBox from "@/components/SectionGridAuthorBox";
import SectionBecomeAnAuthor from "@/components/SectionBecomeAnAuthor";
import SectionGridCategoryBox from "@/components/SectionGridCategoryBox";
import SectionGridFeaturePlaces from "@/components/SectionGridFeaturePlaces";
import SectionSliderNewCategories from "@/components/SectionSliderNewCategories";

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay",
    name: "Athens",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/14811125/pexels-photo-14811125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2",
    href: "/listing-stay",
    name: "Chania",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/31921984/pexels-photo-31921984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "3",
    href: "/listing-stay",
    name: "Thessaloniki",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/3534080/pexels-photo-3534080.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "4",
    href: "/listing-stay",
    name: "Milan",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/28821762/pexels-photo-28821762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "5",
    href: "/listing-stay",
    name: "Rome",
    taxonomy: "category",
    count: 188288,
    thumbnail:
      "https://images.pexels.com/photos/1701595/pexels-photo-1701595.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  
];



export interface Properties {
  _id?: string;
  userId?: string;

  VSID?: string;
  isInstantBooking?: boolean;
  rentalType?: string;
  propertyType?: string;
  placeName?: string;
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

  pricePerDay?: number[][][];
  icalLinks?: object;

  generalAmenities?: object;
  otherAmenities?: object;
  safeAmenities?: object;

  smoking?: string;
  pet?: string;
  party?: string;
  cooking?: string;
  additionalRules?: string[];

  reviews?: string[];
  newReviews?: string;

  propertyCoverFileUrl?: string;
  propertyPictureUrls?: string[];
  portionCoverFileUrls?: string[];
  portionPictureUrls?: string[][];

  night?: number[];
  time?: number[];
  datesPerPortion?: number[][];

  isLive?: boolean;
}

function PageHome() {
  const [GreeceProperties, setGreeceProperties] = useState<Properties[]>();

  const fetchProperties = async () => {
    const response = await axios.get("/api/allproperties");
    setGreeceProperties(response?.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "greeceTotalProperties",
      JSON.stringify(GreeceProperties?.length)
    );
  }, [GreeceProperties]);

  return (
    <main className="nc-PageHome relative overflow-hidden">
      {/* GLASSMOPHIN */}
      <BgGlassmorphism />

      <div className="container relative space-y-24 mb-24 lg:space-y-28 lg:mb-28">
        {/* SECTION HERO */}
        <SectionHero className="lg:pb-16" />

        {/* SECTION 1 */}
        <div className="-mt- -mb-20">
          <SectionSliderNewCategories categories={DEMO_CATS} />
        </div>

        {/* <SectionOurFeatures /> */}

        <SectionGridFeaturePlaces cardType="card2" />

        <SectionHowItWork />

  

        <div className="relative py-16">
        
          <SectionGridAuthorBox />
        </div>

        <SectionGridCategoryBox />
 
          <SectionClientSay />
          <SectionBecomeAnAuthor />

      </div>
    </main>
  );
}

export default PageHome;
