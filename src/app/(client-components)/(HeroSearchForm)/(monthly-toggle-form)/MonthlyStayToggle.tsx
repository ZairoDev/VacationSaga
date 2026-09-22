"use client";

import React, { FC } from "react";
import { motion } from "framer-motion";
import { Home, CalendarDays } from "lucide-react";
import { cn } from "@/lib/utils";

interface MonthlyStayToggleProps {
  value: boolean;
  onChange: (value: boolean) => void;
  className?: string;
}

const MonthlyStayToggle: FC<MonthlyStayToggleProps> = ({
  value,
  onChange,
  className,
}) => {
  return (
    <div
      className={cn(
        "relative inline-flex items-center",
        "rounded-full border border-neutral-200",
        "bg-white p-1 shadow-sm",
        "dark:border-neutral-700 dark:bg-neutral-900",
        className,
      )}
      role="group"
      aria-label="Stay duration"
    >
      {/* Monthly Stays */}
      <button
        type="button"
        onClick={() => onChange(true)}
        aria-pressed={value}
        className={cn(
          "relative z-10 flex items-center justify-center",
          "gap-1.5 sm:gap-2",
          "whitespace-nowrap rounded-full",
          "px-3.5 py-2 sm:px-5 sm:py-3",
          "text-xs sm:text-sm font-medium",
          "transition-colors duration-200",
          value
            ? "text-white"
            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300",
        )}
      >
        {value && (
          <motion.div
            layoutId="stay-toggle-active"
            className="absolute inset-0 -z-10 rounded-full bg-[rgb(247_149_29_/_var(--tw-bg-opacity))]"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        )}

        <CalendarDays className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

        <span>Monthly stays</span>
      </button>

      {/* Short Stays */}
      <button
        type="button"
        onClick={() => onChange(false)}
        aria-pressed={!value}
        className={cn(
          "relative z-10 flex items-center justify-center",
          "gap-1.5 sm:gap-2",
          "whitespace-nowrap rounded-full",
          "px-3.5 py-2 sm:px-5 sm:py-3",
          "text-xs sm:text-sm font-medium",
          "transition-colors duration-200",
          !value
            ? "text-white"
            : "text-neutral-600 hover:text-neutral-900 dark:text-neutral-300",
        )}
      >
        {!value && (
          <motion.div
            layoutId="stay-toggle-active"
            className="absolute inset-0 -z-10 rounded-full bg-[rgb(247_149_29_/_var(--tw-bg-opacity))]"
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 30,
            }}
          />
        )}

        <Home className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4" />

        <span>Short stays</span>
      </button>
    </div>
  );
};

export default MonthlyStayToggle;
