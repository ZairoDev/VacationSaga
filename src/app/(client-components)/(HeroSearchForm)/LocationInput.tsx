"use client";

import { MapPinIcon } from "@heroicons/react/24/outline";
import React, { useState, useRef, useEffect, FC, useContext } from "react";
import PlacesAutocomplete from "../(HeroSearchFormSmall)/PlacesAutocompleteForLocation";
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
  placeHolder = "Search city, region, country",
  desc = "Where",
  className = "nc-flex-1.5",
  divHideVerticalLineClass = "left-10 -right-0.5",
}) => {

  const context = useContext(SearchInputContext);

  const containerRef = useRef<HTMLDivElement>(null);

  const [showPopover, setShowPopover] = useState(autoFocus);
  const [selectedPlace, setSelectedPlace] = useState<string>("");

  useEffect(() => {
    setShowPopover(autoFocus);
  }, [autoFocus]);

  const eventClickOutsideDiv = (event: MouseEvent) => {
    if (!containerRef.current) return;
    if (!showPopover || containerRef.current.contains(event.target as Node)) {
      return;
    }
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

  if (!context) {
    return null;
  }

  const { place, setPlace } = context;

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
        className={`flex z-10 flex-1 relative [ nc-hero-field-padding ] flex-shrink-0 items-center space-x-3 cursor-pointer focus:outline-none text-left transition-colors ${
          showPopover ? "nc-hero-field-focused" : ""
        }`}
      >
        {/* Icon — orange tint when active, neutral otherwise */}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
            showPopover
              ? "bg-primary-6000/10 text-primary-6000"
              : "bg-neutral-100 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-400"
          }`}
        >
          <MapPinIcon className="h-4 w-4 lg:h-5 lg:w-5" />
        </div>

        <div className="flex-grow text-left min-w-0">
          {/* Label */}
          <span
            className={`block text-xs font-semibold uppercase tracking-wide transition-colors ${
              "text-neutral-500 dark:text-neutral-400"
            }`}
          >
            {desc}
          </span>

          {/* Google autocomplete input */}
          <PlacesAutocomplete
            onPlaceSelected={handlePlaceSelected}
            placeholder={placeHolder}
            inputClassName="mt-0.5 focus:outline-none"
          />
        </div>
      </div>

      {/* vertical divider hider */}
      {showPopover && (
        <div
          className={`h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 bg-white dark:bg-neutral-800 ${divHideVerticalLineClass}`}
        />
      )}
    </div>
  );
};

export default LocationInput;
