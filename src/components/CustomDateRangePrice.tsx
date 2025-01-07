"use client";

import DatePicker from "react-datepicker";
import React, { FC, Fragment, useEffect, useState } from "react";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { LuLoader2 } from "react-icons/lu";

export interface StayDatesRangeInputProps {
  pId: string;
  className?: string;
  prices?: number[][];
  bookedDates?: Date[];
  externalBookedDates?: Date[];
  startDate: Date | null;
  endDate: Date | null;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
}

const CustomDateRangePrice: FC<StayDatesRangeInputProps> = ({
  pId,
  className = "",
  prices,
  bookedDates = [],
  externalBookedDates = [],
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}) => {
  // const [startDate, setStartDate] = useState<Date | null>(new Date());
  // const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [bookingLoading, setBookingLoading] = useState<boolean>(false);

  const [selectedRange, setSelectedRange] = useState<
    [Date | null, Date | null]
  >([startDate, endDate]);
  const [currentBookedDates, setCurrentBookedDates] =
    useState<Date[]>(bookedDates);

  useEffect(() => {
    setCurrentBookedDates([...bookedDates, ...externalBookedDates]);
  }, []);

  const isAnyDateBooked = (start: Date, end: Date) => {
    let date = new Date(start);
    while (date <= end) {
      if (isBooked(date)) {
        return true;
      }
      date.setDate(date.getDate() + 1);
    }
    return false;
  };

  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    if (start && end && isAnyDateBooked(start, end)) {
      return;
    }
    setStartDate(start);
    setEndDate(end);
  };

  const getPriceForDate = (date: Date) => {
    const month = date.getMonth(); // 0 = January, 11 = December
    const day = date.getDate() - 1; // Day starts from 1, array index starts from 0

    return prices?.[month]?.[day] || null; // Return the price if available, otherwise null
  };

  const isBooked = (date: Date) => {
    return currentBookedDates.some(
      (bookedDate) =>
        bookedDate.getDate() === date.getDate() &&
        bookedDate.getMonth() === date.getMonth() &&
        bookedDate.getFullYear() === date.getFullYear()
    );
  };

  const handleBookDates = async () => {
    setBookingLoading(true);
    try {
      const response = await axios.post("/api/bookings/createBooking", {
        propertyId: pId,
        startDate: startDate,
        endDate: endDate,
        bookingStatus: "confirmed",
      });
      console.log("response: ", response);
    } catch (error: any) {
      console.log("Error: ", error);
    }

    if (startDate && endDate) {
      const newBookedDates = [];
      let date = new Date(startDate);
      while (date <= endDate) {
        newBookedDates.push(new Date(date));
        date.setDate(date.getDate() + 1);
      }
      setCurrentBookedDates([...currentBookedDates, ...newBookedDates]);
    }
    setBookingLoading(false);
  };

  const handleBlockDates = async () => {
    try {
      const response = await axios.post(
        "/api/newProperties/blockDatesInProperty",
        {
          propertyId: pId,
          startDate: startDate,
          endDate: endDate,
          bookingStatus: "confirmed",
        }
      );
      console.log("response: ", response);
    } catch (error: any) {
      console.log("Error: ", error);
    }
  };

  return (
    <div>
      <div className="p-5">
        <span className="block font-semibold text-xl sm:text-2xl">
          {` When's your trip?`}
        </span>
      </div>
      <div
        className={`relative flex-shrink-0 flex justify-center z-10 py-5 ${className} ${
          bookingLoading ? "opacity-40" : ""
        }`}
      >
        <DatePicker
          selected={startDate}
          onChange={onChangeDate}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          monthsShown={2}
          showPopperArrow={false}
          inline
          renderCustomHeader={(p) => <DatePickerCustomHeaderTwoMonth {...p} />}
          // renderDayContents={(day, date) => (
          //   <DatePickerCustomDay dayOfMonth={day} date={date} />
          // )}
          // renderDayContents={(day, date) => {
          //   const price = getPriceForDate(date || new Date());
          //   return (
          //     <div>
          //       <DatePickerCustomDay dayOfMonth={day} date={date} />
          //       {price && (
          //         <div style={{ fontSize: "0.8rem", color: "green" }}>
          //           €{price}
          //         </div>
          //       )}
          //     </div>
          //   );
          // }}
          renderDayContents={(day, date) => {
            const price = getPriceForDate(date || new Date());
            const booked = isBooked(date || new Date()) || (price && price < 0);
            return (
              <div
                style={{
                  opacity: booked ? 0.4 : 1, // Faded if booked
                  pointerEvents: booked ? "none" : "auto", // Disable selection if booked
                  textDecoration: booked ? "line-through" : "none",
                  color: booked ? "red" : "none",
                }}
              >
                <DatePickerCustomDay dayOfMonth={day} date={date} />
                {price && (
                  <div style={{ fontSize: "0.8rem", color: "green" }}>
                    €{price}
                  </div>
                )}
              </div>
            );
          }}
        />
      </div>
      {startDate && endDate && (
        <div className="text-center my-4">
          {/* <button
            onClick={handleBookDates}
            className="px-4 py-2 bg-primary-6000 hover:bg-primary-700 text-white rounded"
          >
            {bookingLoading ? (
              <p className=" flex gap-x-1 items-center">
                Booking <LuLoader2 className=" animate-spin" />
              </p>
            ) : (
              "Book Selected Dates"
            )}
          </button> */}
          <button
            onClick={handleBlockDates}
            className="px-4 py-2 bg-primary-6000 hover:bg-primary-700 text-white rounded"
          >
            {bookingLoading ? (
              <p className=" flex gap-x-1 items-center">
                Booking <LuLoader2 className=" animate-spin" />
              </p>
            ) : (
              "Block Dates"
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomDateRangePrice;
