"use client"

import type React from "react"
import { useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { useFormData } from "../formItem"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { useListingStore } from "@/app/Store/hotelListingStore"
import { User, Home, ClipboardList, MapPin, Star, Bed, Clock, Calendar, Plus, Trash2, ArrowRight, ArrowLeft, CheckCircle, ShieldAlert } from 'lucide-react'


const roomTypeOptions = [
  "Classic Room",
  "Deluxe Room", 
  "Presidential Suite",
]

const amenityOptions = [
  "Wi-Fi",
  "Swimming Pool",
  "Gym",
  "Restaurant",
  "Bar",
  "Spa",
  "Room Service",
  "Parking",
  "Air Conditioning",
  "Minibar",
  "Safe",
  "Laundry Service",
  "Conference Room",
  "Business Center",
]

const PageAddListing2 = () => {
  const { propertyDetails, setPropertyDetails } = useListingStore()
  const { formData, setFormData } = useFormData()
  const router = useRouter()
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(formData.propertyDetails?.amenities || [])
  const [starRating, setStarRating] = useState<number>(formData.propertyDetails?.starRating || 0)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: propertyDetails,
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: "roomTypes",
  })

  const toggleAmenity = (amenity: string) => {
    if (selectedAmenities.includes(amenity)) {
      setSelectedAmenities(selectedAmenities.filter((a) => a !== amenity))
    } else {
      setSelectedAmenities([...selectedAmenities, amenity])
    }
  }

  const onSubmit = (data: any) => {
    data.amenities = selectedAmenities
    setPropertyDetails( data)
    router.push("/add-hotel/3")
  }

  const goBack = () => {
    router.push("/add-hotel/1")
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <header className="border-b border-gray-100 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-light text-gray-900">Add New Listing</h1>
          
        </div>
      </header>

  
      <main className="flex-1 flex">

        <div className="w-64 border-r border-gray-100 p-8 hidden lg:block">
          <div className="space-y-6">
            <h3 className="text-sm uppercase text-gray-500 font-medium tracking-wider">Listing Progress</h3>

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
                isActive={true}
                isCompleted={false}
              />
              <ProgressItem
                icon={<ClipboardList className="w-4 h-4" />}
                label="Room Details"
                isActive={false}
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
              <h2 className="text-3xl font-light mb-3 text-gray-900">Property Details</h2>
              <p className="text-gray-500">
                Please provide information about your property. This will help guests find and book your property.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
    
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Basic Information
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    icon={<Home className="w-5 h-5 text-gray-400" />}
                    register={register("propertyName", { required: "Property name is required" })}
                    placeholder="Property Name"
                   
                    delay={0.3}
                    className="md:col-span-2"
                  />

                  <div className="space-y-1">
                    <label className="text-sm text-gray-600">Property Star Rating</label>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((rating) => (
                        <StarRating
                          key={rating}
                          rating={rating}
                          register={register("starRating", { required: true })}
                          currentRating={starRating}
                          onRatingChange={setStarRating}
                        />
                      ))}
                    </div>
                  </div>

                  <FormField
                    icon={<Bed className="w-5 h-5 text-gray-400" />}
                    register={register("numberOfRooms", {
                      required: "Number of rooms is required",
                      min: { value: 1, message: "Must have at least 1 room" },
                    })}
                    placeholder="Total Number of Rooms"
                    delay={0.4}
                    type="number"
                  />
                </div>
              </div>

      
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Room Types
                </motion.h3>

                <div className="space-y-4">
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-start gap-4">
                      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <select
                            {...register(`roomTypes.${index}.type` as const, { required: "Room type is required" })}
                            className="w-full p-3 pr-10 border border-gray-200 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                          >
                            <option value="">Select Room Type</option>
                            {roomTypeOptions.map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                            <Bed className="w-5 h-5 text-gray-400" />
                          </div>
                          
                        </div>

                        <div className="relative">
                          <input
                            type="number"
                            {...register(`roomTypes.${index}.quantity` as const, {
                              required: "Quantity is required",
                              min: { value: 1, message: "Minimum quantity is 1" },
                            })}
                            placeholder="Quantity"
                            className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                            min="1"
                          />
                          
                        </div>
                      </div>

                      {index > 0 && (
                        <button
                          type="button"
                          onClick={() => remove(index)}
                          className="mt-2 p-2 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => append({ type: "", quantity: 1 })}
                    className="flex items-center gap-2 text-sm text-orange-500 font-medium hover:text-orange-600 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Another Room Type
                  </button>
                </div>
              </div>

     
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Location
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    icon={<MapPin className="w-5 h-5 text-gray-400" />}
                    register={register("location.address", { required: "Address is required" })}
                    placeholder="Street Address"
                    
                    delay={0.7}
                    className="md:col-span-2"
                  />

                  <FormField
                    register={register("location.city", { required: "City is required" })}
                    placeholder="City"
                    delay={0.8}
                  />

                  <FormField
                    register={register("location.state", { required: "State is required" })}
                    placeholder="State/Province"
                    
                    delay={0.9}
                  />

                  <FormField
                    register={register("location.country", { required: "Country is required" })}
                    placeholder="Country"
                    delay={1.0}
                  />
                </div>
              </div>

              
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Amenities
                </motion.h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {amenityOptions.map((amenity) => (
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
                </div>
              </div>

            
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Check-in & Check-out
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Check-in Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        {...register("checkInTime", { required: "Check-in time is required" })}
                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                      />
                      {/* {errors.checkInTime && (
                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.checkInTime.message}</p>
                      )} */}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Check-out Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="time"
                        {...register("checkOutTime", { required: "Check-out time is required" })}
                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                      />
                      
                    </div>
                  </div>
                </div>
              </div>

             
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.3 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Additional Information
                </motion.h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm text-gray-600">Operating Since</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar className="w-5 h-5 text-gray-400" />
                      </div>
                      <input
                        type="date"
                        {...register("operatingSince")}
                        className="w-full p-3 pl-10 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                      />
                    </div>
                  </div>

                </div>
              </div>

             
              <div>
                <motion.h3
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.4 }}
                  className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                >
                  Property Description
                </motion.h3>

                <div className="relative">
                  <textarea
                    {...register("description", { required: "Description is required" })}
                    placeholder="Describe your property, its unique features, and what makes it special..."
                    className="w-full p-4 border border-gray-200 rounded-lg min-h-[150px] focus:outline-none focus:ring-2 focus:ring-orange-100 focus:border-orange-400"
                  ></textarea>
                 
                </div>
              </div>

           
              <div className="flex justify-between pt-6 border-t border-gray-100">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
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
                  transition={{ delay: 1.5 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  onClick={handleSubmit(onSubmit)}
                  className="py-3 px-8 bg-white border border-gray-200 rounded-lg text-gray-800 font-medium hover:bg-orange-500 hover:text-white hover:border-orange-500 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 flex items-center justify-center gap-2 group"
                >
                  Continue
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  )
}

interface FormFieldProps {
  icon?: React.ReactNode
  register: any
  placeholder: string
  error?: string
  delay?: number
  className?: string
  type?: string
}

const FormField = ({
  icon,
  register,
  placeholder,
  error,
  delay = 0,
  className = "",
  type = "text",
}: FormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative ${className}`}
    >
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-400 transition-all">
        {icon && <div className="pl-4 pr-2">{icon}</div>}
        <input
          type={type}
          {...register}
          className="p-3 w-full outline-none text-gray-700 placeholder-gray-400"
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </motion.div>
  )
}

interface StarRatingProps {
  rating: number
  register: any
  currentRating: number
  onRatingChange: (rating: number) => void
}

const StarRating = ({ rating, register, currentRating, onRatingChange }: StarRatingProps) => {
  return (
    <label className="cursor-pointer">
      <input 
        type="radio" 
        value={rating} 
        {...register} 
        className="hidden" 
        onChange={() => onRatingChange(rating)}
      />
      <Star 
        className={`w-8 h-8 transition-colors ${
          rating <= currentRating 
            ? "text-orange-400 fill-orange-400" 
            : "text-gray-300 hover:text-orange-300"
        }`} 
      />
    </label>
  )
}

interface ProgressItemProps {
  icon: React.ReactNode
  label: string
  isActive: boolean
  isCompleted: boolean
}

const ProgressItem = ({ icon, label, isActive, isCompleted }: ProgressItemProps) => {
  return (
    <div
      className={`flex items-center gap-3 ${isActive ? "text-orange-500" : isCompleted ? "text-green-500" : "text-gray-500"}`}
    >
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isCompleted ? "bg-green-100 text-green-500" : isActive ? "bg-orange-100 text-orange-500" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <span className={`text-sm ${isActive ? "font-medium" : ""}`}>{label}</span>
    </div>
  )
}

export default PageAddListing2