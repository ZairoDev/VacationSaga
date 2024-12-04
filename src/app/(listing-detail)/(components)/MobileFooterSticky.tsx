import React, { useState } from "react";
import ModalSelectDate from "@/components/ModalSelectDate";
import ButtonPrimary from "@/shared/ButtonPrimary";
import converSelectedDateToString from "@/utils/converSelectedDateToString";
import ModalReserveMobile from "./ModalReserveMobile";

const MobileFooterSticky = ({nights, price} : {nights?: number, price?: number|undefined}) => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date()
  );
  const dt = new Date();
  dt.setDate(dt.getDate() + (nights || 3));
  const [endDate, setEndDate] = useState<Date | null>(new Date(dt));

  return (
    <div className="block inset-x-0 rounded-lg lg:hidden  py-2 sm:py-3 bg-white dark:bg-neutral-800  z-100">
      <div className="container flex items-center justify-between">
        <div className="">
          <span className="block text-xl font-semibold">
            €{price || NaN}
            <span className="ml-1 text-sm font-normal text-neutral-500 dark:text-neutral-400">
              /night
            </span>
          </span>
          <ModalSelectDate footerStartDate={(value) => setStartDate(value)} footerEndDate={(value) => setEndDate(value)}
            renderChildren={({ openModal }) => (
              <span
                onClick={openModal}
                className="block text-sm underline font-medium"
              >
                {converSelectedDateToString([startDate, endDate])}
              </span>
            )}
          />
        </div>
        <ModalReserveMobile
          renderChildren={({ openModal }) => (
            <ButtonPrimary
              sizeClass="px-5 sm:px-7 py-3 !rounded-2xl"
              onClick={openModal}
            >
              Reserve
            </ButtonPrimary>
          )}
        />
      </div>
    </div>
  );
};

export default MobileFooterSticky;
