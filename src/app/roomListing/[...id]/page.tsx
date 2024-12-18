"use client";

import { BentoGridDemo } from "@/components/BentoGrid";
import { QuickListingInterface } from "@/data/types";
import { quicklisting } from "@/models/quicklisting";
import ButtonClose from "@/shared/ButtonClose";
import { Dialog, Transition } from "@headlessui/react";
import { Squares2X2Icon } from "@heroicons/react/24/solid";
import axios from "axios";
import { Route } from "next";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
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
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [allImages, setAllImages] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);



  const modalImages = () => {
    return (
      <Transition appear show={modalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setModalIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center flex items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-3/4 max-w-4xl h-4/5 bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl rounded-2xl overflow-hidden flex flex-col">
                <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                  <h3
                    className="text-lg font-medium leading-6 text-gray-900"
                    id="headlessui-dialog-title-70"
                  >
                    Images
                  </h3>
                  <span className="absolute left-3 top-3">
                    <ButtonClose onClick={() => setModalIsOpen(false)} />
                  </span>
                </div>
                <div className="flex-grow overflow-auto px-8 py-4 text-neutral-700 dark:text-neutral-300">
                  <BentoGridDemo allImages={allImages} />
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };



  const getQuickListing = async () => {
    try {
      setIsLoading(true);
      const response = await axios.post("/api/room/getQuickListing", {
        propertyId,
      });
      setQuickListing(response.data.property);
      setAllImages(response.data.property.propertyImages);
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
        <div >

          <div className=" w-[90vw] relative flex mx-auto">
            <div className=" w-full flex justify-center md:block md:w-1/2 p-4  relative ">
              {/* <p className=" absolute z-10 top-6 right-4 text-xl font-semibold text-white p-2 rounded-full bg-neutral-700">{currentIndex + 1}/5</p> */}
              <img src={quickListing.propertyImages?.[currentIndex]} alt="cover-image" className=" rounded-2xl h-full " />
              <IoIosArrowBack
                onClick={() => {
                  if (currentIndex > 0) {
                    setCurrentIndex((prev) => prev - 1);
                  } else {
                    setCurrentIndex(4);
                  }
                }}
                className=" md:hidden absolute left-6 top-1/2 cursor-pointer text-xl w-8 h-8 bg-neutral-400 rounded-full p-1 z-10" />
              <IoIosArrowForward
                onClick={() => {
                  if (currentIndex < 4) {
                    setCurrentIndex((prev) => prev + 1);
                  } else {
                    setCurrentIndex(0)
                  }
                }}
                className=" md:hidden absolute right-6 top-1/2 cursor-pointer text-xl w-8 h-8 bg-neutral-400 rounded-full p-1 z-10" />
              {/* <div className=" absolute flex items-center gap-x-2 bottom-6 z-10">
                {Array.from({ length: 5 }, (_, index) => (
                  <p className={` w-2 h-2 bg-neutral-200 rounded-full ${index === currentIndex && " bg-neutral-800"} ${index === currentIndex && " w-4 h-4"}`}></p>
                ))}
              </div> */}
            </div>
            <div className=" w-1/2 py-4 md:grid grid-cols-2 grid-rows-2 gap-2 hidden">
              {quickListing.propertyImages.filter((item, index) => index >= 1 && index <= 4).map((imageUrl, index) => (
                <img src={imageUrl} alt="images" key={index} className=" rounded-2xl" />
              ))}
            </div>
            <button
              className="absolute flex md:items-center md:justify-center left-6 bottom-8 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-30"
              onClick={() => setModalIsOpen(true)}
            >
              <Squares2X2Icon className="w-5 h-5" />
              <span className="ml-2 text-neutral-800 text-sm font-medium">
                Show all photos
              </span>
            </button>
          </div>
          <div className=" w-[90vw] border border-neutral-600 p-4 rounded-2xl mx-auto mt-4">
            <div className=" ">
              <p className=" text-3xl font-semibold">{quickListing?.QID}</p>



              <p>
                <span className=" sm:font-bold">Price</span> - €{" "}
                {quickListing?.basePrice}
              </p>
              <p>
                <span className=" sm:font-bold">Location</span> -{" "}
                {quickListing?.address}
              </p>
              <p>
                <span className=" sm:font-bold">Description</span> -{" "}
                {quickListing?.description}
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

      {modalImages()}
    </div>
  );
};
export default Page;
