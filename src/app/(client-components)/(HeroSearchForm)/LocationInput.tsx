"use client";

import { ClockIcon, MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC, useContext } from "react";
import ClearDataButton from "./ClearDataButton";
import { LoadScript } from "@react-google-maps/api";
import PlacesAutocomplete from "../(HeroSearchFormSmall)/PlacesAutocompleteForLocation";
import { useRouter } from "next/navigation";
import { SearchInputContext } from "@/context/SearchInput";

export interface LocationInputProps {
  placeHolder?: string;
  desc?: string;
  className?: string;
  divHideVerticalLineClass?: string;
  autoFocus?: boolean;
}

type Place = {
  [key: string]: any;
  city?: string;
  country?: string;
};

const LocationInput: FC<LocationInputProps> = ({
  autoFocus = false,
  placeHolder = "Location",
  desc = "Where are you going?",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
}) => {

  const context = useContext(SearchInputContext);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [value, setValue] = useState("");
  const [showPopover, setShowPopover] = useState(autoFocus);
  const [selectedPlace, setSelectedPlace] = useState<string>("");

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    // CLICK IN_SIDE
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
    // CLICK OUT_SIDE
    setShowPopover(false);
  };

  useEffect(() => {
    if (eventClickOutsideDiv) {
      document.removeEventListener("click", eventClickOutsideDiv);
    }
    showPopover && document.addEventListener("click", eventClickOutsideDiv);
    return () => {
      document.removeEventListener("click", eventClickOutsideDiv);
    };
  }, [showPopover]);

  useEffect(() => {
    if (showPopover && inputRef.current) {
      inputRef.current.focus();
    }
  }, [showPopover]);

  if (!context) {
    return null;
  }

  const { place, setPlace } = context;

  const handleSelectLocation = (item: string) => {
    setValue(item);
    setShowPopover(false);
  };

  const renderRecentSearches = () => {
    return (
      <>
        <h3 className="block mt-2 sm:mt-0 px-4 sm:px-8 font-semibold text-base sm:text-lg text-neutral-800 dark:text-neutral-100">
          Recent searches
        </h3>
        <div className="mt-2">
          {[
            "Hamptons, Suffolk County, NY",
            "Las Vegas, NV, United States",
            "Ueno, Taito, Tokyo",
            "Ikebukuro, Toshima, Tokyo",
          ].map((item) => (
            <span
              onClick={() => handleSelectLocation(item)}
              key={item}
              className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
            >
              <span className="block text-neutral-400">
                <ClockIcon className="h-4 sm:h-6 w-4 sm:w-6" />
              </span>
              <span className=" block font-medium text-neutral-700 dark:text-neutral-200">
                {item}
              </span>
            </span>
          ))}
        </div>
      </>
    );
  };

  const renderSearchValue = () => {
    return (
      <>
        {[
          "Ha Noi, Viet Nam",
          "San Diego, CA",
          "Humboldt Park, Chicago, IL",
          "Bangor, Northern Ireland",
        ].map((item) => (
          <span
            onClick={() => handleSelectLocation(item)}
            key={item}
            className="flex px-4 sm:px-8 items-center space-x-3 sm:space-x-4 py-4 hover:bg-neutral-100 dark:hover:bg-neutral-700 cursor-pointer"
          >
            <span className="block text-neutral-400">
              <ClockIcon className="h-4 w-4 sm:h-6 sm:w-6" />
            </span>
            <span className="block font-medium text-neutral-700 dark:text-neutral-200">
              {item}
            </span>
          </span>
        ))}
      </>
    );
  };

  const capitalizeFirstLetter = (str: string) => {
    if (str.length === 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const handlePlaceSelected = (place: Place) => {
    if (place?.city) {
      let selectedCity = place?.city;
      selectedCity = capitalizeFirstLetter(selectedCity);
      setSelectedPlace(selectedCity);
      setPlace(selectedCity);
    } else {
      let selectedCountry = place?.country || "";
      setSelectedPlace(selectedCountry);
      setPlace(selectedCountry);
    }
  };

  return (
    <div className={`relative flex ${className}`} ref={containerRef}>
      <div
        onClick={() => setShowPopover(true)}
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left  ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        <div className="text-neutral-300 dark:text-neutral-400">
          <MapPinIcon className="w-5 h-5 lg:w-7 lg:h-7" />
        </div>
        <div>
          <LoadScript
            googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
            libraries={["places"]}
          >
            <PlacesAutocomplete onPlaceSelected={handlePlaceSelected} />
          </LoadScript>
        </div>
      </div>

      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        ></div>
      )}

      {/* {showPopover && (
        <div className="absolute left-0 z-40 w-full min-w-[300px] sm:min-w-[500px] bg-white dark:bg-neutral-800 top-full mt-3 py-3 sm:py-6 rounded-3xl shadow-xl max-h-96 overflow-y-auto">
          {value ? renderSearchValue() : renderRecentSearches()}
        </div>
      )} */}
    </div>
  );
};

export default LocationInput;
