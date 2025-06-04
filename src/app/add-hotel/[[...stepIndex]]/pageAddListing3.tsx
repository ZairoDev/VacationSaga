"use client";

import type React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useFormData } from "../formItem";
import { useRouter } from "next/navigation";
import { useListingStore } from "@/app/Store/hotelListingStore";
import { motion } from "framer-motion";
import {
  User,
  Home,
  ClipboardList,
  FileText,
  Bed,
  IndianRupee,
  Users,
  ArrowRight,
  ArrowLeft,
  Info,
  CheckCircle,
  Plus,
  X,
  Upload,
  Edit,
  Trash2,
  ShieldAlert,
} from "lucide-react";

const roomTypeOptions = ["Classic Room", "Deluxe Room", "Presidential Suite"];

const bedTypeOptions = [
  "Single Bed",
  "Double Bed",
  "Queen Bed",
  "King Bed",
  "Twin Beds",
  "Bunk Bed",
  "Sofa Bed",
  "No Bed",
];

const roomAmenityOptions = [
  "Air Conditioning",
  "Private Bathroom",
  "TV",
  "Free WiFi",
  "Balcony",
  "Mini Fridge",
  "Coffee Maker",
  "Safe",
  "Desk",
  "Hairdryer",
  "Iron",
  "Wardrobe",
];

export interface RoomDetails {
  id: string;
  roomType: string;
  bedType: string;
  maxOccupancy: number;
  basePricePerNight: number;
  pricePerExtraGuest: number;
  weeklyPricing: {
    monday: number;
    tuesday: number;
    wednesday: number;
    thursday: number;
    friday: number;
    saturday: number;
    sunday: number;
  };
  description: string;
  amenities: string[];
  customAmenities: string[];
  photos: File[];
  photoPreviews: string[];
}

