"use client";
import React, { FC, useState, useEffect, useContext, Suspense } from "react";
import SectionGridFilterCard from "../SectionGridFilterCard";
import { MyContext } from "@/context/propertyContext";
import { PropertyDataType } from "@/data/types";
import { useSearchParams } from "next/navigation";

export interface ListingStayPageProps {}

const ListingStayPageContent: FC<ListingStayPageProps> = () => {
  const [countryPropertyCount, setCountryPropertyCount] = useState(0);
  const [countryContext, setCountryContext] = useState<
    PropertyDataType | undefined
  >(undefined);
  const context: PropertyDataType | undefined = useContext(MyContext);
  const searchParams = useSearchParams();
  const country: string = searchParams.get("place") || "Greece";

  useEffect(() => {
    setCountryContext(context);
  }, []);

  useEffect(() => {
    let countryCount = 0;
    const contextArray = Array.isArray(context) ? context : [context];
    contextArray.forEach((property) => {
      if (property?.country === country) {
        countryCount++;
      }
    });
    setCountryPropertyCount(countryCount);
  }, [countryContext, context, country])

  // console.log('listing-stay: ', country)
  return <SectionGridFilterCard className="container pb-24 lg:pb-28" country={country} countryPropertyCount={countryPropertyCount} />;
};

const ListingStayPage: FC<ListingStayPageProps> = () => {
  return (
    <Suspense
      fallback={
        <div className="container py-24 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-6000 border-t-transparent mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
          </div>
        </div>
      }
    >
      <ListingStayPageContent />
    </Suspense>
  );
};

export default ListingStayPage;
