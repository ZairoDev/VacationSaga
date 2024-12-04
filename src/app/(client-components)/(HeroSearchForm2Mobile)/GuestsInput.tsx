"use client";
import React, { useEffect, useState } from "react";
import NcInputNumber from "@/components/NcInputNumber";
import { FC } from "react";
import { GuestsObject } from "../type";

export interface GuestsInputProps {
  defaultValue?: GuestsObject;
  onChange?: (data: GuestsObject) => void;
  className?: string;
}

const GuestsInput: FC<GuestsInputProps> = ({
  defaultValue,
  onChange,
  className = "",
}) => {

  const [guests, setGuests] = useState<GuestsObject>(() => {
    const savedGuests = localStorage.getItem('guests');
    if (!savedGuests) {
      return {};
    }
    const gsts = JSON.parse(savedGuests);
    return gsts;
  })

  const [guestAdultsInputValue, setGuestAdultsInputValue] = useState(
    defaultValue?.guestAdults || 0
  );
  const [guestChildrenInputValue, setGuestChildrenInputValue] = useState(
    defaultValue?.guestChildren || 0
  );
  const [guestInfantsInputValue, setGuestInfantsInputValue] = useState(
    defaultValue?.guestInfants || 0
  );

  useEffect(() => {
    setGuestAdultsInputValue(defaultValue?.guestAdults || 0);
  }, [defaultValue?.guestAdults]);
  useEffect(() => {
    setGuestChildrenInputValue(defaultValue?.guestChildren || 0);
  }, [defaultValue?.guestChildren]);
  useEffect(() => {
    setGuestInfantsInputValue(defaultValue?.guestInfants || 0);
  }, [defaultValue?.guestInfants]);

  const handleChangeData = (value: number, type: keyof GuestsObject) => {
    let newValue = {
      // guestAdults: guestAdultsInputValue,
      guestAdults: guests.guestAdults,
      // guestChildren: guestChildrenInputValue,
      guestChildren: guests.guestChildren,
      // guestInfants: guestInfantsInputValue,
      guestInfants: guests.guestInfants,
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
    onChange && onChange(newValue);
    localStorage.setItem('guests', JSON.stringify(newValue));
  };


  useEffect(() => {
    setGuests(guests);
    localStorage.setItem('guests', JSON.stringify(guests));
  }, [guests])

  return (
    <div className={`flex flex-col relative p-5 ${className}`}>
      <span className="mb-5 block font-semibold text-xl sm:text-2xl">
        {`Who's coming?`}
      </span>
      <NcInputNumber
        className="w-full"
        // defaultValue={guestAdultsInputValue}
        defaultValue={guests.guestAdults || 0}
        onChange={(value) => handleChangeData(value, "guestAdults")}
        max={20}
        label="Adults"
        desc="Ages 13 or above"
      />
      <NcInputNumber
        className="w-full mt-6"
        // defaultValue={guestChildrenInputValue}
        defaultValue={guests.guestChildren || 0}
        onChange={(value) => handleChangeData(value, "guestChildren")}
        max={20}
        label="Children"
        desc="Ages 2–12"
      />

      {/* <NcInputNumber
        className="w-full mt-6"
        defaultValue={guestInfantsInputValue}
        onChange={(value) => handleChangeData(value, "guestInfants")}
        max={20}
        label="Infants"
        desc="Ages 0–2"
      /> */}
    </div>
  );
};

export default GuestsInput;
