import React, { FC } from "react";
import GallerySlider from "@/components/GallerySlider";
import Badge from "@/shared/Badge";
import { BookingDataType, PropertiesDataType } from "@/data/types";
import { Route } from "next";

export interface PropertyCardHProps {
  className?: string;
  data: PropertiesDataType;
  booking?: BookingDataType;
}
const CheckoutCard: FC<PropertyCardHProps> = ({
  className = "",
  data,
  booking,
}) => {
  const {
    _id,
    VSID,
    propertyImages,
    placeName,
    pricePerDay,
    bathroom,
    bedrooms,
    beds,
    size,
  } = data;

  const calculatePrice = (
    startDate: Date | undefined,
    endDate: Date | undefined
  ) => {
    if (!startDate || !endDate) return;

    const stdt = new Date(startDate);
    const nddt = new Date(endDate);
    let totalPrice = 0;
    while (stdt < nddt) {
      const month = stdt.getMonth();
      const day = stdt.getDate() - 1;
      totalPrice += pricePerDay[month][day];
      stdt.setDate(stdt.getDate() + 1);
    }
    return totalPrice;
  };

  const renderSliderGallery = () => {
    return (
      <div className="flex-shrink-0 p-3 w-full sm:w-64">
        <GallerySlider
          ratioClass="aspect-w-1 aspect-h-1"
          galleryImgs={propertyImages}
          className="w-full h-full rounded-2xl overflow-hidden"
          uniqueID={`PropertyCardH_${_id}`}
          href={`/listing-stay-detail/${_id}` as Route}
        />
      </div>
    );
  };

  const renderTienIch = () => {
    return (
      <div className="inline-grid grid-cols-3 gap-2">
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bed text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {beds} beds
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-bath text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {bathroom} baths
          </span>
        </div>

        {/* ---- */}
        <div className="flex items-center space-x-2">
          <span className="hidden sm:inline-block">
            <i className="las la-expand-arrows-alt text-lg"></i>
          </span>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            {size} Sq. Fit
          </span>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    return (
      <div className="flex-grow px-3 sm:pr-6 flex flex-col items-start">
        <div className="space-y-4 w-full">
          <div className="inline-flex space-x-3">
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-share-alt"></i>
                  <span className="ml-1">
                    <abbr title="VSID" className=" cursor-default no-underline">
                      VSID: {VSID}
                    </abbr>
                  </span>
                </div>
              }
            />
            <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-user-friends"></i>
                  <span className="ml-1 line-clamp-1 cursor-default">
                    <abbr title={"Booking Id"} className=" no-underline">
                      {booking?._id.toString() || "-"}
                    </abbr>
                  </span>
                </div>
              }
              color="yellow"
            />
          </div>
          <div className="flex items-center space-x-2">
            <h2 className="text-lg font-medium capitalize">
              <span className="line-clamp-2">{placeName}</span>
            </h2>
          </div>
          {renderTienIch()}
          <div className="w-14 border-b border-neutral-200/80 dark:border-neutral-700 "></div>
          <div className="flex w-full justify-between items-center">
            {/* <StartRating reviewCount={reviewCount} point={reviewStart} /> */}
            <div className=" flex flex-col gap-y-1">
              <span className="whitespace-nowrap">
                📅 Check In:{" "}
                {
                  new Date(booking?.startDate ?? "")
                    .toLocaleDateString()
                    .split("T")[0]
                }
              </span>
              <span className="whitespace-nowrap">
                📅 Check Out:{" "}
                {
                  new Date(booking?.endDate ?? "")
                    .toLocaleDateString()
                    .split("T")[0]
                }
              </span>
            </div>
            <span className="flex items-center justify-center px-2.5 py-1.5 border-2 border-secondary-500 rounded-lg leading-none text-sm font-medium text-secondary-500 cursor-default">
              <abbr
                title="Total Price"
                className=" no-underline whitespace-nowrap"
              >
                € {`${calculatePrice(booking?.startDate, booking?.endDate)}`}
              </abbr>
            </span>
            {/* <Badge
              name={
                <div className="flex items-center">
                  <i className="text-sm las la-share-alt"></i>
                  <span className="ml-1 cursor-default">
                    <abbr
                      title={"Property Id"}
                      className=" no-underline line-clamp-1"
                    >
                      {_id}
                    </abbr>
                  </span>
                </div>
              }
            /> */}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-PropertyCardH group relative bg-white dark:bg-neutral-900 border border-neutral-200/80 dark:border-neutral-700 rounded-3xl overflow-hidden ${className}`}
    >
      {/* <Link
        href={`/listing-stay-detail/${_id}`}
        className="absolute inset-0"
      ></Link> */}
      <div className="h-full w-full flex flex-col sm:flex-row sm:items-center">
        {renderSliderGallery()}
        {renderContent()}
      </div>
      {/* <BtnLikeIcon
        colorClass={` bg-neutral-100 dark:bg-neutral-700 hover:bg-neutral-200 hover:bg-opacity-70 text-neutral-6000 dark:text-neutral-400`}
        isLiked={like}
        className="absolute right-5 top-5 sm:right-3 sm:top-3 "
      /> */}
    </div>
  );
};

export default CheckoutCard;
