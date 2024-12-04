"use client";
import React, { FC, ReactNode, useEffect, useState } from "react";
import { DEMO_STAY_LISTINGS } from "@/data/listings";
import { StayDataType } from "@/data/types";
import ButtonPrimary from "@/shared/ButtonPrimary";
import HeaderFilter from "./HeaderFilter";
import Link from "next/link";
import { Properties } from "@/app/page";
import axios from "axios";
import PropertyCard from "./PropertyCard";
import { PropertyDataType } from "@/data/types";

// OTHER DEMO WILL PASS PROPS
const DEMO_DATA: StayDataType[] = DEMO_STAY_LISTINGS.filter((_, i) => i < 8);

//
export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  stayListings = DEMO_DATA,
  gridClass = "",
  heading = "Featured places to stay",
  subHeading = "Popular places to stay that Vacation Saga recommends for you",
  headingIsCenter,
  tabs = ["Greece", "Italy", "Romania", "Spain"],
  cardType = "card2",
}) => {
  const renderCard = (stay: PropertyDataType, index: number) => {
    let CardName = PropertyCard;
    switch (cardType) {
      case "card1":
        CardName = PropertyCard;
        break;
      case "card2":
        CardName = PropertyCard;
        break;
      default:
        CardName = PropertyCard;
    }
    return <CardName key={stay.id} data={stay} index={index} />;
  };

  const [allProperties, setAllProperties] = useState<Properties[]>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // console.log("loading: ", loading);
    const getAllProperties = async () => {
      try{
        const response = await axios.get("/api/homePageProperties", {
          params: {
            limit: 8,
          },
        });
        if (response.data) {
          setLoading(false);
          setAllProperties(response.data);
        }
      }catch(err:any){
        console.log("Error in fetching properties: ", err);
      }
    };

    getAllProperties();
    // console.log("loading: ", loading);
  }, []);

  return (
    <div className="nc-SectionGridFeaturePlaces relative">
      <HeaderFilter
        tabActive={"New York"}
        subHeading={subHeading}
        tabs={tabs}
        heading={heading}
      />
      <div
        className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
      >
        {/* {stayListings.map((stay, index) => renderCard(stay, index))} */}
        {/* { loading ? 
            [1, 2, 3, 4].map((n) => (
            <div
              key={n}
              className="w-full h-64 bg-primary-50 rounded-lg animate-pulse"
            ></div>
         : (
          allProperties?.map((stay, index) => renderCard(stay, index))
        )} */}
        {loading
          ? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div key={n}>
                <div className="flex flex-col gap-y-2">
                  <div
                    key={n}
                    className="w-full h-64 bg-primary-50 rounded-lg animate-pulse"
                  ></div>
                  <div className="w-56 rounded-lg h-3 bg-slate-300 animate-pulse mt-2"></div>
                  <div className="w-40 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                  <div className="flex items-center justify-between">
                    <div className="w-32 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                    <div className="w-10 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                  </div>
                </div>
              </div>
            ))
          : allProperties?.map((stay, index) => renderCard(stay, index))}
      </div>
      <div className="flex mt-16 justify-center items-center">
        <Link href="/allproperties">
          <ButtonPrimary>Show me more</ButtonPrimary>
        </Link>
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
