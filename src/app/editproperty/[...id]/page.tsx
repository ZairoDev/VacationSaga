"use client";
import { useState, useEffect, FormEvent, useRef, Fragment } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/shared/Input";
import { Properties } from "../../page";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { toast, Toaster } from "sonner";
import Button from "@/shared/Button";
import { TrashIcon } from "@heroicons/react/24/solid";
import { FaCirclePlus, FaCopy } from "react-icons/fa6";
import Label from "@/components/Label";
import { FaCalendarAlt } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "@/shared/ButtonClose";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import dateParser from "@/helper/dateParser";
import CustomDateRangePrice from "@/components/CustomDateRangePrice";
import BarLoader from "@/components/BarLoader";
import { PropertiesDataType } from "@/data/types";
import { BlurFade } from "@/components/BlurFade";
import { NeonGradientCard } from "@/components/NeonCard";
import Link from "next/link";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { LuLoader2 } from "react-icons/lu";
import { BsExclamationCircleFill } from "react-icons/bs";

export interface EventInterface {
  title: string;
  date?: string;
  start?: string;
  end?: string; // if End is not given then the duration will be the same day as start
  bookedFrom?: string;
}

type CustomDateRange = {
  from: Date | null;
  to: Date | null;
};

interface PageProps {
  params: {
    id: string;
  };
}

