"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { FC, useState, useEffect, useCallback, useRef } from "react";

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
  const [filterPage, setFilterPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const params = useSearchParams();
  const country = params.get("place") || params.get("location") || "Greece";
  const pType = params.get("propertyType") || "";
  const urlRentalType = params.get("rentalType");
  const urlGuests = parseInt(params.get("guests") || "1", 10) || 1;
  const urlBedrooms = parseInt(params.get("bedrooms") || "0", 10) || 0;
  const urlBathrooms = parseInt(params.get("bathrooms") || "0", 10) || 0;
  const recordPerPage = 12;

  const [rentalForm, setRentalForm] = useState<string>("");
  const [rentalType, setRentalType] = useState<string>(urlRentalType || "Short Term");
  const [propertyType, setPropertyType] = useState<string>(pType); // seed from URL
  const [beds, setBeds] = useState<number>(0);
  const [bedrooms, setBedRooms] = useState<number>(urlBedrooms);
  const [bathrooms, setBathrooms] = useState<number>(urlBathrooms);
  const [guests, setGuests] = useState<number>(urlGuests);
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(999999);
  const [houserool, setHouseRool] = useState<string>("");
  const [filtersApplied, setFiltersApplied] = useState(false);
  const [filterUiKey, setFilterUiKey] = useState(0);
  const isInitialMount = useRef(true);
  const skipNextFilterEffect = useRef(false);

  const fetchProperties = async (
    page: number = 1,
    overrides?: { guests?: number; bedrooms?: number; bathrooms?: number }
  ) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/countryspecificproperties/${country}`,
        {
          params: {
            limit: recordPerPage,
            page,
            guests: overrides?.guests ?? guests,
            bedrooms: overrides?.bedrooms ?? bedrooms,
            bathrooms: overrides?.bathrooms ?? bathrooms,
          },
        }
      );
      if (page === 1) {
        setFetchedData(response.data);
      } else {
        setFetchedData((prevData) => [...prevData, ...response.data]);
      }
      setHasMore(response.data.length === recordPerPage);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProperties(currentPage);
  }, [currentPage, country]);

  // Update rentalType when URL param changes
  useEffect(() => {
    if (urlRentalType && urlRentalType !== rentalType) {
      setRentalType(urlRentalType);
      setFiltersApplied(true);
    }
  }, [urlRentalType]);

  const handleFilters = useCallback(async (page: number = 1, append: boolean = false) => {
    setLoading(true);
    if (!append) {
      setFilterPage(1);
      setCurrentPage(1);
    }
    try {
      const response = await axios.post("/api/filters", {
        rentalForm,
        propertyType,
        beds,
        bedrooms,
        bathrooms,
        guests,
        minPrice,
        maxPrice,
        country,
        rentalType: rentalType || "Short Term",
        houserool,
        page: page,
        limit: recordPerPage,
      });
      
      if (append) {
        setFetchedData((prevData) => [...prevData, ...response.data]);
      } else {
        setFetchedData(response.data);
      }
      
      setHasMore(response.data.length === recordPerPage);
      setFiltersApplied(true);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setLoading(false);
    }
  }, [rentalForm, propertyType, beds, bedrooms, bathrooms, guests, minPrice, maxPrice, country, rentalType, houserool, recordPerPage]);

  const handleRentalType = (type: string) => {
    setRentalType(type);
    setFiltersApplied(true);
  };

  const clearFilters = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();

    // Skip the auto-apply effect once while we reset + refetch.
    skipNextFilterEffect.current = true;

    setRentalForm("");
    setRentalType("Short Term");
    setPropertyType("");
    setBeds(0);
    setBedRooms(0);
    setBathrooms(0);
    setGuests(1);
    setMinPrice(0);
    setMaxPrice(999999);
    setHouseRool("");
    setFiltersApplied(false);
    setCurrentPage(1);
    setFilterPage(1);
    // Remount filter chips so they show 0 / defaults.
    setFilterUiKey((k) => k + 1);

    // Update the address bar WITHOUT Next.js navigation.
    // router.replace() was causing a soft nav that could hit auth middleware → /login.
    if (typeof window !== "undefined") {
      const next = new URLSearchParams();
      const place = params.get("place") || params.get("location");
      if (place) next.set("place", place);
      const qs = next.toString();
      const url = qs
        ? `${window.location.pathname}?${qs}`
        : window.location.pathname;
      window.history.replaceState(window.history.state, "", url);
    }

    fetchProperties(1, { guests: 1, bedrooms: 0, bathrooms: 0 });
  };

  // Auto-apply filters when they change (skip initial mount unless params from URL)
  useEffect(() => {
    if (skipNextFilterEffect.current) {
      skipNextFilterEffect.current = false;
      return;
    }

    if (isInitialMount.current) {
      isInitialMount.current = false;
      // If any search params came from URL, go straight to filter path
      if (urlRentalType || pType || urlBedrooms > 0 || urlBathrooms > 0 || urlGuests > 1) {
        const timeoutId = setTimeout(() => {
          handleFilters();
        }, 300);
        return () => clearTimeout(timeoutId);
      }
      return;
    }

    const timeoutId = setTimeout(() => {
      handleFilters();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [rentalType, rentalForm, propertyType, beds, bedrooms, bathrooms, guests, minPrice, maxPrice, houserool, handleFilters]);

  const loadMore = () => {
    if (filtersApplied) {
      // Load more filtered results
      const nextPage = filterPage + 1;
      setFilterPage(nextPage);
      handleFilters(nextPage, true);
    } else {
      // Load more regular results
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <div>
      <div className="nc-SectionGridFeaturePlaces relative">
        <div className="flex items-center mb-10 justify-between">
          <div className="w-full">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex-1 min-w-0">
                <TabFilters
                  key={filterUiKey}
                  setMinPrice={setMinPrice}
                  setMaxPrice={setMaxPrice}
                  setBathrooms={setBathrooms}
                  setBedRooms={setBedRooms}
                  setBeds={setBeds}
                  setGuests={setGuests}
                  setPropertyType={setPropertyType}
                  setRentalForm={setRentalForm}
                  setRentalType={setRentalType}
                  setHouseRool={setHouseRool}
                  initialBeds={beds}
                  initialBedrooms={bedrooms}
                  initialBathrooms={bathrooms}
                  initialGuests={guests}
                />
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1">
                  <button
                    type="button"
                    onClick={() => handleRentalType("Long Term")}
                    className={`px-5 text-sm font-medium py-2 rounded-full transition-all duration-200 ${
                      rentalType === "Long Term"
                        ? "bg-white dark:bg-neutral-700 text-primary-6000 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                    }`}
                  >
                    Long Term
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRentalType("Short Term")}
                    className={`px-5 text-sm font-medium py-2 rounded-full transition-all duration-200 ${
                      rentalType === "Short Term"
                        ? "bg-white dark:bg-neutral-700 text-primary-6000 shadow-sm"
                        : "text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200"
                    }`}
                  >
                    Short Term
                  </button>
                </div>
                {(filtersApplied || beds > 0 || bedrooms > 0 || bathrooms > 0 || guests > 1 || minPrice > 0 || maxPrice < 999999 || propertyType || rentalForm) && (
                  <button
                    type="button"
                    className="px-5 py-2 text-sm font-medium rounded-full border-2 border-neutral-300 dark:border-neutral-600 hover:border-primary-500 dark:hover:border-primary-500 text-neutral-700 dark:text-neutral-300 hover:text-primary-6000 dark:hover:text-primary-500 transition-all duration-200 flex items-center gap-2"
                    onClick={clearFilters}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Clear Filters
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 mb-3">
          {/* Loading overlay - shows when loading and there's existing data (filter change) */}
          {loading && fetchedData.length > 0 && (
            <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm rounded-2xl min-h-[500px]">
              <div className="flex flex-col items-center gap-4">
                <Loader size="lg" />
                <p className="text-base font-semibold text-primary-6000 dark:text-primary-400">
                  Updating results...
                </p>
                <div className="flex gap-1.5 mt-2">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary-6000 animate-bounce"
                      style={{
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: "0.6s",
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Properties grid */}
          <div
            className={`grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ${gridClass} ${
              loading && fetchedData.length > 0 ? "opacity-40 pointer-events-none" : ""
            }`}
          >
            {loading && fetchedData.length === 0 ? (
              // Skeleton loaders for initial load
              [1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                <div key={n} className="flex flex-col gap-y-2">
                  <div className="w-full h-64 bg-gradient-to-br from-primary-50 to-primary-100 dark:from-neutral-800 dark:to-neutral-700 rounded-lg animate-pulse"></div>
                  <div className="w-56 rounded-lg h-3 bg-neutral-200 dark:bg-neutral-700 animate-pulse mt-2"></div>
                  <div className="w-40 rounded-lg h-3 bg-neutral-200 dark:bg-neutral-700 animate-pulse mt-1"></div>
                  <div className="flex items-center justify-between">
                    <div className="w-32 rounded-lg h-3 bg-neutral-200 dark:bg-neutral-700 animate-pulse mt-1"></div>
                    <div className="w-10 rounded-lg h-3 bg-neutral-200 dark:bg-neutral-700 animate-pulse mt-1"></div>
                  </div>
                </div>
              ))
            ) : loading && fetchedData.length === 0 ? (
              // Initial load with loader (fallback)
              <div className="col-span-full flex flex-col items-center justify-center min-h-[500px] py-12">
                <Loader size="lg" />
                <p className="mt-6 text-base font-semibold text-primary-6000 dark:text-primary-400">
                  Finding your perfect stay...
                </p>
                <div className="flex gap-1.5 mt-3">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="w-2 h-2 rounded-full bg-primary-6000 animate-bounce"
                      style={{
                        animationDelay: `${i * 0.15}s`,
                        animationDuration: "0.6s",
                      }}
                    />
                  ))}
                </div>
              </div>
            ) : fetchedData?.length === 0 ? (
              // No results
              <div className="col-span-full flex flex-col items-center justify-center min-h-[400px] py-12">
                <div className="text-center">
                  <svg
                    className="mx-auto h-20 w-20 text-neutral-300 dark:text-neutral-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                  <h3 className="mt-4 text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                    No properties found
                  </h3>
                  <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
                    Try adjusting your filters to see more results
                  </p>
                </div>
              </div>
            ) : (
              // Display properties
              fetchedData?.map((item, index) => (
                <PropertyCard key={index} data={item} />
              ))
            )}
          </div>
        </div>

        {hasMore && !loading && fetchedData.length > 0 && (
          <div className="flex justify-center mt-8 mb-6">
            <button
              className="px-8 py-3 text-sm font-medium rounded-full bg-primary-6000 hover:bg-primary-700 text-white transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={loadMore}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader size="sm" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More Properties</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </>
              )}
            </button>
          </div>
        )}
        
        {loading && fetchedData.length > 0 && !filtersApplied && (
          <div className="flex justify-center mt-6">
            <div className="flex items-center gap-2 text-primary-6000">
              <Loader size="sm" />
              <span className="text-sm">Loading more properties...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectionGridFeaturePlaces;
