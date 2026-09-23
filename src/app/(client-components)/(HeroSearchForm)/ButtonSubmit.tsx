import { PathName } from "@/routers/types";
import Link from "next/link";
import React, { FC } from "react";

interface Props {
  href?: PathName;
  place?: string;
  guests?: number;
  bedrooms?: number;
  bathrooms?: number;
  rentalType?: string;
  monthlyStays?: boolean;
}

const ButtonSubmit: FC<Props> = ({
  href = "/listing-stay",
  place,
  guests,
  bedrooms,
  bathrooms,
  rentalType,
  monthlyStays,
}) => {
  const queryParams: Record<string, string | number | undefined> = {
    place: place,
    guests: guests,
  };

  if (bedrooms && bedrooms > 0) queryParams.bedrooms = bedrooms;
  if (bathrooms && bathrooms > 0) queryParams.bathrooms = bathrooms;
  if (rentalType) queryParams.rentalType = rentalType;
  if (monthlyStays !== undefined) queryParams.monthlyStays = monthlyStays ? "1" : "0";

  return (
    <Link
      href={{
        pathname: "/listing-stay",
        query: queryParams,
      }}
      type="button"
      className="h-11 sm:h-12 lg:h-14 px-5 sm:px-6 rounded-full bg-primary-6000 hover:bg-primary-700 flex items-center justify-center text-white font-medium focus:outline-none whitespace-nowrap"
    >
      <span className="text-sm sm:text-base">Search stays</span>
    </Link>
  );
};

export default ButtonSubmit;
