"use client"
import type React from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import axios from "axios"
import { useListingStore } from "@/app/Store/hotelListingStore"
import { User, Mail, Phone, ArrowRight, FileText, UserCircle, Home, ClipboardList, ShieldAlert, CheckCircle, AlertCircle, ChevronDown } from 'lucide-react'
import { useState } from "react"

const PageAddListing1 = () => {
  const { ownerDetails, setOwnerDetails } = useListingStore()
  const [emailVerificationStep, setEmailVerificationStep] = useState<"initial" | "sent" | "verifying" | "verified">(
    "initial",
  )
  const [otp, setOtp] = useState("")
  const [isVerifying, setIsVerifying] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: ownerDetails,
  })

  const onSubmit = (data: any) => {
    setOwnerDetails(data)
    router.push("/add-hotel/2")
  }

  const handleVerifyEmail = async () => {
    const emailValue = getValues("email")

    if (!emailValue) {
      alert("Please enter an email first.")
      return
    }

    try {
      const res = await axios.post("/api/hotels/sendEmailVerification", {
        email: emailValue,
        otp: otp,
      })

      if (res.status === 200) {
        setEmailVerificationStep("sent")
      } else {
        alert("Failed to send verification email. Please try again.")
      }
    } catch (error) {
      console.error("Error sending verification email:", error)
      alert("Failed to send verification email.")
    }
  }

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter the complete 6-digit code.")
      return
    }

    setIsVerifying(true)
    try {
      const res = await axios.post("/api/hotels/verifyEmail", {
        email: getValues("email"),
        otp: otp,
      })

      if (res.status === 200) {
        setEmailVerificationStep("verified")
      } else {
        alert("Invalid verification code. Please try again.")
      }
    } catch (error) {
      console.error("Error verifying OTP:", error)
      alert("Failed to verify code. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }

  const handleResendCode = async () => {
    setOtp("")
    await handleVerifyEmail()
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 py-6 px-8 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-light text-gray-900">Add New Listing</h1>
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="w-64 border-r border-gray-200 p-8 hidden lg:block bg-white">
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
                label="Room details"
                isActive={false}
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

        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <h2 className="text-3xl font-light mb-3 text-gray-900">Owner Details</h2>
              <p className="text-gray-600">
                Please provide your contact information for this listing. This information will be used for verification
                and communication purposes.
              </p>
            </motion.div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
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
                        register={register("name", {
                          required: "Name is required",
                        })}
                        placeholder="Owner Name"
                        delay={0.3}
                        error={errors.name?.message}
                      />

                      <div className="space-y-4">
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
                          delay={0.4}
                          error={errors.email?.message}
                          disabled={emailVerificationStep === "verified"}
                        />

                        <AnimatePresence mode="wait">
                          {emailVerificationStep === "initial" && (
                            <motion.button
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              type="button"
                              onClick={handleVerifyEmail}
                              className="w-full px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2"
                            >
                              <Mail className="w-4 h-4" />
                              Verify Email
                            </motion.button>
                          )}

                          {emailVerificationStep === "sent" && (
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -10 }}
                              className="space-y-4"
                            >
                              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                                <div className="flex items-center gap-2 mb-2">
                                  <AlertCircle className="w-4 h-4 text-orange-600" />
                                  <span className="text-sm font-medium text-orange-800">Verification Email Sent!</span>
                                </div>
                                <p className="text-sm text-orange-700">
                                  We've sent a 6-digit verification code to your email. Please enter it below.
                                </p>
                              </div>

                              <div className="space-y-3">
                                <label className="text-sm font-medium text-gray-700">Enter Verification Code</label>
                                <div className="flex gap-2 justify-center">
                                  {[...Array(6)].map((_, index) => (
                                    <input
                                      key={index}
                                      type="text"
                                      maxLength={1}
                                      value={otp[index] || ""}
                                      onChange={(e) => {
                                        const newOtp = otp.split("")
                                        newOtp[index] = e.target.value
                                        setOtp(newOtp.join(""))

                                        // Auto-focus next input
                                        if (e.target.value && index < 5) {
                                          const nextInput = e.target.parentElement?.children[
                                            index + 1
                                          ] as HTMLInputElement
                                          if (nextInput) nextInput.focus()
                                        }
                                      }}
                                      onKeyDown={(e) => {
                                        // Handle backspace to go to previous input
                                        if (e.key === "Backspace" && !otp[index] && index > 0) {
                                          const prevInput = e.currentTarget.parentElement?.children[
                                            index - 1
                                          ] as HTMLInputElement
                                          if (prevInput) prevInput.focus()
                                        }
                                      }}
                                      className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                    />
                                  ))}
                                </div>
                              </div>

                              <div className="flex gap-3">
                                <button
                                  type="button"
                                  onClick={handleVerifyOtp}
                                  disabled={otp.length !== 6 || isVerifying}
                                  className="flex-1 px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                                >
                                  {isVerifying ? "Verifying..." : "Verify Code"}
                                </button>
                                <button
                                  type="button"
                                  onClick={handleResendCode}
                                  className="px-4 py-2 text-sm rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-50 transition-all duration-200"
                                >
                                  Resend
                                </button>
                              </div>
                            </motion.div>
                          )}

                          {emailVerificationStep === "verified" && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0.95 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="p-4 bg-green-50 border border-green-200 rounded-lg"
                            >
                              <div className="flex items-center gap-2">
                                <CheckCircle className="w-5 h-5 text-green-600" />
                                <span className="text-sm font-medium text-green-800">Email Verified Successfully!</span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      <PhoneField
                        register={register}
                        countryCodeName="countryCode"
                        phoneNumberName="phone"
                        placeholder="Phone Number"
                        delay={0.5}
                        error={errors.phone?.message}
                        required={true}
                      />

                      <PhoneField
                        register={register}
                        countryCodeName="alternateCountryCode"
                        phoneNumberName="alternateContact"
                        placeholder="Alternate Contact Number"
                        delay={0.6}
                      />

                      <FormField
                        icon={<FileText className="w-5 h-5 text-gray-400" />}
                        register={register("aadharCard", {
                          required: "Aadhar Card number is required",
                        })}
                        placeholder="Aadhar Card Number"
                        delay={0.7}
                        className="md:col-span-2"
                        error={errors.aadharCard?.message}
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
                        delay={0.9}
                      />
                      <PhoneField
                        register={register}
                        countryCodeName="managerCountryCode"
                        phoneNumberName="managerContact"
                        placeholder="Manager Contact Number"
                        delay={1.0}
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={emailVerificationStep !== "verified"}
                    className={`py-3 px-8 ${
                      emailVerificationStep !== "verified" 
                        ? "bg-gray-400 cursor-not-allowed" 
                        : "bg-orange-500 hover:bg-orange-600"
                    } text-white rounded-lg font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-orange-200 flex items-center justify-center gap-2 group`}
                  >
                    Continue
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

interface PhoneFieldProps {
  register: any
  countryCodeName: string
  phoneNumberName: string
  placeholder: string
  delay: number
  error?: string
  required?: boolean
}

const PhoneField = ({
  register,
  countryCodeName,
  phoneNumberName,
  placeholder,
  delay,
  error,
  required = false,
}: PhoneFieldProps) => {
  const countries = [
  { code: "+93", name: "Afghanistan" },
{ code: "+355", name: "Albania" },
{ code: "+213", name: "Algeria" },
{ code: "+376", name: "Andorra" },
{ code: "+244", name: "Angola" },
{ code: "+54", name: "Argentina" },
{ code: "+374", name: "Armenia" },
{ code: "+297", name: "Aruba" },
{ code: "+247", name: "Ascension Island" },
{ code: "+61", name: "Australia" },
{ code: "+43", name: "Austria" },
{ code: "+994", name: "Azerbaijan" },
{ code: "+973", name: "Bahrain" },
{ code: "+880", name: "Bangladesh" },
{ code: "+375", name: "Belarus" },
{ code: "+32", name: "Belgium" },
{ code: "+501", name: "Belize" },
{ code: "+229", name: "Benin" },
{ code: "+975", name: "Bhutan" },
{ code: "+591", name: "Bolivia" },
{ code: "+387", name: "Bosnia and Herzegovina" },
{ code: "+267", name: "Botswana" },
{ code: "+55", name: "Brazil" },
{ code: "+246", name: "British Indian Ocean Territory" },
{ code: "+673", name: "Brunei" },
{ code: "+359", name: "Bulgaria" },
{ code: "+226", name: "Burkina Faso" },
{ code: "+257", name: "Burundi" },
{ code: "+238", name: "Cape Verde" },
{ code: "+236", name: "Central African Republic" },
{ code: "+235", name: "Chad" },
{ code: "+56", name: "Chile" },
{ code: "+86", name: "China" },
{ code: "+57", name: "Colombia" },
{ code: "+269", name: "Comoros" },
{ code: "+242", name: "Congo" },
{ code: "+682", name: "Cook Islands" },
{ code: "+506", name: "Costa Rica" },
{ code: "+385", name: "Croatia" },
{ code: "+53", name: "Cuba" },
{ code: "+357", name: "Cyprus" },
{ code: "+420", name: "Czech Republic" },
{ code: "+243", name: "DR Congo" },
{ code: "+45", name: "Denmark" },
{ code: "+253", name: "Djibouti" },
{ code: "+593", name: "Ecuador" },
{ code: "+20", name: "Egypt" },
{ code: "+503", name: "El Salvador" },
{ code: "+240", name: "Equatorial Guinea" },
{ code: "+291", name: "Eritrea" },
{ code: "+372", name: "Estonia" },
{ code: "+268", name: "Eswatini" },
{ code: "+251", name: "Ethiopia" },
{ code: "+298", name: "Faroe Islands" },
{ code: "+679", name: "Fiji" },
{ code: "+358", name: "Finland" },
{ code: "+33", name: "France" },
{ code: "+241", name: "Gabon" },
{ code: "+220", name: "Gambia" },
{ code: "+995", name: "Georgia" },
{ code: "+49", name: "Germany" },
{ code: "+233", name: "Ghana" },
{ code: "+350", name: "Gibraltar" },
{ code: "+30", name: "Greece" },
{ code: "+299", name: "Greenland" },
{ code: "+502", name: "Guatemala" },
{ code: "+224", name: "Guinea" },
{ code: "+245", name: "Guinea-Bissau" },
{ code: "+592", name: "Guyana" },
{ code: "+509", name: "Haiti" },
{ code: "+504", name: "Honduras" },
{ code: "+852", name: "Hong Kong" },
{ code: "+36", name: "Hungary" },
{ code: "+354", name: "Iceland" },
{ code: "+91", name: "India" },
{ code: "+62", name: "Indonesia" },
{ code: "+98", name: "Iran" },
{ code: "+964", name: "Iraq" },
{ code: "+353", name: "Ireland" },
{ code: "+972", name: "Israel" },
{ code: "+39", name: "Italy" },
{ code: "+225", name: "Ivory Coast" },
{ code: "+876", name: "Jamaica" },
{ code: "+81", name: "Japan" },
{ code: "+962", name: "Jordan" },
{ code: "+7", name: "Kazakhstan" },
{ code: "+254", name: "Kenya" },
{ code: "+686", name: "Kiribati" },
{ code: "+965", name: "Kuwait" },
{ code: "+996", name: "Kyrgyzstan" },
{ code: "+856", name: "Laos" },
{ code: "+371", name: "Latvia" },
{ code: "+961", name: "Lebanon" },
{ code: "+266", name: "Lesotho" },
{ code: "+231", name: "Liberia" },
{ code: "+218", name: "Libya" },
{ code: "+423", name: "Liechtenstein" },
{ code: "+370", name: "Lithuania" },
{ code: "+352", name: "Luxembourg" },
{ code: "+853", name: "Macau" },
{ code: "+389", name: "North Macedonia" },
{ code: "+261", name: "Madagascar" },
{ code: "+265", name: "Malawi" },
{ code: "+60", name: "Malaysia" },
{ code: "+960", name: "Maldives" },
{ code: "+223", name: "Mali" },
{ code: "+356", name: "Malta" },
{ code: "+692", name: "Marshall Islands" },
{ code: "+222", name: "Mauritania" },
{ code: "+230", name: "Mauritius" },
{ code: "+52", name: "Mexico" },
{ code: "+691", name: "Micronesia" },
{ code: "+373", name: "Moldova" },
{ code: "+377", name: "Monaco" },
{ code: "+976", name: "Mongolia" },
{ code: "+382", name: "Montenegro" },
{ code: "+212", name: "Morocco" },
{ code: "+258", name: "Mozambique" },
{ code: "+95", name: "Myanmar" },
{ code: "+264", name: "Namibia" },
{ code: "+674", name: "Nauru" },
{ code: "+977", name: "Nepal" },
{ code: "+31", name: "Netherlands" },
{ code: "+64", name: "New Zealand" },
{ code: "+505", name: "Nicaragua" },
{ code: "+227", name: "Niger" },
{ code: "+234", name: "Nigeria" },
{ code: "+683", name: "Niue" },
{ code: "+850", name: "North Korea" },
{ code: "+47", name: "Norway" },
{ code: "+968", name: "Oman" },
{ code: "+92", name: "Pakistan" },
{ code: "+680", name: "Palau" },
{ code: "+970", name: "Palestine" },
{ code: "+507", name: "Panama" },
{ code: "+675", name: "Papua New Guinea" },
{ code: "+595", name: "Paraguay" },
{ code: "+51", name: "Peru" },
{ code: "+63", name: "Philippines" },
{ code: "+48", name: "Poland" },
{ code: "+351", name: "Portugal" },
{ code: "+974", name: "Qatar" },
{ code: "+262", name: "Reunion" },
{ code: "+40", name: "Romania" },
{ code: "+7", name: "Russia" },
{ code: "+250", name: "Rwanda" },
{ code: "+590", name: "Saint Barthelemy" },
{ code: "+290", name: "Saint Helena" },
{ code: "+508", name: "Saint Pierre and Miquelon" },
{ code: "+685", name: "Samoa" },
{ code: "+378", name: "San Marino" },
{ code: "+239", name: "Sao Tome and Principe" },
{ code: "+966", name: "Saudi Arabia" },
{ code: "+221", name: "Senegal" },
{ code: "+381", name: "Serbia" },
{ code: "+248", name: "Seychelles" },
{ code: "+232", name: "Sierra Leone" },
{ code: "+65", name: "Singapore" },
{ code: "+421", name: "Slovakia" },
{ code: "+386", name: "Slovenia" },
{ code: "+677", name: "Solomon Islands" },
{ code: "+252", name: "Somalia" },
{ code: "+27", name: "South Africa" },
{ code: "+82", name: "South Korea" },
{ code: "+211", name: "South Sudan" },
{ code: "+34", name: "Spain" },
{ code: "+94", name: "Sri Lanka" },
{ code: "+249", name: "Sudan" },
{ code: "+597", name: "Suriname" },
{ code: "+268", name: "Swaziland" },
{ code: "+46", name: "Sweden" },
{ code: "+41", name: "Switzerland" },
{ code: "+963", name: "Syria" },
{ code: "+886", name: "Taiwan" },
{ code: "+992", name: "Tajikistan" },
{ code: "+255", name: "Tanzania" },
{ code: "+66", name: "Thailand" },
{ code: "+228", name: "Togo" },
{ code: "+690", name: "Tokelau" },
{ code: "+676", name: "Tonga" },
{ code: "+216", name: "Tunisia" },
{ code: "+90", name: "Turkey" },
{ code: "+993", name: "Turkmenistan" },
{ code: "+688", name: "Tuvalu" },
{ code: "+256", name: "Uganda" },
{ code: "+380", name: "Ukraine" },
{ code: "+971", name: "United Arab Emirates" },
{ code: "+44", name: "United Kingdom" },
{ code: "+1", name: "United States/Canada" },
{ code: "+598", name: "Uruguay" },
{ code: "+998", name: "Uzbekistan" },
{ code: "+379", name: "Vatican City" },
{ code: "+58", name: "Venezuela" },
{ code: "+84", name: "Vietnam" },
{ code: "+681", name: "Wallis and Futuna" },
{ code: "+967", name: "Yemen" },
{ code: "+260", name: "Zambia" },
{ code: "+263", name: "Zimbabwe" }
];



  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="relative"
    >
      <div className="flex items-center border border-gray-300  overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all bg-white">
        <div className="pl-4 pr-2">
          <Phone className="w-5 h-5 text-gray-400" />
        </div>

        <div className="relative">
          <select
            {...register(countryCodeName, { required: required })}
            className="appearance-none bg-transparent border-none outline-none text-gray-700 pr-8 pl-2 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
            defaultValue="+91"
          >
            {countries.map((country) => (
              <option key={country.code} value={country.code}>
                 {country.code}
              </option>
            ))}
          </select>
          {/* <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" /> */}
        </div>

        <div className="w-px h-6 bg-gray-300 mx-2"></div>

        <input
          {...register(phoneNumberName, required ? { required: "Phone number is required" } : {})}
          className="p-3 flex-1 outline-none text-gray-700 placeholder-gray-400"
          placeholder={placeholder}
          type="tel"
        />
      </div>
      {error && <p className="text-red-500 text-xs mt-1 ml-1">{error}</p>}
    </motion.div>
  )
}

interface FormFieldProps {
  icon: React.ReactNode
  register: any
  placeholder: string
  error?: string
  delay: number
  className?: string
  disabled?: boolean
}

const FormField = ({ icon, register, placeholder, error, delay, className = "", disabled = false }: FormFieldProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className={`relative ${className}`}
    >
      <div
        className={`flex items-center border border-gray-300  overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all ${
          disabled ? "bg-gray-50" : "bg-white"
        }`}
      >
        <div className="pl-4 pr-2">{icon}</div>
        <input
          {...register}
          disabled={disabled}
          className={`p-3 w-full outline-none text-gray-700 placeholder-gray-400 ${
            disabled ? "bg-gray-50 cursor-not-allowed" : ""
          }`}
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
    <div
      className={`flex items-center gap-3 ${
        isActive ? "text-orange-500" : isCompleted ? "text-green-500" : "text-gray-500"
      }`}
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

export default PageAddListing1