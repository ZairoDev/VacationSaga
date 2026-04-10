"use client";
import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/AuthStore";
import type { TokenDataType } from "@/data/types";

interface UserData {
  _id: string;
  email: string;
  isVerified: boolean;
  name: string;
  profilePic: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  address: string;
  bankDetails: string;
  declinedRequests: any[];
  gender: string;
  spokenLanguage: string;
  nationality: string;
  phone: string | null;
  myRequests: any[];
  myUpcommingRequests: any[];
}

export const useAuth = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { setToken, clearToken } = useAuthStore();

  const fetchUserDetails = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/user/profile");
      const profile = response.data.data as UserData;
      setUser(profile);

      // Keep localStorage/Zustand in sync (used for UI only).
      const tokenData: TokenDataType = {
        _id: profile._id,
        name: profile.name,
        email: profile.email,
        role: profile.role as TokenDataType["role"],
      };
      setToken(tokenData);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching user details:", error);
      setUser(null);
      clearToken();
    } finally {
      setLoading(false);
    }
  }, [setToken, clearToken]);

  useEffect(() => {
    fetchUserDetails();
  }, [fetchUserDetails]);

  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post("/api/user/login", { email, password });
      if (response.data.success) {
        await fetchUserDetails();
        return true;
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
    return false;
  };

  // const logout = async () => {
  //   try {
  //     await axios.get("/api/user/logout");
  //     setUser(null);
  //     localStorage.removeItem("token");

  //     router.push("/login");
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };

  const logout = async () => {
    try {
      await axios.get("/api/user/logout");
      setUser(null);
      clearToken();
      localStorage.removeItem("app_jwt");

      // Confirm token removal
      console.log("Token removed:", localStorage.getItem("token") === null);

      router.push("/login?role=Owner");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return {
    user,
    loading,
    isLoggedIn: !!user,
    login,
    logout,
    fetchUserDetails,
  };
};