const PageAddListing3 = () => {
  const { formData, setFormData } = useFormData();
  const router = useRouter();
  const { propertyDetails, setPropertyDetails } = useListingStore();
  console.log("property details on page 3", propertyDetails);
  const { roomDetails, addRoomDetail, updateRoomDetail, removeRoomDetail } =
    useListingStore();

  const [currentStep, setCurrentStep] = useState<
    "overview" | "roomTypeSelection" | "roomDetails"
  >("overview");
  const [editingRoomId, setEditingRoomId] = useState<string | null>(null);

  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [customAmenities, setCustomAmenities] = useState<string[]>([]);
  const [newAmenity, setNewAmenity] = useState("");
  const [showAddAmenity, setShowAddAmenity] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<File[]>([]);
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([]);
  const [roomTypeImages, setRoomTypeImages] = useState<{
    [key: string]: File[];
  }>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      roomType: "",
      bedType: "",
      maxOccupancy: 2,
      basePricePerNight: 0,
      pricePerExtraGuest: 0,
      mondayPrice: 0,
      tuesdayPrice: 0,
      wednesdayPrice: 0,
      thursdayPrice: 0,
      fridayPrice: 0,
      saturdayPrice: 0,
      sundayPrice: 0,
      description: "",
    },
  });

  const selectedRoomType = watch("roomType");

  const availableRoomTypes = roomTypeOptions.filter(
    (type) => !roomDetails.some((room) => room.roomType === type)
  );

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
    } else {
      setSelectedAmenities([...selectedAmenities, amenity]);
    }
  };

  const addCustomAmenity = () => {
    if (newAmenity.trim() && !customAmenities.includes(newAmenity.trim())) {
      const updatedCustomAmenities = [...customAmenities, newAmenity.trim()];
      setCustomAmenities(updatedCustomAmenities);
      setSelectedAmenities([...selectedAmenities, newAmenity.trim()]);
      setNewAmenity("");
      setShowAddAmenity(false);
    }
  };

  const removeCustomAmenity = (amenity: string) => {
    setCustomAmenities(customAmenities.filter((a) => a !== amenity));
    setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity));
  };

  const handlePhotoUpload = (
    roomType: string,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files) {
      const newFiles = Array.from(files);
      console.log("room photos: ", newFiles, roomType);
      setUploadedPhotos((prev) => [...prev, ...newFiles]);
      console.log("room details on page 3: ", roomDetails);
      roomDetails.forEach((room) => {
        if (room.roomType === roomType) {
          room.photos = newFiles;
        }
      });
      setRoomTypeImages((prev) => ({ ...prev, [roomType]: newFiles }));

      console.log("room details after upload: ", roomDetails);

      // roomDetails.newFiles.forEach((file) => {
      //   const reader = new FileReader();
      //   reader.onload = (e) => {
      //     if (e.target?.result) {
      //       setPhotoPreviews((prev) => [...prev, e.target!.result as string]);
      //     }
      //   };
      //   reader.readAsDataURL(file);
      // });
    }
  };

  const removePhoto = (index: number) => {
    const newPhotos = uploadedPhotos.filter((_, i) => i !== index);
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setUploadedPhotos(newPhotos);
    setPhotoPreviews(newPreviews);
  };

  const handleRoomTypeSelection = (roomType: string) => {
    setValue("roomType", roomType);
    setCurrentStep("roomDetails");
  };

  const resetFormStates = () => {
    setSelectedAmenities([]);
    setCustomAmenities([]);
    setUploadedPhotos([]);
    setPhotoPreviews([]);
    setNewAmenity("");
    setShowAddAmenity(false);
    reset();
  };

  const startAddingNewRoom = () => {
    resetFormStates();
    setEditingRoomId(null);
    setCurrentStep("roomTypeSelection");
  };

  const editRoomType = (roomId: string) => {
    const room = roomDetails.find((r) => r.id === roomId);
    if (room) {
      // Populate form with existing data
      setValue("roomType", room.roomType);
      setValue("bedType", room.bedType);
      setValue("maxOccupancy", room.maxOccupancy);
      setValue("basePricePerNight", room.basePricePerNight);

      setValue("pricePerExtraGuest", room.pricePerExtraGuest);

      setValue("mondayPrice", room.weeklyPricing?.monday || 0);
      setValue("tuesdayPrice", room.weeklyPricing?.tuesday || 0);
      setValue("wednesdayPrice", room.weeklyPricing?.wednesday || 0);
      setValue("thursdayPrice", room.weeklyPricing?.thursday || 0);
      setValue("fridayPrice", room.weeklyPricing?.friday || 0);
      setValue("saturdayPrice", room.weeklyPricing?.saturday || 0);
      setValue("sundayPrice", room.weeklyPricing?.sunday || 0);

      setValue("description", room.description);
      setSelectedAmenities(room.amenities);
      setCustomAmenities(room.customAmenities);
      setUploadedPhotos(room.photos);
      setPhotoPreviews(room.photoPreviews);
      setEditingRoomId(roomId);
      setCurrentStep("roomDetails");
    }
  };

  const deleteRoomType = (roomId: string) => {
    removeRoomDetail(roomId);
  };

  const onSubmitRoomDetails = (data: any) => {
    const roomData: RoomDetails = {
      id: editingRoomId || Date.now().toString(),
      roomType: data.roomType,
      bedType: data.bedType,
      maxOccupancy: data.maxOccupancy,
      basePricePerNight: data.basePricePerNight,
      pricePerExtraGuest: data.pricePerExtraGuest,
      weeklyPricing: {
        monday: data.mondayPrice,
        tuesday: data.tuesdayPrice,
        wednesday: data.wednesdayPrice,
        thursday: data.thursdayPrice,
        friday: data.fridayPrice,
        saturday: data.saturdayPrice,
        sunday: data.sundayPrice,
      },
      description: data.description,
      amenities: selectedAmenities,
      customAmenities: customAmenities,
      photos: roomTypeImages?.[data.roomType] || [],
      photoPreviews: photoPreviews,
    };

    if (editingRoomId) {
      updateRoomDetail(editingRoomId, roomData);
    } else {
      addRoomDetail(roomData);
    }

    resetFormStates();
    setEditingRoomId(null);
    setCurrentStep("overview");
  };

  const proceedToNextStep = () => {
    // Save all room types to form data
    // setFormData({ ...formData, roomTypes: roomTypes })
    router.push("/add-hotel/4");
  };

  const goBack = () => {
    if (currentStep === "roomDetails") {
      if (editingRoomId) {
        setCurrentStep("overview");
      } else {
        setCurrentStep("roomTypeSelection");
      }
    } else if (currentStep === "roomTypeSelection") {
      setCurrentStep("overview");
    } else {
      router.push("/add-hotel/2");
    }
  };

  // Overview Step - Show all added room types
  if (currentStep === "overview") {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Header */}
        <header className="border-b border-gray-100 py-6 px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-900">
              {propertyDetails.propertyName}
            </h1>
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
                  isActive={true}
                  isCompleted={false}
                />
                <ProgressItem
                  icon={<ShieldAlert className="w-4 h-4" />}
                  label="Policies"
                  isActive={false}
                  isCompleted={false}
                />
                <ProgressItem
                  icon={<ArrowRight className="w-4 h-4" />}
                  label="Review & Submit"
                  isActive={false}
                  isCompleted={false}
                />
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-light mb-3 text-gray-900">
                  Room Types Overview
                </h2>
                <p className="text-gray-500">
                  Add all the different room types available in your property.
                  You can add multiple room types with different pricing and
                  amenities.
                </p>
              </motion.div>

              {roomDetails.length === 0 ? (
                <div className="text-center py-12">
                  <Bed className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No Room Types Added Yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start by adding your first room type to continue.
                  </p>
                  <button
                    onClick={startAddingNewRoom}
                    className="py-3 px-6 bg-orange-500 text-white rounded-lg font-medium hover:bg-orange-600 transition-colors flex items-center gap-2 mx-auto"
                  >
                    <Plus className="w-4 h-4" />
                    Add First Room Type
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Added Room Types */}
                  <div className="grid gap-4">
                    {roomDetails.map((room) => (
                      <motion.div
                        key={room.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border border-gray-200 rounded-lg p-6 hover:border-gray-300 transition-colors"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <Bed className="w-5 h-5 text-orange-500" />
                              <h3 className="text-lg font-medium text-gray-900">
                                {room.roomType}
                              </h3>
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                Configured
                              </span>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600">
                              <div>
                                <span className="font-medium">Bed Type:</span>{" "}
                                {room.bedType}
                              </div>
                              <div>
                                <span className="font-medium">
                                  Max Occupancy:
                                </span>{" "}
                                {room.maxOccupancy} guests
                              </div>
                              <div>
                                <span className="font-medium">Price:</span> ₹
                                {room.basePricePerNight || 0}/night
                              </div>
                              <div>
                                <span className="font-medium">Photos:</span>{" "}
                                {room.photos.length} uploaded
                              </div>
                            </div>
                            <div className="mt-2">
                              <span className="font-medium text-sm text-gray-600">
                                Amenities:
                              </span>
                              <div className="flex flex-wrap gap-1 mt-1">
                                {room.amenities.slice(0, 3).map((amenity) => (
                                  <span
                                    key={amenity}
                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                  >
                                    {amenity}
                                  </span>
                                ))}
                                {room.amenities.length > 3 && (
                                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded">
                                    +{room.amenities.length - 3} more
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 ml-4">
                            <button
                              onClick={() => editRoomType(room.id)}
                              className="p-2 text-gray-500 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-colors"
                              title="Edit Room Type"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteRoomType(room.id)}
                              className="p-2 text-gray-500 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                              title="Delete Room Type"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Add Another Room Type */}
                  {availableRoomTypes.length > 0 && (
                    <div className="border-2 border-dashed border-gray-200 rounded-lg p-6 text-center">
                      <Plus className="w-8 h-8 text-gray-300 mx-auto mb-2" />
                      <p className="text-sm text-gray-500 mb-4">
                        Add another room type to your property
                      </p>
                      <button
                        onClick={startAddingNewRoom}
                        className="py-2 px-4 bg-white border border-gray-200 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                      >
                        Add Room Type
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={goBack}
                  className="py-3 px-6 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </motion.button>

                {roomDetails.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={proceedToNextStep}
                    className="py-3 px-8 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 flex items-center justify-center gap-2 group"
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Room Type Selection Step
  if (currentStep === "roomTypeSelection") {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        {/* Header */}
        <header className="border-b border-gray-100 py-6 px-8">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <h1 className="text-2xl font-light text-gray-900">
              Add New Listing
            </h1>
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
                  isActive={true}
                  isCompleted={false}
                />
                <ProgressItem
                  icon={<FileText className="w-4 h-4" />}
                  label="Photos & Documents"
                  isActive={false}
                  isCompleted={false}
                />
              </div>
            </div>
          </div>

          {/* Main Form Area */}
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="max-w-5xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <h2 className="text-3xl font-light mb-3 text-gray-900">
                  Select Room Type
                </h2>
                <p className="text-gray-500">
                  Choose the type of room you want to add to your property
                  listing.
                </p>
                {roomDetails.length > 0 && (
                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-sm text-blue-700">
                      You have already added {roomDetails.length} room type
                      {roomDetails.length > 1 ? "s" : ""}. You can add more room
                      types with different configurations.
                    </p>
                  </div>
                )}
              </motion.div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {availableRoomTypes.map((roomType) => (
                  <motion.div
                    key={roomType}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    onClick={() => handleRoomTypeSelection(roomType)}
                    className="p-6 border border-gray-200 rounded-lg cursor-pointer hover:border-orange-400 hover:bg-orange-50 transition-all group"
                  >
                    <div className="flex items-center gap-3">
                      <Bed className="w-6 h-6 text-gray-400 group-hover:text-orange-500" />
                      <span className="text-lg font-medium text-gray-900 group-hover:text-orange-600">
                        {roomType}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {availableRoomTypes.length === 0 && (
                <div className="text-center py-12">
                  <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    All Room Types Added
                  </h3>
                  <p className="text-gray-500">
                    You have added all available room types. You can go back to
                    review or continue to the next step.
                  </p>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-8 border-t border-gray-100 mt-8">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={goBack}
                  className="py-3 px-6 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </motion.button>
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Room Details Step (same as before but with save functionality)
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
                isActive={true}
                isCompleted={false}
              />
              <ProgressItem
                icon={<ShieldAlert className="w-4 h-4" />}
                label="Policies"
                isActive={false}
                isCompleted={false}
              />
            </div>
          </div>
        </div>

        {/* Main Form Area */}
        <div className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-light mb-3 text-gray-900">
                {editingRoomId ? "Edit" : "Add"} {selectedRoomType} Details
              </h2>
              <p className="text-gray-500">
                Please provide detailed information about your{" "}
                {selectedRoomType.toLowerCase()}.
              </p>
            </motion.div>

            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 mb-8 flex items-start gap-3">
              <div className="text-orange-500 mt-0.5">
                <Info className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-orange-700">
                  {editingRoomId ? "Editing" : "Adding"} Room Type:{" "}
                  <strong>{selectedRoomType}</strong>.
                  {!editingRoomId &&
                    " You can add more room types after saving this one."}
                </p>
              </div>
            </div>

            <form
              onSubmit={handleSubmit(onSubmitRoomDetails)}
              className="space-y-10"
            >
              {/* Basic Room Information */}
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Basic Room Information
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Bed Type */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Bed Type</label>
                    <div className="relative">
                      <select
                        {...register("bedType", {
                          required: "Bed type is required",
                        })}
                        className="w-full p-3 pr-10 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                      >
                        <option value="">Select Bed Type</option>
                        {bedTypeOptions.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                        <Bed className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                    {errors.bedType && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.bedType.message}
                      </p>
                    )}
                  </div>

                  {/* Max Occupancy */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">
                      Maximum Occupancy*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Users className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        {...register("maxOccupancy", {
                          required: "Maximum occupancy is required",
                          min: { value: 1, message: "Minimum occupancy is 1" },
                        })}
                        max={100}
                        placeholder="Max Guests"
                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                        min="1"
                      />
                    </div>
                    {errors.maxOccupancy && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.maxOccupancy.message}
                      </p>
                    )}
                  </div>

                  {/* Price Per Night */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">
                      Price Per Night*
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IndianRupee className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        {...register("basePricePerNight", {
                          required: "Price is required",
                          min: {
                            value: 0,
                            message: "Price cannot be negative",
                          },
                        })}
                        placeholder="Price"
                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                        min="0"
                        step="1"
                      />
                    </div>
                    {errors.basePricePerNight && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.basePricePerNight.message}
                      </p>
                    )}
                  </div>

                  {/* Price Per Extra Guest */}
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">
                      Price Per Extra Guest
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <IndianRupee className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="number"
                        {...register("pricePerExtraGuest", {
                          min: {
                            value: 0,
                            message: "Price cannot be negative",
                          },
                        })}
                        placeholder="Extra Guest Price"
                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                        min="0"
                        step="1"
                      />
                    </div>
                    {errors.pricePerExtraGuest && (
                      <p className="text-red-500 text-xs mt-1">
                        {errors.pricePerExtraGuest.message}
                      </p>
                    )}
                    <p className="text-xs text-gray-500">
                      Additional charge per guest beyond base occupancy
                      (optional)
                    </p>
                  </div>
                </div>
              </div>

              {/* Weekly Pricing */}
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.25 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Weekly Pricing (Optional)
                </motion.h3>

                <p className="text-sm text-gray-500 mb-4">
                  Set different prices for each day of the week. Leave blank to
                  use the base price per night.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {[
                    { name: "mondayPrice", label: "Monday", day: "Mon" },
                    { name: "tuesdayPrice", label: "Tuesday", day: "Tue" },
                    { name: "wednesdayPrice", label: "Wednesday", day: "Wed" },
                    { name: "thursdayPrice", label: "Thursday", day: "Thu" },
                    { name: "fridayPrice", label: "Friday", day: "Fri" },
                    { name: "saturdayPrice", label: "Saturday", day: "Sat" },
                    { name: "sundayPrice", label: "Sunday", day: "Sun" },
                  ].map((dayField) => (
                    <div key={dayField.name} className="space-y-2">
                      <label className="text-sm text-gray-600">
                        {dayField.label}
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <IndianRupee className="w-4 h-4 text-gray-400" />
                        </div>
                        <input
                          type="number"
                          {...register(dayField.name as any, {
                            min: {
                              value: 0,
                              message: "Price cannot be negative",
                            },
                          })}
                          placeholder={`${dayField.day} Price`}
                          className="w-full p-3 pl-9 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400 text-sm"
                          min="0"
                          step="1"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Room Description */}
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Room Description
                </motion.h3>

                <div className="space-y-2">
                  <label className="text-sm text-gray-600">
                    Room Description
                  </label>
                  <textarea
                    {...register("description", {
                      required: "Description is required",
                    })}
                    placeholder="Describe the features and amenities of this room..."
                    className="w-full p-4 border text-gray-600 border-gray-200 rounded-lg min-h-[120px] focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Room Amenities */}
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Room Amenities
                </motion.h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {roomAmenityOptions.map((amenity) => (
                    <div
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
                        selectedAmenities.includes(amenity)
                          ? "border-orange-400 bg-orange-50 text-orange-600"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {selectedAmenities.includes(amenity) ? (
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                      )}
                      <span className="text-sm">{amenity}</span>
                    </div>
                  ))}

                  {/* Custom Amenities */}
                  {customAmenities.map((amenity) => (
                    <div
                      key={amenity}
                      onClick={() => toggleAmenity(amenity)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all flex items-center gap-2 ${
                        selectedAmenities.includes(amenity)
                          ? "border-orange-400 bg-orange-50 text-orange-600"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {selectedAmenities.includes(amenity) ? (
                        <CheckCircle className="w-4 h-4 text-orange-500" />
                      ) : (
                        <div className="w-4 h-4 rounded-full border border-gray-300"></div>
                      )}
                      <span className="text-sm">{amenity}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeCustomAmenity(amenity);
                        }}
                        className="ml-auto text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add Custom Amenity */}
                <div className="mt-4">
                  {!showAddAmenity ? (
                    <button
                      type="button"
                      onClick={() => setShowAddAmenity(true)}
                      className="text-sm text-orange-500 hover:text-orange-600 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Custom Amenity
                    </button>
                  ) : (
                    <div className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={newAmenity}
                        onChange={(e) => setNewAmenity(e.target.value)}
                        placeholder="Enter custom amenity"
                        className="flex-1 p-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                        onKeyPress={(e) =>
                          e.key === "Enter" && addCustomAmenity()
                        }
                      />
                      <button
                        type="button"
                        onClick={addCustomAmenity}
                        className="px-3 py-2 bg-orange-500 text-white rounded-lg text-sm hover:bg-orange-600"
                      >
                        Add
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setShowAddAmenity(false);
                          setNewAmenity("");
                        }}
                        className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Room Photos */}
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Room Photos
                </motion.h3>

                <div className="space-y-4">
                  {/* Upload Area */}
                  <div className="border-2 border-dashed border-gray-200 rounded-lg p-8 text-center">
                    <div className="flex flex-col items-center">
                      <Upload className="w-10 h-10 text-gray-300 mb-2" />
                      <p className="text-sm text-gray-500 mb-2">
                        Drag and drop room photos here
                      </p>
                      <p className="text-xs text-gray-400 mb-4">or</p>
                      <label className="py-2 px-4 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer">
                        Browse Files
                        <input
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) =>
                            handlePhotoUpload(selectedRoomType, e)
                          }
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>

                  {/* Photo Previews */}
                  {photoPreviews.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {photoPreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview || "/placeholder.svg"}
                            alt={`Room photo ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removePhoto(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    Upload high-quality images that showcase this room type.
                    Recommended: at least 3-5 photos.
                  </p>
                </div>
              </div>

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-gray-100">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={goBack}
                  className="py-3 px-6 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-gray-50 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-200 flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </motion.button>

                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="py-3 px-8 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 flex items-center justify-center gap-2 group"
                >
                  {editingRoomId ? "Update Room Type" : "Save Room Type"}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </main>
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

export default PageAddListing3;