const EditPropertyPage: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = params.id[0];
  const commonId = params.id[1];
  const { user } = useAuth();
  const [property, setProperty] = useState<Properties | null>(null);
  const [properties, setProperties] = useState<PropertiesDataType[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const [numberOfPortions, setNumberOfPortions] = useState<number>(1);
  const [refreshState, setRefreshState] = useState(false);
  const [allImages, setAllImages] = useState<string[]>([]);

  const BlurFadeDemo = (images: string[]) => {
    return (
      <section id="photos" className=" mt-2">
        <div className="columns-2 gap-4 sm:columns-3">
          {images.map((imageUrl, idx) => (
            <BlurFade
              key={`${imageUrl}-${idx}`}
              delay={0.25 + idx * 0.05}
              inView
            >
              <Link href={{ pathname: imageUrl }} target="_blank">
                {/* <NeonGradientCard> */}
                {imageUrl && (
                  <img
                    className="mb-4 size-full rounded-lg object-contain cursor-pointer hover:scale-110 transition ease-in-out duration-500"
                    src={imageUrl}
                    alt={`No Image!`}
                  />
                )}
                {/* </NeonGradientCard> */}
              </Link>
            </BlurFade>
          ))}
        </div>
      </section>
    );
  };

  useEffect(() => {
    const canAccess = searchParams.get("canAccess");
    if (!canAccess) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    const fetchPropertiesByCommonId = async () => {
      const response = await axios.post(
        "/api/newProperties/getPropertiesByCommonId",
        { commonId }
      );
      setProperties(response.data.commonIdProperties);
    };

    if (commonId) fetchPropertiesByCommonId();
  }, [commonId, refreshState]);

  const [formData, setFormData] = useState<Partial<Properties>>({
    VSID: property?.VSID,
    rentalType: property?.rentalType,

    isInstantBooking: property?.isInstantBooking,
    propertyType: property?.propertyType,
    placeName: property?.placeName,
    rentalForm: property?.rentalForm,
    numberOfPortions: property?.numberOfPortions,

    street: property?.street,
    postalCode: property?.postalCode,
    city: property?.city,
    state: property?.state,
    country: property?.country,

    portionName: property?.portionName,
    portionSize: property?.portionSize,
    guests: property?.guests,
    bedrooms: property?.bedrooms,
    beds: property?.beds,
    bathroom: property?.bathroom,
    kitchen: property?.kitchen,
    childrenAge: property?.childrenAge,

    basePrice: property?.basePrice,
    weekendPrice: property?.weekendPrice,
    monthlyDiscount: property?.monthlyDiscount,

    pricePerDay: property?.pricePerDay,
    icalLinks: property?.icalLinks,

    generalAmenities: property?.generalAmenities,
    otherAmenities: property?.otherAmenities,
    safeAmenities: property?.safeAmenities,

    smoking: property?.smoking,
    pet: property?.pet,
    party: property?.party,
    cooking: property?.cooking,
    additionalRules: property?.additionalRules,

    reviews: property?.reviews,

    propertyCoverFileUrl: property?.propertyCoverFileUrl,
    propertyPictureUrls: property?.propertyPictureUrls,
    portionCoverFileUrls: property?.portionCoverFileUrls,
    portionPictureUrls: property?.portionPictureUrls,

    night: property?.night,
    time: property?.time,
    datesPerPortion: property?.datesPerPortion,

    // isLive: property?.isLive,
  });

  const [commonFields, setCommonFields] = useState<Partial<PropertiesDataType>>(
    {
      propertyName: properties?.[0]?.propertyName,
      rentalType: properties?.[0]?.rentalType,
      propertyType: properties?.[0]?.propertyType,
      rentalForm: properties?.[0]?.rentalForm,
      country: properties?.[0]?.country,
      state: properties?.[0]?.state,
      city: properties?.[0]?.city,
      street: properties?.[0]?.street,
      postalCode: properties?.[0]?.postalCode,
      pet: properties?.[0]?.pet,
      party: properties?.[0]?.party,
      cooking: properties?.[0]?.cooking,
      smoking: properties?.[0]?.smoking,
    }
  );

  const [portionFields, setPortionFields] = useState<
    Partial<PropertiesDataType>[]
  >([]);

  useEffect(() => {
    if (property) {
      setFormData({
        VSID: property.VSID,
        rentalType: property.rentalType,

        isInstantBooking: property.isInstantBooking,
        propertyType: property.propertyType,
        placeName: property.placeName,
        rentalForm: property.rentalForm,
        numberOfPortions: property.numberOfPortions,

        street: property.street,
        postalCode: property.postalCode,
        city: property.city,
        state: property.state,
        country: property.country,

        portionName: property.portionName,
        portionSize: property.portionSize,
        guests: property.guests,
        bedrooms: property.bedrooms,
        beds: property.beds,
        bathroom: property.bathroom,
        kitchen: property.kitchen,
        childrenAge: property.childrenAge,

        basePrice: property.basePrice,
        weekendPrice: property.weekendPrice,
        monthlyDiscount: property.monthlyDiscount,

        pricePerDay: property?.pricePerDay,
        icalLinks: property?.icalLinks,

        smoking: property.smoking,
        pet: property.pet,
        party: property.party,
        cooking: property.cooking,
        additionalRules: property.additionalRules,

        reviews: property.reviews,

        night: property.night,
        time: property.time,
        datesPerPortion: property.datesPerPortion,

        // isLive: property.isLive,
      });
      // setInstantBookingToggle(property?.isInstantBooking || false);
      const url = (property.icalLinks as { [key: string]: string })?.[
        "Airbnb"
      ] as string;
      console.log("url: ", url);
      fetchBookedDates(url);
    }

    if (properties) {
      setCommonFields({
        propertyName: properties?.[0]?.propertyName,
        rentalType: properties?.[0]?.rentalType,
        propertyType: properties?.[0]?.propertyType,
        rentalForm: properties?.[0]?.rentalForm,
        country: properties?.[0]?.country,
        state: properties?.[0]?.state,
        city: properties?.[0]?.city,
        street: properties?.[0]?.street,
        postalCode: properties?.[0]?.postalCode,
        pet: properties?.[0]?.pet,
        party: properties?.[0]?.party,
        cooking: properties?.[0]?.cooking,
        smoking: properties?.[0]?.smoking,
      });

      const portionSpecificFields = [];
      for (let i = 0; i < properties.length; i++) {
        const newObj = {
          VSID: properties[i].VSID,
          icalLinks: properties[i].icalLinks,
          placeName: properties[i].placeName,
          size: properties[i].size,
          guests: properties[i].guests,
          bedrooms: properties[i].bedrooms,
          beds: properties[i].beds,
          bathroom: properties[i].bathroom,
          kitchen: properties[i].kitchen,
          childrenAge: properties[i].childrenAge,
          basePrice: properties[i].basePrice,
          pricePerDay: properties[i].pricePerDay,
          weekendPrice: properties[i].weekendPrice,
          weeklyDiscount: properties[i].weeklyDiscount,
          isInstantBooking: properties[i].isInstantBooking,
        };
        setAllImages((prev) => [...prev, ...properties[i].propertyImages]);
        portionSpecificFields.push(newObj);
      }
      setPortionFields(portionSpecificFields);
    }
  }, [properties]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const trimmedValue = value?.trim();
    setCommonFields((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : trimmedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (!user) {
      console.error("User not authenticated");
      return;
    }

    const Ids = [];
    for (const propertyData of properties!) Ids.push(propertyData._id);

    try {
      await axios.post("/api/newProperties/editProperty", {
        commonId,
        Ids,
        commonFields,
        portionFields,
      });
      toast.success("Property updated successfully");
      setLoading(false);
      setTimeout(() => {
        router.push("/author"); // Redirect to the Author page or wherever you want
      }, 2000);
    } catch (error) {
      console.error("Error updating property:", error);
    }
    setLoading(false);
  };

  const [isPortionOpen, setIsPortionOpen] = useState<boolean[]>(() =>
    Array.from({ length: numberOfPortions }, () => false)
  );

  const [icalPlatform, setIcalPlatform] = useState<string>("Airbnb");
  const icalLinkRef = useRef<HTMLInputElement>(null);
  const [alreadyBookedDates, setAlreadyBookedDates] = useState<Date[]>([]);
  const [bookedDates, setBookedDates] = useState<EventInterface[]>([
    // { start: "2024-10-07", end: "2024-10-09", title: "Booked" }
  ]); //! {start: "YYYY-MM-DD"}
  const handleAddIcalLink = (index: number) => {
    if (icalLinkRef.current?.value == "") return;

    const link = icalLinkRef.current?.value;

    setPortionFields((prev) => {
      const newPortionArray = [...prev];
      const newPortionObj = newPortionArray[index];
      const newIcalObj: { [key: string]: string } = {};
      newIcalObj["Airbnb"] = link ?? "";
      newPortionObj.icalLinks = newIcalObj;
      newPortionArray[index] = newPortionObj;
      return newPortionArray;
    });

    if (icalLinkRef.current) {
      icalLinkRef.current.value = "";
    }
    setIcalPlatform("");
  };

  const handleRemoveIcalLink = (platform: string) => {
    const newObj = { ...formData?.icalLinks } as { [key: string]: string };
    delete newObj[platform];

    setFormData((prevState) => ({
      ...prevState,
      icalLinks: newObj,
    }));
  };

  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const [date, setDate] = useState<CustomDateRange>({
    from: startDate,
    to: endDate,
  });

  useEffect(() => {
    setDate({ from: startDate, to: endDate });
  }, [startDate, endDate]);

  const priceInputRef = useRef<HTMLInputElement>(null);
  const handleChangePrice = async (portionIndex: number) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/editPrices", {
        propertyId: properties?.[portionIndex]._id,
        price: priceInputRef.current?.value,
        dateRange: date,
      });
      toast.success("Prices updated successfully!");
      setRefreshState((prev) => !prev);
      if (priceInputRef.current) priceInputRef.current.value = "";
    } catch (err: any) {
      toast.error("Prices Not Updated!");
    }
    setLoading(false);
  };

  const modalCalendar = (index: number) => {
    return (
      <Transition appear show={isCalendarOpen[index]} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={() =>
            setIsCalendarOpen(Array(property?.numberOfPortions).fill(false))
          }
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
              <div className="inline-block py-8 h-screen w-full max-w-4xl ">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full">
                  <div className="relative flex-shrink-0 px-6 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <span className="absolute left-3 top-3">
                      <ButtonClose
                        onClick={() =>
                          setIsCalendarOpen(
                            Array(property?.numberOfPortions).fill(false)
                          )
                        }
                      />
                    </span>
                  </div>
                  <div className="px-8 py-4 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {/* <StayDatesRangeInput
                      className="flex-1"
                      prices={property?.pricePerDay?.[index] || []}
                      externalBookedDates={alreadyBookedDates}
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      // onDatesChange={handleDatesChange}
                    /> */}
                    <CustomDateRangePrice
                      pId={properties?.[index]._id ?? ""}
                      className="flex-1"
                      prices={portionFields?.[index]?.pricePerDay || []}
                      externalBookedDates={alreadyBookedDates}
                      startDate={startDate}
                      endDate={endDate}
                      setStartDate={setStartDate}
                      setEndDate={setEndDate}
                      // onDatesChange={handleDatesChange}
                    />
                    <div className=" flex justify-between items-center gap-x-2 w-full border-none">
                      <div className=" flex w-1/2 ml-4">
                        <Label className=" w-2/5 flex items-center">
                          Enter Price:{" "}
                        </Label>
                        <Input
                          type="number"
                          className="w-3/5"
                          ref={priceInputRef}
                        />
                      </div>
                      <Button
                        className=" p-2 bg-primary-6000 mr-4 cursor-pointer hover:bg-primary-700"
                        onClick={() => handleChangePrice(index)}
                      >
                        {loading ? "Updating..." : "Submit"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  const [isCalendarOpen, setIsCalendarOpen] = useState<boolean[]>(
    Array(property?.numberOfPortions).fill(false)
  );

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
      // console.log("bookings: ", bookings);
      return bookings;
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const fetchBookedDates = async (url: string) => {
    const airbnbBookings = await fetchAndParseICal(url);

    const eventsFromAirbnb: EventInterface[] = [];
    airbnbBookings?.forEach((event) => {
      const stdt = dateParser(event.startDate?.toLocaleString() || "");
      const nddt = dateParser(event.endDate?.toLocaleString() || "");

      const newObj: EventInterface = {
        start: stdt,
        end: nddt,
        title: "Booked",
        // bookedFrom: url.includes("airbnb") ? "Airbnb" : "Booking.com",
      };
      eventsFromAirbnb.push(newObj);
      setBookedDates(eventsFromAirbnb);

      //! adding events from airbnb to already booked dates
      eventsFromAirbnb.forEach((event) => {
        const newDates: Date[] = [];
        let currDt = new Date(event.start!);
        while (currDt < new Date(event.end!)) {
          newDates.push(currDt);
          currDt.setDate(currDt.getDate() + 1);
        }

        setAlreadyBookedDates((prev) => [...prev, ...newDates]);
      });
    });
  };

  const generateIcal = async () => {
    try {
      const response = await axios.post("/api/ical/createIcal", {
        propertyId: id,
      });
      console.log("response:: ", response);
      console.log("response: ", response.data);
    } catch (error: any) {
      console.log("error: ", error);
    }
  };

  const [clickedOnCopy, setClickedOnCopy] = useState(false);
  const handleClickedOnCopy = () => {
    setClickedOnCopy(true);
    setTimeout(() => {
      setClickedOnCopy(false);
    }, 1000);
  };

  return (
    <div className="max-w-6xl mx-auto p-2">
      <Toaster />
      <div className=" w-full md:flex md:justify-between">
        <div className=" w-full md:w-2/5 max-h-screen mt-2 overflow-auto overflow-x-hidden p-2">
          {/* {BlurFadeDemo(properties?.[0]?.propertyImages || [])} */}
          {BlurFadeDemo(allImages || [])}
        </div>
        <form
          onSubmit={handleSubmit}
          className=" md:w-3/5 border-white overflow-scroll overflow-x-hidden max-h-screen scroll-smooth relative mb-4 px-4 scrollbar-thin"
        >
          <div className="flex flex-col gap-x-2 gap-y-4 ">
            <div className="">
              <h1 className="text-base sm:text-lg md:text-3xl font-medium mt-2 inline-block border-b-2 border-dashed">
                Common Data
              </h1>
            </div>

            <div>
              <label className=" text-xl dark:text-white font-medium">
                Property Name
                <Input
                  type="text"
                  name="placeName"
                  value={commonFields?.propertyName ?? ""}
                  onChange={handleChange}
                />
              </label>
            </div>
            <div className=" flex justify-between">
              <div className=" w-2/5">
                <h1 className="text-xl dark:text-white font-medium">
                  Rental Type
                </h1>
                <select
                  name="rentalType"
                  id="rentalType"
                  defaultValue={commonFields?.rentalType || ""}
                  className=" dark:text-white border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg p-2 w-full"
                >
                  <option
                    defaultValue="Short Term"
                    className=" text-black dark:text-white dark:bg-neutral-800"
                  >
                    Short Term
                  </option>
                  <option
                    defaultValue="Long Term"
                    className=" text-black dark:text-white dark:bg-neutral-800"
                  >
                    Long Term
                  </option>
                </select>
              </div>
              <div className=" text-black w-2/5">
                <h1 className="text-xl dark:text-white font-medium">
                  Property Type
                </h1>
                <select
                  name="propertyType"
                  id="propertyType"
                  value={commonFields.propertyType ?? ""}
                  onChange={(e) => handleChange(e)}
                  className=" dark:text-white border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl w-full"
                >
                  <option defaultValue="" disabled>
                    Select an option
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Hotel"
                  >
                    Hotel
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Cottage"
                  >
                    Cottage
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Villa"
                  >
                    Villa
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Cabin"
                  >
                    Cabin
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Farm stay"
                  >
                    Farm stay
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Houseboat"
                  >
                    Houseboat
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Lighthouse"
                  >
                    Lighthouse
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Studio"
                  >
                    Studio
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Apartment"
                  >
                    Apartment
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Penthouse"
                  >
                    Penthouse
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Detached House"
                  >
                    Detached House
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Loft"
                  >
                    Loft
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Maisonette"
                  >
                    Maisonette
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Farmhouse"
                  >
                    Farmhouse
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Holiday Homes"
                  >
                    Holiday Homes
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Farmstay"
                  >
                    Farmstay
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Resort"
                  >
                    Resort
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Lodge"
                  >
                    Lodge
                  </option>
                  <option
                    className=" text-black dark:text-white dark:bg-neutral-800"
                    defaultValue="Apart Hotel"
                  >
                    Apart Hotel
                  </option>
                </select>
              </div>
            </div>

            <div>
              <label>
                <h1 className="text-xl dark:text-white font-medium">
                  Rental Form
                </h1>
                <Input
                  type="text"
                  name="rentalForm"
                  value={commonFields?.rentalForm ?? ""}
                  onChange={handleChange}
                  disabled
                />
              </label>
            </div>

            <div className=" flex justify-between">
              <div className=" w-2/5">
                <label className=" text-xl font-medium">
                  Country
                  <Input
                    type="text"
                    name="country"
                    value={commonFields?.country || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className=" w-2/5">
                <label>
                  <h1 className="text-xl dark:text-white font-medium">State</h1>
                  <Input
                    type="text"
                    name="state"
                    value={commonFields?.state || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className=" flex justify-between">
              <div className=" w-2/5">
                <label>
                  <h1 className="text-xl dark:text-white font-medium">City</h1>
                  <Input
                    type="text"
                    name="city"
                    value={commonFields?.city || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>

              <div className=" w-2/5">
                <label>
                  <h1 className="text-xl dark:text-white font-medium">
                    Street
                  </h1>
                  <Input
                    type="text"
                    name="street"
                    value={commonFields?.street || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div>
              <label>
                <h1 className="text-xl dark:text-white font-medium">
                  Postal Code
                </h1>
                <Input
                  type="text"
                  name="postalCode"
                  value={commonFields?.postalCode || ""}
                  onChange={handleChange}
                />
              </label>
            </div>

            <div className=" flex justify-between">
              <div className=" w-2/5">
                <label>
                  <h1 className="text-xl dark:text-white font-medium">
                    Pet Friendly
                  </h1>
                  <Input
                    type="text"
                    name="pet"
                    value={commonFields?.pet || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className=" w-2/5">
                <label>
                  <h1 className="text-xl dark:text-white font-medium">
                    Party Friendly
                  </h1>
                  <Input
                    type="text"
                    name="party"
                    value={commonFields?.party || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className=" flex justify-between">
              <div className=" w-2/5">
                <label>
                  <h1 className="text-xl dark:text-white font-medium">
                    Cooking
                  </h1>
                  <Input
                    type="text"
                    name="cooking"
                    value={commonFields?.cooking || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
              <div className=" w-2/5">
                <label>
                  <h1 className="text-xl dark:text-white font-medium">
                    Smoking
                  </h1>
                  <Input
                    type="text"
                    name="smoking"
                    value={commonFields?.smoking || ""}
                    onChange={handleChange}
                  />
                </label>
              </div>
            </div>

            <div className=" mt-4">
              <h1 className="text-base sm:text-lg md:text-3xl font-medium mt-2 inline-block border-b-2 border-dashed">
                Portion Specific Data
              </h1>
            </div>

            {properties?.map((item, index: number) => {
              return (
                <div className=" flex flex-col space-y-4 mt-4" key={index}>
                  <h1
                    className=" text-lg border rounded-xl hover:bg-black/60 border-neutral-600 p-2 font-medium dark:text-white text-black cursor-pointer inline-flex items-center space-x-2"
                    onClick={() =>
                      setIsPortionOpen((prev) => {
                        const newIsPortionOpen = [...prev];
                        newIsPortionOpen[index] = !newIsPortionOpen[index];
                        return newIsPortionOpen;
                      })
                    }
                  >
                    Portion {index + 1}{" "}
                    {isPortionOpen[index] ? (
                      <MdArrowDropDown />
                    ) : (
                      <MdArrowRight />
                    )}
                  </h1>
                  {isPortionOpen[index] && (
                    <div className=" flex flex-col space-y-4">
                      <div className=" w-full flex justify-between">
                        <label className=" w-2/6">
                          VSID
                          <Input
                            type="text"
                            name="VSID"
                            value={portionFields?.[index]?.VSID || ""}
                            onChange={handleChange}
                            disabled
                          />
                        </label>
                        <div className="">
                          <label htmlFor="">
                            Sync your Calendar with other Platforms
                          </label>
                          <div className=" flex gap-x-2">
                            <select
                              name="calendar"
                              id="calendar"
                              className="dark:text-white border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl p-2"
                              value={icalPlatform ?? "Booking"}
                              onChange={(e) => setIcalPlatform(e.target.value)}
                            >
                              <option
                                className=" bg-transparent dark:bg-transparent"
                                disabled
                              >
                                Select Platform
                              </option>
                              <option
                                className=" bg-transparent dark:bg-transparent"
                                defaultValue="Airbnb"
                              >
                                Airbnb
                              </option>
                            </select>
                            <Input
                              type="text"
                              name="icalLink"
                              className=" bg-transparent w-1/2"
                              ref={icalLinkRef}
                            />
                            <div className=" w-1/12 flex items-center justify-center cursor-pointer">
                              <FaCirclePlus
                                className=" h-6 w-6 cursor-pointer"
                                onClick={() => handleAddIcalLink(index)}
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      {portionFields?.[index]?.icalLinks && (
                        <div className=" my-1">
                          <p className=" text-base">Added Ical Links</p>
                          {Object.keys(
                            portionFields?.[index]?.icalLinks ?? {}
                          )?.map((platform, icalIndex) => (
                            <p key={icalIndex}>
                              {platform} -{" "}
                              {
                                (
                                  portionFields?.[index]?.icalLinks as {
                                    [key: string]: string;
                                  }
                                )?.[platform]
                              }
                            </p>
                          ))}
                        </div>
                      )}

                      <div className="w-full">
                        <label htmlFor="portionName" className=" w-full">
                          Portion&apos;s Name
                          <div className=" flex w-full justify-between items-center">
                            <Input
                              type="text"
                              name="cooking"
                              value={portionFields?.[index]?.placeName || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.placeName = e.target.value;
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                              className="w-8/10"
                            />
                            <div className=" w-2/10 p-3">
                              <FaCalendarAlt
                                className=" w-6 h-6 cursor-pointer"
                                onClick={() => {
                                  setIsCalendarOpen((prev) => {
                                    const newState = [...prev];
                                    newState[index] = true;
                                    return newState;
                                  });
                                }}
                              />
                            </div>
                          </div>
                        </label>
                      </div>
                      {isCalendarOpen[index] && modalCalendar(index)}

                      <div className=" flex space-x-4 justify-between">
                        <div>
                          <label htmlFor="portionSize">
                            Portion&apos;s Size
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="portionSize"
                              value={portionFields?.[index]?.size || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.size = parseInt(e.target.value);
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label htmlFor="guests">
                            Number Of Guests
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="guests"
                              value={portionFields?.[index]?.guests || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.guests = parseInt(
                                  e.target.value
                                );
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label htmlFor="bedrooms">
                            Number Of Bedrooms
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="bedrooms"
                              value={portionFields?.[index]?.bedrooms || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.bedrooms = parseInt(
                                  e.target.value
                                );
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className=" flex space-x-4 justify-between">
                        <div>
                          <label htmlFor="beds">
                            Number Of Beds
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="beds"
                              value={portionFields?.[index]?.beds || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.beds = parseInt(e.target.value);
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label htmlFor="bathroom">
                            Number Of Bathrooms
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="bathroom"
                              value={portionFields?.[index]?.bathroom || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.bathroom = parseInt(
                                  e.target.value
                                );
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label htmlFor="kitchen">
                            Number Of Kitchen
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="kitchen"
                              value={portionFields?.[index]?.kitchen || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.kitchen = parseInt(
                                  e.target.value
                                );
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className=" flex space-x-4 justify-between">
                        <div>
                          <label htmlFor="childrenAge">
                            Children&apos;s Age
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="childrenAge"
                              value={portionFields?.[index]?.childrenAge || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.childrenAge = parseInt(
                                  e.target.value
                                );
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label htmlFor="basePrice">
                            Base Price Of Portion {index + 1}
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="basePrice"
                              value={portionFields?.[index]?.basePrice || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.basePrice = parseInt(
                                  e.target.value
                                );
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>

                        <div>
                          <label htmlFor="weekendPrice">
                            Weekend Price {index + 1}
                            <Input
                              className=" bg-transparent w-full rounded-2xl"
                              type="number"
                              name="weekendPrice"
                              value={portionFields?.[index]?.weekendPrice || ""}
                              onChange={(e) => {
                                const newPortionData = {
                                  ...portionFields?.[index],
                                };
                                newPortionData.weekendPrice = parseInt(
                                  e.target.value
                                );
                                setPortionFields((prev) => {
                                  const newPortionArray = [...prev];
                                  newPortionArray[index] = newPortionData;
                                  return newPortionArray;
                                });
                              }}
                            />
                          </label>
                        </div>
                      </div>

                      <div className=" w-full flex justify-between mt-4 gap-x-2 items-center ">
                        <p className=" whitespace-nowrap text-base flex justify-center items-center">
                          Your Ical Link{" "}
                        </p>
                        <Input
                          type="text"
                          disabled
                          defaultValue={`https://vacationsaga.com/api/ical/${properties[index]._id}`}
                          className=" w-4/6"
                        />
                        <div className=" flex flex-col items-center box-border relative">
                          <div
                            onClick={() => {
                              navigator.clipboard
                                .writeText(
                                  `https://vacationsaga.com/api/ical/${properties[index]._id}`
                                )
                                .then(() => {
                                  handleClickedOnCopy();
                                });
                            }}
                            className=" cursor-pointer rounded-lg p-3 bg-slate-700 hover:bg-slate-800"
                          >
                            <FaCopy className=" font-semibold text-lg hover:scale-110" />
                          </div>
                          <p
                            className={` text-xs text-neutral-500 whitespace-nowrap mt-1 ${
                              clickedOnCopy
                                ? "visible absolute top-10"
                                : "hidden"
                            }`}
                          >
                            Copied!
                          </p>
                        </div>
                      </div>

                      <div className=" flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 items-center">
                        {" "}
                        <h2 className=" text-xl font-medium dark:text-white">
                          Instant Booking :{" "}
                        </h2>
                        <div>
                          <div
                            className=" border-2 border-neutral-800 dark:border-white rounded-3xl w-20 h-10 p-1 flex items-center cursor-pointer relative text-white dark:bg-slate-900"
                            onClick={() => {
                              const newPortionData = {
                                ...portionFields?.[index],
                              };
                              newPortionData.isInstantBooking =
                                !newPortionData.isInstantBooking;
                              setPortionFields((prev) => {
                                const newPortionArray = [...prev];
                                newPortionArray[index] = newPortionData;
                                return newPortionArray;
                              });
                            }}
                          >
                            <div
                              className={` absolute rounded-full w-8 h-8 bg-green-600 font-semibold text-xs flex justify-center items-center transition-all duration-700 ease-in-out transform ${
                                portionFields?.[index]?.isInstantBooking
                                  ? "translate-x-9 scale-100 opacity-100"
                                  : " scale-50 opacity-0"
                              }`}
                            >
                              ON
                            </div>
                            {/* ) : ( */}
                            <div
                              className={` absolute rounded-full w-8 h-8 bg-red-600 font-semibold text-xs flex justify-center items-center transition-all duration-700 ease-in-out transform ${
                                portionFields?.[index]?.isInstantBooking
                                  ? " scale-50 opacity-0"
                                  : " scale-100 opacity-100"
                              }`}
                            >
                              OFF
                            </div>
                            {/* )} */}
                          </div>
                        </div>
                        <p>
                          Instant Booking is{" "}
                          {portionFields?.[index]?.isInstantBooking
                            ? "ON"
                            : "OFF"}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className=" w-full flex justify-center">
              <ButtonPrimary type="submit">
                <p>
                  {loading ? (
                    <span className=" flex gap-x-2 items-center">
                      Saving... <LuLoader2 className=" animate-spin" />
                    </span>
                  ) : (
                    "Save Changes"
                  )}
                </p>
              </ButtonPrimary>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPropertyPage;
