"use client";
import axios from "axios";
import React, { useEffect } from "react";
import { Toaster, toast } from "sonner";
import Link from "next/link";




export default function VerifyEmailPage() {
  const [isVerified, setIsVerified] = React.useState(false);
  const [token, setToken] = React.useState("");
  const [error, setError] = React.useState(false);

  const verifyUserEmail = async () => {
    try {
      axios.post("api/user/verifyemail", { token });
      setIsVerified(true);
      setError(false);
      toast.success("Email verified successfully");
    } catch (error: any) {
      setError(true);
      console.log(error.response.data, "error");
    }
  };


  useEffect(() => {
    setError(false);
    const urlToken = window.location.search.split("=");
    setToken(urlToken[1] || "");
  }, []);

  useEffect(() => {
    setError(false);
    if (token.length > 0) {
      verifyUserEmail();
    }
  }, [token]);

  return (
    <>
      <Toaster />
      <div className="h-screen flex flex-col items-center  ">
        <div className="flex items-center justify-center flex-col my-10">
          <h1 className="text-3xl font-semibold text-center mt-10 ">
            Welcome on board <br /> do verify your email to access all the
            routes
          </h1>
          {isVerified && (
            <>
              <div>
                <h1 className="text-green-500 mt-36">
                  Looks like your email is verified
                </h1>
              </div>
              <Link href="/login" className="text-blue-500">
                Tap to Login
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center justify-center flex-col">
          {/* <p className="text-red-500 mt-10">
            {token ? `${token}` : "no token"}
          </p> */}

          {error && (
            <div>
              <h1 className="text-red-500">Some error while verifying</h1>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
