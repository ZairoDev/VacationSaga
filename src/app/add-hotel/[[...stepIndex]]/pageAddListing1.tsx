"use client"

import type React from "react"

import { useForm } from "react-hook-form"
import { useFormData } from "../formItem"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { User, Mail, Phone, ArrowRight, FileText, UserCircle, Home, ClipboardList } from "lucide-react"

const PageAddListing1 = () => {
  const { formData, setFormData } = useFormData()
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: formData.ownerDetails,
  })

  const onSubmit = (data: any) => {
    setFormData({ ...formData, ownerDetails: data })
    router.push("/add-hotel/2")
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-light text-gray-900">Add New Listing</h1>
          {/* <div className="flex items-center gap-2">
            <button className="text-sm text-gray-500 hover:text-gray-700">Save Draft</button>
            <button className="text-sm bg-orange-50 text-orange-600 px-4 py-2 rounded-lg hover:bg-orange-100 transition-colors">
              Help
            </button>
          </div> */}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex">
        {/* Left Sidebar - Progress */}
        <div className="w-64 border-r border-gray-100 p-8 hidden lg:block">
          <div className="space-y-6">
            <h3 className="text-sm uppercase text-gray-500 font-medium tracking-wider">Listing Progress</h3>

            <div className="space-y-3">
              <ProgressItem
                icon={<User className="w-4 h-4" />}
                label="Owner Details"
                isActive={true}
                isCompleted={false}
              />
              <ProgressItem
                icon={<Home className="w-4 h-4" />}
                label="Property Details"
                isActive={false}
                isCompleted={false}
              />
              <ProgressItem
                icon={<ClipboardList className="w-4 h-4" />}
                label="Amenities"
                isActive={false}
                isCompleted={false}
              />
              <ProgressItem
                icon={<FileText className="w-4 h-4" />}
                label="Photos & Documents"
                isActive={false}
                isCompleted={false}
              />
            </div>

            {/* <div className="pt-6 border-t border-gray-100">
              <div className="bg-orange-50 p-4 rounded-lg">
                <h4 className="text-sm font-medium text-orange-700 mb-2">Need Help?</h4>
                <p className="text-xs text-orange-600">
                  Our support team is available 24/7 to assist you with your listing.
                </p>
                <button className="text-xs text-orange-700 font-medium mt-2 hover:underline">Contact Support</button>
              </div>
            </div> */}
          </div>
        </div>

     
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-light mb-3 text-gray-900">Owner Details</h2>
              <p className="text-gray-500">
                Please provide your contact information for this listing. This information will be used for verification
                and communication purposes.
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
                    Owner Information
                  </motion.h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      icon={<User className="w-5 h-5 text-gray-400" />}
                      register={register("name", { required: "Name is required" })}
                      placeholder="Owner Name"
                    //   error={errors.name?.message}
                      delay={0.3}
                    />

                    <FormField
                      icon={<Mail className="w-5 h-5 text-gray-400" />}
                      register={register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address",
                        },
                      })}
                      placeholder="Email Address"
                    //   error={errors.email?.message}
                      delay={0.4}
                    />

                    <FormField
                      icon={<Phone className="w-5 h-5 text-gray-400" />}
                      register={register("phone", { required: "Phone number is required" })}
                      placeholder="Phone Number"
                    //   error={errors.phone?.message}
                      delay={0.5}
                    />

                    <FormField
                      icon={<Phone className="w-5 h-5 text-gray-400" />}
                      register={register("alternateContact")}
                      placeholder="Alternate Contact Number"
                    //   error={errors.alternateContact?.message}
                      delay={0.6}
                    />

                    <FormField
                      icon={<FileText className="w-5 h-5 text-gray-400" />}
                      register={register("aadharCard", { required: "Aadhar Card number is required" })}
                      placeholder="Aadhar Card Number"
                    //   error={errors.aadharCard?.message}
                      delay={0.7}
                      className="md:col-span-2"
                    />
                  </div>
                </div>

                <div>
                  <motion.h3
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider"
                  >
                    Property Manager
                  </motion.h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      icon={<UserCircle className="w-5 h-5 text-gray-400" />}
                      register={register("managerName")}
                      placeholder="Manager Name (if different from owner)"
                    //   error={errors.managerName?.message}
                      delay={0.9}
                    />

                    <FormField
                      icon={<Phone className="w-5 h-5 text-gray-400" />}
                      register={register("managerContact")}
                      placeholder="Manager Contact Number"
                    //   error={errors.managerContact?.message}
                      delay={1.0}
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-6 border-t border-gray-100">
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.1 }}
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
  icon: React.ReactNode
  register: any
  placeholder: string
  error?: string
  delay: number
  className?: string
}

const FormField = ({ icon, register, placeholder, error, delay, className = "" }: FormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative ${className}`}
    >
      <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-400 transition-all">
        <div className="pl-4 pr-2">{icon}</div>
        <input
          {...register}
          className="p-3 w-full outline-none text-gray-700 placeholder-gray-400"
          placeholder={placeholder}
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </motion.div>
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
    <div className={`flex items-center gap-3 ${isActive ? "text-orange-500" : "text-gray-500"}`}>
      <div
        className={`w-6 h-6 rounded-full flex items-center justify-center ${
          isCompleted ? "bg-orange-500 text-white" : isActive ? "bg-orange-100 text-orange-500" : "bg-gray-100"
        }`}
      >
        {icon}
      </div>
      <span className={`text-sm ${isActive ? "font-medium" : ""}`}>{label}</span>
    </div>
  )
}

export default PageAddListing1
