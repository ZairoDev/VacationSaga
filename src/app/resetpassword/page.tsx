"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { CgSpinner } from "react-icons/cg";
import { Toaster, toast } from "sonner";
import { useRouter } from "next/navigation";
import Input from "@/shared/Input";
import ButtonPrimary from "@/shared/ButtonPrimary";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const urlToken = window.location.search.split("=")[1];
    setToken(urlToken || "");
  }, []);


  const validateForm = () => {
    if (password.length < 3) {
      toast.error("Password must be at least 3 characters long");
      return false;
    }

    return true;
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/user/resetpassword", {
        token,
        newPassword: password,
      });
      toast.success(response.data.message);
      router.push("/login");
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
              New Password
            </span>
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New Password"
              disabled={isSubmitting}
            />
          </label>
          <ButtonPrimary type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <div className="flex items-center">
                Processing...
                <CgSpinner className="animate-spin" />
              </div>
            ) : (
              "Reset Password"
            )}
          </ButtonPrimary>
        </form>
      </div>
    </>
  );
}
