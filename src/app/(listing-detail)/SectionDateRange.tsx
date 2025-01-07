"use client";
import React, { FC, Fragment, useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import DatePickerCustomHeaderTwoMonth from "@/components/DatePickerCustomHeaderTwoMonth";
import DatePickerCustomDay from "@/components/DatePickerCustomDay";

interface SectionDateRangeProps {
  prices?: number[][];
  externalBookedDates?: Date[];
  bookedDates?: Date[];
}

const SectionDateRange = ({
  prices,
  bookedDates = [],
  externalBookedDates = [],
}: SectionDateRangeProps) => {
  const [startDate, setStartDate] = useState<Date | null>(new Date(new Date()));
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const onChangeDate = (dates: [Date | null, Date | null]) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const [currentBookedDates, setCurrentBookedDates] =
    useState<Date[]>(bookedDates);

  useEffect(() => {
    setCurrentBookedDates([...bookedDates, ...externalBookedDates]);
  }, []);

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

  const renderSectionCheckIndate = () => {
    return (
      <div className="listingSection__wrap overflow-hidden">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Availability</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}

        <div className="">
          <DatePicker
            selected={startDate}
            onChange={onChangeDate}
            startDate={startDate}
            minDate={new Date()}
            endDate={endDate}
            selectsRange
            monthsShown={2}
            showPopperArrow={false}
            inline
            renderCustomHeader={(p) => (
              <DatePickerCustomHeaderTwoMonth {...p} />
            )}
            // renderDayContents={(day, date) => (
            //   <DatePickerCustomDay dayOfMonth={day} date={date} />
            // )}
            renderDayContents={(day, date) => {
              const price = getPriceForDate(date || new Date());
              const booked =
                isBooked(date || new Date()) || (price && price < 0);
              // console.log("booked: ", booked);
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
      </div>
    );
  };

  return renderSectionCheckIndate();
};

export default SectionDateRange;
