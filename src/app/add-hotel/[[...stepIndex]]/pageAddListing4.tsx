"use client"

import type React from "react"
import { useForm } from "react-hook-form"
import { useFormData } from "../formItem"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import {
  User,
  Home,
  ArrowRight,
  ClipboardList,
  FileTextIcon as FileText2,
  PawPrint,
  Cigarette,
  ShieldAlert,
  Plus,
  X,
} from "lucide-react"
import { useListingStore } from "@/app/Store/hotelListingStore"

const PageAddListing4 = () => {
  const { formData, setFormData } = useFormData()
  const { policies, setPolicies } = useListingStore()
  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
  defaultValues: {
    ...policies,
    houseRulesList: policies.houseRules.length ? policies.houseRules : [""]
  }
})

  const allowPets = watch("allowPets")
  const allowSmoking = watch("allowSmoking")

  const onSubmit = (data: any) => {
  const updatedPolicies = {
    cancellationPolicy: data.cancellationPolicy,
    houseRules: data.houseRulesList,    // map it here
    allowPets: data.allowPets,
    allowSmoking: data.allowSmoking
  }

  setPolicies(updatedPolicies)
  router.push("/add-hotel/5")
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
                isActive={false}
                isCompleted={true}
              />
              <ProgressItem
                icon={<ClipboardList className="w-4 h-4" />}
                label="Room details"
                isActive={false}
                isCompleted={true}
              />
              <ProgressItem
                icon={<ShieldAlert className="w-4 h-4" />}
                label="Policies"
                isActive={true}
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
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-light mb-3 text-gray-900">Property Policies</h2>
              <p className="text-gray-500">
                Please provide information about your property&apos;s policies. Clear policies help set guest expectations
                and reduce misunderstandings.
              </p>
            </motion.div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
              <div className="space-y-8">
                <div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                  >
                    Cancellation Policy
                  </motion.h3>
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="relative"
                  >
                    <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-400 transition-all">
                      <div className="pl-4 pr-2 pt-3">
                        <FileText2 className="w-5 h-5 text-gray-400" />
                      </div>
                      <textarea
                        {...register("cancellationPolicy", {
                          required: "Cancellation policy is required",
                        })}
                        className="p-3 w-full outline-none text-gray-700 placeholder-gray-400 min-h-[120px] resize-y"
                        placeholder="Describe your cancellation policy (e.g., 'Free cancellation up to 48 hours before check-in. After that, the first night is non-refundable.')"
                      />
                    </div>
                    {errors.cancellationPolicy && (
                      <p className="text-red-500 text-xs mt-1 ml-1">{errors.cancellationPolicy.message as string}</p>
                    )}
                  </motion.div>
                </div>

                <div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                  >
                    House Rules
                  </motion.h3>

                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.5 }}
                    className="relative"
                  >
                    <div className="space-y-3">
                      {(watch("houseRulesList") || [""]).map((rule: string, index: number) => (
                        <div key={index} className="flex items-start gap-2">
                          <div className="flex border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-400 transition-all flex-1">
                            <div className="pl-4 pr-2 pt-3">
                              <div className="w-2 h-2 bg-gray-400 rounded-full mt-1"></div>
                            </div>
                            <input
                              type="text"
                              value={rule}
                              onChange={(e) => {
                                const currentRules = watch("houseRulesList") || [""]
                                const newRules = [...currentRules]
                                newRules[index] = e.target.value
                                setValue("houseRulesList", newRules)
                              }}
                              className="p-3 w-full outline-none text-gray-700 placeholder-gray-400"
                              placeholder={`Rule ${index + 1} (e.g., "Check-in: 3 PM - 8 PM")`}
                            />
                          </div>
                          {(watch("houseRulesList") || [""]).length > 1 && (
                            <button
                              type="button"
                              onClick={() => {
                                const currentRules = watch("houseRulesList") || [""]
                                const newRules = currentRules.filter((_: string, i: number) => i !== index)
                                setValue("houseRulesList", newRules)
                              }}
                              className="mt-3 p-1 text-red-500 hover:bg-red-50 rounded transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      ))}

                      <button
                        type="button"
                        onClick={() => {
                          const currentRules = watch("houseRulesList") || [""]
                          setValue("houseRulesList", [...currentRules, ""])
                        }}
                        className="flex items-center gap-2 text-orange-500 hover:text-orange-600 text-sm font-medium transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                        Add another rule
                      </button>
                    </div>
                  </motion.div>
                </div>

                <div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                  >
                    Additional Policies
                  </motion.h3>
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.7 }}
                      className="flex items-center"
                    >
                      <div
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                          allowPets ? "bg-orange-500" : "bg-gray-200"
                        }`}
                        onClick={() => {
                          const newValue = !allowPets
                          setValue("allowPets", newValue)
                        }}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            allowPets ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </div>
                      <input type="checkbox" {...register("allowPets")} className="hidden" />
                      <label
                        className="flex items-center ml-3 cursor-pointer"
                        onClick={() => {
                          const newValue = !allowPets
                          setValue("allowPets", newValue)
                        }}
                      >
                        <PawPrint className={`w-5 h-5 mr-2 ${allowPets ? "text-orange-500" : "text-gray-400"}`} />
                        <span className="text-gray-700">Allow Pets</span>
                      </label>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.8 }}
                      className="flex items-center"
                    >
                      <div
                        className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 cursor-pointer ${
                          allowSmoking ? "bg-orange-500" : "bg-gray-200"
                        }`}
                        onClick={() => {
                          const newValue = !allowSmoking
                          setValue("allowSmoking", newValue)
                        }}
                      >
                        <div
                          className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${
                            allowSmoking ? "translate-x-6" : ""
                          }`}
                        ></div>
                      </div>
                      <input type="checkbox" {...register("allowSmoking")} className="hidden" />
                      <label
                        className="flex items-center ml-3 cursor-pointer"
                        onClick={() => {
                          const newValue = !allowSmoking
                          setValue("allowSmoking", newValue)
                        }}
                      >
                        <Cigarette className={`w-5 h-5 mr-2 ${allowSmoking ? "text-orange-500" : "text-gray-400"}`} />
                        <span className="text-gray-700">Allow Smoking</span>
                      </label>
                    </motion.div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
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

export default PageAddListing4
