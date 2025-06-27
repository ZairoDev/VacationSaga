"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { useListingStore } from "@/app/Store/hotelListingStore";
import {
  User,
  Mail,
  Phone,
  ArrowRight,
  FileText,
  UserCircle,
  Home,
  ClipboardList,
  ShieldAlert,
  CheckCircle,
  AlertCircle,
  ChevronDown,
} from "lucide-react";

interface OwnerDetails {
  name: string;
  email: string;
  phone: string;
  alternateContact?: string;
  aadharCard: string;
  managerName?: string;
  managerContact?: string;
  countryCode?: string;
  isEmailVerified?: boolean;
}

export default function PageAddListing1() {
  const { ownerDetails, setOwnerDetails } = useListingStore();
  const router = useRouter();

  // Form data state
  const [formData, setFormData] = useState<OwnerDetails>({
    name: ownerDetails?.name || "",
    email: ownerDetails?.email || "",
    countryCode: ownerDetails?.countryCode || "+91",
    phone: ownerDetails?.phone || "",
    // alternateCountryCode: ownerDetails?.alternateCountryCode || "+91",
    alternateContact: ownerDetails?.alternateContact || "",
    aadharCard: ownerDetails?.aadharCard || "",
    managerName: ownerDetails?.managerName || "",
    // managerCountryCode: ownerDetails?.managerCountryCode || "+91",
    managerContact: ownerDetails?.managerContact || "",
  });

  // Verification states
  const [emailVerificationStep, setEmailVerificationStep] = useState("initial");
  const [phoneVerificationStep, setPhoneVerificationStep] = useState("initial");
  const [otp, setOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerifyingPhone, setIsVerifyingPhone] = useState(false);
  const [errors, setErrors] = useState({});

  // Country codes
  const countries = [
    { code: "+91", name: "India" },
    { code: "+1", name: "United States/Canada" },
    { code: "+44", name: "United Kingdom" },
    { code: "+86", name: "China" },
    { code: "+81", name: "Japan" },
    { code: "+49", name: "Germany" },
    { code: "+33", name: "France" },
    { code: "+39", name: "Italy" },
    { code: "+34", name: "Spain" },
    { code: "+7", name: "Russia" },
    { code: "+55", name: "Brazil" },
    { code: "+61", name: "Australia" },
    { code: "+82", name: "South Korea" },
    { code: "+52", name: "Mexico" },
    { code: "+31", name: "Netherlands" },
    { code: "+46", name: "Sweden" },
    { code: "+47", name: "Norway" },
    { code: "+45", name: "Denmark" },
    { code: "+358", name: "Finland" },
    { code: "+41", name: "Switzerland" },
    { code: "+43", name: "Austria" },
    { code: "+32", name: "Belgium" },
    { code: "+351", name: "Portugal" },
    { code: "+30", name: "Greece" },
    { code: "+90", name: "Turkey" },
    { code: "+971", name: "United Arab Emirates" },
    { code: "+966", name: "Saudi Arabia" },
    { code: "+65", name: "Singapore" },
    { code: "+60", name: "Malaysia" },
    { code: "+66", name: "Thailand" },
    { code: "+84", name: "Vietnam" },
    { code: "+62", name: "Indonesia" },
    { code: "+63", name: "Philippines" },
    { code: "+886", name: "Taiwan" },
    { code: "+852", name: "Hong Kong" },
    { code: "+27", name: "South Africa" },
    { code: "+20", name: "Egypt" },
    { code: "+234", name: "Nigeria" },
    { code: "+254", name: "Kenya" },
    { code: "+92", name: "Pakistan" },
    { code: "+880", name: "Bangladesh" },
    { code: "+94", name: "Sri Lanka" },
    { code: "+977", name: "Nepal" },
    { code: "+98", name: "Iran" },
    { code: "+964", name: "Iraq" },
    { code: "+972", name: "Israel" },
    { code: "+961", name: "Lebanon" },
    { code: "+962", name: "Jordan" },
    { code: "+965", name: "Kuwait" },
    { code: "+968", name: "Oman" },
    { code: "+974", name: "Qatar" },
    { code: "+973", name: "Bahrain" },
  ];

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    // if (errors[name]) {
    //   setErrors((prev) => ({
    //     ...prev,
    //     [name]: "",
    //   }))
    // }
  };

  // const validateForm = () => {
  //   const newErrors = {}

  //   if (!formData.name.trim()) {
  //     newErrors.name = "Name is required"
  //   }

  //   if (!formData.email.trim()) {
  //     newErrors.email = "Email is required"
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
  //     newErrors.email = "Invalid email address"
  //   }

  //   if (!formData.contact.trim()) {
  //     newErrors.contact = "Contact number is required"
  //   }

  //   if (!formData.aadharCard.trim()) {
  //     newErrors.aadharCard = "Aadhar Card number is required"
  //   }

  //   setErrors(newErrors)
  //   return Object.keys(newErrors).length === 0
  // }

  const handleVerifyEmail = async () => {
    console.log("Verifying email:", formData.email);
    if (!formData.email) {
      alert("Please enter an email first.");
      return;
    }

    try {
      console.log("Verifying email:", formData);
      const res = await axios.post("/api/hotels/sendEmailVerification", {
        email: formData.email,
        otp: otp,
      });
      console.log("Email verification response:", res);

      if (res.status === 200) {
        setEmailVerificationStep("sent");
      } else {
        alert("Failed to send verification email. Please try again.");
      }
    } catch (error) {
      console.error("Error sending verification email:", error);
      alert("Failed to send verification email.");
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      alert("Please enter the complete 6-digit code.");
      return;
    }

    setIsVerifying(true);
    try {
      const res = await axios.post("/api/hotels/verifyEmail", {
        email: formData.email,
        otp: otp,
      });

      if (res.status === 200) {
        setEmailVerificationStep("verified");
      } else {
        alert("Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Failed to verify code. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    setOtp("");
    await handleVerifyEmail();
  };

  const handleVerifyPhone = async () => {
    console.log("Verifying phone:", formData.phone);
    if (!formData.phone) {
      alert("Please enter a phone number first.");
      return;
    }

    try {
      console.log("Verifying phone:", formData);
      const res = await axios.post("/api/hotels/sendPhoneVerification", {
        phone: "+91" + formData.phone,
        // otp: phoneOtp,
      });
      console.log("Phone verification response:", res);
      if (res.status === 200) {
        setPhoneVerificationStep("sent");
      } else {
        alert("Failed to send verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error sending verification code:", error);
      alert("Failed to send verification code.");
    }
  };

  const handleVerifyPhoneOtp = async () => {
    if (phoneOtp.length !== 6) {
      alert("Please enter the complete 6-digit code.");
      return;
    }

    setIsVerifyingPhone(true);
    try {
      const res = await axios.post("/api/hotels/verifyPhone", {
        phone: "+91"+formData.phone,
        otp: phoneOtp,
      });

      if (res.status === 200) {
        setPhoneVerificationStep("verified");
      } else {
        alert(res.data.error || "Invalid verification code. Please try again.");
      }
    } catch (error) {
      console.error("Error verifying phone OTP:", error);
      alert("Failed to verify code. Please try again.");
    } finally {
      setIsVerifyingPhone(false);
    }
  };

  const handleResendPhoneCode = async () => {
    setPhoneOtp("");
    await handleVerifyPhone();
  };

  const handleOtpChange = (value: any, index: any, isPhone = false) => {
    const otpArray = isPhone ? phoneOtp.split("") : otp.split("");
    otpArray[index] = value;
    const newOtp = otpArray.join("");

    if (isPhone) {
      setPhoneOtp(newOtp);
    } else {
      setOtp(newOtp);
    }

    if (value && index < 5) {
      const nextInput = document.getElementById(
        `${isPhone ? "phone-" : ""}otp-${index + 1}`
      );
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (e: any, index: any, isPhone = false) => {
    if (
      e.key === "Backspace" &&
      !(isPhone ? phoneOtp[index] : otp[index]) &&
      index > 0
    ) {
      const prevInput = document.getElementById(
        `${isPhone ? "phone-" : ""}otp-${index - 1}`
      );
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    // if (!validateForm()) {
    //   return
    // }

    if (emailVerificationStep !== "verified") {
      alert("Please verify your email before continuing.");
      return;
    }

    setOwnerDetails(formData);
    router.push("/add-hotel/2");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="border-b border-gray-200 py-6 px-8 bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-light text-gray-900">Add New Listing</h1>
        </div>
      </header>

      <main className="flex-1 flex">
        {/* Progress Sidebar */}
        <div className="w-64 border-r border-gray-200 p-8 hidden lg:block bg-white">
          <div className="space-y-6">
            <h3 className="text-sm uppercase text-gray-500 font-medium tracking-wider">
              Listing Progress
            </h3>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-orange-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-orange-100 text-orange-500">
                  <User className="w-4 h-4" />
                </div>
                <span className="text-sm font-medium">Owner Details</span>
              </div>

              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100">
                  <Home className="w-4 h-4" />
                </div>
                <span className="text-sm">Property Details</span>
              </div>

              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <span className="text-sm">Room details</span>
              </div>

              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <span className="text-sm">Policies</span>
              </div>

              <div className="flex items-center gap-3 text-gray-500">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-100">
                  <ArrowRight className="w-4 h-4" />
                </div>
                <span className="text-sm">Review & Submit</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8">
              <h2 className="text-3xl font-light mb-3 text-gray-900">
                Owner Details
              </h2>
              <p className="text-gray-600">
                Please provide your contact information for this listing. This
                information will be used for verification and communication
                purposes.
              </p>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
              <form onSubmit={handleSubmit} className="space-y-10">
                {/* Owner Information Section */}
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider">
                      Owner Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <div className="relative">
                        <div className="flex items-center border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all bg-white">
                          <div className="pl-4 pr-2">
                            <User className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="p-3 w-full outline-none text-gray-700 placeholder-gray-400"
                            placeholder="Owner Name"
                            type="text"
                          />
                        </div>
                        {/* {errors.name && <p className="text-red-500 text-xs mt-1 ml-1">{errors.name}</p>} */}
                      </div>

                      {/* Email Field with Verification */}
                      <div className="space-y-4">
                        <div className="relative">
                          <div
                            className={`flex items-center border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all ${
                              emailVerificationStep === "verified"
                                ? "bg-gray-50"
                                : "bg-white"
                            }`}
                          >
                            <div className="pl-4 pr-2">
                              <Mail className="w-5 h-5 text-gray-400" />
                            </div>
                            <input
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              disabled={emailVerificationStep === "verified"}
                              className={`p-3 w-full outline-none text-gray-700 placeholder-gray-400 ${
                                emailVerificationStep === "verified"
                                  ? "bg-gray-50 cursor-not-allowed"
                                  : ""
                              }`}
                              placeholder="Email Address"
                              type="email"
                            />
                          </div>
                          {/* {errors.email && <p className="text-red-500 text-xs mt-1 ml-1">{errors.email}</p>} */}
                        </div>

                        {/* Email Verification UI */}
                        {emailVerificationStep === "initial" && (
                          <button
                            type="button"
                            onClick={handleVerifyEmail}
                            className="w-full px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Mail className="w-4 h-4" />
                            Verify Email
                          </button>
                        )}

                        {emailVerificationStep === "sent" && (
                          <div className="space-y-4">
                            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-4 h-4 text-orange-600" />
                                <span className="text-sm font-medium text-orange-800">
                                  Verification Email Sent!
                                </span>
                              </div>
                              <p className="text-sm text-orange-700">
                                We've sent a 6-digit verification code to your
                                email. Please enter it below.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700">
                                Enter Verification Code
                              </label>
                              <div className="flex gap-2 justify-center">
                                {[...Array(6)].map((_, index) => (
                                  <input
                                    key={index}
                                    id={`otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={otp[index] || ""}
                                    onChange={(e) =>
                                      handleOtpChange(e.target.value, index)
                                    }
                                    onKeyDown={(e) =>
                                      handleOtpKeyDown(e, index)
                                    }
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
                          </div>
                        )}

                        {emailVerificationStep === "verified" && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                Email Verified Successfully!
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Phone Field with Verification */}
                      <div className="space-y-4">
                        <div className="relative">
                          <div
                            className={`flex items-center border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all ${
                              phoneVerificationStep === "verified"
                                ? "bg-gray-50"
                                : "bg-white"
                            }`}
                          >
                            <div className="pl-4 pr-2">
                              <Phone className="w-5 h-5 text-gray-400" />
                            </div>

                            <div className="relative">
                              <select
                                name="countryCode"
                                value={formData.countryCode}
                                // onChange={handleInputChange}
                                disabled={phoneVerificationStep === "verified"}
                                className="appearance-none bg-transparent border-none outline-none text-gray-700 pr-8 pl-2 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                              >
                                {countries.map((country) => (
                                  <option
                                    key={country.code}
                                    value={country.code}
                                  >
                                    {country.code}
                                  </option>
                                ))}
                              </select>
                              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>

                            <div className="w-px h-6 bg-gray-300 mx-2"></div>

                            <input
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              disabled={phoneVerificationStep === "verified"}
                              className="p-3 flex-1 outline-none text-gray-700 placeholder-gray-400"
                              placeholder="Contact Number"
                              type="tel"
                            />
                          </div>
                          {/* {errors.contact && <p className="text-red-500 text-xs mt-1 ml-1">{errors.contact}</p>} */}
                        </div>

                        {/* Phone Verification UI */}
                        {phoneVerificationStep === "initial" && (
                          <button
                            type="button"
                            onClick={handleVerifyPhone}
                            className="w-full px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 transition-all duration-200 flex items-center justify-center gap-2"
                          >
                            <Phone className="w-4 h-4" />
                            Verify Phone
                          </button>
                        )}

                        {phoneVerificationStep === "sent" && (
                          <div className="space-y-4">
                            <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
                              <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="w-4 h-4 text-orange-600" />
                                <span className="text-sm font-medium text-orange-800">
                                  Verification Code Sent!
                                </span>
                              </div>
                              <p className="text-sm text-orange-700">
                                We've sent a 6-digit verification code to your
                                phone. Please enter it below.
                              </p>
                            </div>

                            <div className="space-y-3">
                              <label className="text-sm font-medium text-gray-700">
                                Enter Verification Code
                              </label>
                              <div className="flex gap-2 justify-center">
                                {[...Array(6)].map((_, index) => (
                                  <input
                                    key={index}
                                    id={`phone-otp-${index}`}
                                    type="text"
                                    maxLength={1}
                                    value={phoneOtp[index] || ""}
                                    onChange={(e) =>
                                      handleOtpChange(
                                        e.target.value,
                                        index,
                                        true
                                      )
                                    }
                                    onKeyDown={(e) =>
                                      handleOtpKeyDown(e, index, true)
                                    }
                                    className="w-12 h-12 text-center border border-gray-300 rounded-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                                  />
                                ))}
                              </div>
                            </div>

                            <div className="flex gap-3">
                              <button
                                type="button"
                                onClick={handleVerifyPhoneOtp}
                                disabled={
                                  phoneOtp.length !== 6 || isVerifyingPhone
                                }
                                className="flex-1 px-4 py-2 text-sm rounded-lg bg-orange-500 text-white hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-200"
                              >
                                {isVerifyingPhone
                                  ? "Verifying..."
                                  : "Verify Code"}
                              </button>
                              <button
                                type="button"
                                onClick={handleResendPhoneCode}
                                className="px-4 py-2 text-sm rounded-lg border border-orange-500 text-orange-500 hover:bg-orange-50 transition-all duration-200"
                              >
                                Resend
                              </button>
                            </div>
                          </div>
                        )}

                        {phoneVerificationStep === "verified" && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                            <div className="flex items-center gap-2">
                              <CheckCircle className="w-5 h-5 text-green-600" />
                              <span className="text-sm font-medium text-green-800">
                                Phone Number Verified Successfully!
                              </span>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Alternate Contact */}
                      <div className="relative">
                        <div className="flex items-center border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all bg-white">
                          <div className="pl-4 pr-2">
                            <Phone className="w-5 h-5 text-gray-400" />
                          </div>

                          <div className="relative">
                            <select
                              name="alternateCountryCode"
                              // value={formData.alternateCountryCode}
                              onChange={handleInputChange}
                              className="appearance-none bg-transparent border-none outline-none text-gray-700 pr-8 pl-2 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>

                          <div className="w-px h-6 bg-gray-300 mx-2"></div>

                          <input
                            name="alternateContact"
                            value={formData.alternateContact}
                            onChange={handleInputChange}
                            className="p-3 flex-1 outline-none text-gray-700 placeholder-gray-400"
                            placeholder="Alternate Contact Number"
                            type="tel"
                          />
                        </div>
                      </div>

                      {/* Aadhar Card */}
                      <div className="relative md:col-span-2">
                        <div className="flex items-center border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all bg-white">
                          <div className="pl-4 pr-2">
                            <FileText className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            name="aadharCard"
                            value={formData.aadharCard}
                            onChange={handleInputChange}
                            className="p-3 w-full outline-none text-gray-700 placeholder-gray-400"
                            placeholder="Aadhar Card Number"
                            type="text"
                          />
                        </div>
                        {/* {errors.aadharCard && <p className="text-red-500 text-xs mt-1 ml-1">{errors.aadharCard}</p>} */}
                      </div>
                    </div>
                  </div>

                  {/* Property Manager Section */}
                  <div>
                    <h3 className="text-sm uppercase text-gray-500 font-medium mb-5 tracking-wider">
                      Property Manager
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* Manager Name */}
                      <div className="relative">
                        <div className="flex items-center border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all bg-white">
                          <div className="pl-4 pr-2">
                            <UserCircle className="w-5 h-5 text-gray-400" />
                          </div>
                          <input
                            name="managerName"
                            value={formData.managerName}
                            onChange={handleInputChange}
                            className="p-3 w-full outline-none text-gray-700 placeholder-gray-400"
                            placeholder="Manager Name (if different from owner)"
                            type="text"
                          />
                        </div>
                      </div>

                      {/* Manager Contact */}
                      <div className="relative">
                        <div className="flex items-center border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-orange-100 focus-within:border-orange-500 transition-all bg-white">
                          <div className="pl-4 pr-2">
                            <Phone className="w-5 h-5 text-gray-400" />
                          </div>

                          <div className="relative">
                            <select
                              name="managerCountryCode"
                              // value={formData.managerCountryCode}
                              onChange={handleInputChange}
                              className="appearance-none bg-transparent border-none outline-none text-gray-700 pr-8 pl-2 py-3 cursor-pointer hover:bg-gray-50 transition-colors"
                            >
                              {countries.map((country) => (
                                <option key={country.code} value={country.code}>
                                  {country.code}
                                </option>
                              ))}
                            </select>
                            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                          </div>

                          <div className="w-px h-6 bg-gray-300 mx-2"></div>

                          <input
                            name="managerContact"
                            value={formData.managerContact}
                            onChange={handleInputChange}
                            className="p-3 flex-1 outline-none text-gray-700 placeholder-gray-400"
                            placeholder="Manager Contact Number"
                            type="tel"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-end pt-6 border-t border-gray-200">
                  <button
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
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
