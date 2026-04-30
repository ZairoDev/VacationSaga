// components/PlacesAutocomplete.tsx
import React, { useState, useRef, useCallback } from "react";
import { Autocomplete } from "@react-google-maps/api";

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
        const placeTypes = place.types || [];
        // if (placeTypes.includes("locality") || placeTypes.includes("country")) {
        const addressComponents = place.address_components;
        const getComponent = (type: string) =>
          addressComponents?.find((component) => component.types.includes(type))
            ?.long_name || "";

        const lat = place.geometry?.location?.lat() || 0;
        const lng = place.geometry?.location?.lng() || 0;

        const selectedPlace = {
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
          lat,
          lng,
        };

        onPlaceSelected(selectedPlace);
        setAddress(place.formatted_address);
      }
    }
  }, [onPlaceSelected]);

  return (
    <div className="w-full">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        // options={{
        // 	types: ["(cities)"],
        // }}
      >
        <input
          type="text"
          placeholder={placeholder}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className={`w-full bg-transparent border-none outline-none focus:outline-none text-sm text-neutral-700 placeholder:text-neutral-400 dark:text-neutral-100 dark:placeholder:text-neutral-500 ${inputClassName}`}
        />
      </Autocomplete>
    </div>
  );
};

export default PlacesAutocomplete;
