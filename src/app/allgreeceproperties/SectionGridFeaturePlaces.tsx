"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { FC, useState, useEffect } from "react";

import Loader from "@/helper/loader";
import { StayDataType } from "@/data/types";
import PropertyCard, { extendedPropertyCard } from "@/components/PropertyCard";

import TabFilters from "../(stay-listings)/TabFiltersTwo";

// Random Comments

export interface SectionGridFeaturePlacesProps {
  stayListings?: StayDataType[];
  gridClass?: string;
  cardType?: "card1" | "card2";
  value?: string;
}

const SectionGridFeaturePlaces: FC<SectionGridFeaturePlacesProps> = ({
  // stayListings,
  // value,
  gridClass = "",
  // cardType = "card2",
}) => {
  const [fetchedData, setFetchedData] = useState<extendedPropertyCard[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const params = useSearchParams();
  const country = params.get("place") || params.get("location") || "Greece";
  const pType = params.get("propertyType") || "";
  const recordPerPage = 12;

  const [rentalForm, setRentalForm] = useState<string>();
  const [rentalType, setRentalType] = useState<string>();
  const [propertyType, setPropertyType] = useState<string>();
  const [beds, setBeds] = useState<number>(0);
  const [bedrooms, setBedRooms] = useState<number>(0);
  const [bathrooms, setBathrooms] = useState<number>(0);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(999999);
  const [houserool, setHouseRool] = useState<string>();

  const fetchProperties = async (page: number = 1) => {
    console.log(page, currentPage);
    setLoading(true);
    setRentalType("");
    try {
      if (!pType) {
        console.log("without property type");
        const response = await axios.get(
          `/api/countryspecificproperties/${country}`,
          {
            params: {
              limit: recordPerPage,
              page,
            },
          }
        );
        if (page === 1) {
          setFetchedData(response.data);
        } else {
          setFetchedData((prevData) => [...prevData, ...response.data]);
        }
        setHasMore(response.data.length === recordPerPage);
      } else {
        console.log("with property type");
        const response = await axios.post(`/api/getSpecificPropertyType`, {
          propertyType: pType,
          country: country,
          params: {
            limit: recordPerPage,
            page: currentPage,
          },
        });
        console.log("response: ", page, response);
        console.log(fetchedData.length);
        if (page === 1) {
          setFetchedData(response.data);
        } else {
          setFetchedData((prevData) => [...prevData, ...response.data]);
        }
      }
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage, country]);

  useEffect(() => {
    setFetchedData([]);
    fetchProperties(currentPage);
  }, [pType]);

  const handleFilters = async () => {
    setLoading(true);
    setCurrentPage(1);
    console.log(
      rentalForm,
      propertyType,
      beds,
      bedrooms,
      bathrooms,
      minPrice,
      maxPrice,
      country,
      rentalType,
      houserool
    );
    try {
      const response = await axios.post("api/filters", {
        rentalForm,
        propertyType,
        beds,
        bedrooms,
        bathrooms,
        minPrice,
        maxPrice,
        country,
        rentalType,
        houserool,
      });
      // console.log("response of filters: ", response.data)
      setFetchedData(response.data);
      setHasMore(response.data.length === recordPerPage);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRentalType = (type: string) => {
    setRentalType(type);
    console.log(rentalType);
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div>
      <div className="nc-SectionGridFeaturePlaces relative">
        <div className="flex items-center mb-10 justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between">
              <div>
                <TabFilters
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  setBathrooms={setBathrooms}
                  setBedRooms={setBedRooms}
                  setBeds={setBeds}
                  setPropertyType={setPropertyType}
                  setRentalForm={setRentalForm}
                  setRentalType={setRentalType}
                  setHouseRool={setHouseRool}
                />
              </div>
              <div className="flex gap-x-2">
                <button
                  className="px-4 bg-primary-6000 text-sm rounded-full py-2"
                  onClick={handleFilters}
                >
                  Apply
                </button>
                <button
                  className="px-4 py-2 text-sm rounded-full border"
                  onClick={() => fetchProperties(1)}
                >
                  Clear
                </button>
              </div>
            </div>
            <div className="flex gap-x-2 mt-8">
              <div className="flex gap-x-2">
                <div className="flex">
                  <button
                    onClick={() => handleRentalType("Long Term")}
                    className={`px-4 text-sm py-2 rounded-l-full ${rentalType === "Long Term"
                      ? "bg-primary-6000 text-white"
                      : "border"
                      }`}
                  >
                    Long Term
                  </button>
                  <button
                    onClick={() => handleRentalType("Short Term")}
                    className={`px-4 text-sm py-2 rounded-r-full ${rentalType === "Short Term"
                      ? "bg-primary-6000 text-white"
                      : "border"
                      }`}
                  >
                    Short Term
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center w-full h-full">
            <p className="text-lg text-center flex items-center">
              Things are getting ready...
              <Loader />
            </p>
          </div>
        )}

        <div
          className={`grid mt-8 mb-3 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass}`}
        >
          {loading && fetchedData.length === 0 ? (
            [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
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
          ) : fetchedData?.length === 0 ? (
            <div className="flex items-center justify-center w-full h-full">
              <p className="text-2xl text-center">No data available</p>
            </div>
          ) : (
            fetchedData?.map((item, index) => (
              <PropertyCard key={index} data={item} />
            ))
          )}
        </div>

        {hasMore && (
          <div className="flex justify-center mt-6">
            <button
              className="px-6 py-3 text-sm rounded-full border"
              onClick={loadMore}
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

export default SectionGridFeaturePlaces;
