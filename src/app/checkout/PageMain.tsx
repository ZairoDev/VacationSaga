"use client";

import axios from "axios";
import { toast, Toaster } from "sonner";
import { LuLoader2 } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { BiLoaderAlt } from "react-icons/bi";
import { useSearchParams } from "next/navigation";
import { AiFillQuestionCircle } from "react-icons/ai";
import React, { FC, useState, useEffect } from "react";

import {
  TokenDataType,
  BookingDataType,
  PropertiesDataType,
} from "@/data/types";
import NcModal from "@/shared/NcModal";
import StartRating from "@/components/StartRating";
import ButtonPrimary from "@/shared/ButtonPrimary";
import ModalSelectDate from "@/components/ModalSelectDateTwo";
import { PencilSquareIcon } from "@heroicons/react/24/outline";
import ModalSelectGuests from "@/components/ModalSelectGuests";
import converSelectedDateToString from "@/utils/converSelectedDateToString";

import calculatePrice from "@/helper/calculatePrice";
import { GuestsObject } from "../(client-components)/type";

export interface CheckOutPagePageMainProps {
  className?: string;
}

const CheckOutPagePageMain: FC<CheckOutPagePageMainProps> = ({
  className = "",
}) => {
  // const [reservedDates, setReservedDates] = useState<Date[]>(() => {
  //   const savedDates =
  //     localStorage.getItem("dates") || JSON.stringify(Date.now());
  //   if (!savedDates) {
  //     return [Date.now(), Date.now()];
  //   }
  //   const dates = JSON.parse(savedDates);
  //   return [dates.startDate, dates.endDate];
  // });
  const searchParams = useSearchParams();
  const param: string = searchParams.get("id")?.split("&")[0] || "0";
  const paramInt: number = parseInt(param, 10);
  const portion = searchParams.get("portion");
  const startDateParam = searchParams.get("stdt");
  const endDateParam = searchParams.get("nddt");
  const guestsParam = parseInt(searchParams.get("guests") || "0", 10);

  const router = useRouter();

  const [particularProperty, setParticualarProperty] =
    useState<PropertiesDataType>();
  const [paymentToken, setPaymentToken] = useState<string>("");
  const [subscribeLoader, setSubscribeLoader] = useState<boolean>(false);
  const [loggedInUser, setLoggedInUser] = useState<TokenDataType | undefined>();
  const [totalPrice, setTotalPrice] = useState(6);
  const [booking, setBooking] = useState<BookingDataType>();
  const [bookingPrice, setBookingPrice] = useState(0);
  const [loading, setLoading] = useState(false);

  const getLoggedInUser = async () => {
    try {
      const response = await axios.post("/api/user/profile");
      // console.log(response.data);
      setLoggedInUser(response.data.data);
    } catch (err: any) {
      toast.error("User Not Found");
    }
  };

  const [startDate, setStartDate] = useState<Date | null>(() => {
    // const savedDate = localStorage.getItem("dates");
    // if (!savedDate) {
    //   return new Date();
    // }
    // const date = JSON.parse(savedDate);
    // console.log("start date: ", new Date(date.startDate), date.startDate);
    return new Date(startDateParam || new Date());
  });

  const [endDate, setEndDate] = useState<Date | null>(() => {
    // const savedDate = localStorage.getItem("dates");
    // if (!savedDate) {
    //   return new Date();
    // }
    // const date = JSON.parse(savedDate);
    return new Date(endDateParam || new Date());
  });

  const [guests, setGuests] = useState<GuestsObject>(() => {
    const savedGuests = localStorage.getItem("guestsState");
    if (!savedGuests) {
      return { guestAdults: 3, guestChildren: 0, guestInfants: 0 };
    }
    const gsts = JSON.parse(savedGuests);
    return {
      guestAdults: gsts.adults,
      guestChildren: gsts.children,
      guestInfants: gsts.infants,
    };
  });

  useEffect(() => {
    setGuests({
      guestAdults: guestsParam,
    });
  }, []);

  useEffect(() => {
    const getProperty = async () => {
      try {
        const response = await axios.post(
          "/api/newProperties/getPropertyById",
          { propertyId: param }
        );
        // console.log("response: ", response);
        if (response.data) {
          setParticualarProperty(response?.data?.property);
        }
      } catch (err: any) {
        console.log("Property can't be fetched on checkout Page");
      }
    };

    getProperty();

    setStartDate(new Date(startDateParam || new Date()));
    setEndDate(new Date(endDateParam || new Date()));
  }, []);

  const [startone, setStartOne] = useState<Date | null>(null);
  const [endone, setEndOne] = useState<Date | null>(null);

  const [guestAdult, setGuestAdult] = useState<number | undefined>();
  const [guestChildren, setGuestChildren] = useState<number | undefined>();
  const [guestInfants, setGuestInfants] = useState<number | undefined>();

  const [dateDiff, setDateDiff] = useState<number>(3);
  const calculateDifferenceBetweenDates = (
    startDate: Date | null,
    endDate: Date | null
  ) => {
    if (startDate && endDate) {
      const miliDifference = Math.abs(endDate.getTime() - startDate.getTime());
      const days = Math.ceil(miliDifference / (1000 * 60 * 60 * 24));
      return days;
    }
    return 3;
  };

  useEffect(() => {
    if (!startone) {
      setStartOne(startDate);
    }
    if (!endone) {
      setEndOne(endDate);
    }
    if (!guestAdult) {
      setGuestAdult(guests.guestAdults);
    }
    if (!guestChildren) {
      setGuestChildren(guests.guestChildren);
    }
    if (!guestInfants) {
      setGuestInfants(guests.guestInfants);
    }
  }, []);

  // useEffect(() => {
  //   const diff = calculateDifferenceBetweenDates(startDate, endDate);
  //   setDateDiff(diff);
  // }, [startDate, endDate]);

  useEffect(() => {
    const updatedGuests: GuestsObject = {
      guestAdults: guestAdult,
      guestChildren: guestChildren,
      guestInfants: guestInfants,
    };
    setGuests(updatedGuests);
  }, [guestAdult, guestChildren, guestInfants]);

  useEffect(() => {
    const savedDates = JSON.stringify({
      startDate: startDate,
      endDate: endDate,
    });
    localStorage.setItem("dates", savedDates);
    const diff = calculateDifferenceBetweenDates(startDate, endDate);
    setDateDiff(diff);
  }, [startDate, endDate]);

  const encryptToken = async (amount: number) => {
    setSubscribeLoader(true);
    try {
      const response = await axios.post("/api/encrypt", { amount });
      // console.log("token response: ", response.data);
      setSubscribeLoader(false);
      return response.data.encryptedAmount;
    } catch (err) {
      // console.log(err);
      setSubscribeLoader(false);
    }
    setSubscribeLoader(false);
  };
  const handlePayment = async (amount: string) => {
    const val = parseInt(amount);
    const token = await encryptToken(val);
    // console.log("response token: ", token);

    if (token) {
      router.push(
        `/payment?pId=${particularProperty?._id}&amount=${val}&paymentToken=${token}&bookingId=${booking?._id}`
      );
    }
  };
  // Check if user is logged in, redirect to login if not
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.post("/api/user/profile");
        if (response.data.data) {
          setLoggedInUser(response.data.data);
        } else {
          // User not logged in, redirect to login
          const currentPath = window.location.pathname + window.location.search;
          router.push(`/login?redirect=${encodeURIComponent(currentPath)}&role=Traveller`);
        }
      } catch (err) {
        // User not logged in, redirect to login
        const currentPath = window.location.pathname + window.location.search;
        router.push(`/login?redirect=${encodeURIComponent(currentPath)}&role=Traveller`);
      }
    };
    checkAuth();
  }, [router]);

  const handleBookingConfirmation = async () => {
    setLoading(true);
    const bookingStatus = particularProperty?.isInstantBooking
      ? "confirmed"
      : "pending";
    if (!loggedInUser || !loggedInUser.email) {
      toast.error("User Not Found");
      return;
    }
    try {
      setLoading(true);
      const Price = calculatePrice(
        startDate,
        endDate,
        particularProperty?.pricePerDay,
        particularProperty?.weeklyDiscount,
        particularProperty?.isInstantBooking ? true : false
      );
      if (Price) setTotalPrice(Price);
      const savedDates = JSON.stringify({
        startDate: startDate,
        endDate: endDate,
      });
      const response = await axios.post(`/api/bookings/createBooking`, {
        propertyId: param,
        ownerEmail: particularProperty?.email,
        startDate,
        endDate,
        guests:
          (guests?.guestAdults || 1) +
          (guests?.guestChildren || 0) +
          (guests?.guestInfants || 0),
        price: Price,
        weeklyDiscount: particularProperty?.weeklyDiscount || 0,
        bookingStatus,
      });
      setBooking(response.data.booking);
      toast.success("Booking requested successfully");
      setLoading(false);
    } catch (err: any) {
      toast.error(err.response.data.error);
      setLoading(false);
    }
    setLoading(false);
  };

  const renderSidebar = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl lg:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-8 px-0 sm:p-6 xl:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <div className="flex-shrink-0 w-full sm:w-40">
            <div className=" aspect-w-4 aspect-h-3 sm:aspect-h-4 rounded-2xl overflow-hidden">
              <img
                src={particularProperty?.propertyCoverFileUrl}
                alt="coverImage"
              />
            </div>
          </div>
          <div className="py-5 sm:px-5 space-y-3">
            <div>
              <span className="text-sm text-neutral-500 dark:text-neutral-400 line-clamp-1">
                {/* Hotel room in Tokyo, Jappan */}
                {particularProperty?.placeName}
              </span>
              <span className="text-base font-medium mt-1 block">
                {/* The Lounge & Bar */}
                {particularProperty?.propertyType}
              </span>
            </div>
            <span className="block  text-sm text-neutral-500 dark:text-neutral-400">
              {/* 2 beds · 2 baths */}
              {particularProperty?.bedrooms} beds ·{" "}
              {particularProperty?.bathroom} bath
            </span>
            <div className="w-10 border-b border-neutral-200  dark:border-neutral-700"></div>
            <StartRating />
          </div>
        </div>
        <div className="flex flex-col space-y-4">
          <h3 className="text-2xl font-semibold">Price detail</h3>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>
              € {particularProperty?.basePrice} x{" "}
              {startone &&
                endone &&
                calculateDifferenceBetweenDates(startone, endone)}{" "}
              days
            </span>
            <span>
              {/* € {(particularProperty?.basePrice[0] || 100) * dateDiff} */}€{" "}
              {Number(particularProperty?.basePrice || 100) *
                calculateDifferenceBetweenDates(startone, endone)}
            </span>
          </div>
          <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
            <span>Service charge</span>
            <span>€ 6</span>
          </div>
          {calculateDifferenceBetweenDates(startone, endone) >= 7 && (
            <div className="flex justify-between text-neutral-6000 dark:text-neutral-300">
              <span>Weekly Discount</span>
              <span>- €{particularProperty?.weeklyDiscount}</span>
            </div>
          )}

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>
              {/* € {dateDiff * (particularProperty?.basePrice[0] || 100) + 6}
              {" "} */}
              €{" "}
              {calculateDifferenceBetweenDates(startone, endone) *
                Number(particularProperty?.basePrice || 100) +
                6 -
                Number(
                  calculateDifferenceBetweenDates(startDate, endDate) >= 7
                    ? particularProperty?.weeklyDiscount
                    : 0
                )}
            </span>
          </div>
          <div className=" w-full flex justify-center mt-2">
            {particularProperty?.isInstantBooking && !!booking && (
              <ButtonPrimary
                disabled={subscribeLoader}
                onClick={() => handlePayment("6")}
              >
                {subscribeLoader ? (
                  <LuLoader2 className=" animate-spin" />
                ) : (
                  "Pay € 6"
                )}
              </ButtonPrimary>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderMain = () => {
    return (
      <div className="w-full flex flex-col sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-8 px-0 sm:p-6 xl:p-8">
        <div className=" flex gap-x-3 items-center">
          {" "}
          <h2 className="text-3xl lg:text-4xl font-semibold whitespace-nowrap">
            {particularProperty?.isInstantBooking
              ? "Instant booking"
              : "Confirm and Request"}
          </h2>
          <abbr title="Only € 6 have to be paid now and rest will be paid directly to Owner">
            <AiFillQuestionCircle className="w-8 h-8 cursor-pointer" />
          </abbr>
        </div>
        <div className="border-b border-neutral-200 dark:border-neutral-700"></div>
        <div>
          <div>
            <h3 className="text-2xl font-semibold">Your trip</h3>
            <NcModal
              renderTrigger={(openModal) => (
                <span
                  onClick={() => openModal()}
                  className="block lg:hidden underline  mt-1 cursor-pointer"
                >
                  View booking details
                </span>
              )}
              renderContent={renderSidebar}
              modalTitle="Booking details"
            />
          </div>
          <div className="mt-6 border border-neutral-200 dark:border-neutral-700 rounded-3xl flex flex-col sm:flex-row divide-y sm:divide-x sm:divide-y-0 divide-neutral-200 dark:divide-neutral-700 overflow-hidden z-10">
            <ModalSelectDate
              setStartOne={(value) => setStartOne(value)}
              setEndOne={(value) => setEndOne(value)}
              renderChildren={({ openModal }) => (
                <button
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                  type="button"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Date</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      {/* {converSelectedDateToString([startDate, endDate])} */}
                      {converSelectedDateToString([startone, endone])}
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />

            <ModalSelectGuests
              setAdults={(value) => setGuestAdult(value)}
              setChildren={(value) => setGuestChildren(value)}
              renderChildren={({ openModal }) => (
                <button
                  type="button"
                  onClick={openModal}
                  className="text-left flex-1 p-5 flex justify-between space-x-5 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                >
                  <div className="flex flex-col">
                    <span className="text-sm text-neutral-400">Guests</span>
                    <span className="mt-1.5 text-lg font-semibold">
                      <span className="line-clamp-1">
                        {`${
                          (guests.guestAdults || 0) +
                          (guests.guestChildren || 0)
                        } Guests`}
                      </span>
                    </span>
                  </div>
                  <PencilSquareIcon className="w-6 h-6 text-neutral-6000 dark:text-neutral-400" />
                </button>
              )}
            />
          </div>
        </div>

        <div className="pt-8 flex justify-between">
          {particularProperty?.isInstantBooking ? (
            <ButtonPrimary
              className=" flex items-center gap-x-1"
              onClick={handleBookingConfirmation}
            >
              Instant Booking{" "}
              {loading && <LuLoader2 className=" animate-spin" />}
            </ButtonPrimary>
          ) : (
            <ButtonPrimary
              onClick={handleBookingConfirmation}
              disabled={!particularProperty || !loggedInUser || loading}
              className={`disabled:opacity-50 ${loading ? "cursor-wait" : ""}`}
            >
              {loading ? (
                <span className=" flex items-center">
                  Requesting... <BiLoaderAlt className="animate-spin" />
                </span>
              ) : (
                "Confirm and Request"
              )}
            </ButtonPrimary>
          )}
          <ButtonPrimary>Any Queries?</ButtonPrimary>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-CheckOutPagePageMain ${className}`}>
      <Toaster />
      <main className="container mt-11 mb-24 lg:mb-32 flex flex-col-reverse lg:flex-row">
        <div className="w-full lg:w-3/5 xl:w-2/3 lg:pr-10 ">{renderMain()}</div>
        <div className="hidden lg:block flex-grow">{renderSidebar()}</div>
      </main>
    </div>
  );
};

export default CheckOutPagePageMain;
