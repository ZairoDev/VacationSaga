"use client";

import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Link from "next/link";
import axios from "axios";
import { Toaster, toast } from "sonner";

import { useAuth } from "@/hooks/useAuth";
import {
  OwnerProfileForm,
  ownerProfileFromUser,
  emptyOwnerProfileFormValues,
  type OwnerProfileFormValues,
} from "@/components/owner/OwnerProfileForm";

const AccountPage = () => {
  const { user, loading, fetchUserDetails } = useAuth();
  const [profile, setProfile] = useState<OwnerProfileFormValues>(
    emptyOwnerProfileFormValues(),
  );
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [shortTermPending, setShortTermPending] = useState(false);
  const [profileConfirmed, setProfileConfirmed] = useState(false);

  const [profilePic, setProfilePic] = useState("");
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  const isOwner = user?.role === "Owner";

  useEffect(() => {
    if (user) {
      setProfile(ownerProfileFromUser(user));
      setProfilePic(user?.profilePic || "");
      setProfileConfirmed(Boolean((user as { ownerProfileCompletedAt?: string }).ownerProfileCompletedAt));
    }
  }, [user]);

  useEffect(() => {
    if (!isOwner) return;
    axios
      .get("/api/owner-onboarding/status")
      .then((res) => {
        setShortTermPending(Boolean(res.data?.requiresOnboarding));
        setProfileConfirmed(Boolean(res.data?.ownerProfileCompletedAt));
      })
      .catch(() => undefined);
  }, [isOwner]);

  const handleSubmit = async () => {
    setSaving(true);
    setFieldErrors({});
    try {
      if (isOwner && shortTermPending) {
        const res = await axios.post("/api/owner-onboarding/complete-profile", {
          ...profile,
          bankDetails: profile.bankDetails,
        });
        setProfileConfirmed(Boolean(res.data?.ownerProfileCompletedAt));
        toast.success("Profile updated successfully.");
        await fetchUserDetails();
        return;
      }

      const response = await axios.put("/api/user/editprofile", {
        _id: user?._id,
        profilePic,
        name: profile.name,
        gender: profile.gender,
        spokenLanguage: profile.spokenLanguage,
        address: profile.address,
        phone: profile.phone,
        nationality: profile.nationality,
        bankDetails: profile.bankDetails,
      });
      if (response.data.success) {
        toast.success("Profile updated successfully.");
        await fetchUserDetails();
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (err: unknown) {
      const data = (err as { response?: { data?: { errors?: Record<string, string> } } })
        ?.response?.data;
      if (data?.errors) setFieldErrors(data.errors);
      toast.error(data?.errors ? "Please complete all required fields" : "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  const generatePassword = (length: number) => {
    const characters = "0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return password;
  };

  const handleProfilePhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfilePicLoading(true);
    const file = e?.target?.files?.[0];
    if (
      !file ||
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      )
    ) {
      toast.error("Error: Only PNG and JPEG files are allowed.");
      setProfilePicLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.onload = function (ev) {
      setPreviewImage(ev.target?.result as string);
    };
    reader.readAsDataURL(file);

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL;

    try {
      const randomNumberToAddInImageName = generatePassword(7);
      await axios.put(
        `${storageUrl}/${storageZoneName}/ProfilePictures/${randomNumberToAddInImageName}${file.name}`,
        file,
        {
          headers: {
            AccessKey: accessKey,
            "Content-Type": file.type,
          },
        },
      );
      const imageUrl = `https://vacationsaga.b-cdn.net/ProfilePictures/${randomNumberToAddInImageName}${file.name}`;
      setProfilePic(imageUrl);
    } catch {
      toast.error("Error uploading image. Please try again.");
    } finally {
      setProfilePicLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16 text-center text-neutral-500">Loading account…</div>
    );
  }

  return (
    <>
      <Toaster />
      <div className="space-y-6 sm:space-y-8">
        <div>
          <h2 className="text-3xl font-semibold">Account</h2>
          <p className="mt-1 text-neutral-500 text-sm">
            Manage your personal details and payout information.
          </p>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {isOwner && shortTermPending && !profileConfirmed && (
          <div className="rounded-xl border border-amber-300 bg-amber-50 dark:bg-amber-950/30 dark:border-amber-700 px-4 py-3 text-sm">
            <p className="font-medium text-amber-900 dark:text-amber-100">
              Complete payout details to finish listing onboarding
            </p>
            <p className="text-amber-800 dark:text-amber-200 mt-1">
              Your property cannot go live until you submit your full profile below.
            </p>
            <Link href="/owner-onboarding" className="text-primary-6000 underline mt-2 inline-block">
              Go to onboarding checklist
            </Link>
          </div>
        )}

        {isOwner && profileConfirmed && (
          <div className="rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/30 px-4 py-2 text-sm text-emerald-800 dark:text-emerald-200">
            Profile confirmed for listing onboarding
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10">
          <div className="flex-shrink-0">
            <p className="text-sm font-medium mb-3">Profile photo</p>
            <label htmlFor="file-upload" className="cursor-pointer">
              <div className="lg:w-32 lg:h-32 w-24 h-24 rounded-full border border-gray-300 flex justify-center items-center overflow-hidden hover:opacity-80">
                {(!previewImage || !profilePic) && !profilePicLoading && (
                  <FaPlus className="opacity-70 text-2xl" />
                )}
                <input
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  id="file-upload"
                  onChange={handleProfilePhoto}
                />
                {(profilePic || previewImage) && (
                  <img
                    src={previewImage || profilePic}
                    alt="Profile"
                    className="object-cover h-full w-full"
                  />
                )}
              </div>
            </label>
          </div>

          <div className="flex-grow max-w-2xl">
            {isOwner ? (
              <OwnerProfileForm
                values={profile}
                onChange={setProfile}
                errors={fieldErrors}
                onSubmit={() => void handleSubmit()}
                submitting={saving}
                submitLabel="Update profile"
                readOnlyEmail={user?.email}
              />
            ) : (
              <p className="text-neutral-500">Account settings for travellers.</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
