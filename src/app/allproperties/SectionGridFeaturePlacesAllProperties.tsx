"use client";
import React, { FC, ReactNode, useState, useEffect, useRef } from "react";
import axios from "axios";
import { PropertyDataType, StayDataType } from "@/data/types";
import HeaderFilter from "@/components/HeaderFilter";
import PropertyCard from "@/components/PropertyCard";
import { FaToggleOn } from "react-icons/fa";
import { FaToggleOff } from "react-icons/fa";
import { PiToggleLeftFill } from "react-icons/pi";
import { PiToggleRightFill } from "react-icons/pi";
import StaySearchForm from "../(client-components)/(HeroSearchForm)/(stay-search-form)/StaySearchForm";

export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  heading?: ReactNode;
  subHeading?: ReactNode;
  headingIsCenter?: boolean;
  tabs?: string[];
  cardType?: "card1" | "card2";
}

const SectionGridFeaturePlacesAllProperties: FC<
  SectionGridFeaturePlacesProps
> = ({
  stayListings,
  gridClass = "",
  heading = "Places to stay",
  subHeading = "Popular places to stay that Vacation Saga recommends for you",
  headingIsCenter,
  tabs = ["Greece", "Italy", "Romania", "Spain"],
  cardType = "card2",
}) => {
  const [fetchedData, setFetchedData] = useState<PropertyDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [initialLoad, setInitialLoad] = useState(true);
  const [rentalType, setRentalType] = useState<string | null>("Short Term"); // null represents "All Properties"
  const filterChanged = useRef(false);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/allproperties?limit=12&page=${page}${
          rentalType ? `&rentalType=${rentalType}` : ""
        }`
      );
      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        setFetchedData((prevData) =>
          page === 1 ? response.data : [...prevData, ...response.data]
        );
        setHasMore(true);
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialLoad) {
      window.scrollTo(0, 0);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    if (filterChanged.current) {
      setPage(1);
      setHasMore(true);
      filterChanged.current = false;
    }
    fetchProperties();
  }, [page, rentalType]);

  const handleToggle = () => {
    const newRentalType =
      rentalType === "Long Term" ? "Short Term" : "Long Term";
    setRentalType(newRentalType);
    setPage(1);
    setFetchedData([]);
    filterChanged.current = true;
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const renderCard = (stay: PropertyDataType, index: number) => (
    <PropertyCard key={stay._id} data={stay} index={index} />
  );

  return (
    <div className="max-w-7xl mx-auto w-full p-4">
      <div className="nc-SectionGridFeaturePlaces relative">
        <HeaderFilter
          tabActive={"New York"}
          subHeading={subHeading}
          tabs={tabs}
          heading={heading}
        />

        <div className="w-full -mt-20 mb-4 flex flex-col items-center">
          <StaySearchForm />

          <div className=" flex items-center gap-x-2">
            <span className="text-xl">Tap to Longterm</span>
            <button
              onClick={handleToggle}
              className={`text-4xl flex items-center justify-center gap-x-2s ${
                rentalType === "Long Term" ? "" : ""
              }`}
            >
              {/* {rentalType === "Long Term" ? <FaToggleOn /> : <FaToggleOff />} */}
              {rentalType === "Long Term" ? (
                <PiToggleRightFill className=" text-5xl text-primary-6000" />
              ) : (
                <PiToggleLeftFill className=" text-5xl text-primary-6000" />
              )}
            </button>
          </div>
        </div>
        <div
          className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
        >
          {loading && fetchedData.length === 0
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="flex flex-col gap-y-2">
                  <div className="w-full h-64 bg-primary-50 rounded-lg animate-pulse"></div>
                  <div className="w-56 rounded-lg h-3 bg-slate-300 animate-pulse mt-2"></div>
                  <div className="w-40 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                  <div className="flex items-center justify-between">
                    <div className="w-32 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                    <div className="w-10 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                  </div>
                </div>
              ))
            : fetchedData.map((stay, index) => renderCard(stay, index))}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-8">
            <button
              onClick={handleLoadMore}
              className="px-6 py-3 rounded-full  border "
              disabled={loading}
            >
              {loading ? "Loading..." : "Load More"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlacesAllProperties;
