"use client";
import React, { useState } from "react";
import Label from "@/components/Label";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuth } from "@/hooks/useAuth";
import { Toaster, toast } from 'sonner';


const AccountPass = () => {
  const { user } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true); 

    if (newPassword !== confirmPassword) {
      setError("New password and confirm password do not match");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/user/updatepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user?._id,
          currentPassword,
          newPassword,
          confirmPassword,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong");
      } else {
        setSuccess("Password updated successfully");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        toast.success("Password updated successfully");
      }
    } catch (error) {
      setError("An error occurred while updating the password");
      toast.error("An error occurred while updating the password");
    } finally {
      setLoading(false); 
    }
  };
  return (
    <>
    <Toaster/>
    <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
      <h2 className="text-3xl font-semibold">Update your password</h2>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
      <div className="max-w-xl space-y-6">
        <div>
          <Label>Current password</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>New password</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <Label>Confirm password</Label>
          <Input
            type="password"
            className="mt-1.5"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="text-red-600">{error}</p>}
        {success && <p className="text-green-600">{success}</p>}
        <div className="pt-2">
          <ButtonPrimary type="submit" disabled={loading}>
            {loading ? (
              <div className="flex items-center gap-x-2">
                updating...
                <AiOutlineLoading3Quarters className="animate-spin" />
              </div>
            ) : (
              "Update password"
            )}
          </ButtonPrimary>
        </div>
      </div>
    </form>
    </>
  );
};

export default AccountPass;
