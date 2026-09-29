"use client";

import React, { FC, useEffect, useMemo, useRef, useState } from "react";

import { CalendarDays, ChevronLeft, ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

export interface MonthlyStayDate {
  month: number;
  year: number;
}

interface MonthlyMonthPickerProps {
  selectedMonths: MonthlyStayDate[];
  onChange: (months: MonthlyStayDate[]) => void;
  onClose: () => void;
  minDate?: Date;
  className?: string;
}

const MONTHS_TO_SHOW = 24;

const getMonthStart = (date: Date) =>
  new Date(date.getFullYear(), date.getMonth(), 1);

const addMonths = (date: Date, count: number) =>
  new Date(date.getFullYear(), date.getMonth() + count, 1);

const isSameMonth = (first: MonthlyStayDate, second: MonthlyStayDate) =>
  first.month === second.month && first.year === second.year;

const MonthlyMonthPicker: FC<MonthlyMonthPickerProps> = ({
  selectedMonths,
  onChange,
  onClose,
  minDate = new Date(),
  className,
}) => {
  const pickerRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const minimumMonth = useMemo(() => getMonthStart(minDate), [minDate]);

  const [startMonth, setStartMonth] = useState<Date>(minimumMonth);

  const [pendingMonths, setPendingMonths] =
    useState<MonthlyStayDate[]>(selectedMonths);

  useEffect(() => {
    setPendingMonths(selectedMonths);
  }, [selectedMonths]);

  // Close on outside click.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  // Escape key.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const months = useMemo(() => {
    return Array.from({ length: MONTHS_TO_SHOW }, (_, index) =>
      addMonths(startMonth, index),
    );
  }, [startMonth]);

  const scrollMonths = (direction: "left" | "right") => {
    scrollRef.current?.scrollBy({
      left: direction === "right" ? 240 : -240,
      behavior: "smooth",
    });
  };

  const handleMonthSelect = (date: Date) => {
    const selected: MonthlyStayDate = {
      month: date.getMonth(),
      year: date.getFullYear(),
    };

    setPendingMonths((previous) => {
      // First selection: Start month
      if (previous.length === 0) {
        onChange([selected]);
        return [selected];
      }

      // Second selection: End month
      if (previous.length === 1) {
        const start = previous[0];

        const startDate = new Date(start.year, start.month, 1);
        const selectedDate = new Date(selected.year, selected.month, 1);

        // If selected month is earlier, restart with new start month
        if (selectedDate < startDate) {
          onChange([selected]);
          return [selected];
        }

        const updated = [start, selected];

        onChange(updated);
        return updated;
      }

      // Both selected: start a new range
      onChange([selected]);
      return [selected];
    });
  };

  const handleClear = () => {
    setPendingMonths([]);
    onChange([]);
  };

  const formatMonth = (date: Date) =>
    date.toLocaleString("en-US", {
      month: "long",
    });

  return (
    <div
      ref={pickerRef}
      className={cn(
        "absolute left-1/2 -translate-x-1/2 top-full z-[100] mt-0 sm:mt-3",
        "w-[min(520px,calc(100vw-16px))]",
        "rounded-3xl border border-neutral-200",
        "bg-neutral-100 text-neutral-900 shadow-2xl",
        "dark:border-neutral-700",
        "dark:bg-neutral-900 dark:text-white",
        className,
      )}
    >
      {/* Header */}
      <div className="border-b border-neutral-200 px-5 py-4 dark:border-neutral-700">
        <h3 className="text-base font-semibold">
          When do you want to move in?
        </h3>

        <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
          Choose a start and end month
        </p>
      </div>

      {/* Month Section */}
      <div className="px-5 py-5">
        <div className="relative px-6">
          {/* Left Button */}
          <button
            type="button"
            onClick={() => scrollMonths("left")}
            aria-label="Scroll months left"
            className={cn(
              "absolute left-0 top-1/2 z-10",
              "-translate-y-1/2",
              "flex h-8 w-8 items-center justify-center",
              "rounded-full border border-neutral-200",
              "bg-white shadow-md",
              "dark:border-neutral-700 dark:bg-neutral-800",
            )}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          {/* Horizontal Scroll */}
          <div
            ref={scrollRef}
            className={cn(
              "flex gap-3 overflow-x-auto",
              "pb-3",
              "scroll-smooth",
              "snap-x snap-mandatory",
              "[scrollbar-width:none]",
              "[&::-webkit-scrollbar]:hidden",
            )}
          >
            {months.map((date) => {
              const monthValue: MonthlyStayDate = {
                month: date.getMonth(),
                year: date.getFullYear(),
              };

              const isSelected = pendingMonths.some((month) =>
                isSameMonth(month, monthValue),
              );

              const isStartMonth =
                pendingMonths.length > 0 &&
                isSameMonth(pendingMonths[0], monthValue);

              const isEndMonth =
                pendingMonths.length > 1 &&
                isSameMonth(pendingMonths[1], monthValue);

              const isBetween = (() => {
                if (pendingMonths.length < 2) return false;
                const val = monthValue.year * 12 + monthValue.month;
                const startVal = pendingMonths[0].year * 12 + pendingMonths[0].month;
                const endVal = pendingMonths[1].year * 12 + pendingMonths[1].month;
                return val > startVal && val < endVal;
              })();

              const isDisabled = date.getTime() < minimumMonth.getTime();

              return (
                <button
                  key={`${date.getFullYear()}-${date.getMonth()}`}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleMonthSelect(date)}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex min-w-[112px] shrink-0 snap-start",
                    "flex-col items-center justify-center",
                    "rounded-2xl border px-3 py-4",
                    "transition-all duration-200",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2 focus-visible:ring-neutral-500",

                    isSelected
                      ? [
                          "border-neutral-900",
                          "bg-neutral-900",
                          "text-white",
                          "dark:border-white",
                          "dark:bg-white",
                          "dark:text-neutral-900",
                        ]
                      : isBetween
                      ? [
                          "border-neutral-300",
                          "bg-neutral-500",
                          "text-white",
                          "dark:border-neutral-600",
                          "dark:bg-neutral-700",
                          "dark:text-neutral-100",
                        ]
                      : [
                          "border-neutral-200",
                          "hover:border-neutral-900",
                          "dark:border-neutral-700",
                          "dark:hover:border-neutral-300",
                        ],

                    isDisabled && "cursor-not-allowed opacity-30",
                  )}
                >
                  <CalendarDays className="mb-2 h-6 w-6" strokeWidth={1.7} />
                  {isStartMonth && (
                    <span className="text-xs font-semibold">Start</span>
                  )}

                  {isEndMonth && (
                    <span className="text-xs font-semibold">End</span>
                  )}

                  <span className="text-sm font-medium">
                    {formatMonth(date)}
                  </span>

                  <span className="mt-1 text-xs opacity-70">
                    {date.getFullYear()}
                  </span>
                </button>
              );
            })}
          </div>
          

          {/* Right Button */}
          <button
            type="button"
            onClick={() => scrollMonths("right")}
            aria-label="Scroll months right"
            className={cn(
              "absolute right-0 top-1/2 z-10",
              "translate-x-1/2 -translate-y-1/2",              "flex h-8 w-8 items-center justify-center",
              "rounded-full border border-neutral-200",
              "bg-white shadow-md",
              "dark:border-neutral-700 dark:bg-neutral-800",
            )}
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>

        {/* Selected Summary */}
        <div className="mt-4 rounded-2xl bg-neutral-50 p-3 dark:bg-neutral-800">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            {pendingMonths.length === 0
              ? "Select start month"
              : pendingMonths.length === 1
                ? "Select end month"
                : "Selected month range"}
          </p>

          <p className="mt-1 text-sm font-medium">
            {pendingMonths.length > 0
              ? pendingMonths
                  .map(
                    (month) =>
                      `${new Date(month.year, month.month, 1).toLocaleString(
                        "en-US",
                        {
                          month: "short",
                        },
                      )} ${month.year}`,
                  )
                  .join(" to ")
              : "No months selected"}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between border-t border-neutral-200 px-5 py-4 dark:border-neutral-700">
        <button
          type="button"
          onClick={handleClear}
          className="text-sm font-semibold text-primary-6000 underline underline-offset-4 hover:opacity-60"
        >
          Clear
        </button>

        <button
          type="button"
          onClick={onClose}
          className={cn(
            "rounded-full px-6 py-2.5",
            "bg-primary-6000 text-sm font-semibold text-white",
            "hover:bg-primary-700",
          )}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default MonthlyMonthPicker;
