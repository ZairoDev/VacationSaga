"use client";

import React, { FC, useState } from "react";
import { CalendarDays } from "lucide-react";

import MonthlyMonthPicker, {
  MonthlyStayDate,
} from "./MonthlyMonthPicker";

import { cn } from "@/lib/utils";

interface MonthlyWhenInputProps {
  className?: string;
  value?: MonthlyStayDate[];
  onChange?: (value: MonthlyStayDate[]) => void;
}

const MonthlyWhenInput: FC<MonthlyWhenInputProps> = ({
  className = "",
  value = [],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const formatSelectedMonths = () => {
    if (value.length === 0) {
      return "Choose move-in months";
    }

    return value
      .map((month) =>
        new Date(month.year, month.month, 1).toLocaleString(
          "en-US",
          {
            month: "short",
            year: "numeric",
          }
        )
      )
      .join(" to ");
  };

  return (
    <div className="relative w-full sm:flex-1">
      {/* When Input */}
      <button
        type="button"
        onClick={() => setIsOpen((previous) => !previous)}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        className={cn(
          "flex w-full items-center space-x-3",
          "[ nc-hero-field-padding ] text-left",
          "transition-colors",
          "hover:bg-neutral-50",
          "dark:hover:bg-neutral-800",
          className,
        )}
      >
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors`}
        >
        <CalendarDays
          className="h-6 w-6 shrink-0 text-neutral-500"
          strokeWidth={1.8}
        />
</div>
        <div className="min-w-0">
          <span className="block text-xs font-semibold text-neutral-500 dark:text-neutral-400">WHEN</span>

          <span
            className={cn(
              "mt-1 block truncate text-sm",
              value.length > 0
                ? "text-neutral-900 dark:text-white"
                : "text-neutral-500 dark:text-neutral-400",
            )}
          >
            {formatSelectedMonths()}
          </span>
        </div>
      </button>

      {/* Monthly Picker */}
      {isOpen && (
        <MonthlyMonthPicker
          selectedMonths={value}
          onChange={(months) => {
            onChange?.(months);
          }}
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default MonthlyWhenInput;