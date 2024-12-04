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
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  onPlaceSelected,
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
    <div className="w-auto">
      <Autocomplete
        onLoad={onLoad}
        onPlaceChanged={onPlaceChanged}
        // options={{
        // 	types: ["(cities)"],
        // }}
      >
        <input
          type="text"
          placeholder="Enter a location"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ width: "100%", height: "40px" }}
          // className=" bg-transparent rounded-2xl dark:text-white my-4"
          className=" bg-transparent dark:text-white border-none outline-none focus:outline-none"
        />
      </Autocomplete>
    </div>
  );
};

export default PlacesAutocomplete;
