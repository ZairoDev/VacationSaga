"use client";

import {
  MdConstruction,
  MdHomeWork,
  MdOutlineEnergySavingsLeaf,
} from "react-icons/md";
import {
  IoIosBed,
  IoMdFlame,
  IoIosCompass,
  IoIosArrowDropdownCircle,
  IoIosArrowDroprightCircle,
  IoMdClose,
} from "react-icons/io";
import axios from "axios";
import Link from "next/link";
import Slider from "react-slick";
import Script from "next/script";
import { FaBath } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import { FaCheck } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import "slick-carousel/slick/slick-theme.css";
import { PiStudentBold } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";
import { useSearchParams } from "next/navigation";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoLanguageOutline } from "react-icons/io5";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import {
  BsExclamation,
  BsExclamationCircle,
  BsExclamationCircleFill,
} from "react-icons/bs";
import { usePathname, useRouter } from "next/navigation";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiMessageAltDetail, BiSolidArea } from "react-icons/bi";
import React, { FC, Fragment, useEffect, useState } from "react";
import { FaHotTub, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

import Input from "@/shared/Input";
import Badge from "@/shared/Badge";
import { useAuth } from "@/hooks/useAuth";
import dateParser from "@/helper/dateParser";
import ButtonClose from "@/shared/ButtonClose";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import LikeSaveBtns from "@/components/LikeSaveBtns";
import MapWithCircle from "@/components/MapWithCircle";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { useLoadScript } from "@react-google-maps/api";
import { BentoGridDemo } from "@/components/BentoGrid";
import { Dialog, Transition } from "@headlessui/react";
import { EventInterface } from "@/app/editproperty/page";
import CommentListing from "@/components/CommentListing";
import { PropertiesDataType, PropertyDataType } from "@/data/types";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

import GuestsInput from "../GuestsInput";
import SectionDateRange from "../../SectionDateRange";
import StayDatesRangeInput from "../StayDatesRangeInput";
import MobileFooterSticky from "../../(components)/MobileFooterSticky";

export interface ListingStayDetailPageProps {
  params: {
    id: string;
  };
}
interface DateRange {
  startDate: Date | null;
  endDate: Date | null;
}

// interface nearbyLocationInterface {
//   nearbyLocationName: string[];
//   nearbyLocationDistance: number[];
//   nearbyLocationTag: string[];
//   nearbyLocationUrl: string[];
// }
interface ModalImagesProps {
  modalIsOpen: boolean;
  setModalIsOpen: (open: boolean) => void;
  allImages: string[]; // assuming it's an array of image URLs
}

interface CenterDataType {
  lat: number;
  lng: number;
}

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({ params }) => {
  // const { user } = useAuth();
  // const router = useRouter();
  // const thisPathname = usePathname();
  const searchParams = useSearchParams();

  const param: string = params.id[0];
  const indexId: number = parseInt(searchParams.get("portion") || "0") || 0;

  const [particularProperty, setParticularProperty] =
    useState<PropertiesDataType>();
  const [allImages, setAllImages] = useState<any[]>([]);
  const [center, setCenter] = useState<CenterDataType>();
  const [propertyId, setPropertyId] = useState<string>("");
  const [username, setUsername] = useState<string | null>(null);
  const [userIdOfProperty, setUserIdOfProperty] = useState<string>("");
  const [userEmail, setUserEmail] = useState<string>();
  const [language, setLanguage] = useState<string>("");
  const [allAmenities, setAllAmenities] = useState<any[]>([]);
  const [commonProperties, setCommonProperties] =
    useState<PropertiesDataType[]>();
  const [nearbyAccordion, setNearbyAccordion] = useState<boolean[]>(() =>
    Array(3).fill(false)
  );
  const [currentLocation, setCurrentLocation] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const dt1 = today.toISOString().split("T")[0];
  const dt2 = tomorrow.toISOString().split("T")[0];
  const [stdt, setStdt] = useState<string>(dt1);
  const [nddt, setNddt] = useState<string>(dt2);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "", // Set your API key here
  });

  // TODO: Accessing current Location
  useEffect(() => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }
    const handleSuccess = (position: GeolocationPosition) => {
      const { latitude, longitude } = position.coords;
      setCurrentLocation({ latitude, longitude });
    };

    // TODO: Current Location
    const handleError = (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          setError("Permission denied");
          break;
        case error.POSITION_UNAVAILABLE:
          setError("Position unavailable");
          break;
        case error.TIMEOUT:
          setError("Request timed out");
          break;
        default:
          setError("An unknown error occurred");
      }
    };
    navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
  }, []);

  // TODO: handle external booked dates
  const [bookedState, setBookedState] = useState<boolean>(false);
  const [alreadyBookedDates, setAlreadyBookedDates] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<EventInterface[]>([]);
  const [bookingPrice, setBookingPrice] = useState(0);
  const fetchAndParseICal = async (url: string) => {
    try {
      const response = await axios.post("/api/ical", { url });
      const parsedData = response.data.data;
      const bookings = [];
      for (const eventId in parsedData) {
        const event = parsedData[eventId];
        if (event.type === "VEVENT") {
          const startDate = event.start ? new Date(event.start) : undefined;
          const endDate = event.end ? new Date(event.end) : undefined;

          bookings.push({
            startDate,
            endDate,
          });
        }
      }
      return bookings;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const fetchBookedDates = async (url: string) => {
    if (!url) {
      setBookedState(true);
      return;
    }
    const airbnbBookings = await fetchAndParseICal(url);
    // console.log("airbnbBookings", airbnbBookings, airbnbBookings?.length);
    const eventsFromAirbnb: EventInterface[] = [];
    airbnbBookings?.forEach((event) => {
      const stdt = dateParser(event.startDate?.toLocaleString() || "");
      const nddt = dateParser(event.endDate?.toLocaleString() || "");

      const newObj: EventInterface = {
        start: stdt,
        end: nddt,
        title: "Booked",
      };
      eventsFromAirbnb.push(newObj);
      setBookedDates(eventsFromAirbnb);
      //! adding events from airbnb to already booked dates
      eventsFromAirbnb.forEach((event) => {
        const newDates: Date[] = [];
        let currDt = new Date(event.start || new Date());
        while (currDt < new Date(event.end || new Date())) {
          newDates.push(currDt);
          currDt.setDate(currDt.getDate() + 1);
        }
        // console.log("newDates: ", newDates);
        setAlreadyBookedDates((prev) => [...prev, ...newDates]);
      });
    });
    setBookedState(true);
  };

  useEffect(() => {
    const getProperties = async () => {
      try {
        const response = await axios.post(
          "/api/newProperties/getPropertyById",
          { propertyId: param }
        );
        if (response.data) {
          fetchBookedDates(response.data?.property?.icalLinks?.["Airbnb"]);
          setParticularProperty(response?.data?.property);
          setUserIdOfProperty(response?.data?.property?.userId);
          setUserEmail(response?.data?.property?.email);
          setPropertyId(response?.data?.property?._id);
          setCenter(response?.data?.property?.center);
          try {
            const commonPropertyResponse = await axios.post(
              "/api/newProperties/getPropertiesByCommonId",
              { commonId: response.data.property.commonId }
            );
            if (commonPropertyResponse.data.commonIdProperties) {
              setCommonProperties(
                commonPropertyResponse.data.commonIdProperties
              );
            }
          } catch (err: any) {
            console.log("Common Property error: ", err);
          }
        }

        try {
          const languageResponse = await axios.get(
            `https://restcountries.com/v3.1/name/${response?.data?.property?.country}`
          );
          const languageKey = Object.keys(
            languageResponse?.data[0]?.languages
          )[0];
          const lang = languageResponse?.data[0]?.languages[languageKey];
          setLanguage(lang);
        } catch (err: any) {
          console.log("language error: ", err);
        }

        const allAmen = [];
        const general = Object.entries(
          response?.data?.property?.generalAmenities
        );
        const safe = Object.entries(response?.data?.property?.safeAmenities);
        const other = Object.entries(response?.data?.property?.otherAmenities);
        allAmen.push(...general, ...safe, ...other);
        const filteredAllAmen = allAmen.filter(
          (item, index) => item[1] === true
        );
        setAllAmenities(filteredAllAmen);
      } catch (err) {
        console.log("error: ", err);
      }
    };

    const getBookedDates = async () => {
      try {
        const response = await axios.post(
          "/api/newProperties/getBlockedDates",
          { propertyId: params.id[0] }
        );

        setAlreadyBookedDates((prev) => [...prev, ...response?.data?.data]);
      } catch (err: any) {
        console.log("error in fetching blocked dates");
      }
    };

    getProperties();
    getBookedDates();
  }, []);

  useEffect(() => {
    const getUsername = async () => {
      try {
        const response = await axios.post("/api/getUsername", {
          userId: userIdOfProperty,
          email: userEmail,
        });
        if (response.data) {
          const tempName = response?.data?.name;
          if (tempName) {
            const name = tempName.charAt(0).toUpperCase() + tempName.slice(1);
            setUsername(name);
          }
        }
      } catch (err) {
        console.log("error: ", err);
      }
    };
    if (userIdOfProperty) {
      getUsername();
    }
  }, [userIdOfProperty]);

  let portions = 0;
  const data = localStorage.getItem("page1") || "";
  if (data) {
    const value = JSON.parse(data)["numberOfPortions"];
    if (value) {
      portions = parseInt(value, 10);
    }
  }
  let checkPortion = portions > 1 ? portions : 0;

  const [selectedDates, setSelectedDates] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const handleDatesChange = (dates: DateRange) => {
    setSelectedDates(dates);
  };

  const [savedDates, setSavedDates] = useState<Date[]>(() => {
    const saved = localStorage.getItem("dates") || "";
    if (saved) {
      const value = JSON.parse(saved);
      const start = new Date(value.startDate);
      const end = new Date(value.endDate);
      return [start, end];
    }
    const today = new Date();
    return [today, today];
  });

  const [minNights, setMinNights] = useState<number>(1);
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  useEffect(() => {
    const newMinNights = particularProperty?.night?.[0] ?? 1;
    setMinNights(newMinNights);

    if (savedDates[0] && savedDates[1]) {
      const calculatedNights = Math.ceil(
        (savedDates[1].getTime() - savedDates[0].getTime()) /
          (1000 * 60 * 60 * 24)
      );
      setNumberOfNights(Math.max(calculatedNights, newMinNights));
    } else {
      setNumberOfNights(newMinNights);
    }
  }, [savedDates, particularProperty?.night]);

  const [portionCoverFileUrls, setPortionCoverFileUrls] = useState<string[]>(
    Array(checkPortion).fill("")
  );

  useEffect(() => {
    const savedData = localStorage.getItem("portionCoverFileUrls") || "";
    if (!savedData) {
      setPortionCoverFileUrls(Array(checkPortion).fill(1));
    } else {
      const value = JSON.parse(savedData);
      setPortionCoverFileUrls(value);
    }
  }, [checkPortion]);

  let [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  const [location, setLocation] = useState<string[]>(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (savedPage) {
      const value = JSON.parse(savedPage);
      return [
        value.country,
        value.state,
        value.city,
        value.postalCode,
        value.street,
        value.roomNumber,
      ];
    }
    return ["", "", "", "", "", ""];
  });

  const renderSection1 = () => {
    return (
      <div className=" lg:border lg:dark:border-neutral-600 rounded-xl lg:p-2">
        <div className="flex justify-between items-center lg:mt-2">
          <Badge name={particularProperty?.propertyType} />
          <Badge name={particularProperty?.VSID} />
          {particularProperty?.rentalType === "Long Term" &&
            (particularProperty?.isTopFloor ? (
              <Badge name={"Top Floor"} />
            ) : (
              <Badge name={`Floor ${particularProperty?.floor}`} />
            ))}
          {particularProperty?.rentalType === "Long Term" && (
            <Badge name={`${particularProperty.propertyStyle}`} />
          )}
          <LikeSaveBtns />
        </div>

        {/* 2 */}
        <h2 className="text-xl sm:text-3xl mt-2 lg:text-4xl lg:mt-4 font-semibold">
          VS ID - {particularProperty?.VSID}
        </h2>

        {/* 3 */}
        <div className=" flex items-center space-x-4 lg:my-2">
          {/* <StartRating /> */}
          <span className="text-sm my-2 lg:text-lg flex items-center">
            <i className="las la-map-marker-alt"></i>
            <span className="ml-1 text-xs lg:text-lg">
              {particularProperty?.city} {particularProperty?.country}
            </span>
          </span>
          {particularProperty?.rentalType === "Long Term" && (
            <span className="text-sm my-2 lg:text-lg flex items-center">
              <span className="text-xs lg:text-sm">
                {" "}
                - {particularProperty?.area} of {particularProperty?.subarea},{" "}
                {particularProperty?.neighbourhood},{" "}
                {particularProperty?.postalCode}
              </span>
            </span>
          )}
        </div>

        <div className="flex  items-center lg:my-4">
          <img
            src={
              "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yaWRMcmd4Q01COGJuRWQ2bUl1V3R0dEtzaXkiLCJyaWQiOiJ1c2VyXzJqOHhkb0R5cUl4V05adXFlcWlXTlpsdGpwMiJ9"
            }
            alt="user"
            className=" rounded-full w-8"
          />
          <span className="ml-2.5 text-sm sm:text-base text-neutral-500 dark:text-neutral-400">
            Hosted by
            <span className="text-neutral-900 mr-2 dark:text-neutral-200 font-medium ml-2 ">
              {username}
            </span>
          </span>
        </div>

        <div className="w-full border-b border-neutral-100 mt-2 mb-2 dark:border-neutral-700" />

        {/* 6 */}

        <div className="flex items-center justify-between xl:justify-start space-x-8 xl:space-x-12 text-sm text-neutral-700 dark:text-neutral-300">
          <div className="flex items-center space-x-3 ">
            <FaUser className="text-2xl" />
            <h3 className=" flex gap-x-1 text-sm">
              {particularProperty?.guests || 3}{" "}
              <span className="sm:block hidden">Guests</span>
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <IoIosBed className="text-2xl" />
            <h3 className=" flex gap-x-1 text-sm">
              {particularProperty?.bedrooms}{" "}
              <span className="sm:block hidden">Bedrooms</span>
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <FaBath className="text-2xl" />
            <h3 className=" flex gap-x-1 text-sm">
              {particularProperty?.bathroom}{" "}
              <span className="sm:block hidden">Bathroom</span>
            </h3>
          </div>
          <div className="flex items-center space-x-3">
            <BiSolidArea className="text-2xl" />
            <h3 className=" flex gap-x-1 text-sm">
              {particularProperty?.size}{" "}
              <span className="sm:block hidden">sq</span>
            </h3>
          </div>
          {particularProperty?.rentalType === "Long Term" && (
            <div className="flex items-center space-x-3">
              <IoIosCompass className="text-2xl" />
              <h3 className=" flex gap-x-1 text-sm">
                {particularProperty?.orientation}
              </h3>
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    return (
      <div className="listingSection__wrap ">
        <div className=" z-50 ">
          <MobileFooterSticky
            price={particularProperty?.basePrice}
            nights={particularProperty?.night[0] || 3}
          />
        </div>
        <h2 className="text-2xl font-semibold  mb-2">Stay information</h2>
        {particularProperty?.newReviews ? (
          <div
            dangerouslySetInnerHTML={{
              __html: particularProperty?.newReviews ?? "",
            }}
            className=" disabled:cursor-not-allowed px-4"
          ></div>
        ) : (
          particularProperty?.reviews
        )}
      </div>
    );
  };

  const renderSection3 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <h2 className="text-2xl font-semibold">Amenities </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {` About the property's amenities and services`}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* 6 */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 text-sm text-neutral-700 dark:text-neutral-300 ">
          {allAmenities
            .filter((_, i) => i < 12)
            .map((item, index) => (
              <div key={index} className="flex items-center space-x-3">
                <FaCheck className=" text-2xl" />

                <span>{item[0]}</span>
              </div>
            ))}
        </div>

        {/* ----- */}
        <div className="w-14 border-b border-neutral-200"></div>
        <div>
          <ButtonSecondary onClick={openModalAmenities}>
            View more amenities
          </ButtonSecondary>
        </div>
        {renderMotalAmenities()}
      </div>
    );
  };

  const renderMotalAmenities = () => {
    return (
      <Transition appear show={isOpenModalAmenities} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModalAmenities}
        >
          <div className="min-h-screen px-4 text-center">
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

            {/* This element is to trick the browser into centering the modal contents. */}
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
              <div className="inline-block py-8 h-screen w-full max-w-4xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Amenities
                    </h3>
                    <span className="absolute left-3 top-3">
                      <ButtonClose onClick={closeModalAmenities} />
                    </span>
                  </div>
                  <div className="px-8 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {/* Amenities_demos.filter */}
                    {allAmenities.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center py-2.5 sm:py-4 lg:py-5 space-x-5 lg:space-x-8"
                      >
                        <FaCheck className=" text-2xl" />
                        <span>{item[0]}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const renderSection4 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Room Rates </h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            Prices may increase on weekends or holidays
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>
        {/* CONTENT */}
        <div className="flow-root">
          <div className="text-sm sm:text-base text-neutral-6000 dark:text-neutral-300 -mb-4">
            <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
              {particularProperty?.rentalType === "Short Term" ? (
                <span>Monday - Thursday</span>
              ) : (
                <span>Monthly Rates</span>
              )}
              {/* <span>€ {price[indexId]}</span> */}
              <span>
                €{" "}
                {particularProperty?.rentalType === "Short Term"
                  ? particularProperty?.basePrice
                  : particularProperty?.basePriceLongTerm}
              </span>
            </div>

            {particularProperty?.rentalType === "Short Term" && (
              <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
                <span>Friday - Sunday</span>
                {/* <span>€ {page8.weekendPrice[indexId]}</span> */}
                <span>€ {particularProperty?.weekendPrice}</span>
              </div>
            )}

            {particularProperty?.rentalType === "Short Term" ? (
              <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
                <span>Weekly Discount</span>{" "}
                <span>€ {particularProperty?.weeklyDiscount}</span>
              </div>
            ) : (
              <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
                {" "}
                <span>Monthly Discount</span>
                <span>€{particularProperty?.monthlyDiscount} % </span>
              </div>
            )}

            {particularProperty?.rentalType === "Short Term" && (
              <div>
                {" "}
                <div className="p-4 bg-neutral-100 dark:bg-neutral-800 flex justify-between items-center space-x-4 rounded-lg">
                  <span>Minimum number of nights</span>
                  <span>{particularProperty?.night[0]} nights</span>
                </div>
                <div className="p-4 flex justify-between items-center space-x-4 rounded-lg">
                  <span>Max number of nights</span>
                  <span>{particularProperty?.night[1]} nights</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Host Information</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* host */}
        <div className="flex items-center space-x-4">
          <img
            src={
              "https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yaWRMcmd4Q01COGJuRWQ2bUl1V3R0dEtzaXkiLCJyaWQiOiJ1c2VyXzJqOHhkb0R5cUl4V05adXFlcWlXTlpsdGpwMiJ9"
            }
            alt="user"
            className=" rounded-full w-8"
          />
          <div>
            <p className="block text-xl font-medium">{username}</p>
          </div>
        </div>

        <div className="mt-1.5 flex flex-col text-neutral-500 dark:text-neutral-400 gap-y-2">
          <div className="flex items-center gap-3 mb-3">
            <CiCalendar className=" text-lg md:text-xl" />
            <span className="text-sm md:text-base">Joined long time ago</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <BiMessageAltDetail className=" text-lg md:text-xl" />
            <span className="text-sm md:text-base">Response rate - 100%</span>
          </div>
          <div className="flex items-center gap-3 mb-3">
            <FaRegClock className=" text-lg md:text-xl" />
            <span className="text-sm md:text-base">
              Fast response - within a few hours
            </span>
          </div>
          <div className="flex items-center gap-3">
            <IoLanguageOutline className=" text-lg md:text-xl" />
            <span className="text-sm md:text-base">
              Language spoken - English, {language}
            </span>
          </div>
        </div>
      </div>
    );
  };

  const renderSection6 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <h2 className="text-2xl font-semibold">Reviews (23 reviews)</h2>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

        {/* Content */}
        <div className="space-y-5">
          <FiveStartIconForRate iconClass="w-6 h-6" className="space-x-0.5" />
          <div className="relative">
            <Input
              fontClass=""
              sizeClass="h-16 px-4 py-3"
              rounded="rounded-3xl"
              placeholder="Share your thoughts ..."
            />
            <ButtonCircle
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
              size=" w-12 h-12 "
            >
              <ArrowRightIcon className="w-5 h-5" />
            </ButtonCircle>
          </div>
        </div>

        {/* comment */}
        <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <CommentListing className="py-8" />
          <div className="pt-8">
            <ButtonSecondary>View more 20 reviews</ButtonSecondary>
          </div>
        </div>
      </div>
    );
  };

  const renderSection7 = () => {
    return (
      <div className="listingSection__wrap">
        {/* HEADING */}
        <div>
          <h2 className="text-2xl font-semibold">Location</h2>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {/* {location[2]}, {location[1]}, {location[0]} */}
            {particularProperty?.city}, {particularProperty?.state},{" "}
            {particularProperty?.country}
          </span>
        </div>
        <div className="w-14 border-b border-neutral-200 dark:border-neutral-700" />

        {/* MAP */}
        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 ring-1 ring-black/10 rounded-xl z-0">
          <div className="rounded-xl overflow-hidden z-0">
            <Script
              src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`}
              strategy="beforeInteractive"
            />
            {center && isLoaded && (
              <MapWithCircle center={center} radius={3000} />
            )}
            {/* <iframe
              width="100%"
              height="100%"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              // src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyAGVJfZMAKYfZ71nzL_v5i3LjTTWnCYwTY&center=${center?.lat},${center?.lng}&zoom=15`}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${center?.lat},${center?.lng}&q=37.087287,25.373241`}
            ></iframe> */}
          </div>
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap ">
        <div className="w-full md:flex">
          {/* // TODO: Left Half */}
          <div className=" w-full md:w-1/2">
            {/* HEADING */}
            <h2 className="text-2xl font-semibold">Things to know</h2>

            {/* CONTENT */}
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2" />

            {/* CONTENT */}
            <div className="">
              <h4 className="text-lg font-semibold">Check-in time</h4>
              <div className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md text-sm sm:text-base">
                <div className="flex space-x-10 justify-between p-3 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
                  <span>Check-in</span>
                  <span>{particularProperty?.time[0]}:00</span>
                </div>
                <div className="flex space-x-10 justify-between p-3">
                  <span>Check-out</span>
                  <span>{particularProperty?.time[1]}:00</span>
                </div>
              </div>
            </div>
            <div className="w-14 border-b border-neutral-200 dark:border-neutral-700 mb-2" />

            {/* CONTENT */}
            <div>
              <h4 className="text-lg font-semibold">Special Note</h4>
              <div className="prose sm:prose">
                <ul className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2">
                  {particularProperty?.additionalRules.map((rule, index) => {
                    return <li key={index}>{rule}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>

          <div className=" w-full md:w-1/2 md:ml-3">
            {particularProperty?.rentalType === "Short Term" &&
            particularProperty?.nearbyLocations?.nearbyLocationName?.length >
              0 ? (
              <>
                {" "}
                <h2 className=" my-2 flex items-center gap-x-2 font-bold text-2xl ">
                  Nearby Locations <FaMapMarkerAlt className=" w-6 h-6" />
                </h2>
                <div className=" h-full max-h-64 overflow-y-auto scrollbar-thin">
                  {/* {["Cafe", "Restaurant", "Mall"]?.map((item, ind) => ( */}
                  {Array.from(
                    new Set(
                      particularProperty?.nearbyLocations?.nearbyLocationTag
                    )
                  )?.map((item, ind) =>
                    particularProperty?.nearbyLocations?.nearbyLocationName?.[
                      particularProperty?.nearbyLocations?.nearbyLocationTag?.indexOf(
                        item
                      )
                    ] ? (
                      <div key={ind} className=" px-2">
                        <h3
                          className=" flex items-center gap-x-2 text-lg font-medium cursor-pointer"
                          onClick={() => {
                            setNearbyAccordion((prev) => {
                              const newState = [...prev];
                              newState[ind] = !newState[ind];
                              return newState;
                            });
                          }}
                        >
                          {item}{" "}
                          {nearbyAccordion[ind] ? (
                            <IoIosArrowDropdownCircle />
                          ) : (
                            <IoIosArrowDroprightCircle />
                          )}
                        </h3>
                        {nearbyAccordion[ind] &&
                          particularProperty?.nearbyLocations?.nearbyLocationName?.map(
                            (innerItem, index) =>
                              item ===
                                particularProperty?.nearbyLocations
                                  ?.nearbyLocationTag[index] && (
                                <div
                                  key={index}
                                  className=" flex justify-between text-sm text-neutral-500 px-2 font-medium"
                                >
                                  <div>
                                    {particularProperty?.nearbyLocations
                                      ?.nearbyLocationUrl?.[index] !=
                                      undefined &&
                                    particularProperty?.nearbyLocations
                                      ?.nearbyLocationUrl?.[index] != "" ? (
                                      <Link
                                        href={
                                          new URL(
                                            particularProperty?.nearbyLocations?.nearbyLocationUrl?.[
                                              index
                                            ]
                                          )
                                        }
                                        target="_blank"
                                      >
                                        {" "}
                                        {
                                          particularProperty?.nearbyLocations
                                            ?.nearbyLocationName[index]
                                        }
                                      </Link>
                                    ) : (
                                      <p>
                                        {
                                          particularProperty?.nearbyLocations
                                            ?.nearbyLocationName[index]
                                        }
                                      </p>
                                    )}
                                  </div>
                                  <div>
                                    {particularProperty?.nearbyLocations
                                      ?.nearbyLocationDistance[index] >= 1000
                                      ? (
                                          particularProperty?.nearbyLocations
                                            ?.nearbyLocationDistance[index] /
                                          1000
                                        ).toFixed(1) + " km"
                                      : particularProperty?.nearbyLocations
                                          ?.nearbyLocationDistance[index] +
                                        " m"}
                                  </div>
                                </div>
                              )
                          )}

                        <div className=" w-full h-0.5 bg-neutral-700 my-2"></div>
                      </div>
                    ) : null
                  )}
                </div>
              </>
            ) : (
              <div className=" ml-2">
                {/* LONG TERM INFO */}

                {particularProperty?.rentalType === "Long Term" && (
                  <div className="mt-3 text-neutral-500 dark:text-neutral-400 space-y-2 w-full">
                    <div className=" flex items-center gap-x-2">
                      <SiLevelsdotfyi />
                      Number of Levels: {particularProperty?.levels}
                    </div>
                    <div className=" flex items-center justify-start gap-x-2">
                      <MdHomeWork />
                      Zones: {particularProperty?.zones}
                    </div>

                    <div className=" flex items-center gap-x-2 ">
                      <PiStudentBold />
                      This property is{" "}
                      {particularProperty?.isSuitableForStudents
                        ? ""
                        : "not"}{" "}
                      suitable for students
                    </div>
                    <div className=" flex items-center gap-x-2 ">
                      <MdConstruction />
                      Construction Year: {particularProperty?.constructionYear}
                    </div>
                    <div className=" flex items-center gap-x-2">
                      <RiMoneyEuroCircleFill />
                      Expected Monthly Expenses:{" "}
                      {particularProperty?.monthlyExpenses}
                    </div>
                    <div className=" flex items-center gap-x-2">
                      {" "}
                      <FaHotTub />
                      Type of Heating: {particularProperty?.heatingType}
                    </div>
                    <div className=" flex items-center gap-x-2">
                      {" "}
                      <IoMdFlame />
                      Heating Medium: {particularProperty?.heatingMedium}
                    </div>
                    <div className=" flex items-center gap-x-2">
                      {" "}
                      <MdOutlineEnergySavingsLeaf /> Energy Class:{" "}
                      {particularProperty?.energyClass}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  const [totalGuests, setTotalGuests] = useState<number>(() => {
    const savedValue = localStorage.getItem("totalGuests") || "";
    if (savedValue) {
      const total = JSON.parse(savedValue);
      return total;
    }
    return 0;
  });
  const handleGuestChange = (totalGuests: number) => {
    setTotalGuests(totalGuests);
  };

  const [minNightStay, setMinNightStay] = useState<number | undefined>(
    undefined
  );
  const renderSidebar = () => {
    const handleDatesChange = (dates: {
      startDate: Date | null;
      endDate: Date | null;
    }) => {
      const { startDate, endDate } = dates;
      const nights = calculateDateDifference(startDate, endDate);
      // setTempNight(nights);
      setMinNightStay(nights);
      setNumberOfNights(Math.max(nights, minNights));

      const nd = endDate?.toISOString()?.split("T")?.[0];
      const st = startDate?.toISOString()?.split("T")?.[0];
      setStdt(st || dt1);
      setNddt(nd || dt2);

      let totalAmount = 0;

      const stdt = new Date(startDate ?? new Date());
      const nddt = new Date(endDate ?? new Date());

      while (stdt < nddt) {
        const month = stdt.getMonth();
        const day = stdt.getDate();
        // console.log("price: ", particularProperty?.pricePerDay[month][day - 1]);
        totalAmount += particularProperty?.pricePerDay[month][day - 1] ?? 0;
        stdt.setDate(stdt.getDate() + 1);
      }

      if (nights >= 7) {
        totalAmount -= particularProperty?.weeklyDiscount || 0;
      }
      // console.log("total amount: ", totalAmount);
      setBookingPrice(totalAmount);
    };

    const calculateDateDifference = (start: Date | null, end: Date | null) => {
      if (start && end) {
        const timeDiff = end.getTime() - start.getTime();
        return Math.ceil(timeDiff / (1000 * 3600 * 24)); // Adding 1 to include both start and end dates
      }
      return 0;
    };

    // const basePrice = particularProperty?.basePrice[indexId] ?? 0;
    const basePrice =
      particularProperty?.rentalType === "Short Term"
        ? particularProperty?.basePrice
        : particularProperty?.basePriceLongTerm || 0;
    const nights = Math.max(numberOfNights, minNights);
    const totalPrice =
      particularProperty?.rentalType === "Short Term"
        ? basePrice * nights
        : particularProperty?.basePriceLongTerm || 0;

    return (
      <div className="listingSectionSidebar__wrap shadow-xl">
        <div className="flex justify-between">
          <span className="text-3xl font-semibold">
            € {basePrice}
            <span className="ml-1 text-base font-normal text-neutral-500 dark:text-neutral-400">
              /
              {particularProperty?.rentalType === "Short Term"
                ? "night"
                : "month"}
            </span>
          </span>
          {/* <StartRating /> */}
        </div>

        <form className="flex flex-col border border-neutral-200 dark:border-neutral-700 rounded-3xl">
          {bookedState && (
            <StayDatesRangeInput
              onDatesChange={handleDatesChange}
              minNights={
                particularProperty?.rentalType === "Long Term" ? 90 : minNights
              }
              prices={particularProperty?.pricePerDay}
              hidePrices={particularProperty?.rentalType === "Long Term"}
              externalBookedDates={alreadyBookedDates}
              className="flex-1 z-[11]"
            />
          )}
          <div className="w-full border-b border-neutral-200 dark:border-neutral-700"></div>
          <GuestsInput
            className="flex-1"
            onGuestsChange={handleGuestChange}
            totalNumberOfGuests={particularProperty?.guests}
          />
        </form>

        <div className="flex flex-col space-y-4 ">
          <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
            <span className=" flex gap-x-1">
              € {basePrice} *{" "}
              {particularProperty?.rentalType === "Short Term" ? (
                <div>
                  {minNightStay === undefined
                    ? particularProperty?.night[0]
                    : minNightStay}{" "}
                  nights
                </div>
              ) : (
                <div>1 month</div>
              )}
            </span>
            <span>€ {totalPrice}</span>
            {/* <span>€ {bookingPrice}</span> */}
          </div>

          <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
            <span>Service charges </span>

            {particularProperty?.rentalType === "Long Term" ? (
              <span
                className="flex items-center gap-1 cursor-pointer"
                title="One month rent"
              >
                € {particularProperty?.basePriceLongTerm}
              </span>
            ) : (
              <span>€ {(totalPrice * 0.15).toFixed(2)}</span>
            )}
          </div>

          {particularProperty?.rentalType === "Short Term" && nights >= 7 && (
            <div className="flex justify-between text-neutral-600 dark:text-neutral-300">
              <span>Weekly Discount</span>
              <span>- €{particularProperty?.weeklyDiscount}</span>
            </div>
          )}

          <div className="border-b border-neutral-200 dark:border-neutral-700"></div>

          {particularProperty?.rentalType === "Short Term" && (
            <div className="flex justify-between font-semibold">
              <span>Total</span>
              {/* <span>€ {totalPrice + 6} </span> */}
              <span>€ {totalPrice} </span>
            </div>
          )}
        </div>

        <Link
          href={{
            pathname: "/checkout",
            query: {
              id: propertyId,
              portion: indexId,
              stdt,
              nddt,
              guests: totalGuests,
            },
          }}
          className=" w-auto flex justify-center"
        >
          <ButtonPrimary>Reserve</ButtonPrimary>
        </Link>
      </div>
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3, // Adjust the number of cards to show at once
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  // Custom Arrow Components
  function SampleNextArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} slick-next`}
        onClick={onClick}
        style={{ display: "block", right: "10px" }}
      />
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, onClick } = props;
    return (
      <div
        className={`${className} slick-prev z-10`}
        onClick={onClick}
        style={{ display: "block", left: "10px" }}
      />
    );
  }

  const renderPortionCards = () => {
    return (
      <div className=" flex gap-4 property-carousel-container">
        <Slider {...settings} className="w-full">
          {commonProperties?.map((item, index) => (
            <div
              className="card-container border border-gray-600 rounded-xl overflow-hidden cursor-pointer"
              key={index}
            >
              <Link
                href={`/listing-stay-detail/${commonProperties?.[index]?._id}`}
              >
                <div className="lg:h-48 md:h-44 sm:h-40 w-full">
                  {commonProperties[index]?.propertyCoverFileUrl ? (
                    <img
                      src={commonProperties[index]?.propertyCoverFileUrl}
                      alt="Portion Image"
                      className="cover w-full object-fill h-full rounded-xl hover:opacity-60"
                    />
                  ) : (
                    <div className="w-full h-full flex flex-col justify-center items-center">
                      <BsExclamationCircleFill className="w-1/4 h-1/4 mb-2 text-neutral-600" />
                      <span className="text-neutral-600 font-medium">
                        Image not found
                      </span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="flex gap-4 justify-center items-center my-2">
                <div className="flex items-center gap-2">
                  <h2 className="text-sm">{commonProperties[index]?.beds}</h2>
                  <IoIosBed className="text-md" />
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm">
                    {commonProperties[index]?.bathroom}
                  </h2>
                  <FaBath className="text-md" />
                </div>
                <div className="flex items-center gap-2">
                  <h2 className="text-sm">{commonProperties[index]?.guests}</h2>
                  <FaUser className="text-md" />
                </div>
                <div className="flex items-center gap-2 whitespace-nowrap">
                  <h2 className="text-sm">
                    {commonProperties[index]?.size} sq
                  </h2>
                  <SlSizeFullscreen className="text-md" />
                </div>
              </div>
              <div className="px-2 py-4">
                <h2 className="font-semibold text-xl">Portion {index + 1}</h2>
                <p className="text-lg font-medium">
                  € {commonProperties[index]?.basePrice}/night
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    );
  };

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const ModalImages: React.FC<ModalImagesProps> = ({
    modalIsOpen,
    setModalIsOpen,
    allImages,
  }) => {
    return (
      <Transition appear show={modalIsOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() => setModalIsOpen(false)}
        >
          <div className="min-h-screen px-4 text-center flex items-center justify-center">
            {/* Background overlay */}
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-80" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="w-full h-screen flex items-center justify-center relative">
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 z-50 bg-white rounded-full h-10 w-10 flex items-center justify-center shadow hover:bg-gray-200 transition"
                  onClick={() => setModalIsOpen(false)}
                >
                  <IoMdClose className="text-2xl text-black" />
                </button>

                {/* Swiper Carousel */}
                <Swiper
                  modules={[Navigation, Zoom, Pagination]}
                  navigation
                  zoom
                  pagination={{ clickable: true }}
                  spaceBetween={30}
                  centeredSlides
                  className="w-full h-full max-w-6xl max-h-[90vh]"
                >
                  {allImages.map((src: string, idx: number) => (
                    <SwiperSlide
                      key={idx}
                      className="flex items-center justify-center"
                    >
                      <div className="swiper-zoom-container flex items-center justify-center w-full h-full">
                        <img
                          src={src || "/placeholder.svg"}
                          alt={`img-${idx}`}
                          className="max-h-full max-w-full object-contain"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const [propertyPicturesTemp, setPropertyPicturesTemp] = useState<string[]>(
    []
  );

  useEffect(() => {
    if (particularProperty?.propertyPictureUrls) {
      setPropertyPicturesTemp(particularProperty?.propertyPictureUrls);
    }
  }, [particularProperty?.propertyPictureUrls]);

  useEffect(() => {
    let arr: string[] = [];
    if (particularProperty?.propertyCoverFileUrl != undefined)
      arr.push(particularProperty?.propertyCoverFileUrl);
    if (particularProperty?.propertyPictureUrls != undefined)
      arr = [...arr, ...particularProperty?.propertyPictureUrls];
    if (particularProperty?.propertyImages != undefined)
      arr = [...arr, ...particularProperty?.propertyImages];
    arr = arr.filter((item) => item != "");
    setAllImages(arr);
  }, [particularProperty]);

  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  return (
    <div
      className={`nc-ListingStayDetailPage ${modalIsOpen ? "blur-md" : ""} `}
    >
      <header className="rounded-md sm:rounded-xl">
        {/* Main Grid Layout for larger screens */}
        <div className="relative  hidden  w-full h-full md:grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div className="col-span-2  row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden">
            {particularProperty?.propertyCoverFileUrl ? (
              <img
                src={particularProperty?.propertyCoverFileUrl}
                alt="Cover Image"
                className="object-cover h-full w-full"
              />
            ) : (
              <div className="w-full h-full flex flex-col justify-center items-center">
                <BsExclamationCircleFill className="w-1/4 h-1/4 mb-2 text-neutral-600" />
                <span className="text-neutral-600 font-medium">
                  Image not found
                </span>
              </div>
            )}
          </div>

          {/* Thumbnail images for larger screens */}
          {allImages
            ?.filter((_, i) => i >= 1 && i < 5)
            .map((item, index) => (
              <div
                className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5 rounded-xl"
                key={index}
              >
                {allImages[index + 1] ? (
                  <img
                    src={allImages[index + 1]}
                    alt="Property Picture"
                    className="object-cover rounded-xl sm:rounded-xl w-44 h-44"
                  />
                ) : (
                  <div className=" flex flex-col justify-center items-center">
                    <BsExclamationCircleFill className="w-1/2 h-1/2 mb-2 text-neutral-700" />
                    <p>Image not found!</p>
                  </div>
                )}
              </div>
            ))}
          <button
            className="absolute flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-30"
            onClick={() => setModalIsOpen(true)}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>

        <div className="block md:hidden  w-full mt-4">
          <Slider {...carouselSettings}>
            {[particularProperty?.propertyCoverFileUrl, ...propertyPicturesTemp]
              .filter((url, i) => i >= 0 && i < 5)
              .map((item, index) => (
                <div
                  key={index}
                  className="aspect-w-4 aspect-h-3 sm:aspect-w-6 sm:aspect-h-5 rounded-xl"
                >
                  <img
                    src={
                      item ||
                      "https://cdn.pixabay.com/photo/2013/07/12/12/56/home-146585_1280.png"
                    }
                    alt="Property Picture"
                    className="object-cover rounded-xl sm:rounded-xl w-full h-full"
                  />
                </div>
              ))}
          </Slider>
          <button
            className=" flex mt-10 text-xs items-center gap-x-2 md:flex md:items-center md:justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-10"
            onClick={() => setModalIsOpen(true)}
          >
            <Squares2X2Icon className="w-5 h-5" />
            Show all photos
          </button>
        </div>
      </header>

      {modalIsOpen && (
        <ModalImages
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          allImages={allImages}
        />
      )}
      {/* MAIN */}
      <main className=" relative z-10 mt-11 flex flex-col lg:flex-row ">
        {/* CONTENT */}
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pr-10">
          {renderSection1()}
          {renderSection2()}
          {renderSection3()}
          {renderSection4()}
          {bookedState && particularProperty?.rentalType === "Short Term" && (
            <SectionDateRange
              prices={particularProperty?.pricePerDay}
              externalBookedDates={alreadyBookedDates}
            />
          )}
          {(commonProperties?.length || 0) > 1 && renderPortionCards()}
          {renderSection5()}
          {/* {renderSection6()} */}
          {/* {center && center?.lat != 0 && center?.lng != 0 && renderSection7()} */}
          {renderSection8()}
        </div>

        {/* SIDEBAR */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          <div className="sticky top-28">{renderSidebar()}</div>
        </div>
      </main>
    </div>
  );
};

export default ListingStayDetailPage;
