"use client";
import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa6";
import Label from "@/components/Label";
import { useAuth } from "@/hooks/useAuth";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Input from "@/shared/Input";
import Select from "@/shared/Select";
import axios from "axios";
import { Toaster, toast } from "sonner";

const AccountPage = () => {
  const { user, loading } = useAuth();
  const [name, setName] = useState("");
  const [gender, setGender] = useState<string>("");
  const [language, setLanguage] = useState("");
  const [nationality, setNationality] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [bankdetails, setBankDetails] = useState("");

  const [profilePic, setProfilePic] = useState("");
  const [profilePicLoading, setProfilePicLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (user) {
      setProfilePic(user?.profilePic || "");
      setName(user?.name || "");
      setGender(user?.gender || "");
      setLanguage(user?.spokenLanguage || " ");
      setNationality(user?.nationality);
      setEmail(user?.email || "");
      setAddress(user?.address || "");
      setPhone(user.phone || "");
      setBankDetails(user.bankDetails || "");
    }
  }, [user]);

  const handleSubmit = async () => {
    try {
      const updateData = {
        _id: user?._id,
        profilePic,
        name,
        gender,
        spokenLanguage: language,
        address,
        phone,
        nationality,
        bankdetails,
      };
      const response = await axios.put("/api/user/editprofile", updateData);
      if (response.data.success) {
        toast.success("Profile updated successfully.");
      } else {
        toast.error("Failed to update profile.");
      }
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  // TODO : Add image upload

  const generatePassword = (length: any) => {
    const characters = "0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      password += characters.charAt(randomIndex);
    }
    return password;
  };

  const handleProfilePhoto = async (e: any) => {
    setProfilePicLoading(true);
    setPreviewImage(e?.target?.files[0]?.name);
    const file = e?.target?.files[0];

    if (
      !file ||
      !(
        file.type === "image/jpeg" ||
        file.type === "image/png" ||
        file.type === "image/webp"
      )
    ) {
      toast.error("Error: Only PNG and JPEG files are allowed.");
      return;
    }

    const reader = new FileReader();
    reader.onload = function (e: any) {
      setPreviewImage(e.target.result);
    };
    reader.readAsDataURL(file);

    const storageZoneName = process.env.NEXT_PUBLIC_BUNNY_STORAGE_ZONE;
    const accessKey = process.env.NEXT_PUBLIC_BUNNY_ACCESS_KEY;
    const storageUrl = process.env.NEXT_PUBLIC_BUNNY_STORAGE_URL;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const randomNumberToAddInImageName = generatePassword(7);
      const response = await axios.put(
        `${storageUrl}/${storageZoneName}/ProfilePictures/${randomNumberToAddInImageName}${file.name}`,
        file,
        {
          headers: {
            AccessKey: accessKey,
            "Content-Type": file.type,
          },
        }
      );
      const imageUrl = `https://vacationsaga.b-cdn.net/ProfilePictures/${randomNumberToAddInImageName}${file.name}`;

      setProfilePic(imageUrl);
      setProfilePicLoading(false);
    } catch (error) {
      toast.error("Error uploading image. Please try again.");
    }
  };

  return (
    <>
      <Toaster />
      <div className="space-y-6 sm:space-y-8">
        <h2 className="text-3xl font-semibold">Account information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        <div className="flex flex-col md:flex-row">
          <div className="flex-shrink-0 flex items-start">
            <div className="relative rounded-full overflow-hidden flex">
              <label htmlFor="file-upload">
                <div className="lg:w-36 relative lg:h-36 md:w-28 md:h-28 w-20 h-20 rounded-full border border-gray-500 flex justify-center items-center mx-auto cursor-pointer hover:opacity-60 ">
                  {(!previewImage || !profilePic) && !profilePicLoading && (
                    <span className="absolute flex items-center justify-center w-full h-full">
                      <FaPlus className="opacity-70 text-3xl cursor-pointer" />
                    </span>
                  )}
                  <input
                    type="file"
                    className=" sr-only"
                    accept="image/*"
                    id="file-upload"
                    name="file-upload"
                    onChange={(e) => handleProfilePhoto(e)}
                  />
                  {profilePic && !profilePicLoading && (
                    <div className=" w-full h-full rounded-full overflow-hidden transition-all">
                      <img
                        src={profilePic}
                        className=" object-cover h-full w-full transition-all"
                      />
                    </div>
                  )}
                  {profilePicLoading && (
                    <div className=" w-full h-full rounded-full overflow-hidden transition-all">
                      <img
                        src={previewImage}
                        className=" opacity-70 object-contain h-full w-full transition-all"
                      />
                    </div>
                  )}
                </div>
              </label>
            </div>
          </div>
          <div className="flex-grow mt-10 md:mt-0 md:pl-16 max-w-3xl space-y-6">
            <div className="relative mt-1.5">
              <Label>Name</Label>
              <div className="">
                <Input
                  className="w-full"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
            <div className="relative">
              <Label>Gender</Label>
              <Select
                className="mt-1.5"
                value={gender}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                  setGender(e.target.value)
                }
              >
                <option value=""></option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </Select>
            </div>
            <div>
              <Label>Language</Label>
              <Input
                className="mt-1.5"
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              />
            </div>
            <div>
              <Label>Nationality</Label>
              <Input
                className="mt-1.5"
                value={nationality || ""}
                onChange={(e) => setNationality(e.target.value)}
              />
            </div>
            <div>
              <Label>Email</Label>
              <Input
                className="mt-1.5"
                value={email}
                disabled // Disable email editing
              />
            </div>
            <div>
              <Label>Address</Label>
              <Input
                className="mt-1.5"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div>
              <Label>Phone number</Label>
              <Input
                className="mt-1.5"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <Label>Bank Details</Label>
              <Input
                className="mt-1.5"
                value={bankdetails}
                onChange={(e) => setBankDetails(e.target.value)}
              />
            </div>
            <div className="pt-2">
              <ButtonPrimary onClick={handleSubmit}>Update info</ButtonPrimary>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
