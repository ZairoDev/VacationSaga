"use client";

import axios from "axios";
import Link from "next/link";
import { parseCookies } from "nookies";
import { Toaster, toast } from "sonner";
import { CgSpinner } from "react-icons/cg";
import React, { FC, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

import Input from "@/shared/Input";
import { useAuthStore } from "@/AuthStore";
import ButtonPrimary from "@/shared/ButtonPrimary";

export interface PageLoginProps {}

const PageLogin: FC<PageLoginProps> = ({}) => {
  const router = useRouter();
  const params = useSearchParams();
  const role = params.get("role");
  const redirectPath = params.get("redirect");
  const oauthError = params.get("error");

  const { setToken } = useAuthStore();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const { token } = parseCookies();
    // Only redirect if user is already logged in and there's no redirect parameter
    if (token && !redirectPath) {
      router.push("/");
    }
  }, [router, redirectPath]);

  useEffect(() => {
    if (!oauthError) return;
    const map: Record<string, string> = {
      missing_role: "Please select a role first.",
      missing_code: "Google login failed. Please try again.",
      google_denied: "Google sign-in was cancelled.",
      oauth_state: "Security check failed. Please try again.",
      missing_oauth_cookie: "Google login timed out. Please try again.",
      missing_google_config: "Google login is not configured on the server.",
      oauth_failed: "Google login failed. Please try again.",
      oauth_role_mismatch:
        "This Google account is already registered with a different role. Use that role or another account.",
    };
    toast.error(map[oauthError] ?? "Authentication failed. Please try again.");
  }, [oauthError]);

  const handleGoogleLogin = () => {
    if (role !== "Owner" && role !== "Traveller") {
      toast.error("Please Select A Role before Login");
      return;
    }
    const qs = new URLSearchParams();
    qs.set("role", role);
    if (redirectPath) qs.set("redirect", redirectPath);
    window.location.href = `/api/oauth/google/start?${qs.toString()}`;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoggingIn(true);
    try {
      const response = await axios.post("/api/user/login", {
        role,
        email,
        password,
      });
      if (response.status === 200) {
        toast.success("Login successful");
        // JWT is already set as an httpOnly cookie by the API.
        // Keep an optional client-readable copy under a different key if needed.
        localStorage.setItem("app_jwt", response.data.token);
        setToken(response.data.tokenData);
        
        // Redirect to the intended page if provided, otherwise go to home
        if (redirectPath) {
          router.push(decodeURIComponent(redirectPath) as any);
        } else {
          router.push("/");
        }
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response?.data?.error) {
        toast.error(err.response.data.error);
      } else {
        toast.error("Login failed. Please check your credentials.");
      }
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <>
      <Toaster />
      <div className={`nc-PageLogin`}>
        <div className="container mb-24 lg:mb-32">
          <h2 className="my-8 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
            Welcome Back
          </h2>
          {
            <div className="w-full flex justify-center font-medium text-sm sm:text-lg mb-8">
              Login As &nbsp;{""}
              {
                <Link href={{ pathname: "/login", query: { role: "Owner" } }}>
                  <span
                    className={` border-b border-dotted ${
                      role === "Owner" ? "text-primary-500" : ""
                    }`}
                  >
                    Owner
                  </span>
                </Link>
              }{" "}
              &nbsp;/&nbsp;{" "}
              {
                <Link
                  href={{ pathname: "/login", query: { role: "Traveller" } }}
                >
                  <span
                    className={` border-b border-dotted ${
                      role === "Traveller" ? "text-primary-500" : ""
                    }`}
                  >
                    Traveller
                  </span>
                </Link>
              }
            </div>
          }
          <div className="max-w-md mx-auto space-y-6">
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="w-full rounded-xl border border-neutral-200 dark:border-neutral-700 px-4 py-3 font-medium text-neutral-800 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition"
            >
              Sign in with Google
            </button>
            <form
              className="grid grid-cols-1 gap-6 relative"
              onSubmit={handleSubmit}
            >
              <label className="block">
                <span className="text-neutral-800 dark:text-neutral-200">
                  Email address
                </span>
                <Input
                  type="email"
                  placeholder="dummyemail@gmail.com"
                  className="mt-1"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </label>
              <label className="block relative">
                <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                  Password
                  <Link
                    href="/forgotpassword"
                    className="font-semibold underline"
                  >
                    Forgot Password
                  </Link>
                </span>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="********"
                  className="mt-1 pr-10" // Add padding to the right to avoid overlap with the icon
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <span className="absolute inset-y-0 right-3 top-9 cursor-pointer text-xl text-neutral-800 dark:text-neutral-200">
                  {showPassword ? (
                    <AiFillEyeInvisible
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <AiFillEye onClick={() => setShowPassword(!showPassword)} />
                  )}
                </span>
              </label>
              <ButtonPrimary type="submit" disabled={isLoggingIn}>
                {isLoggingIn ? (
                  <div className="flex justify-center">
                    logging in.. <CgSpinner className="animate-spin text-2xl" />
                  </div>
                ) : (
                  "Continue"
                )}
              </ButtonPrimary>
            </form>
            <span className="block text-center text-neutral-700 dark:text-neutral-300">
              New user?{" "}
              <Link href="/signup" className="font-semibold underline">
                Create an account
              </Link>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageLogin;
