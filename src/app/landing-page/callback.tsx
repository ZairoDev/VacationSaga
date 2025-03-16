"use client";

import axios from "axios";
import Link from "next/link";
import type React from "react";
import { useState } from "react";
import { Loader2, X } from "lucide-react";
import { toast, Toaster } from "sonner";
import { GrGroup } from "react-icons/gr";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PhoneInputLayout as PhoneInput } from "@/components/PhoneInputLayout";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CallbackForm({ onClose }: { onClose: () => void }) {
  // Form fields state
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [budget, setBudget] = useState("");
  const [budgetType, setBudgetType] = useState("night");
  const [duration, setDuration] = useState<{ from: string; to: string }>({
    from: "",
    to: "",
  });
  const [destination, setDestination] = useState("");

  // Verification states
  const [showEmailOtp, setShowEmailOtp] = useState(false);
  const [showPhoneOtp, setShowPhoneOtp] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [phoneOtp, setPhoneOtp] = useState("");
  const [emailVerified, setEmailVerified] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const [emailLoader, setEmailLoader] = useState(false);
  const [phoneLoader, setPhoneLoader] = useState(false);

  // Form validation
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Generate OTP (in a real app, this would be sent via email/SMS)
  const generateOtp = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Mock OTPs (in a real app, these would be sent to the user)

  const handleVerifyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email" }));
      return;
    }

    setErrors((prev) => ({ ...prev, email: "" }));

    try {
      setEmailLoader(true);
      const response = await axios.post(`/api/landingPage/verifyEmail`, {
        phone,
        email,
        OTPverification: false,
      });
      toast(`OTP sent to ${email}`);
      setShowEmailOtp(true);
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, email: err.response.data.message }));
    } finally {
      setEmailLoader(false);
    }
  };

  const handleVerifyPhone = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (!phone) {
      setErrors((prev) => ({ ...prev, phone: "Phone number is required" }));
      return;
    }
    setErrors((prev) => ({ ...prev, phone: "", country: "" }));

    try {
      setPhoneLoader(true);
      const response = await axios.post("/api/landingPage/verifyPhone", {
        email,
        phone,
      });
      toast(`OTP sent to ${phone}`);
      setShowPhoneOtp(true);
    } catch (err: any) {
      // console.log("error in sending OTP to mobile: ", err);
      toast.error(`Error in sending OTP to mobile: ${err.response.data.message}`);
    } finally {
      setPhoneLoader(false);
    }
  };

  const verifyEmailOtp = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/verifyEmailOTP", {
        email,
        otp: emailOtp,
        OTPverification: true,
      });
      setErrors((prev) => ({ ...prev, emailOtp: "" }));
      setEmailVerified(true);
      setShowEmailOtp(false);
      toast("Email verified successfully");
    } catch (err) {
      setErrors((prev) => ({ ...prev, emailOtp: "Invalid OTP" }));
    }
  };

  const verifyPhoneOtp = async (e: React.MouseEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("/api/verifyPhoneOTP", {
        phone,
        otp: phoneOtp,
        OTPVerification: true,
      });
      setErrors((prev) => ({ ...prev, phoneOtp: "" }));
      setPhoneVerified(true);
      setShowPhoneOtp(false);
    } catch (err: any) {
      setErrors((prev) => ({ ...prev, phoneOtp: "Invalid OTP" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate all fields
    const newErrors: Record<string, string> = {};

    if (!name) newErrors.name = "Name is required";
    // if (!country) newErrors.country = "Country is required";
    if (!phone) newErrors.phone = "Phone number is required";
    if (!email) newErrors.email = "Email is required";
    if (!budget) newErrors.budget = "Budget is required";
    if (!destination) newErrors.destination = "Destination is required";
    if (!emailVerified) newErrors.email = "Email must be verified";
    if (!phoneVerified) newErrors.phone = "Phone number must be verified";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.patch("/api/landingPage", {
        name,
        phone,
        email,
        budget,
        budgetType,
        duration,
        destination,
      });
      setIsFormSubmitted(true);
    } catch (err: any) {
      toast.error("Failed to submit callback request.");
    }

    toast("Your callback request has been submitted successfully");

    // Reset form
    setName("");
    setCountry("");
    setPhone("");
    setEmail("");
    setBudget("");
    setDestination("");
    setEmailVerified(false);
    setPhoneVerified(false);

    // onClose();
  };

  return (
    <div className="fixed inset-0 z-10 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <Toaster />
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold">Schedule a Callback</h2>
          <button onClick={() => onClose()} className="text-gray-500 hover:text-gray-700">
            <X size={20} />
          </button>
        </div>

        <form className="space-y-4">
          <div>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? "border-red-500" : ""}
              placeholder="Name"
              required
            />
            {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
          </div>

          <div className="gap-2">
            <div className=" flex flex-col xxs:flex-row gap-2">
              <PhoneInput
                placeholder="Enter phone number"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              />
              <Button
                onClick={handleVerifyPhone}
                className="bg-orange-500 hover:bg-orange-600 text-white"
                disabled={phoneVerified}
              >
                {phoneLoader ? (
                  <Loader2 className="animate-spin" />
                ) : phoneVerified ? (
                  "Verified"
                ) : (
                  "Verify"
                )}
              </Button>
            </div>
            {errors.country && (
              <p className="mt-1 text-xs text-red-500">{errors.country}</p>
            )}
          </div>
          {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}

          {showPhoneOtp && !phoneVerified && (
            <div className="flex gap-2">
              <Input
                id="phoneOtp"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
                className={errors.phoneOtp ? "border-red-500" : ""}
                placeholder="Enter OTP sent to your phone"
              />
              <Button
                onClick={verifyPhoneOtp}
                className="bg-orange-500 hover:bg-orange-600 text-white"
                // type="button"
              >
                Verify
              </Button>
            </div>
          )}
          {errors.phoneOtp && <p className="text-xs text-red-500">{errors.phoneOtp}</p>}

          {/* Email */}
          <div className="flex flex-col xxs:flex-row gap-2">
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 ${errors.email ? "border-red-500" : ""}`}
              disabled={emailVerified}
              placeholder="Email"
              required
            />
            <Button
              onClick={handleVerifyEmail}
              className="bg-orange-500 hover:bg-orange-600 text-white"
              type="button"
              disabled={emailVerified}
            >
              {emailLoader ? (
                <Loader2 className=" animate-spin" />
              ) : emailVerified ? (
                "Verified"
              ) : (
                "Verify"
              )}
            </Button>
          </div>
          {errors.email && <p className="text-xs text-red-500">{errors.email}</p>}

          {showEmailOtp && !emailVerified && (
            <div>
              <div className="flex gap-2">
                <Input
                  id="emailOtp"
                  value={emailOtp}
                  onChange={(e) => setEmailOtp(e.target.value)}
                  className={errors.emailOtp ? "border-red-500" : ""}
                  placeholder="Enter OTP sent to your email"
                />
                <Button
                  onClick={verifyEmailOtp}
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                  type="button"
                >
                  Verify
                </Button>
              </div>
              <p className=" text-xs mt-1">
                (Check the spam folder if you don&apos;t see the email)
              </p>
            </div>
          )}
          {errors.emailOtp && <p className="text-xs text-red-500">{errors.emailOtp}</p>}

          <div className=" flex flex-row gap-x-1 md:justify-between gap-y-4">
            <div className=" flex flex-col">
              <span className=" text-sm font-medium">From: </span>
              <Input
                type="date"
                className=" text-sm"
                value={duration.from}
                onChange={(e) => setDuration({ ...duration, from: e.target.value })}
              />
            </div>
            <div className=" flex flex-col">
              <span className=" text-sm font-medium">To: </span>
              <Input
                type="date"
                className=" text-sm"
                value={duration.to.toString()}
                onChange={(e) => setDuration({ ...duration, to: e.target.value })}
              />
            </div>
          </div>

          <div>
            <div className="flex border border-neutral-600 rounded-md overflow-hidden">
              <div className=" flex justify-center items-center font-semibold text-base bg-neutral-200 px-1">
                €
              </div>
              <Input
                id="budget"
                type="number"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className={
                  errors.budget
                    ? "border-red-500 rounded-none border-none"
                    : " rounded-none border-none"
                }
                placeholder="Enter budget in Euro €"
                required
              />
              <Select
                onValueChange={(value) => setBudgetType(value)}
                defaultValue={budgetType}
              >
                <SelectTrigger className=" w-28">
                  <SelectValue placeholder="price" />
                </SelectTrigger>
                <SelectContent className=" bg-white">
                  <SelectItem value="night" className="font-medium">
                    / night
                  </SelectItem>
                  <SelectItem value="month" className=" font-medium">
                    / month
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.budget && (
              <p className="mt-1 text-xs text-red-500">{errors.budget}</p>
            )}
          </div>

          <div>
            <Input
              id="destination"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className={errors.destination ? "border-red-500" : ""}
              placeholder="Destination"
              required
            />
            {errors.destination && (
              <p className="mt-1 text-xs text-red-500">{errors.destination}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            onClick={handleSubmit}
          >
            Submit
          </Button>
        </form>

        {isFormSubmitted && (
          <>
            <div className=" w-full my-4 bg-neutral-500 h-0.5"></div>
            <p className=" text-center italic">Join the VacationSaga community</p>
            <p className=" flex justify-center">
              <Link
                href={
                  "https://www.facebook.com/groups/766705650750266/?rdid=rDYpx8IiKaXl2kLw&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FcQVoYkgSxmp465km%2F#"
                }
                target="_blank"
              >
                {" "}
                <GrGroup className=" text-2xl" />
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
