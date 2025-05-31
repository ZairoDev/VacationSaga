"use client";

import type React from "react";
import { useFormData } from "../formItem";
import { useRouter } from "next/navigation";
import { useListingStore } from "@/app/Store/hotelListingStore";
import axios from "axios";
import { motion } from "framer-motion";
import {
  User,
  Home,
  ClipboardList,
  FileText,
  Edit3,
  MapPin,
  Star,
  Bed,
  Users,
  DollarSign,
  Clock,
  ArrowLeft,
  Send,
  Mail,
  Phone,
  Building2,
  ShieldAlert,
  Cigarette,
  PawPrint,
} from "lucide-react";

const PageAddListing5 = () => {
  const { formData } = useFormData();
  const { propertyDetails, ownerDetails, roomDetails, policies,resetForm } =
    useListingStore();

  const router = useRouter();

  const handleSubmit = async() => {
    try{
      const res=await axios.post("/api/hotels/addHotel",{
        ownerDetails,
        propertyDetails,
        roomDetails,
        policies,
      });
       if (res.status === 201) {
      alert("Listing submitted successfully!");
      resetForm(); 
      localStorage.removeItem("listing-form-storage");
      router.push("/"); 
    } else {
      console.error("Failed to submit listing:", res.data.message);
      alert(res.data.message || "Something went wrong while submitting.");
    }

    } catch (error) {
      console.error("Error submitting listing:", error);
    }
  };

  const goBack = () => {
    router.push("/add-listing/2");
  };

  const editSection = (step: string) => {
    router.push("/");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-light text-gray-900">Add New Listing</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Sidebar - Progress */}
        <div className="w-64 border-r border-gray-100 p-8 hidden lg:block">
          <div className="space-y-6">
            <h3 className="text-sm uppercase text-gray-500 font-medium tracking-wider">
              Listing Progress
            </h3>

            <div className="space-y-3">
              <ProgressItem
                icon={<User className="w-4 h-4" />}
                label="Owner Details"
                isActive={false}
                isCompleted={true}
              />
              <ProgressItem
                icon={<Home className="w-4 h-4" />}
                label="Property Details"
                isActive={false}
                isCompleted={true}
              />
              <ProgressItem
                icon={<ClipboardList className="w-4 h-4" />}
                label="Room Details"
                isActive={false}
                isCompleted={true}
              />
              <ProgressItem
                icon={<ShieldAlert className="w-4 h-4" />}
                label="Policies"
                isActive={false}
                isCompleted={true}
              />
              <ProgressItem
                icon={<FileText className="w-4 h-4" />}
                label="Review & Submit"
                isActive={true}
                isCompleted={false}
              />
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-light mb-3 text-gray-900">
                Review Your Listing
              </h2>
              <p className="text-gray-500">
                Please review all the information below. You can edit any
                section by clicking the edit button.
              </p>
            </motion.div>

            <div className="space-y-8">
              {/* Owner Details Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                    <User className="w-5 h-5 text-orange-500" />
                    Owner Details
                  </h3>
                  <button
                    onClick={() => editSection("owner")}
                    className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InfoItem
                    icon={<User className="w-4 h-4 text-gray-400" />}
                    label="Owner Name"
                    value={ownerDetails.name || " "}
                  />
                  <InfoItem
                    icon={<Mail className="w-4 h-4 text-gray-400" />}
                    label="Email"
                    value={ownerDetails?.email || "Not provided"}
                  />
                  <InfoItem
                    icon={<Phone className="w-4 h-4 text-gray-400" />}
                    label="Phone"
                    value={ownerDetails?.phone || "Not provided"}
                  />
                  <InfoItem
                    icon={<Phone className="w-4 h-4 text-gray-400" />}
                    label="Alternate Contact"
                    value={ownerDetails?.alternateContact || "Not provided"}
                  />
                  <InfoItem
                    icon={<FileText className="w-4 h-4 text-gray-400" />}
                    label="Aadhar Card"
                    value={ownerDetails?.aadharCard || "Not provided"}
                  />
                  {ownerDetails?.managerName && (
                    <InfoItem
                      icon={<User className="w-4 h-4 text-gray-400" />}
                      label="Manager Name"
                      value={ownerDetails.managerName}
                    />
                  )}
                </div>
              </motion.div>

              {/* Property Details Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                    <Building2 className="w-5 h-5 text-orange-500" />
                    Property Details
                  </h3>
                  <button
                    onClick={() => editSection("1")}
                    className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                      icon={<Home className="w-4 h-4 text-gray-400" />}
                      label="Property Name"
                      value={propertyDetails?.propertyName || "Not provided"}
                    />
                    <InfoItem
                      icon={<Star className="w-4 h-4 text-gray-400" />}
                      label="Star Rating"
                      value={propertyDetails.starRating}
                    />
                    <InfoItem
                      icon={<Bed className="w-4 h-4 text-gray-400" />}
                      label="Total Rooms"
                      value={propertyDetails?.numberOfRooms || "Not provided"}
                    />
                  </div>

                  {propertyDetails?.location && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        Location
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {[
                            propertyDetails.location.address,
                            propertyDetails.location.city,
                            propertyDetails.location.state,
                            propertyDetails.location.country,
                          ]
                            .filter(Boolean)
                            .join(", ") || "Not provided"}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Room Types */}
                  {propertyDetails?.roomTypes &&
                    propertyDetails.roomTypes.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Room Types
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {propertyDetails.roomTypes.map(
                            (room: any, index: number) => (
                              <div
                                key={index}
                                className="bg-gray-50 p-3 rounded-lg flex justify-between"
                              >
                                <span className="text-sm text-gray-700">
                                  {room.type}
                                </span>
                                <span className="text-sm text-gray-500">
                                  {room.quantity} rooms
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Amenities */}
                  {propertyDetails?.amenities &&
                    propertyDetails.amenities.length > 0 && (
                      <div>
                        <h4 className="text-sm font-medium text-gray-700 mb-3">
                          Property Amenities
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {propertyDetails.amenities.map(
                            (amenity: string, index: number) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-orange-50 text-orange-600 text-xs rounded-full"
                              >
                                {amenity}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                  {/* Check-in/Check-out Times */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                      icon={<Clock className="w-4 h-4 text-gray-400" />}
                      label="Check-in Time"
                      value={propertyDetails?.checkInTime || "Not provided"}
                    />
                    <InfoItem
                      icon={<Clock className="w-4 h-4 text-gray-400" />}
                      label="Check-out Time"
                      value={propertyDetails?.checkOutTime || "Not provided"}
                    />
                  </div>

                  {/* Description */}
                  {propertyDetails?.description && (
                    <div>
                      <h4 className="text-sm font-medium text-gray-700 mb-3">
                        Property Description
                      </h4>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          {propertyDetails.description}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Room Details Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                    <Bed className="w-5 h-5 text-orange-500" />
                    Room Details ({roomDetails.length}{" "}
                    {roomDetails.length === 1 ? "Room" : "Rooms"})
                  </h3>
                  <button
                    onClick={() => editSection("2")}
                    className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="space-y-6">
                  {roomDetails.length > 0 ? (
                    roomDetails.map((room: any, index: number) => (
                      <div
                        key={room.id}
                        className="border border-gray-100 rounded-lg p-5 bg-gray-50"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <h4 className="text-lg font-medium text-gray-800">
                            {room.roomType}
                          </h4>
                          <span className="text-lg font-semibold text-orange-600">
                            ${room.basePricePerNight}/night
                          </span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                          <InfoItem
                            icon={<Bed className="w-4 h-4 text-gray-400" />}
                            label="Bed Type"
                            value={room.bedType}
                          />
                          <InfoItem
                            icon={<Users className="w-4 h-4 text-gray-400" />}
                            label="Max Occupancy"
                            value={`${room.maxOccupancy} guests`}
                          />
                          <InfoItem
                            icon={
                              <DollarSign className="w-4 h-4 text-gray-400" />
                            }
                            label="Price Per Night"
                            value={`$${room.basePricePerNight}`}
                          />
                        </div>

                        {/* Room Description */}
                        {room.description && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">
                              Description
                            </h5>
                            <div className="bg-white p-3 rounded-lg border">
                              <p className="text-sm text-gray-700">
                                {room.description}
                              </p>
                            </div>
                          </div>
                        )}

                        {/* Room Amenities */}
                        {room.amenities && room.amenities.length > 0 && (
                          <div className="mb-4">
                            <h5 className="text-sm font-medium text-gray-700 mb-2">
                              Amenities
                            </h5>
                            <div className="flex flex-wrap gap-2">
                              {room.amenities.map(
                                (amenity: string, amenityIndex: number) => (
                                  <span
                                    key={amenityIndex}
                                    className="px-2 py-1 bg-orange-50 text-orange-600 text-xs rounded-full border border-orange-100"
                                  >
                                    {amenity}
                                  </span>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {/* Custom Amenities */}
                        {room.customAmenities &&
                          room.customAmenities.length > 0 && (
                            <div className="mb-4">
                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                Custom Amenities
                              </h5>
                              <div className="flex flex-wrap gap-2">
                                {room.customAmenities.map(
                                  (amenity: string, amenityIndex: number) => (
                                    <span
                                      key={amenityIndex}
                                      className="px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full border border-blue-100"
                                    >
                                      {amenity}
                                    </span>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {/* Room Photos */}
                        {room.photoPreviews &&
                          room.photoPreviews.length > 0 && (
                            <div>
                              <h5 className="text-sm font-medium text-gray-700 mb-2">
                                Photos
                              </h5>
                              <div className="flex gap-2 overflow-x-auto">
                                {room.photoPreviews.map(
                                  (photo: any, photoIndex: number) => (
                                    <div
                                      key={photoIndex}
                                      className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg border overflow-hidden"
                                    >
                                      {photo && (
                                        <img
                                          src={photo || "/placeholder.svg"}
                                          alt={`Room ${room.roomType} photo ${
                                            photoIndex + 1
                                          }`}
                                          className="w-full h-full object-cover"
                                        />
                                      )}
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Bed className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No room details added yet.</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Policies Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-white border border-gray-100 rounded-xl p-6 shadow-sm"
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-medium text-gray-800 flex items-center gap-2">
                    <ShieldAlert className="w-5 h-5 text-orange-500" />
                    Policies
                  </h3>
                  <button
                    onClick={() => editSection("4")}
                    className="text-orange-500 hover:text-orange-600 flex items-center gap-1 text-sm"
                  >
                    <Edit3 className="w-4 h-4" />
                    Edit
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                      icon={<FileText className="w-4 h-4 text-gray-400" />}
                      label="Cancellation Policy"
                      value={policies?.cancellationPolicy || "Not provided"}
                    />
                    <InfoItem
                      icon={<ClipboardList className="w-4 h-4 text-gray-400" />}
                      label="House Rules"
                      value={
                        policies?.houseRules && policies.houseRules.length > 0
                          ? policies.houseRules.join(", ")
                          : "Not provided"
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InfoItem
                      icon={<PawPrint className="w-4 h-4 text-gray-400" />}
                      label="Pets Allowed"
                      value={policies?.allowPets ? "Yes" : "No"}
                    />
                    <InfoItem
                      icon={<Cigarette className="w-4 h-4 text-gray-400" />}
                      label="Smoking Allowed"
                      value={policies?.allowSmoking ? "Yes" : "No"}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Submit Section */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6"
              >
                <div className="text-center">
                  <h3 className="text-lg font-medium text-orange-800 mb-2">
                    Ready to Submit Your Listing?
                  </h3>
                  <p className="text-sm text-orange-600 mb-6">
                    Once submitted, your listing will be reviewed by our team
                    and published within 24 hours.
                  </p>

                  <div className="flex justify-center gap-4">
                    <button
                      onClick={goBack}
                      className="py-3 px-6 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-center gap-2"
                    >
                      <ArrowLeft className="w-4 h-4" />
                      Back
                    </button>

                    <button
                      onClick={handleSubmit}
                      className="py-3 px-8 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 flex items-center justify-center gap-2 group"
                    >
                      <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      Submit Listing
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

interface InfoItemProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
}

const InfoItem = ({ icon, label, value }: InfoItemProps) => {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1">{icon}</div>
      <div>
        <p className="text-xs text-gray-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm text-gray-800 font-medium">{value}</p>
      </div>
    </div>
  );
};

interface ProgressItemProps {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  isCompleted: boolean;
}

const ProgressItem = ({
  icon,
  label,
  isActive,
  isCompleted,
}: ProgressItemProps) => {
  return (
    <div
      className={`flex items-center gap-3 ${
        isActive
          ? "text-orange-500"
          : isCompleted
          ? "text-green-500"
          : "text-gray-500"
      }`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isCompleted
            ? "bg-green-100 text-green-500"
            : isActive
            ? "bg-orange-100 text-orange-500"
            : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <span className={`text-sm ${isActive ? "font-medium" : ""}`}>
        {label}
      </span>
    </div>
  );
};

export default PageAddListing5;
