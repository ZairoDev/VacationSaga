"use client";

import {
  MdConstruction,
  MdHomeWork,
  MdOutlineEnergySavingsLeaf,
  MdApartment,
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
import dynamic from "next/dynamic";
import { Suspense } from "react";

import { FaBath } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import { FaCheck } from "react-icons/fa";
import {
  FiArrowUp,
  FiBriefcase,
  FiCoffee,
  FiFeather,
  FiLogIn,
  FiMonitor,
  FiRefreshCw,
  FiShield,
  FiThermometer,
  FiTool,
  FiWifi,
  FiWind,
} from "react-icons/fi";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa";
import "slick-carousel/slick/slick-theme.css";
import { PiStudentBold } from "react-icons/pi";
import { SiLevelsdotfyi } from "react-icons/si";
import { useSearchParams } from "next/navigation";
import { SlSizeFullscreen } from "react-icons/sl";
import { IoLanguageOutline } from "react-icons/io5";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { BsExclamationCircleFill } from "react-icons/bs";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { BiMessageAltDetail, BiSolidArea } from "react-icons/bi";
import type React from "react";
import { type FC, Fragment, useEffect, useState } from "react";
import { FaHotTub, FaMapMarkerAlt, FaUser } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Zoom, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

import Input from "@/shared/Input";
import Badge from "@/shared/Badge";
import dateParser from "@/helper/dateParser";
import ButtonClose from "@/shared/ButtonClose";
import ButtonCircle from "@/shared/ButtonCircle";
import ButtonPrimary from "@/shared/ButtonPrimary";
import LikeSaveBtns from "@/components/LikeSaveBtns";


import ButtonSecondary from "@/shared/ButtonSecondary";
import { useLoadScript } from "@react-google-maps/api";
import { Dialog, Transition } from "@headlessui/react";
import type { EventInterface } from "@/app/editproperty/page";
import CommentListing from "@/components/CommentListing";
import type { PropertiesDataType } from "@/data/types";
import FiveStartIconForRate from "@/components/FiveStartIconForRate";
import { ArrowRightIcon, Squares2X2Icon } from "@heroicons/react/24/outline";

import GuestsInput from "../GuestsInput";
import SectionDateRange from "../../SectionDateRange";
import StayDatesRangeInput from "../StayDatesRangeInput";
import MobileFooterSticky from "../../(components)/MobileFooterSticky";
import { TbPawFilled } from "react-icons/tb";

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

const ListingStayDetailPageContent: FC<ListingStayDetailPageProps> = ({ params }) => {
  // const { user } = useAuth();
  // const router = useRouter();
  // const thisPathname = usePathname();
  const searchParams = useSearchParams();

  // All hooks must be called before any conditional returns
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
  const [mapLoaded, setMapLoaded] = useState(false);
  const [bookedState, setBookedState] = useState<boolean>(false);
  const [alreadyBookedDates, setAlreadyBookedDates] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<EventInterface[]>([]);
  const [bookingPrice, setBookingPrice] = useState(0);
  const [portions, setPortions] = useState(0);
  const [selectedDates, setSelectedDates] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
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
  const [portionCoverFileUrls, setPortionCoverFileUrls] = useState<string[]>([]);
  const checkPortion = portions > 1 ? portions : 0;
  const [isOpenModalAmenities, setIsOpenModalAmenities] = useState(false);
  const [isOpenModalImages, setIsOpenModalImages] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isAboutExpanded, setIsAboutExpanded] = useState(false);
  const [location, setLocation] = useState<string[]>([]);
  const [totalGuests, setTotalGuests] = useState<number>(0);
  const [minNightStay, setMinNightStay] = useState<number | undefined>(undefined);
  const [propertyPicturesTemp, setPropertyPicturesTemp] = useState<string[]>([]);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  // Validate params after all hooks are called
  const isValidParams = params?.id && Array.isArray(params.id) && params.id.length > 0;
  const param: string = isValidParams ? params.id[0] : "";
  const indexId: number =
    Number.parseInt(searchParams.get("portion") || "0") || 0;

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
        const currDt = new Date(event.start || new Date());
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
              {
                commonId: response.data.property.commonId,
              }
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
      if (!isValidParams || !param) return;
      try {
        const response = await axios.post(
          "/api/newProperties/getBlockedDates",
          { propertyId: param }
        );

        setAlreadyBookedDates((prev) => [...prev, ...response?.data?.data]);
      } catch (err: any) {
        console.log("error in fetching blocked dates");
      }
    };

    if (isValidParams && param) {
      getProperties();
      getBookedDates();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isValidParams, param]);

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
  }, [userIdOfProperty, userEmail]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem("page1");
      if (data) {
        try {
          const value = JSON.parse(data)?.numberOfPortions;
          if (value) setPortions(value);
        } catch (err) {
          console.error("Error parsing localStorage:", err);
        }
      }
    }
  }, []);

  const handleDatesChange = (dates: DateRange) => {
    setSelectedDates(dates);
  };
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

  useEffect(() => {
    const savedData = localStorage.getItem("portionCoverFileUrls") || "";
    if (!savedData) {
      setPortionCoverFileUrls(Array(checkPortion).fill(""));
    } else {
      try {
        const value = JSON.parse(savedData);
        setPortionCoverFileUrls(value);
      } catch (err) {
        console.error("Error parsing portionCoverFileUrls:", err);
      }
    }
  }, [checkPortion]);

  function closeModalAmenities() {
    setIsOpenModalAmenities(false);
  }

  function openModalAmenities() {
    setIsOpenModalAmenities(true);
  }

  function closeModalImages() {
    setIsOpenModalImages(false);
  }

  function openModalImages() {
    setIsOpenModalImages(true);
  }

  useEffect(() => {
    const savedPage = localStorage.getItem("page2") || "";
    if (savedPage) {
      try {
        const value = JSON.parse(savedPage);
        setLocation([
          value.country,
          value.state,
          value.city,
          value.postalCode,
          value.street,
          value.roomNumber,
        ]);
      } catch (err) {
        console.error("Error parsing page2:", err);
      }
    }
  }, []);

  useEffect(() => {
    const savedValue = localStorage.getItem("totalGuests") || "";
    if (savedValue) {
      try {
        const total = JSON.parse(savedValue);
        setTotalGuests(total);
      } catch (err) {
        console.error("Error parsing totalGuests:", err);
      }
    }
  }, []);

  useEffect(() => {
    if (particularProperty?.propertyPictureUrls) {
      setPropertyPicturesTemp(particularProperty?.propertyPictureUrls);
    }
  }, [particularProperty?.propertyPictureUrls]);

  useEffect(() => {
    if (!particularProperty) return;

    let arr: string[] = [];

    if (particularProperty.propertyCoverFileUrl)
      arr.push(particularProperty.propertyCoverFileUrl);

    if (particularProperty.propertyPictureUrls)
      arr.push(...particularProperty.propertyPictureUrls);

    if (particularProperty.propertyImages)
      arr.push(...particularProperty.propertyImages);

    const uniqueImages = Array.from(new Set(arr.filter((item) => item !== "")));

    setAllImages(uniqueImages);
  }, [particularProperty]);

  // Early return check after all hooks
  if (!isValidParams) {
    return (
      <div className="container py-24">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Property Not Found</h2>
          <p className="text-neutral-500">The property you&apos;re looking for doesn&apos;t exist.</p>
          <Link href="/" className="mt-4 inline-block text-primary-6000 hover:underline">
            Go back to home
          </Link>
        </div>
      </div>
    );
  }

  const renderSection1 = () => {
    const availability = (particularProperty as any)?.availability as string | undefined;
    const isAvailable = availability === "Available" || availability === "available";
    const isRented   = availability === "Not Available" || availability === "not available";

    /* ── stat items for the bottom strip ── */
    const baseStats = [
      {
        icon: (
          <svg className="h-5 w-5 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        ),
        value: `${particularProperty?.guests || 3}`,
        label: "Guests",
      },
      {
        icon: (
          <svg className="h-5 w-5 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2 9V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5" /><rect x="2" y="9" width="20" height="13" rx="2" />
            <path d="M6 22v-3" /><path d="M18 22v-3" /><path d="M2 15h20" />
          </svg>
        ),
        value: `${particularProperty?.bedrooms}`,
        label: particularProperty?.bedrooms === 1 ? "Bedroom" : "Bedrooms",
      },
      {
        icon: (
          <svg className="h-5 w-5 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 17v3" /><path d="M3 6V4a1 1 0 0 1 1-1h5a1 1 0 0 1 1 1v6" /><path d="M3 6h18" /><path d="M21 6v15" /><path d="M3 12h18" /><path d="M21 17H3" />
          </svg>
        ),
        value: `${particularProperty?.bathroom}`,
        label: particularProperty?.bathroom === 1 ? "Bathroom" : "Bathrooms",
      },
      {
        icon: (
          <svg className="h-5 w-5 text-neutral-500 dark:text-neutral-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="2" /><path d="M2 9h20" /><path d="M9 2v20" />
          </svg>
        ),
        value: `${particularProperty?.size} m²`,
        label: "Area",
      },
    ];

    /* optional long-term extras */
    const ltExtras = particularProperty?.rentalType === "Long Term" ? [
      (particularProperty?.isTopFloor || particularProperty?.floor) && {
        icon: <MdApartment className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />,
        value: particularProperty?.isTopFloor
          ? particularProperty?.floor ? `Top (${particularProperty.floor})` : "Top Floor"
          : `Floor ${particularProperty?.floor}`,
        label: "Floor",
      },
      particularProperty?.orientation && {
        icon: <IoIosCompass className="h-5 w-5 text-neutral-500 dark:text-neutral-400" />,
        value: particularProperty.orientation,
        label: "Orientation",
      },
    ].filter(Boolean) as { icon: React.ReactNode; value: string; label: string }[] : [];

    /* top 2 amenities for the strip (like WiFi / AC in the screenshot) */
    const amenityStats = allAmenities.slice(0, 2).map(([name]: [string, boolean]) => ({
      icon: <FaCheck className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />,
      value: name,
      label: "",
    }));

    const allStats = [...baseStats, ...ltExtras, ...amenityStats];

    return (
      <div className="space-y-4 pb-8">
        {/* ── Breadcrumb ── */}
        <nav className="flex items-center flex-wrap gap-1 text-sm text-neutral-500 dark:text-neutral-400">
          <Link href="/" className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors">Home</Link>
          {[particularProperty?.country, particularProperty?.state, particularProperty?.city].filter(Boolean).map((crumb, i) => (
            <span key={i} className="flex items-center gap-1">
              <span className="text-neutral-300 dark:text-neutral-600 select-none">›</span>
              <span className="hover:text-neutral-700 dark:hover:text-neutral-200 transition-colors cursor-default">{crumb}</span>
            </span>
          ))}
          <span className="flex items-center gap-1">
            <span className="text-neutral-300 dark:text-neutral-600 select-none">›</span>
            <span className="text-neutral-400 dark:text-neutral-500">Property</span>
          </span>
        </nav>

        {/* ── Title + badge ── */}
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white leading-tight">
              VS ID — {particularProperty?.VSID}
            </h1>
            {availability && (
              <span className={`inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${
                isAvailable
                  ? "border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-900 text-neutral-700 dark:text-neutral-300"
                  : "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/30 text-red-700 dark:text-red-400"
              }`}>
                {isRented ? "Rented" : "Verified"}
              </span>
            )}
          </div>
          <LikeSaveBtns />
        </div>

        {/* ── Location + rating row ── */}
        <div className="flex flex-wrap items-center gap-3 text-sm text-neutral-600 dark:text-neutral-400">
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-neutral-500 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
            </svg>
            <span>
              {[
                particularProperty?.street,
                particularProperty?.city,
                particularProperty?.state,
                particularProperty?.country,
              ].filter(Boolean).join(", ")}
              {particularProperty?.rentalType === "Long Term" && particularProperty?.postalCode
                ? ` ${particularProperty.postalCode}`
                : ""}
            </span>
          </div>
          <span className="h-4 w-px bg-neutral-200 dark:bg-neutral-700 flex-shrink-0" />
          <div className="flex items-center gap-1.5">
            <svg className="h-4 w-4 text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
            </svg>
            <span className="font-semibold text-neutral-900 dark:text-white">4.8</span>
            <span className="text-neutral-500 dark:text-neutral-400">(124 reviews)</span>
          </div>
        </div>

        {/* ── Host + stats strip ── */}
        <div className="flex flex-wrap items-center gap-0 pt-4 border-t border-neutral-100 dark:border-neutral-800">
          {/* Host cell */}
          <div className="flex items-center gap-3 pr-6 mr-0">
            <div className="h-10 w-10 rounded-full bg-orange-50 dark:bg-orange-950/30 flex items-center justify-center flex-shrink-0">
              <img
                src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yaWRMcmd4Q01COGJuRWQ2bUl1V3R0dEtzaXkiLCJyaWQiOiJ1c2VyXzJqOHhkb0R5cUl4V05adXFlcWlXTlpsdGpwMiJ9"
                alt="host"
                className="h-10 w-10 rounded-full object-cover"
              />
            </div>
            <div className="leading-snug">
              <p className="text-sm font-bold text-neutral-900 dark:text-white">
                {particularProperty?.propertyType || "Property"}
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400">Hosted by {username}</p>
            </div>
          </div>

          {/* Pipe + stats */}
          {allStats.map((stat, i) => (
            <span key={i} className="flex items-center">
              <span className="h-8 w-px bg-neutral-200 dark:bg-neutral-700 mx-0 flex-shrink-0" />
              <span className="flex flex-col items-center px-4 sm:px-5 gap-1 min-w-[4rem]">
                <span className="flex-shrink-0">{stat.icon}</span>
                <span className="text-xs font-semibold text-neutral-800 dark:text-neutral-200 whitespace-nowrap leading-none">
                  {stat.value}{stat.label ? ` ${stat.label}` : ""}
                </span>
              </span>
            </span>
          ))}
        </div>
      </div>
    );
  };

  const renderSection2 = () => {
    /* pick first available property image for the right panel */
    const previewImg =
      particularProperty?.propertyCoverFileUrl ||
      particularProperty?.propertyPictureUrls?.[0] ||
      particularProperty?.propertyImages?.[0] ||
      null;

    /* raw description text (strip html tags for truncation logic) */
    const rawText = particularProperty?.newReviews
      ? particularProperty.newReviews.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim()
      : (particularProperty?.reviews as string | undefined) ?? "";

    const CHAR_LIMIT = 220;
    const isTruncatable = rawText.length > CHAR_LIMIT;

    return (
      <>
        {particularProperty?.rentalType === "Short Term" && (
          <div className="z-10">
            <MobileFooterSticky
              price={particularProperty?.basePrice}
              priceLongTerm={particularProperty?.basePriceLongTerm}
              rentalType={particularProperty?.rentalType}
              nights={particularProperty?.night[0] || 3}
            />
          </div>
        )}

        {/* ── Card matching screenshot ── */}
        <div className="flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-neutral-100 dark:border-neutral-800 bg-white dark:bg-neutral-900 shadow-sm">
          {/* Left: text */}
          <div className="flex flex-col justify-between gap-5 p-6 sm:p-8 sm:w-[48%] shrink-0">
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-extrabold text-neutral-900 dark:text-white leading-tight">
                About this stay
              </h2>

              {particularProperty?.newReviews ? (
                <div>
                  <div
                    dangerouslySetInnerHTML={{ __html: particularProperty.newReviews }}
                    className={`prose prose-sm max-w-none text-neutral-600 dark:text-neutral-400 leading-relaxed ${!isAboutExpanded && isTruncatable ? "line-clamp-[6]" : ""}`}
                  />
                </div>
              ) : (
                <p className={`text-sm sm:text-base text-neutral-600 dark:text-neutral-400 leading-relaxed ${!isAboutExpanded && isTruncatable ? "line-clamp-[6]" : ""}`}>
                  {rawText}
                </p>
              )}
            </div>

            {isTruncatable && (
              <button
                type="button"
                onClick={() => setIsAboutExpanded((v) => !v)}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-orange-500 hover:text-orange-600 transition-colors self-start"
              >
                {isAboutExpanded ? "Show less" : "Read more"}
                <svg
                  className={`h-4 w-4 transition-transform ${isAboutExpanded ? "rotate-180" : ""}`}
                  viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            )}
          </div>

          {/* Right: property photo */}
          {previewImg && (
            <div className="relative sm:flex-1 h-56 sm:h-auto min-h-[220px]">
              <img
                src={previewImg}
                alt="Property interior"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          )}
        </div>
      </>
    );
  };

  const renderSection3 = () => {
    const getAmenityIcon = (label: string) => {
      const t = label.toLowerCase();
      if (t.includes("wifi") || t.includes("wi-fi")) return <FiWifi />;
      if (t.includes("air") || t.includes("ac") || t.includes("conditioning"))
        return <FiWind />;
      if (t.includes("heat") || t.includes("heating")) return <FiThermometer />;
      if (t.includes("kitchen") || t.includes("cook")) return <FiCoffee />;
      if (t.includes("washer") || t.includes("laundry")) return <FiRefreshCw />;
      if (t.includes("tv") || t.includes("television")) return <FiMonitor />;
      if (t.includes("workspace") || t.includes("desk")) return <FiBriefcase />;
      if (t.includes("entrance") || t.includes("private")) return <FiLogIn />;
      if (t.includes("hair")) return <FiFeather />;
      if (t.includes("iron")) return <FiTool />;
      if (t.includes("essential")) return <FiShield />;
      if (t.includes("elevator") || t.includes("lift")) return <FiArrowUp />;
      return <FaCheck className="text-[15px]" />;
    };

    return (
      <div className="listingSection__wrap">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">
            Amenities
          </h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            Everything you need for a comfortable stay
          </p>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {allAmenities
            .filter((_, i) => i < 12)
            .map((item, index) => (
              <div key={index} className="flex items-center gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-neutral-100/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200">
                  <span className="text-[18px]">{getAmenityIcon(item[0])}</span>
                </div>
                <div className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                  {item[0]}
                </div>
              </div>
            ))}
        </div>

        <div className="pt-2">
          <button
            type="button"
            onClick={openModalAmenities}
            className="inline-flex items-center gap-2 rounded-full border border-orange-200 dark:border-orange-900/50 bg-white dark:bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:bg-orange-50/60 dark:hover:bg-orange-950/20 transition-colors"
          >
            View all amenities
            <svg
              className="h-4 w-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14" />
              <path d="M12 5l7 7-7 7" />
            </svg>
          </button>
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
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-orange-500">Pricing</p>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Room Rates</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">Prices may increase on weekends or holidays</p>
        </div>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

        <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800">
          <div className="flex items-center justify-between px-5 py-4 bg-neutral-50/80 dark:bg-neutral-900/50">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-orange-400 flex-shrink-0" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {particularProperty?.rentalType === "Short Term" ? "Monday — Thursday" : "Monthly Rate"}
              </span>
            </div>
            <span className="text-sm font-bold text-neutral-900 dark:text-white">
              € {particularProperty?.rentalType === "Short Term" ? particularProperty?.basePrice : particularProperty?.basePriceLongTerm}
            </span>
          </div>

          {particularProperty?.rentalType === "Short Term" && (
            <div className="flex items-center justify-between px-5 py-4">
              <div className="flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-amber-400 flex-shrink-0" />
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Friday — Sunday</span>
              </div>
              <span className="text-sm font-bold text-neutral-900 dark:text-white">€ {particularProperty?.weekendPrice}</span>
            </div>
          )}

          <div className="flex items-center justify-between px-5 py-4 bg-neutral-50/50 dark:bg-neutral-900/30">
            <div className="flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-emerald-400 flex-shrink-0" />
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                {particularProperty?.rentalType === "Short Term" ? "Weekly Discount" : "Monthly Discount"}
              </span>
            </div>
            <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
              {particularProperty?.rentalType === "Short Term"
                ? `€ ${particularProperty?.weeklyDiscount}`
                : `${particularProperty?.monthlyDiscount} %`}
            </span>
          </div>

          {particularProperty?.rentalType === "Short Term" && (
            <>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Minimum nights</span>
                <span className="inline-flex items-center rounded-lg bg-orange-50 dark:bg-orange-950/30 border border-orange-100 dark:border-orange-900/40 px-3 py-1 text-xs font-bold text-orange-600 dark:text-orange-400">
                  {particularProperty?.night[0]} nights
                </span>
              </div>
              <div className="flex items-center justify-between px-5 py-4 bg-neutral-50/50 dark:bg-neutral-900/30">
                <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300">Maximum nights</span>
                <span className="inline-flex items-center rounded-lg bg-neutral-100 dark:bg-neutral-800 px-3 py-1 text-xs font-bold text-neutral-600 dark:text-neutral-400">
                  {particularProperty?.night[1]} nights
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderSection5 = () => {
    const hostStats = [
      { icon: <CiCalendar className="text-orange-400 text-base" />, text: "Joined long time ago" },
      { icon: <BiMessageAltDetail className="text-orange-400 text-base" />, text: "Response rate — 100%" },
      { icon: <FaRegClock className="text-orange-400 text-base" />, text: "Fast response — within a few hours" },
      { icon: <IoLanguageOutline className="text-orange-400 text-base" />, text: `Language spoken — English${language ? `, ${language}` : ""}` },
    ];

    return (
      <div className="listingSection__wrap">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-orange-500">Your host</p>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Meet the Host</h2>
        </div>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

        <div className="flex items-center gap-4">
          <img
            src="https://img.clerk.com/eyJ0eXBlIjoiZGVmYXVsdCIsImlpZCI6Imluc18yaWRMcmd4Q01COGJuRWQ2bUl1V3R0dEtzaXkiLCJyaWQiOiJ1c2VyXzJqOHhkb0R5cUl4V05adXFlcWlXTlpsdGpwMiJ9"
            alt="host"
            className="h-14 w-14 rounded-2xl ring-2 ring-orange-50 object-cover flex-shrink-0"
          />
          <div>
            <p className="text-base font-bold text-neutral-900 dark:text-white">{username}</p>
            <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5 uppercase tracking-wide">Property Host</p>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 gap-3">
          {hostStats.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3"
            >
              <div className="flex-shrink-0">{item.icon}</div>
              <span className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">{item.text}</span>
            </div>
          ))}
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
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-orange-500">Where you&apos;ll be</p>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Location</h2>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 text-orange-400 flex-shrink-0" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z" />
            </svg>
            {[particularProperty?.city, particularProperty?.state, particularProperty?.country].filter(Boolean).join(", ")}
          </p>
        </div>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

        <div className="aspect-w-5 aspect-h-5 sm:aspect-h-3 rounded-2xl overflow-hidden ring-1 ring-neutral-100 dark:ring-neutral-800 shadow-sm z-0">
          <div className="rounded-2xl overflow-hidden z-0">
            {loadError && (
              <div className="w-full h-[400px] bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center">
                <p className="text-sm text-red-500">Map failed to load</p>
              </div>
            )}
            {!isLoaded && !loadError && (
              <div className="w-full h-[400px] bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-orange-400 border-t-transparent mb-2" />
                  <p className="text-xs text-neutral-400 uppercase tracking-wide">Loading map…</p>
                </div>
              </div>
            )}
          </div>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={`https://www.google.com/maps/embed/v1/view?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&center=${center?.lat},${center?.lng}&zoom=15`}
          />
        </div>
      </div>
    );
  };

  const renderSection8 = () => {
    return (
      <div className="listingSection__wrap">
        <div className="space-y-1">
          <p className="text-[11px] uppercase tracking-[0.18em] font-semibold text-orange-500">Good to know</p>
          <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Things to Know</h2>
        </div>

        <div className="h-px bg-neutral-100 dark:bg-neutral-800" />

        <div className="grid md:grid-cols-2 gap-8">
          {/* ── Left column ── */}
          <div className="space-y-6">
            {particularProperty?.rentalType === "Short Term" && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-neutral-400 dark:text-neutral-500">Check-in / Check-out</p>
                <div className="rounded-2xl border border-neutral-100 dark:border-neutral-800 overflow-hidden divide-y divide-neutral-100 dark:divide-neutral-800">
                  <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-50/80 dark:bg-neutral-900/50">
                    <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      <svg className="h-4 w-4 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" /><circle cx="12" cy="10" r="3" />
                      </svg>
                      Check-in
                    </div>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{particularProperty?.time[0]}:00</span>
                  </div>
                  <div className="flex items-center justify-between px-5 py-3.5">
                    <div className="flex items-center gap-2.5 text-sm font-medium text-neutral-700 dark:text-neutral-300">
                      <svg className="h-4 w-4 text-orange-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
                      </svg>
                      Check-out
                    </div>
                    <span className="text-sm font-bold text-neutral-900 dark:text-white">{particularProperty?.time[1]}:00</span>
                  </div>
                </div>
              </div>
            )}

            {(particularProperty?.additionalRules?.length ?? 0) > 0 && (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-neutral-400 dark:text-neutral-500">Special Note</p>
                <ul className="space-y-2.5">
                  {particularProperty?.additionalRules?.map((rule, index) => (
                    <li key={index} className="flex items-start gap-3 text-sm text-neutral-600 dark:text-neutral-400 leading-snug">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ── Right column ── */}
          <div>
            {particularProperty?.rentalType === "Short Term" &&
            particularProperty?.nearbyLocations?.nearbyLocationName?.length > 0 ? (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-neutral-400 dark:text-neutral-500 flex items-center gap-1.5">
                  <FaMapMarkerAlt className="text-orange-400 text-xs" />
                  Nearby Locations
                </p>
                <div className="h-full max-h-72 overflow-y-auto scrollbar-thin space-y-1 pr-1">
                  {Array.from(new Set(particularProperty?.nearbyLocations?.nearbyLocationTag))?.map((item, ind) =>
                    particularProperty?.nearbyLocations?.nearbyLocationName?.[
                      particularProperty?.nearbyLocations?.nearbyLocationTag?.indexOf(item)
                    ] ? (
                      <div key={ind} className="rounded-xl border border-neutral-100 dark:border-neutral-800 overflow-hidden">
                        <button
                          type="button"
                          className="w-full flex items-center justify-between px-4 py-3 bg-neutral-50 dark:bg-neutral-900/50 hover:bg-neutral-100 dark:hover:bg-neutral-800/60 transition text-left"
                          onClick={() => {
                            setNearbyAccordion((prev) => {
                              const newState = [...prev];
                              newState[ind] = !newState[ind];
                              return newState;
                            });
                          }}
                        >
                          <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">{item}</span>
                          {nearbyAccordion[ind]
                            ? <IoIosArrowDropdownCircle className="text-orange-400 text-lg flex-shrink-0" />
                            : <IoIosArrowDroprightCircle className="text-neutral-400 text-lg flex-shrink-0" />}
                        </button>
                        {nearbyAccordion[ind] && (
                          <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                            {particularProperty?.nearbyLocations?.nearbyLocationName?.map(
                              (innerItem, index) =>
                                item === particularProperty?.nearbyLocations?.nearbyLocationTag[index] && (
                                  <div key={index} className="flex items-center justify-between px-4 py-2.5">
                                    <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                      {particularProperty?.nearbyLocations?.nearbyLocationUrl?.[index] &&
                                      particularProperty?.nearbyLocations?.nearbyLocationUrl?.[index] !== "" ? (
                                        <Link
                                          href={new URL(particularProperty.nearbyLocations.nearbyLocationUrl[index])}
                                          target="_blank"
                                          className="text-orange-500 hover:underline"
                                        >
                                          {particularProperty.nearbyLocations.nearbyLocationName[index]}
                                        </Link>
                                      ) : (
                                        <span>{particularProperty.nearbyLocations.nearbyLocationName[index]}</span>
                                      )}
                                    </div>
                                    <span className="text-xs font-medium text-neutral-400 dark:text-neutral-500 ml-3 flex-shrink-0">
                                      {particularProperty?.nearbyLocations?.nearbyLocationDistance[index] >= 1000
                                        ? (particularProperty.nearbyLocations.nearbyLocationDistance[index] / 1000).toFixed(1) + " km"
                                        : particularProperty?.nearbyLocations?.nearbyLocationDistance[index] + " m"}
                                    </span>
                                  </div>
                                )
                            )}
                          </div>
                        )}
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            ) : particularProperty?.rentalType === "Long Term" ? (
              <div className="space-y-3">
                <p className="text-xs uppercase tracking-[0.16em] font-semibold text-neutral-400 dark:text-neutral-500">Property Details</p>
                <div className="grid grid-cols-1 gap-2.5">
                  {[
                    { icon: <MdApartment className="text-orange-400 text-sm" />, label: "Furnishing Status", value: particularProperty?.propertyStyle || "Not specified" },
                    { icon: <TbPawFilled className="text-orange-400 text-sm" />, label: "Pet Policy", value: particularProperty?.pet || "Not specified" },
                    { icon: <SiLevelsdotfyi className="text-orange-400 text-sm" />, label: "Number of Levels", value: particularProperty?.levels },
                    { icon: <MdHomeWork className="text-orange-400 text-sm" />, label: "Zones", value: particularProperty?.zones },
                    { icon: <PiStudentBold className="text-orange-400 text-sm" />, label: "Suitable for Students", value: particularProperty?.isSuitableForStudents ? "Yes" : "No" },
                    { icon: <MdConstruction className="text-orange-400 text-sm" />, label: "Construction Year", value: particularProperty?.constructionYear },
                    { icon: <RiMoneyEuroCircleFill className="text-orange-400 text-sm" />, label: "Monthly Expenses", value: particularProperty?.monthlyExpenses ? `€ ${particularProperty.monthlyExpenses}` : undefined },
                    { icon: <FaHotTub className="text-orange-400 text-sm" />, label: "Type of Heating", value: particularProperty?.heatingType },
                    { icon: <IoMdFlame className="text-orange-400 text-sm" />, label: "Heating Medium", value: particularProperty?.heatingMedium },
                    { icon: <MdOutlineEnergySavingsLeaf className="text-orange-400 text-sm" />, label: "Energy Class", value: particularProperty?.energyClass },
                  ].filter(item => item.value).map((item, i) => (
                    <div key={i} className="flex items-center gap-3 rounded-xl border border-neutral-100 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900/50 px-4 py-3">
                      <div className="flex-shrink-0">{item.icon}</div>
                      <div className="leading-none min-w-0">
                        <p className="text-[10px] uppercase tracking-wide text-neutral-400 dark:text-neutral-500">{item.label}</p>
                        <p className="text-sm font-semibold text-neutral-800 dark:text-neutral-200 mt-0.5">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    );
  };

  const handleGuestChange = (totalGuests: number) => {
    setTotalGuests(totalGuests);
  };

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
        return Math.ceil(timeDiff / (1000 * 60 * 60 * 24)); // Adding 1 to include both start and end dates
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
        <div className="flex justify-between ">
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
                      src={
                        commonProperties[index]?.propertyCoverFileUrl ||
                        "/placeholder.svg"
                      }
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

  interface ContactFormData {
    firstName: string;
    lastName: string;
    telephone: string;
    VSID: string;
    email: string;
    message: string;
    agreeToTerms: boolean;
  }

  const LongTermcContactForm: React.FC = () => {
    const [formData, setFormData] = useState<ContactFormData>({
      firstName: "",
      lastName: "",
      telephone: "",
      VSID:particularProperty?.VSID || "",
      email: "",
      message: "",

      agreeToTerms: false,
    });

    const handleInputChange = (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (name: string, checked: boolean) => {
      setFormData((prev) => ({ ...prev, [name]: checked }));
    };

   const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.agreeToTerms) {
      alert("Please agree to the terms and conditions.");
      return;
    }

    try {
      const res = await axios.post("/api/websiteLeads", formData);

      if (res.data.success) {
        alert("Message sent successfully!");
        setFormData({
          firstName: "",
          lastName: "",
          telephone: "",
          VSID:"",
          email: "",
          message: "",
          agreeToTerms: false,
        });
      }
    } catch (error: any) {
      console.error(error);
      alert(error.response?.data?.error || "Failed to send message.");
    }
  };

  const propertyName = particularProperty?.propertyName || "";
  const propertyvsid = particularProperty?.VSID || "";
  const availability = (particularProperty as any)?.availability as string | undefined;
  const isSoldOut = availability === "Not Available" || availability === "not available";
  
  const message = isSoldOut 
    ? encodeURIComponent(`Hello, the property ${propertyName} (VSID: ${propertyvsid}) is rented. I'd like to find similar properties or be notified when available.`)
    : encodeURIComponent(`Hello, I want to enquire about ${propertyName} (VSID: ${propertyvsid})`);
  const whatsappUrl = `https://wa.me/+918960980806?text=${message}`;

    return (
      <div className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-600 rounded-lg transition-colors duration-300">
  <div className="p-6">
    {/* Price Section */}
    <div className="mt-4 bg-white dark:bg-gray-900 rounded-xl p-4 flex items-baseline space-x-2">
      <span className="text-2xl font-bold text-orange-400">
        €{particularProperty?.basePriceLongTerm}
      </span>
      <span className="text-gray-600 dark:text-gray-400 text-base">
        /month
      </span>
    </div>

    {/* Rented Message */}
    {isSoldOut && (
      <div className="my-4 p-3.5 bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg">
        <div className="flex items-start space-x-2.5">
          <svg
            className="w-4 h-4 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div>
            <h3 className="text-sm font-medium text-red-700 dark:text-red-300 mb-0.5">
              Property Rented
            </h3>
            <p className="text-xs text-red-600 dark:text-red-400 leading-relaxed">
              Contact us to find similar properties or get notified when available.
            </p>
          </div>
        </div>
      </div>
    )}

    {/* Header */}
    <div className="flex items-start justify-between mb-6">
      <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100 leading-tight">
        {isSoldOut ? "Get Notified" : "Send a message to"}
        <br />
        {isSoldOut ? "or Find Similar" : "the owner"}
      </h2>
    </div>

    <form onSubmit={handleSubmit} className="space-y-4">
      {/* First Name */}
      <div>
        <input
          type="text"
          name="firstName"
          placeholder="First Name*"
          value={formData.firstName}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Last Name */}
      <div>
        <input
          type="text"
          name="lastName"
          placeholder="Last Name*"
          value={formData.lastName}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Telephone */}
      <div>
        <input
          type="tel"
          name="telephone"
          placeholder="Telephone*"
          value={formData.telephone}
          onChange={handleInputChange}
          required
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Email */}
      <div>
        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md placeholder:text-gray-500 dark:placeholder:text-gray-400 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Message */}
      <div>
        <textarea
          name="message"
          placeholder={
            isSoldOut
              ? "Let us know your requirements for similar properties*"
              : "Enter Message Description*"
          }
          value={formData.message}
          onChange={handleInputChange}
          rows={6}
          className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md text-gray-700 dark:text-gray-100 text-sm resize-none placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!formData.agreeToTerms}
        className="w-full bg-orange-400 hover:bg-orange-600 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium py-3 rounded-md transition-colors duration-200"
      >
        {isSoldOut ? "Request Similar Properties" : "Submit"}
      </button>

      {/* Terms Agreement */}
      <div className="flex items-start space-x-2 pt-2">
        <input
          type="checkbox"
          id="terms"
          checked={formData.agreeToTerms}
          onChange={(e) =>
            handleCheckboxChange("agreeToTerms", e.target.checked)
          }
          className="w-4 h-4 text-blue-600 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500 focus:ring-2 mt-0.5"
        />
        <label
          htmlFor="terms"
          className="text-xs text-gray-600 dark:text-gray-400 leading-relaxed cursor-pointer"
        >
          By submitting this form, you confirm that you agree to our{" "}
          <Link href="/termsandconditions">
            <span className="text-blue-600 dark:text-blue-400 underline">
              terms of use
            </span>
          </Link>{" "}
          and{" "}
          <Link href="/privacy-policy">
            <span className="text-blue-600 dark:text-blue-400 underline">
              privacy policy
            </span>
          </Link>{" "}
          of vacationsaga.com
        </label>
      </div>
    </form>

    {/* OR Divider */}
    <div className="relative flex items-center py-6">
      <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
      <span className="flex-shrink mx-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
        or
      </span>
      <div className="flex-grow border-t border-gray-200 dark:border-gray-700"></div>
    </div>

    {/* WhatsApp Button */}
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center w-full bg-green-500 hover:bg-green-600 text-white font-medium py-3 rounded-md transition-colors duration-200 space-x-2"
    >
      <svg
        className="w-5 h-5"
        fill="currentColor"
        viewBox="0 0 24 24"             
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
      </svg>
      <span>Contact us on WhatsApp</span>
    </a>
  </div>
</div>
    )}

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
        <div className="relative hidden md:grid grid-cols-3 sm:grid-cols-4 gap-1 sm:gap-2">
          <div className="col-span-2 row-span-3 sm:row-span-2 relative rounded-md sm:rounded-xl overflow-hidden">
            {particularProperty?.propertyCoverFileUrl ? (
              <img
                src={
                  particularProperty?.propertyCoverFileUrl || "/placeholder.svg"
                }
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
            {/* RENTED - Diagonal Seal */}
            {(() => {
              const avail = (particularProperty as any)?.availability as string | undefined;
              return avail === "Not Available" || avail === "not available";
            })() && (
              <div className="absolute top-0 left-0 z-10 pointer-events-none">
                {/* Diagonal stamp cutting across corner */}
                <div 
                  className="relative bg-gradient-to-br from-orange-500 to-orange-600 transform -rotate-45  origin-top-left shadow-[0_8px_20px_rgba(0,0,0,0.3)]"
                  style={{
                    width: '420px',
                    height: '60px',
                    marginTop: '180px',
                    marginLeft: '-120px'
                  }}
                >
                  {/* Border layer for depth */}
                  <div className="absolute inset-3 border-2 border-white/30"></div>
                  
                  {/* Main typography */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-white font-black text-xl  uppercase select-none" 
                          style={{ 
                            textShadow: '0 2px 8px rgba(0,0,0,0.3)',
                            letterSpacing: '0.15em',
                            fontWeight: 200
                          }}>
                      RENTED
                    </span>
                  </div>
                  
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-6 h-6 border-l-3 border-t-3 border-white/50"></div>
                  <div className="absolute bottom-3 right-3 w-6 h-6 border-r-3 border-b-3 border-white/50"></div>
                  
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
                </div>
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
                    src={allImages[index + 1] || "/placeholder.svg"}
                    alt="Property Picture"
                    className="object-cover rounded-xl w-full h-full"
                  />
                ) : (
                  <div className="flex flex-col justify-center items-center">
                    <BsExclamationCircleFill className="w-1/2 h-1/2 mb-2 text-neutral-700" />
                    <p>Image not found!</p>
                  </div>
                )}
              </div>
            ))}

          {/* Show all photos button */}
          <button
            className="absolute flex items-center justify-center left-3 bottom-3 px-4 py-2 rounded-xl bg-neutral-100 text-neutral-500 hover:bg-neutral-200 z-30"
            onClick={() => setModalIsOpen(true)}
          >
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
          </button>
        </div>

        {/* Mobile view - single image with click-to-open */}
        <div className="relative block  md:hidden w-full mt-4 overflow-hidden rounded-xl">
          <img
            src={
              particularProperty?.propertyCoverFileUrl ||
              "https://cdn.pixabay.com/photo/2013/07/12/12/56/home-146585_1280.png" ||
              "/placeholder.svg"
            }
            alt="Property Picture"
            className="object-cover rounded-xl w-full h-full"
          />
          
          {/* RENTED - Diagonal Seal Mobile */}
          {(() => {
            const avail = (particularProperty as any)?.availability as string | undefined;
            return avail === "Not Available" || avail === "not available";
          })() && (
            <div className="absolute top-0 left-0 z-50 pointer-events-none">
              {/* Diagonal stamp cutting across corner */}
              <div 
                className="relative bg-gradient-to-br from-orange-500 to-orange-600 transform -rotate-45 origin-top-left shadow-[0_6px_16px_rgba(0,0,0,0.3)]"
                style={{
                  width: '400px',
                    height: '40px',
                    marginTop: '160px',
                    marginLeft: '-125px'
                }}
              >
                {/* Border layer for depth */}
                <div className="absolute inset-2.5 border-2 border-white/30"></div>
                
                {/* Main typography */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-white font-black text-md tracking-[0.2em] uppercase select-none" 
                        style={{ 
                          textShadow: '0 2px 6px rgba(0,0,0,0.3)',
                          letterSpacing: '0.1em',
                          fontWeight: 200
                        }}>
                    RENTED
                  </span>
                </div>
                
                {/* Corner accents */}
                <div className="absolute top-2.5 left-2.5 w-5 h-5 border-l-2 border-t-2 border-white/50"></div>
                <div className="absolute bottom-2.5 right-2.5 w-5 h-5 border-r-2 border-b-2 border-white/50"></div>
                
                {/* Subtle gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent"></div>
              </div>
            </div>
          )}

          <button
            onClick={() => setModalIsOpen(true)}
            className="absolute left-3 bottom-3 flex items-center justify-center bg-neutral-100 rounded-xl px-2 py-2 text-neutral-500 hover:bg-neutral-200 "
          >
            {" "}
            <Squares2X2Icon className="w-5 h-5" />
            <span className="ml-2 text-neutral-800 text-sm font-medium">
              Show all photos
            </span>
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
          {particularProperty?.rentalType === "Short Term" && renderSection4()}
          {bookedState && particularProperty?.rentalType === "Short Term" && (
            <SectionDateRange
              prices={particularProperty?.pricePerDay}
              externalBookedDates={alreadyBookedDates}
            />
          )}
          {(commonProperties?.length || 0) > 1 && renderPortionCards()}
          {/* {renderSection5()} */}
          {/* {renderSection6()} */}
          {center && center?.lat != 0 && center?.lng != 0 && renderSection7()}
          {renderSection8()}
        </div>

        {/* SIDEBAR - Desktop Only */}
        <div className="hidden lg:block flex-grow mt-14 lg:mt-0">
          {particularProperty?.rentalType === "Long Term" ? (
            <LongTermcContactForm />
          ) : (
            renderSidebar()
          )}
        </div>

        {/* MOBILE FORM - Long Term Properties Only */}
        {particularProperty?.rentalType === "Long Term" && (
          <div className="block lg:hidden w-full mt-8">
            <LongTermcContactForm />
          </div>
        )}
      </main>
    </div>
  );
};

const ListingStayDetailPage: FC<ListingStayDetailPageProps> = ({ params }) => {
  return (
    <Suspense
      fallback={
        <div className="container py-24 flex items-center justify-center min-h-[500px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-6000 border-t-transparent mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400">Loading property details...</p>
          </div>
        </div>
      }
    >
      <ListingStayDetailPageContent params={params} />
    </Suspense>
  );
};

export default ListingStayDetailPage;
