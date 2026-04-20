"use client";
import React, { FC, useState, FormEvent } from "react";
import { CgSpinner } from "react-icons/cg";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import Input from "@/shared/Input";
import { Toaster, toast } from "sonner";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Link from "next/link";
import axios from "axios";
import countryCodesList from "country-codes-list";
export interface PageSignUpProps {}

const PageSignUp: FC<PageSignUpProps> = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("Owner"); // Default role
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [emailSent, setEmailSent] = useState<boolean>(false)
  const [sendDetails, setSendDetails] = useState(false);

  const [countryCode, setCountryCode] = useState("+1");
  const [phoneNumber, setPhoneNumber] = useState("");

  const countryCodes: { [key: string]: string } = countryCodesList.customList(
    "countryCallingCode" as countryCodesList.CountryProperty,
    "{countryNameEn} (+{countryCallingCode})"
  );
  const sortedEntries = Object.entries(countryCodes).map(item => item[1]).sort((a, b) => a.localeCompare(b));
  const sortedCountryCodes = Object.assign({}, sortedEntries);

  const gmailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const validateForm = () => {
    if (!name) {
      toast.error("Please enter your name");
      return false;
    }
    if (!gmailRegex.test(email)) {
      toast.error("Please enter a valid Gmail address");
      return false;
    }
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }
    return true;
  };

  const onSignup = async (e: FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }
    try {
      setLoading(true);
      // const fullPhoneNumber = `${countryCode}${phoneNumber}`;
      let fullPhoneNumber = "";
      if (phoneNumber){
        fullPhoneNumber = `${countryCode} ${phoneNumber}`
      }
      const response = await axios.post("/api/user/signup", {
        name,
        email,
        password,
        role,
        sendDetails,
        phone: fullPhoneNumber,
      });
      console.log("Signup successful:", response.data);
      toast.success(
        "Signup successful! Please verify your email address via link that has been sent to your email address."
      );
      setEmailSent(true);
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setRole("Owner");
      setSendDetails(false);
      setCountryCode("+1");
      setPhoneNumber("");
      // router.push("/login")
    } catch (error:any) {
      console.error("Signup failed:", error);
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Toaster />
      <div className="nc-PageSignUp">
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Signup
          </h2>
          <div className="max-w-md mx-auto space-y-6">
            <form className="grid grid-cols-1 gap-6" onSubmit={onSignup}>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Name
                </span>
                <Input
                  type="text"
                  placeholder="Your name"
                  className="mt-1"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>

              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Phone Number
                </span>
                <div className="flex items-center">
                  <select
                    className="mr-2 w-1/2 rounded-xl focus:border-blue-500/10 dark:bg-slate-900 dark:text-white"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {Object.entries(sortedCountryCodes).map(([code, name]) => (
                      <option key={code} value={`+${code}`}>
                        {name}
                      </option>
                    ))}
                  </select>
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    className="w-full"
                    value={phoneNumber}
                    onChange={(e) =>
                      setPhoneNumber(e.target.value.replace(/\D/g, ""))
                    }
                    required
                  />
                </div>
              </label>

              <label className="block relative">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="mt-1"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute right-3 top-10 cursor-pointer text-xl text-neutral-800 dark:text-neutral-200">
                  {showPassword ? (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiFillEye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </span>
              </label>
              <label className="block relative">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Confirm Password
                </span>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="********"
                  className="mt-1"
                  value={confirmPassword}
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span className="absolute right-3 top-10 cursor-pointer text-xl text-neutral-800 dark:text-neutral-200">
                  {showConfirmPassword ? (
                    <AiFillEyeInvisible
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  ) : (
                    <AiFillEye
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    />
                  )}
                </span>
              </label>
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Role
                </span>
                <div className="mt-1 flex space-x-4">
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Owner"
                      checked={role === "Owner"}
                      onChange={(e) => setRole(e.target.value)}
                    />{" "}
                    Owner
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="role"
                      value="Traveller"
                      checked={role === "Traveller"}
                      onChange={(e) => setRole(e.target.value)}
                    />{" "}
                    Traveller
                  </label>
                </div>
              </label>
              <label className="block">
                <input
                  type="checkbox"
                  checked={sendDetails}
                  onChange={(e) => setSendDetails(e.target.checked)}
                />
                Send my registration details to my email
                {emailSent && <p className=" text-green-500 text-sm flex justify-start">Please check your spam folder also</p>}
              </label>
              <ButtonPrimary type="submit" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    Signing up...
                    <CgSpinner className="animate-spin" />
                  </div>
                ) : (
                  "Sign up"
                )}
              </ButtonPrimary>
            </form>
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              Already have an account?
              <Link href="/login" className="font-semibold underline">
                Sign in
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageSignUp;
