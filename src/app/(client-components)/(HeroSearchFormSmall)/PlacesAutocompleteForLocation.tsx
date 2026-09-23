"use client";

import React, { useState, useRef, useCallback } from "react";
import { Autocomplete, useJsApiLoader } from "@react-google-maps/api";

const LIBRARIES: ("places")[] = ["places"];

interface PlaceDetails {
  placeId: string;
  name: string;
  address: string;
  country: string;
  state: string;
  city: string;
  street: string;
  postalCode: string;
  lat: number;
  lng: number;
}

interface PlacesAutocompleteProps {
  onPlaceSelected: (place: PlaceDetails) => void;
  placeholder?: string;
  inputClassName?: string;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onPlaceSelected,
  placeholder = "Search city, region, country",
  inputClassName = "",
}) => {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries: LIBRARIES,
  });

  const [address, setAddress] = useState<string>("");
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  const onLoad = useCallback(
    (autocomplete: google.maps.places.Autocomplete) => {
      autocompleteRef.current = autocomplete;
    },
    []
  );

  const onPlaceChanged = useCallback(() => {
    if (autocompleteRef.current !== null) {
      const place = autocompleteRef.current.getPlace();
      if (place.place_id && place.name && place.formatted_address) {
        const addressComponents = place.address_components;
        const getComponent = (type: string) =>
          addressComponents?.find((c) => c.types.includes(type))?.long_name || "";

        const selectedPlace: PlaceDetails = {
          placeId: place.place_id,
          name: place.name,
          address: place.formatted_address,
          country: getComponent("country"),
          state: getComponent("administrative_area_level_1"),
          city:
            getComponent("locality") ||
            getComponent("sublocality") ||
            getComponent("postal_town"),
          street: getComponent("route") + " " + getComponent("street_number"),
          postalCode: getComponent("postal_code"),
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
        };

        onPlaceSelected(selectedPlace);
        setAddress(place.formatted_address);
      }
    }
  }, [onPlaceSelected]);

  const inputClass = `
    w-full bg-transparent border-none outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0
    text-sm font-medium leading-snug
    text-neutral-800 dark:text-neutral-100
    placeholder:text-neutral-400 dark:placeholder:text-neutral-500
    placeholder:font-normal
    caret-primary-6000
    ${inputClassName}
  `;

  // SDK failed to load — render plain input, user can still type manually
  if (loadError) {
    return (
      <div className="w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputClass}
        />
        <span className="mt-0.5 block text-[11px] text-red-400">
          Suggestions unavailable
        </span>
      </div>
    );
  }

  // SDK still loading — render plain input so user can type immediately,
  // show a subtle loading hint instead of blocking the field
  if (!isLoaded) {
    return (
      <div className="w-full">
        <input
          type="text"
          placeholder={placeholder}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputClass}
        />
        <span className="mt-0.5 block text-[11px] text-neutral-400 animate-pulse">
          Loading suggestions…
        </span>
      </div>
    );
  }

  // SDK ready — full autocomplete
  return (
    <div className="w-full">
      <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
        <input
          type="text"
          placeholder={placeholder}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={inputClass}
        />
      </Autocomplete>
    </div>
  );
};

export default PlacesAutocomplete;
