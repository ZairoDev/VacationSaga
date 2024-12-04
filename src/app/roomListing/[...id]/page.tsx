"use client";

import { QuickListingInterface } from "@/data/types";
import axios from "axios";
import { Route } from "next";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LuLoader2 } from "react-icons/lu";

interface PageProps {
  params: {
    id: string;
  };
}

const Page = ({ params }: PageProps) => {
  const [quickListing, setQuickListing] = useState<QuickListingInterface>();
  const propertyId = params.id[0];
  const [isLoading, setIsLoading] = useState(false);

  const getQuickListing = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/room/getQuickListing", {
        propertyId,
      });
      setQuickListing(response.data.property);
    } catch (err: any) {
      console.log("error in fetching quick listing: ", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getQuickListing();
  }, [propertyId]);

  return (
    <div>
      {quickListing ? (
        <div>
          <div className=" flex justify-center mt-2">
            <p className=" text-xl font-semibold">{quickListing?.QID}</p>
          </div>
          <div className=" w-full flex flex-col md:flex-row justify-around py-2 px-8 h-[80vh]">
            <div className=" flex flex-wrap gap-4 mt-4 w-full md:w-1/2 overflow-y-auto scrollbar-thin justify-center">
              {quickListing?.propertyImages?.map((item, index) => (
                <div key={index}>
                  <Link
                    href={quickListing.propertyImages[index] as Route}
                    target="_blank"
                  >
                    <img src={item} className=" w-36 h-36 rounded-lg" />
                  </Link>
                </div>
              ))}
            </div>
            <div className=" mt-4 flex flex-col gap-y-4 w-full items-center md:w-1/3 md:justify-center p-4 text-base sm:text-xl font-medium">
              <p className=" whitespace-nowrap">
                <span className=" sm:font-bold">Property Name</span> -{" "}
                {quickListing?.propertyName}
              </p>
              <p>
                <span className=" sm:font-bold">Price</span> - €{" "}
                {quickListing?.basePrice}
              </p>
              <p>
                <span className=" sm:font-bold">Location</span> -{" "}
                {quickListing?.address}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className=" w-full h-[80vh] flex justify-center items-center font-bold text-5xl">
          {" "}
          {isLoading ? <LuLoader2 className=" animate-spin" /> : "No Property"}
        </div>
      )}
    </div>
  );
};

export default Page;
