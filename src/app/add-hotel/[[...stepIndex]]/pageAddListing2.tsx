"use client";
import React, { FC, useState, useEffect } from "react";

// Input component
const Input: FC<{
  type?: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  min?: number;
  step?: string;
}> = ({ type = "text", value, onChange, placeholder, className = "", min, step }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent ${className}`}
      min={min}
      step={step}
    />
  );
};

// Select component
const Select: FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  children: React.ReactNode;
}> = ({ value, onChange, children }) => {
  return (
    <select
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    >
      {children}
    </select>
  );
};

// Textarea component
const Textarea: FC<{
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  placeholder?: string;
}> = ({ value, onChange, rows = 3, placeholder }) => {
  return (
    <textarea
      value={value}
      onChange={onChange}
      rows={rows}
      placeholder={placeholder}
      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    />
  );
};

// FormItem component
const FormItem: FC<{
  label: string;
  desc?: string;
  children: React.ReactNode;
}> = ({ label, desc, children }) => {
  return (
    <div className="flex flex-col space-y-2 mb-4">
      <label className="text-sm font-medium text-neutral-700">{label}</label>
      {desc && <p className="text-xs text-neutral-500">{desc}</p>}
      {children}
    </div>
  );
};

// StarRating component
const StarRating: FC<{
  rating: number;
  onChange: (rating: number) => void;
}> = ({ rating, onChange }) => {
  return (
    <div className="flex space-x-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          onClick={() => onChange(star)}
          className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
};

// TimePicker component
const TimePicker: FC<{
  value: string;
  onChange: (time: string) => void;
}> = ({ value, onChange }) => {
  return (
    <input
      type="time"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    />
  );
};

// DatePicker component
const DatePicker: FC<{
  date: Date | null;
  onChange: (date: Date | null) => void;
}> = ({ date, onChange }) => {
  return (
    <input
      type="date"
      value={date ? date.toISOString().split('T')[0] : ''}
      onChange={(e) => onChange(e.target.value ? new Date(e.target.value) : null)}
      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
    />
  );
};

// LocationInput component
const LocationInput: FC<{
  defaultValue: string;
  onChange: (address: string, lat: number | null, lng: number | null) => void;
}> = ({ defaultValue, onChange }) => {
  const [address, setAddress] = useState(defaultValue);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would use a geocoding service
    onChange(address, null, null);
  };

  return (
    <form onSubmit={handleSubmit} className="flex space-x-2">
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter location"
        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />
      <button
        type="submit"
        className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
      >
        Find
      </button>
    </form>
  );
};

// PhotoUploader component
const PhotoUploader: FC<{
  photos: string[];
  onChange: (photos: string[]) => void;
  maxPhotos: number;
}> = ({ photos, onChange, maxPhotos }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + photos.length > maxPhotos) {
      alert(`Maximum ${maxPhotos} photos allowed`);
      return;
    }

    // In a real implementation, this would handle file uploads
    const newPhotos = files.map(file => URL.createObjectURL(file));
    onChange([...photos, ...newPhotos]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {photos.map((photo, index) => (
          <div key={index} className="relative w-24 h-24">
            <img src={photo} alt="" className="w-full h-full object-cover rounded-lg" />
            <button
              onClick={() => onChange(photos.filter((_, i) => i !== index))}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6"
            >
              ×
            </button>
          </div>
        ))}
      </div>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleFileChange}
        className="w-full"
      />
    </div>
  );
};

// AmenitiesSelector component
const AmenitiesSelector: FC<{
  selectedAmenities: string[];
  onChange: (amenities: string[]) => void;
}> = ({ selectedAmenities, onChange }) => {
  const amenitiesList = [
    "WiFi", "Parking", "Pool", "Gym", "Air Conditioning",
    "Kitchen", "TV", "Washer", "Dryer", "Heating"
  ];

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      onChange(selectedAmenities.filter(a => a !== amenity));
    } else {
      onChange([...selectedAmenities, amenity]);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {amenitiesList.map(amenity => (
        <label key={amenity} className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={selectedAmenities.includes(amenity)}
            onChange={() => toggleAmenity(amenity)}
            className="rounded border-gray-300"
          />
          <span>{amenity}</span>
        </label>
      ))}
    </div>
  );
};

// RoomTypeManager component
const RoomTypeManager: FC<{
  roomTypes: { type: string; quantity: number }[];
  onChange: (types: { type: string; quantity: number }[]) => void;
  roomTypeOptions: string[];
}> = ({ roomTypes, onChange, roomTypeOptions }) => {
  const addRoomType = () => {
    onChange([...roomTypes, { type: roomTypeOptions[0], quantity: 1 }]);
  };

  const updateRoomType = (index: number, field: 'type' | 'quantity', value: string | number) => {
    const newTypes = [...roomTypes];
    newTypes[index] = { ...newTypes[index], [field]: value };
    onChange(newTypes);
  };

  const removeRoomType = (index: number) => {
    onChange(roomTypes.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      {roomTypes.map((room, index) => (
        <div key={index} className="flex space-x-4 items-center">
          <select
            value={room.type}
            onChange={(e) => updateRoomType(index, 'type', e.target.value)}
            className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg"
          >
            {roomTypeOptions.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <input
            type="number"
            value={room.quantity}
            onChange={(e) => updateRoomType(index, 'quantity', parseInt(e.target.value))}
            min={1}
            className="w-24 px-4 py-2 border border-neutral-300 rounded-lg"
          />
          <button
            onClick={() => removeRoomType(index)}
            className="px-4 py-2 bg-red-500 text-white rounded-lg"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addRoomType}
        className="px-4 py-2 bg-primary-600 text-white rounded-lg"
      >
        Add Room Type
      </button>
    </div>
  );
};

// Main component interfaces
interface RoomType {
  type: string;
  quantity: number;
}

interface Location {
  address: string;
  city: string;
  state: string;
  country: string;
  latitude: number | null;
  longitude: number | null;
}

interface ListingState {
  // Basic Property Info
  propertyType: string;
  placeName: string;
  rentalForm: string;
  numberOfPortions: number;
  showPortionsInput: boolean;
  rentalType: string;

  // Detailed Property Info
  propertyName: string;
  numberOfRooms: number;
  roomTypes: RoomType[];
  starRating: number;
  amenities: string[];
  propertyPhotos: string[];
  coverPhotos: string[];
  location: Location;
  checkInTime: string;
  checkOutTime: string;
  operatingSince: Date | null;
  isAvailable: boolean;
  description: string;

  // Owner Information
  ownerName: string;
  ownerEmail: string;
  ownerPhone: string;
  alternateContact: string;
  aadharNumber: string;
  managerName: string;
  managerContact: string;
}

const PageAddListing2 = () => {
  const [listingDetails, setListingDetails] = useState<ListingState>(() => {
    const savedData = localStorage.getItem("listingDetails");
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      if (parsedData.operatingSince) {
        parsedData.operatingSince = new Date(parsedData.operatingSince);
      }
      return parsedData;
    }
    return {
      // Basic Property Info
      propertyType: "Cottage",
      placeName: "",
      rentalForm: "Private Room",
      numberOfPortions: 1,
      showPortionsInput: false,
      rentalType: "Short Term",

      // Detailed Property Info
      propertyName: "",
      numberOfRooms: 1,
      roomTypes: [{ type: "Standard", quantity: 1 }],
      starRating: 3,
      amenities: [],
      propertyPhotos: [],
      coverPhotos: [],
      location: {
        address: "",
        city: "",
        state: "",
        country: "",
        latitude: null,
        longitude: null,
      },
      checkInTime: "14:00",
      checkOutTime: "11:00",
      operatingSince: null,
      isAvailable: true,
      description: "",

      // Owner Information
      ownerName: "",
      ownerEmail: "",
      ownerPhone: "",
      alternateContact: "",
      aadharNumber: "",
      managerName: "",
      managerContact: "",
    };
  });

  const propertyTypes = [
    "Cottage", "Villa", "Cabin", "Farm stay", "Houseboat", "Lighthouse",
    "Studio", "Apartment", "Penthouse", "Detached House", "Loft",
    "Maisonette", "Farmhouse", "Holiday Homes", "Farmstay", "Resort",
    "Lodge", "Apart Hotel"
  ];

  const roomTypeOptions = [
    "Standard", "Deluxe", "Suite", "Family", "Single", "Double",
    "Twin", "Studio", "Executive", "Presidential", "Penthouse",
    "Villa", "Cottage", "Bungalow", "Other"
  ];

  const updateListingDetails = (field: keyof ListingState, value: any) => {
    setListingDetails(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleLocationChange = (field: keyof Location, value: string | number | null) => {
    setListingDetails(prev => ({
      ...prev,
      location: {
        ...prev.location,
        [field]: value,
      },
    }));
  };

  useEffect(() => {
    localStorage.setItem("listingDetails", JSON.stringify(listingDetails));
  }, [listingDetails]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log("Form submitted:", listingDetails);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto py-8">
      <h2 className="text-2xl font-semibold">Add New Property Listing</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-4"></div>
      <p className="text-neutral-500 dark:text-neutral-400 mb-8">
        Please provide all the required information about your property.
      </p>

      <div className="space-y-8">
        {/* BASIC PROPERTY INFO */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Basic Property Information</h3>
          
          <div className="mb-6 flex justify-between">
            <div>
              <label htmlFor="Short Term" className="mr-2">Short Term</label>
              <input
                type="radio"
                name="rentalType"
                id="Short Term"
                checked={listingDetails.rentalType === "Short Term"}
                onChange={(e) => updateListingDetails("rentalType", e.target.id)}
                className="cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="Long Term" className="mr-2">Long Term</label>
              <input
                type="radio"
                name="rentalType"
                id="Long Term"
                checked={listingDetails.rentalType === "Long Term"}
                onChange={(e) => updateListingDetails("rentalType", e.target.id)}
                className="cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="Both" className="mr-2">Both</label>
              <input
                type="radio"
                name="rentalType"
                id="Both"
                checked={listingDetails.rentalType === "Both"}
                onChange={(e) => updateListingDetails("rentalType", e.target.id)}
                className="cursor-pointer"
              />
            </div>
          </div>

          <FormItem label="Property Type">
            <Select
              value={listingDetails.propertyType}
              onChange={(e) => updateListingDetails("propertyType", e.target.value)}
            >
              {propertyTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </Select>
          </FormItem>

          <FormItem
            label="Place Name"
            desc="A catchy name usually includes: House name + Room name + Featured property + Tourist destination"
          >
            <Input
              value={listingDetails.placeName}
              onChange={(e) => updateListingDetails("placeName", e.target.value)}
              placeholder="Enter place name"
            />
          </FormItem>

          <FormItem label="Rental Form">
            <Select
              value={listingDetails.rentalForm}
              onChange={(e) => {
                const value = e.target.value;
                updateListingDetails("rentalForm", value);
                updateListingDetails("showPortionsInput", value === "Private room by portion");
                updateListingDetails("numberOfPortions", value === "Private room by portion" ? 2 : 1);
              }}
            >
              <option value="Private room">Private Area</option>
              <option value="Private room by portion">Private Area by portion</option>
              <option value="Shared Room">Shared Room</option>
              <option value="Hotel Room">Hotel Room</option>
            </Select>
            {listingDetails.showPortionsInput && (
              <Input
                type="number"
                className="mt-4"
                value={listingDetails.numberOfPortions}
                onChange={(e) => updateListingDetails("numberOfPortions", parseInt(e.target.value, 10))}
                min={2}
                placeholder="Number of portions"
              />
            )}
          </FormItem>
        </div>

        {/* OWNER INFORMATION */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Owner Information</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem label="Owner Name">
              <Input
                value={listingDetails.ownerName}
                onChange={(e) => updateListingDetails("ownerName", e.target.value)}
                placeholder="Full name"
              />
            </FormItem>

            <FormItem label="Email Address">
              <Input
                type="email"
                value={listingDetails.ownerEmail}
                onChange={(e) => updateListingDetails("ownerEmail", e.target.value)}
                placeholder="Email address"
              />
            </FormItem>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem label="Phone Number">
              <Input
                value={listingDetails.ownerPhone}
                onChange={(e) => updateListingDetails("ownerPhone", e.target.value)}
                placeholder="Contact number"
              />
            </FormItem>

            <FormItem label="Alternate Contact">
              <Input
                value={listingDetails.alternateContact}
                onChange={(e) => updateListingDetails("alternateContact", e.target.value)}
                placeholder="Alternative contact"
              />
            </FormItem>
          </div>

          <FormItem label="Aadhar Card Number">
            <Input
              value={listingDetails.aadharNumber}
              onChange={(e) => updateListingDetails("aadharNumber", e.target.value)}
              placeholder="Aadhar number"
            />
          </FormItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem label="Manager Name">
              <Input
                value={listingDetails.managerName}
                onChange={(e) => updateListingDetails("managerName", e.target.value)}
                placeholder="Manager's name (if different from owner)"
              />
            </FormItem>

            <FormItem label="Manager Contact">
              <Input
                value={listingDetails.managerContact}
                onChange={(e) => updateListingDetails("managerContact", e.target.value)}
                placeholder="Manager's contact number"
              />
            </FormItem>
          </div>
        </div>

        {/* DETAILED PROPERTY INFORMATION */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Detailed Property Information</h3>
          
          <FormItem label="Property Name">
            <Input
              value={listingDetails.propertyName}
              onChange={(e) => updateListingDetails("propertyName", e.target.value)}
              placeholder="Official property name"
            />
          </FormItem>

          <FormItem label="Number of Rooms">
            <Input
              type="number"
              value={listingDetails.numberOfRooms}
              onChange={(e) => updateListingDetails("numberOfRooms", parseInt(e.target.value, 10))}
              min={1}
              placeholder="Total number of rooms"
            />
          </FormItem>

          <FormItem label="Room Types">
            <RoomTypeManager
              roomTypes={listingDetails.roomTypes}
              onChange={(types) => updateListingDetails("roomTypes", types)}
              roomTypeOptions={roomTypeOptions}
            />
          </FormItem>

          <FormItem label="Star Rating">
            <StarRating
              rating={listingDetails.starRating}
              onChange={(rating) => updateListingDetails("starRating", rating)}
            />
          </FormItem>

          <FormItem label="Description">
            <Textarea
              value={listingDetails.description}
              onChange={(e) => updateListingDetails("description", e.target.value)}
              rows={5}
              placeholder="Detailed description of your property"
            />
          </FormItem>

          <FormItem label="Property Status">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isAvailable"
                checked={listingDetails.isAvailable}
                onChange={(e) => updateListingDetails("isAvailable", e.target.checked)}
                className="w-5 h-5 rounded border-neutral-300 text-primary-600 focus:ring-primary-500"
              />
              <label htmlFor="isAvailable" className="ml-2 text-sm text-neutral-700 dark:text-neutral-300">
                Property is available for booking
              </label>
            </div>
          </FormItem>
        </div>

        {/* LOCATION */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Location</h3>
          
          <FormItem label="Address">
            <Input
              value={listingDetails.location.address}
              onChange={(e) => handleLocationChange("address", e.target.value)}
              placeholder="Street address"
            />
          </FormItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem label="City">
              <Input
                value={listingDetails.location.city}
                onChange={(e) => handleLocationChange("city", e.target.value)}
                placeholder="City"
              />
            </FormItem>

            <FormItem label="State/Province">
              <Input
                value={listingDetails.location.state}
                onChange={(e) => handleLocationChange("state", e.target.value)}
                placeholder="State"
              />
            </FormItem>
          </div>

          <FormItem label="Country">
            <Input
              value={listingDetails.location.country}
              onChange={(e) => handleLocationChange("country", e.target.value)}
              placeholder="Country"
            />
          </FormItem>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem label="Latitude">
              <Input
                type="number"
                step="0.000001"
                value={listingDetails.location.latitude || ""}
                onChange={(e) => handleLocationChange("latitude", e.target.value ? parseFloat(e.target.value) : null)}
                placeholder="Latitude"
              />
            </FormItem>

            <FormItem label="Longitude">
              <Input
                type="number"
                step="0.000001"
                value={listingDetails.location.longitude || ""}
                onChange={(e) => handleLocationChange("longitude", e.target.value ? parseFloat(e.target.value) : null)}
                placeholder="Longitude"
              />
            </FormItem>
          </div>

          <FormItem label="Location Map">
            <LocationInput
              defaultValue=""
              onChange={(address, lat, lng) => {
                if (lat && lng) {
                  handleLocationChange("latitude", lat);
                  handleLocationChange("longitude", lng);
                }
              }}
            />
          </FormItem>
        </div>

        {/* AMENITIES */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Amenities</h3>
          
          <FormItem label="Property Amenities">
            <AmenitiesSelector
              selectedAmenities={listingDetails.amenities}
              onChange={(amenities) => updateListingDetails("amenities", amenities)}
            />
          </FormItem>
        </div>

        {/* PHOTOS */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Photos</h3>
          
          <FormItem label="Cover Photos" desc="Add up to 5 cover photos">
            <PhotoUploader
              photos={listingDetails.coverPhotos}
              onChange={(photos) => updateListingDetails("coverPhotos", photos)}
              maxPhotos={5}
            />
          </FormItem>

          <FormItem label="Property Photos" desc="Add up to 15 property photos">
            <PhotoUploader
              photos={listingDetails.propertyPhotos}
              onChange={(photos) => updateListingDetails("propertyPhotos", photos)}
              maxPhotos={15}
            />
          </FormItem>
        </div>

        {/* CHECK-IN/CHECK-OUT */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-5">
          <h3 className="text-lg font-semibold mb-4">Check-in & Check-out</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormItem label="Check-in Time">
              <TimePicker
                value={listingDetails.checkInTime}
                onChange={(time) => updateListingDetails("checkInTime", time)}
              />
            </FormItem>

            <FormItem label="Check-out Time">
              <TimePicker
                value={listingDetails.checkOutTime}
                onChange={(time) => updateListingDetails("checkOutTime", time)}
              />
            </FormItem>
          </div>

          <FormItem label="Operating Since">
            <DatePicker
              date={listingDetails.operatingSince}
              onChange={(date) => updateListingDetails("operatingSince", date)}
            />
          </FormItem>
        </div>
      </div>

      {/* SUBMIT BUTTON */}
      <div className="flex justify-end mt-8">
        <button
          type="submit"
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-all flex items-center"
        >
          Submit Listing
        </button>
      </div>
    </form>
  );
};

export default PageAddListing2;