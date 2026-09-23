"use client";

import React, { Fragment, useState, useContext, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import { UsersIcon, MinusIcon, PlusIcon } from "@heroicons/react/24/outline";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import { PathName } from "@/routers/types";
import { SearchInputContext } from "@/context/SearchInput";

export interface GuestsInputProps {
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: PathName;
  hasButtonSubmit?: boolean;
  rentalType?: string;
  monthlyStays?: boolean;
  onMonthlyStaysChange?: (value: boolean) => void;
}

interface StepperProps {
  label: string;
  value: number;
  min: number;
  max: number;
  onChange: (val: number) => void;
}

const Stepper: FC<StepperProps> = ({ label, value, min, max, onChange }) => (
  <div className="flex items-center justify-between py-3 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
    <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
      {label}
    </span>
    <div className="flex items-center gap-3">
      <button
        type="button"
        disabled={value <= min}
        onClick={() => onChange(Math.max(min, value - 1))}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 disabled:opacity-30 hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors"
      >
        <MinusIcon className="h-3.5 w-3.5" />
      </button>
      <span className="w-5 text-center text-sm font-semibold text-neutral-900 dark:text-white">
        {value}
      </span>
      <button
        type="button"
        disabled={value >= max}
        onClick={() => onChange(Math.min(max, value + 1))}
        className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-300 dark:border-neutral-600 text-neutral-600 dark:text-neutral-300 disabled:opacity-30 hover:border-neutral-900 dark:hover:border-neutral-300 transition-colors"
      >
        <PlusIcon className="h-3.5 w-3.5" />
      </button>
    </div>
  </div>
);

const GuestsInput: FC<GuestsInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  buttonSubmitHref = "/listing-stay" as PathName,
  hasButtonSubmit = true,
  monthlyStays,
  onMonthlyStaysChange,
}) => {
  const context = useContext(SearchInputContext);
  const [monthlyStaysInternal, setMonthlyStaysInternal] = useState<boolean>(
    monthlyStays ?? false
  );

  const monthlyStaysValue = monthlyStays ?? monthlyStaysInternal;
  const setMonthlyStaysValue = (value: boolean) => {
    if (onMonthlyStaysChange) {
      onMonthlyStaysChange(value);
      return;
    }
    setMonthlyStaysInternal(value);
  };

  if (!context) return null;

  const { place, guests, setGuests, bedrooms, setBedrooms, bathrooms, setBathrooms } = context;

  // Single-line summary — stays on one line regardless of values
  const summareParts: string[] = [];
  summareParts.push(`${guests} guest${guests !== 1 ? "s" : ""}`);
  if (bedrooms > 0) summareParts.push(`${bedrooms} br`);
  if (bathrooms > 0) summareParts.push(`${bathrooms} bath`);
  const summary = summareParts.join(" · ");

  const hasNonDefault = bedrooms > 0 || bathrooms > 0;

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            {/* Trigger — identical height structure to LocationInput */}
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
            >
              <div
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                  open
                    ? "bg-primary-6000/10 text-primary-6000"
                    : "bg-neutral-100 text-neutral-400 dark:bg-neutral-700 dark:text-neutral-400"
                }`}
              >
                <UsersIcon className="h-4 w-4 lg:h-5 lg:w-5" />
              </div>

              <div className="flex-grow min-w-0">
                <span className="block text-xs font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Guests & rooms
                </span>
                <span className="mt-0.5 block truncate text-sm font-medium text-neutral-800 dark:text-neutral-100">
                  {summary}
                </span>
              </div>

              {hasNonDefault && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuests(1);
                    setBedrooms(0);
                    setBathrooms(0);
                  }}
                />
              )}
            </Popover.Button>

            {/* Submit */}
            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4">
                <ButtonSubmit
                  href={buttonSubmitHref}
                  place={place}
                  guests={guests}
                  bedrooms={bedrooms}
                  bathrooms={bathrooms}
                  rentalType={monthlyStaysValue ? "Long Term" : "Short Term"}
                  monthlyStays={monthlyStaysValue}
                />
              </div>
            )}
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800" />
          )}

          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[300px] max-w-xs bg-white dark:bg-neutral-800 top-full mt-3 px-5 py-4 rounded-3xl shadow-xl">
              <Stepper
                label="Guests"
                value={guests}
                min={1}
                max={20}
                onChange={setGuests}
              />
              <Stepper
                label="Bedrooms"
                value={bedrooms}
                min={0}
                max={10}
                onChange={setBedrooms}
              />
              <Stepper
                label="Bathrooms"
                value={bathrooms}
                min={0}
                max={10}
                onChange={setBathrooms}
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
