"use client";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { CgSpinner } from "react-icons/cg";
import Input from "@/shared/Input";
import axios from "axios";
import React, { useState } from "react";
import { Toaster, toast } from "sonner";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(""); 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Email is required");                                 
      return;
    }               
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/user/forgot", { email });
      toast.success(response.data.message);
    } catch (error: any) {
      toast.error(error.response.data.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className="max-w-xs m-auto h-[40vh] mt-20">
        <form className="grid grid-cols-1 gap-6" onSubmit={handleSubmit}>
          <label className="block">
            <span className="text-neutral-800 mb-1 text-xs dark:text-neutral-200">
              Email
            </span>
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              disabled={isSubmitting}
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </label>
          <ButtonPrimary type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center justify-center">
                Processing...
                <CgSpinner className="animate-spin ml-2" />
              </div>
            ) : (
              "Send Reset Link"
            )}
          </ButtonPrimary>
        </form>
      </div>
    </>
  );
}
