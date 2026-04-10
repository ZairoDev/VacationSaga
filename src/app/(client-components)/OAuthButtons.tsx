"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

type Props = {
  role?: string | null;
  className?: string;
};

export default function OAuthButtons({ role, className = "" }: Props) {
  const params = useSearchParams();
  const redirect = params.get("redirect") || "/";
  const effectiveRole = role || params.get("role") || "Traveller";
  const callbackUrl = `/api/auth/bridge?role=${encodeURIComponent(
    effectiveRole
  )}&redirect=${encodeURIComponent(redirect)}`;

  return (
    <div className={`space-y-3 ${className}`}>
      <button
        type="button"
        onClick={() => signIn("google", { callbackUrl })}
        className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors px-5 py-3 text-sm font-medium text-neutral-900 dark:text-neutral-100"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill="#FFC107"
            d="M43.611 20.083H42V20H24v8h11.303C33.89 32.657 29.244 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.96 3.04l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"
          />
          <path
            fill="#FF3D00"
            d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.96 3.04l5.657-5.657C34.046 6.053 29.268 4 24 4c-7.682 0-14.354 4.337-17.694 10.691z"
          />
          <path
            fill="#4CAF50"
            d="M24 44c5.166 0 9.86-1.977 13.409-5.197l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.221 0-9.853-3.321-11.281-7.946l-6.52 5.023C9.505 39.556 16.227 44 24 44z"
          />
          <path
            fill="#1976D2"
            d="M43.611 20.083H42V20H24v8h11.303c-1.014 2.878-3.083 5.086-5.884 6.565l.003-.002 6.19 5.238C35.171 40.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"
          />
        </svg>
        Continue with Google
      </button>
    </div>
  );
}

