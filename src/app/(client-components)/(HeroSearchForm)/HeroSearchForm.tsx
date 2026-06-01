"use client";

import React, { FC, useState } from "react";
import StaySearchForm from "./(stay-search-form)/StaySearchForm";
import ExperiencesSearchForm from "./(experiences-search-form)/ExperiencesSearchForm";
import RentalCarSearchForm from "./(car-search-form)/RentalCarSearchForm";
import FlightSearchForm from "./(flight-search-form)/FlightSearchForm";

// Backwards-compat export: used by Header3.
export type SearchTab = "Short Term Rentals" | "Long Term Rentals";

export interface HeroSearchFormProps {
  className?: string;
  formClassName?: string;
  defaultMonthlyStays?: boolean;
}

const HeroSearchForm: FC<HeroSearchFormProps> = ({
  className = "",
  formClassName,
  defaultMonthlyStays = true,
}) => {
  // Monthly stays toggle replaces Short/Long term tabs:
  // - monthlyStays = true  => Long term (monthly rentals)
  // - monthlyStays = false => Short term
  const [monthlyStays, setMonthlyStays] = useState<boolean>(defaultMonthlyStays);

  return (
    <div
      className={`nc-HeroSearchForm w-full max-w-6xl ${className}`}
    >
      {monthlyStays ? (
        <ExperiencesSearchForm
          rentalType="Long Term"
          formClassName={formClassName}
          monthlyStays={monthlyStays}
          onMonthlyStaysChange={setMonthlyStays}
        />
      ) : (
        <StaySearchForm
          rentalType="Short Term"
          formClassName={formClassName}
          monthlyStays={monthlyStays}
          onMonthlyStaysChange={setMonthlyStays}
        />
      )}
    </div>
  );
};

export default HeroSearchForm;
