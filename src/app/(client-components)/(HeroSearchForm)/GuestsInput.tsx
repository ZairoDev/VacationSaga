"use client";

import React, { Fragment, useEffect, useState, useContext, FC } from "react";
import { Popover, Transition } from "@headlessui/react";
import NcInputNumber from "@/components/NcInputNumber";
import ClearDataButton from "./ClearDataButton";
import ButtonSubmit from "./ButtonSubmit";
import { PathName } from "@/routers/types";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { GuestsObject } from "../type";
import { SearchInputContext } from "@/context/SearchInput";
import { Switch } from "@headlessui/react";

export interface GuestsInputProps {
  fieldClassName?: string;
  className?: string;
  buttonSubmitHref?: PathName;
  hasButtonSubmit?: boolean;
  rentalType?: string;
  monthlyStays?: boolean;
  onMonthlyStaysChange?: (value: boolean) => void;
}

const GuestsInput: FC<GuestsInputProps> = ({
  fieldClassName = "[ nc-hero-field-padding ]",
  className = "[ nc-flex-1 ]",
  buttonSubmitHref = "/listing-stay-map" as PathName,
  hasButtonSubmit = true,
  rentalType,
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

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(1);
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(0);
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(0);
  if (!context) {
    return null;
  }

  const { place, setPlace, date, setDate, guests, setGuests } = context;

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      guestAdults: guestAdultsInputValue,
      guestChildren: guestChildrenInputValue,
      guestInfants: guestInfantsInputValue,
    };
    if (type === "guestAdults") {
      setGuestAdultsInputValue(value);
      newValue.guestAdults = value;
    }
    if (type === "guestChildren") {
      setGuestChildrenInputValue(value);
      newValue.guestChildren = value;
    }
    if (type === "guestInfants") {
      setGuestInfantsInputValue(value);
      newValue.guestInfants = value;
    }
    setGuests(newValue.guestAdults + newValue.guestChildren + newValue.guestInfants);
  };

  const totalGuests =
    guestChildrenInputValue + guestAdultsInputValue + guestInfantsInputValue;

  return (
    <Popover className={`flex relative ${className}`}>
      {({ open }) => (
        <>
          <div
            className={`flex-1 z-10 flex items-center focus:outline-none ${
              open ? "nc-hero-field-focused" : ""
            }`}
          >
            <Popover.Button
              className={`relative z-10 flex-1 flex text-left items-center ${fieldClassName} space-x-3 focus:outline-none`}
            >
              <div className="text-neutral-300 dark:text-neutral-400">
                <UserPlusIcon className="w-5 h-5 lg:w-7 lg:h-7" />
              </div>
              <div className="flex-grow">
                <span className="block text-sm font-medium text-neutral-800 dark:text-neutral-100 leading-none">
                  Guests
                </span>
                <span className="block mt-1 text-sm text-neutral-500 dark:text-neutral-400 leading-none">
                  {totalGuests ? `${totalGuests} guests` : "Add guests"}
                </span>
              </div>

              {!!totalGuests && open && (
                <ClearDataButton
                  onClick={() => {
                    setGuestAdultsInputValue(0);
                    setGuestChildrenInputValue(0);
                    setGuestInfantsInputValue(0);
                    setGuests(0);
                  }}
                />
              )}
            </Popover.Button>

            {/* Monthly stays toggle + submit */}
            <div className="hidden lg:flex items-center gap-3 pr-2 xl:pr-4">
              <span className="text-sm text-neutral-700 dark:text-neutral-200 whitespace-nowrap">
                Monthly stays
              </span>
              <Switch
                checked={monthlyStaysValue}
                onChange={setMonthlyStaysValue}
                className={`${
                  monthlyStaysValue
                    ? "bg-primary-6000"
                    : "bg-neutral-200 dark:bg-neutral-700"
                } relative inline-flex h-[22px] w-[42px] shrink-0 cursor-pointer rounded-full border-4 border-transparent transition-colors duration-200 ease-in-out focus:outline-none`}
              >
                <span
                  aria-hidden="true"
                  className={`${
                    monthlyStaysValue ? "translate-x-5" : "translate-x-0"
                  } pointer-events-none inline-block h-[14px] w-[14px] transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                />
              </Switch>
            </div>

            {/* BUTTON SUBMIT OF FORM */}
            {hasButtonSubmit && (
              <div className="pr-2 xl:pr-4">
                <ButtonSubmit
                  href={buttonSubmitHref}
                  place={place}
                  guests={guests}
                  rentalType={monthlyStaysValue ? "Long Term" : "Short Term"}
                  monthlyStays={monthlyStaysValue}
                />
              </div>
            )}
          </div>

          {open && (
            <div className="h-8 absolute self-center top-1/2 -translate-y-1/2 z-0 -left-0.5 right-0.5 bg-white dark:bg-neutral-800"></div>
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
            <Popover.Panel className="absolute right-0 z-10 w-full sm:min-w-[340px] max-w-sm bg-white dark:bg-neutral-800 top-full mt-3 py-5 sm:py-6 px-4 sm:px-8 rounded-3xl shadow-xl">
              <NcInputNumber
                className="w-full"
                defaultValue={guestAdultsInputValue}
                onChange={(value) => handleChangeData(value, "guestAdults")}
                max={10}
                min={1}
                label="Adults"
                desc="Ages 13 or above"
              />
              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestChildrenInputValue}
                onChange={(value) => handleChangeData(value, "guestChildren")}
                max={4}
                label="Children"
                desc="Ages 2–12"
              />

              <NcInputNumber
                className="w-full mt-6"
                defaultValue={guestInfantsInputValue}
                onChange={(value) => handleChangeData(value, "guestInfants")}
                max={4}
                label="Infants"
                desc="Ages 0–2"
              />
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default GuestsInput;
