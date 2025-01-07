"use client";
import { useState, useEffect, FormEvent, useRef, Fragment } from "react";
import axios from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/shared/Input";
import { Properties } from "../page";
import { MdArrowDropDown, MdArrowRight } from "react-icons/md";
import { toast, Toaster } from "sonner";
import Button from "@/shared/Button";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/solid";
import { FaCirclePlus } from "react-icons/fa6";
import Label from "@/components/Label";
import { FaCalendarAlt } from "react-icons/fa";
import { Dialog, Transition } from "@headlessui/react";
import ButtonClose from "@/shared/ButtonClose";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import { addDays } from "date-fns";
import StayDatesRangeInput from "../(client-components)/(HeroSearchForm2Mobile)/DatesRangeInput";
import dateParser from "@/helper/dateParser";
import CustomDateRangePrice from "@/components/CustomDateRangePrice";
import BarLoader from "@/components/BarLoader";
import ButtonPrimary from "@/shared/ButtonPrimary";

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

const EditPropertyPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");
  const { user } = useAuth();
  const [property, setProperty] = useState<Properties | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [numberOfPortions, setNumberOfPortions] = useState<number>(1);
  const [refreshState, setRefreshState] = useState<boolean>(false);
  const [instantBookingToggle, setInstantBookingToggle] = useState(false);

  useEffect(() => {
    const canAccess = searchParams.get("canAccess");
    if (!canAccess) {
      router.push("/");
    }
  }, []);

  useEffect(() => {
    if (id && user?._id) {
      const fetchProperty = async () => {
        try {
          const response = await axios.post("/api/user/fetchpropertybyuserid", {
            userId: user._id,
          });
          // console.log(response.data);
          const fetchedProperty = response.data.properties.find(
            (prop: Properties) => prop._id === id
          );
          setProperty(fetchedProperty || null);
          setNumberOfPortions(fetchedProperty?.numberOfPortions || 1);
        } catch (error) {
          console.error("Error fetching property:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchProperty();
    }
  }, [id, user?._id, refreshState]);

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
      setInstantBookingToggle(property?.isInstantBooking || false);
      const url = (property.icalLinks as { [key: string]: string })?.[
        "Airbnb"
      ] as string;
      console.log("url: ", url);
      fetchBookedDates(url);
    }
  }, [property]);

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    const trimmedValue = value.trim();
    setFormData((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : trimmedValue,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!user) {
      console.error("User not authenticated");
      return;
    }
    try {
      await axios.post("/api/user/edituserproperty", {
        propertyId: id,
        updatedData: formData,
        userId: user._id,
      });
      // router.push("/author");
      // alert("Property updated successfully");
      toast.success("Property updated successfully");
      setTimeout(() => {
        router.push("/author"); // Redirect to the Author page or wherever you want
      }, 2000);
    } catch (error) {
      console.error("Error updating property:", error);
    }
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
  const handleAddIcalLink = () => {
    if (icalLinkRef.current?.value == "") return;
    const newObj = {
      [icalPlatform]: icalLinkRef.current?.value,
    };
    setFormData((prevState) => ({
      ...prevState,
      icalLinks: { ...(prevState.icalLinks || {}), ...newObj },
    }));
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
        propertyId: id,
        portion: portionIndex,
        price: priceInputRef.current?.value,
        dateRange: date,
      });
      console.log(response);
    } catch (err: any) {
      console.log("error: ", err);
    }
    setRefreshState((prev) => !prev);
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
                  <div className=" px-8 py-4 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
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
                    {loading && <BarLoader />}
                    <CustomDateRangePrice
                      pId={property?._id ?? ""}
                      className="flex-1"
                      prices={property?.pricePerDay?.[index] || []}
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
                        Submit
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
    // const airbnbBookings = await fetchAndParseICal(
    //   (formData?.icalLinks as { Airbnb: string })?.["Airbnb"] || ""
    // );
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

  return (
    <div className="max-w-6xl mx-auto ">
      <Toaster />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-x-2 gap-y-4 mt-4">
          <div className="text-xl dark:text-white font-medium sm:flex justify-between">
            <label className=" w-2/6">
              VSID
              <Input
                type="text"
                name="VSID"
                value={formData?.VSID || ""}
                onChange={handleChange}
                disabled
              />
            </label>
            <div className=" w-3/5">
              <label htmlFor="">Sync your Calendar with other Platforms</label>
              <div className=" flex gap-x-2">
                <select
                  name="calendar"
                  id="calendar"
                  className="dark:text-white border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-2xl p-2"
                  onChange={(e) => setIcalPlatform(e.target.value)}
                  value={icalPlatform}
                >
                  <option
                    className=" bg-transparent dark:bg-transparent"
                    disabled
                  >
                    Select Platform
                  </option>
                  <option
                    className=" bg-transparent dark:bg-transparent"
                    value="Airbnb"
                  >
                    Airbnb
                  </option>
                  {/* <option
                    className=" bg-transparent dark:bg-transparent"
                    value="Booking"
                  >
                    Booking.com
                  </option> */}
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
                    onClick={handleAddIcalLink}
                  />
                </div>
              </div>
            </div>
          </div>
          {formData?.icalLinks && (
            <h1 className="text-xl font-medium bg-background">Ical links</h1>
          )}
          {formData?.icalLinks &&
            Object.entries(formData?.icalLinks)?.map(([key, value]) => (
              <div key={key} className="flex items-center justify-around">
                <Label className=" w-2/12  text-lg font-semibold ml-1 p-2">
                  {key}
                </Label>
                <Input
                  type="text"
                  value={value || ""}
                  className=" w-9/12 p-2 text-base bg-background border rounded-xl disabled:cursor-not-allowed"
                  disabled
                />

                <div className=" w-1/12 flex justify-center">
                  <TrashIcon
                    className=" w-6 h-6 cursor-pointer"
                    onClick={() => handleRemoveIcalLink(key)}
                  />
                </div>
              </div>
            ))}
          <div className=" flex flex-col sm:flex-row gap-y-2 sm:gap-x-4 items-center">
            {" "}
            <h2 className=" text-xl font-medium dark:text-white">
              Instant Booking :{" "}
            </h2>
            <div>
              <div
                className=" border-2 border-neutral-800 dark:border-white rounded-3xl w-20 h-10 p-1 flex items-center cursor-pointer relative text-white dark:bg-slate-900"
                onClick={() => {
                  setFormData((prev) => {
                    const newFormData = { ...prev };
                    newFormData.isInstantBooking = !instantBookingToggle;
                    return newFormData;
                  });
                  setInstantBookingToggle((prev) => !prev);
                }}
              >
                {/* {instantBookingToggle ? ( */}
                <div
                  className={` absolute rounded-full w-8 h-8 bg-green-600 font-semibold text-xs flex justify-center items-center transition-all duration-700 ease-in-out transform ${
                    instantBookingToggle
                      ? "translate-x-9 scale-100 opacity-100"
                      : " scale-50 opacity-0"
                  }`}
                >
                  ON
                </div>
                {/* ) : ( */}
                <div
                  className={` absolute rounded-full w-8 h-8 bg-red-600 font-semibold text-xs flex justify-center items-center transition-all duration-700 ease-in-out transform ${
                    instantBookingToggle
                      ? " scale-50 opacity-0"
                      : " scale-100 opacity-100"
                  }`}
                >
                  OFF
                </div>
                {/* )} */}
              </div>
            </div>
            <p>Instant Booking is {instantBookingToggle ? "ON" : "OFF"}</p>
          </div>
          <div className=" text-black">
            <h1 className="text-xl dark:text-white font-medium">
              Property Type
            </h1>
            <select
              name="propertyType"
              id="propertyType"
              // value={selectedPropertyType}
              value={formData.propertyType}
              // onChange={(e) => setSelectedPropertyType(e.target.value)}
              onChange={(e) => handleChange(e)}
              className=" dark:text-white border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg p-2 w-full"
            >
              <option value="" disabled>
                Select an option
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Hotel"
              >
                Hotel
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Cottage"
              >
                Cottage
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Villa"
              >
                Villa
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Cabin"
              >
                Cabin
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Farm stay"
              >
                Farm stay
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Houseboat"
              >
                Houseboat
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Lighthouse"
              >
                Lighthouse
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Studio"
              >
                Studio
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Apartment"
              >
                Apartment
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Penthouse"
              >
                Penthouse
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Detached House"
              >
                Detached House
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Loft"
              >
                Loft
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Maisonette"
              >
                Maisonette
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Farmhouse"
              >
                Farmhouse
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Holiday Homes"
              >
                Holiday Homes
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Farmstay"
              >
                Farmstay
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Resort"
              >
                Resort
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Lodge"
              >
                Lodge
              </option>
              <option
                className=" text-black dark:text-white dark:bg-neutral-800"
                value="Apart Hotel"
              >
                Apart Hotel
              </option>
            </select>
          </div>
          <div>
            <label className=" text-xl dark:text-white font-medium">
              Place Name
              <Input
                type="text"
                name="placeName"
                value={formData?.placeName || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">
                Rental Form
              </h1>
              <Input
                type="text"
                name="rentalForm"
                value={formData?.rentalForm || ""}
                onChange={handleChange}
                disabled
              />
            </label>
          </div>
          <div>
            <h1 className="text-xl dark:text-white font-medium">
              Property Type
            </h1>
            <select
              name="rentalType"
              id="rentalType"
              value={formData.rentalType}
              className=" dark:text-white border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 rounded-lg p-2 w-full"
            >
              <option
                value="Short Term"
                className=" text-black dark:text-white dark:bg-neutral-800"
              >
                Short Term
              </option>
              <option
                value="Long Term"
                className=" text-black dark:text-white dark:bg-neutral-800"
              >
                Long Term
              </option>
            </select>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">
                Postal Code
              </h1>
              <Input
                type="text"
                name="postalCode"
                value={formData?.postalCode || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">City</h1>
              <Input
                type="text"
                name="city"
                value={formData?.city || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">State</h1>
              <Input
                type="text"
                name="state"
                value={formData?.state || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              Country
              <Input
                type="text"
                name="country"
                value={formData?.country || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">Street</h1>
              <Input
                type="text"
                name="street"
                value={formData?.street || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">
                Pet Friendly
              </h1>
              <Input
                type="text"
                name="pet"
                value={formData?.pet || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">
                Party Friendly
              </h1>
              <Input
                type="text"
                name="party"
                value={formData?.party || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">Cooking</h1>
              <Input
                type="text"
                name="cooking"
                value={formData?.cooking || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          <div>
            <label>
              <h1 className="text-xl dark:text-white font-medium">Smoking</h1>
              <Input
                type="text"
                name="smoking"
                value={formData?.smoking || ""}
                onChange={handleChange}
              />
            </label>
          </div>
          {/* <div>
            <label className=" text-xl flex items-center">
              <h1 className="text-xl dark:text-white font-medium">Is Live</h1>
              <input
                type="checkbox"
                name="isLive"
                checked={formData.isLive || false}
                onChange={handleChange}
                className="p-2 rounded-md mx-2 cursor-pointer"
              />
            </label>
          </div> */}
          {Array.from({
            // length: numberOfPortions > 1 ? numberOfPortions : 0,
            length: numberOfPortions,
          }).map((item, index) => {
            return (
              <div className=" flex  flex-col space-y-4 my-4" key={index}>
                <h1
                  className=" text-lg border rounded-xl hover:bg-white/30 border-neutral-600  p-2 font-medium dark:text-white text-black cursor-pointer inline-flex items-center space-x-2"
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
                    <div className="w-full">
                      <label htmlFor="portionName" className=" w-full">
                        Portion&apos;s Name
                        <div className=" flex w-full justify-between items-center">
                          <Input
                            type="text"
                            name="cooking"
                            value={formData?.portionName?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.portionName?.splice(
                                index,
                                1,
                                e.target.value
                              );
                              setFormData(newFormData);
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

                    <div className=" flex space-x-4">
                      <div>
                        <label htmlFor="portionSize">
                          Portion&apos;s Size
                          <Input
                            className=" bg-transparent w-full rounded-2xl"
                            type="number"
                            name="portionSize"
                            value={formData?.portionSize?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.portionSize?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
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
                            value={formData?.guests?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.guests?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
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
                            value={formData?.bedrooms?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.bedrooms?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
                            }}
                          />
                        </label>
                      </div>

                      <div>
                        <label htmlFor="beds">
                          Number Of Beds
                          <Input
                            className=" bg-transparent w-full rounded-2xl"
                            type="number"
                            name="beds"
                            value={formData?.beds?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.beds?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
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
                            value={formData?.bathroom?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.bathroom?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
                            }}
                          />
                        </label>
                      </div>
                    </div>

                    <div className=" flex space-x-4">
                      <div>
                        <label htmlFor="kitchen">
                          Number Of Kitchen
                          <Input
                            className=" bg-transparent w-full rounded-2xl"
                            type="number"
                            name="kitchen"
                            value={formData?.kitchen?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.kitchen?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
                            }}
                          />
                        </label>
                      </div>

                      <div>
                        <label htmlFor="childrenAge">
                          Children&apos;s Age
                          <Input
                            className=" bg-transparent w-full rounded-2xl"
                            type="number"
                            name="childrenAge"
                            value={formData?.childrenAge?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.childrenAge?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
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
                            value={formData?.basePrice?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.basePrice?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
                            }}
                          />
                        </label>
                      </div>
                      <div>
                        <label htmlFor="weekendPrice">
                          Weekend Price Of Portion {index + 1}
                          <Input
                            className=" bg-transparent w-full rounded-2xl"
                            type="number"
                            name="weekendPrice"
                            value={formData?.weekendPrice?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.weekendPrice?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
                            }}
                          />
                        </label>
                      </div>

                      <div>
                        <label htmlFor="monthlyDiscount">
                          Monthly Discount For Portion {index + 1}
                          <Input
                            className=" bg-transparent w-full rounded-2xl"
                            type="number"
                            name="monthlyDiscount"
                            value={formData?.monthlyDiscount?.at(index) || ""}
                            onChange={(e) => {
                              const newFormData = { ...formData };
                              newFormData?.monthlyDiscount?.splice(
                                index,
                                1,
                                parseInt(e.target.value)
                              );
                              setFormData(newFormData);
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
        <div className=" w-full flex justify-between mt-4 gap-x-2 items-center">
          <p className=" text-nowrap w-1/6">Your Ical Link: </p>
          <Input
            type="text"
            disabled
            value={`https://vacationsaga.com/api/ical/${id}`}
            className=" w-4/6"
          />
          <div
            // onClick={generateIcal}
            onClick={() => {
              navigator.clipboard.writeText(
                `https://vacationsaga.com/api/ical/${id}`
              );
            }}
            className=" w-1/6 bg-primary-6000 hover:bg-primary-700 rounded-3xl px-2 py-3 cursor-pointer font-medium flex justify-center"
          >
            Copy Link
          </div>
        </div>

        <div className=" flex justify-center my-4">
          <button
            type="submit"
            className=" p-4 rounded-3xl items-center disabled:bg-opacity-70 bg-primary-6000 hover:bg-primary-700 text-neutral-50"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPropertyPage;
