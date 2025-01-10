"use client";

import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";
import { format } from "date-fns";
import { BsPencilSquare } from "react-icons/bs";
import { IoHomeOutline } from "react-icons/io5";
import { HiPencilSquare } from "react-icons/hi2";
import { FaRegCalendarAlt } from "react-icons/fa";
import { FaRegSquarePlus } from "react-icons/fa6";
import { MdCastForEducation } from "react-icons/md";
import React, { FC, Fragment, useEffect, useState } from "react";

import { Tab } from "@headlessui/react";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/AuthStore";
import ButtonPrimary from "@/shared/ButtonPrimary";
import PropertyCard from "@/components/PropertyCard";
import { PropertiesDataType, PropertyDataType } from "@/data/types";

export interface AuthorPageProps {}

interface CommonPropertyDataType {
  _id: string;
  commonId: string;
  commonProperties: PropertiesDataType[];
}

const AuthorPage: FC<AuthorPageProps> = ({}) => {
  const imgUrl = "https://vacationsaga.b-cdn.net/avatar.png";

  const { user, logout } = useAuth();
  const { token, clearToken } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [properties, setProperties] = useState<CommonPropertyDataType[]>([]);
  const [selectedRentalType, setSelectedRentalType] =
    useState<string>("Short Term");
  const [filteredProperties, setFilteredProperties] =
    useState<PropertiesDataType[]>();

  const fetchProperties = async () => {
    if (token?._id) {
      setLoading(true);
      try {
        const response = await axios.post(
          "/api/newProperties/getPropertyByUserEmail",
          { userId: token._id, userEmail: token.email }
        );
        setProperties(response.data.properties);
      } catch (error) {
        toast.error("Failed to fetch properties");
      } finally {
        setLoading(false);
      }
    }
  };

  const filterOutProperties = () => {
    const newPropertiesArray: PropertiesDataType[] = [];
    const intermediateFilteredProperties = properties?.filter(
      (property) =>
        property.commonProperties?.[0]?.rentalType === selectedRentalType
    );
    intermediateFilteredProperties?.forEach((property) => {
      newPropertiesArray.push(property.commonProperties?.[0]);
    });
    setFilteredProperties(newPropertiesArray);
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";
    return format(date, "yyyy");
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    filterOutProperties();
  }, [properties, selectedRentalType]);

  const renderSidebar = () => {
    return (
      <>
        <div className=" w-full flex flex-col items-center text-center sm:rounded-2xl sm:border border-neutral-200 dark:border-neutral-700 space-y-6 sm:space-y-7 px-0 sm:p-6 xl:p-8">
          {loading ? (
            <div className="w-28 h-28 rounded-full animate-pulse bg-primary-50 object-cover"></div>
          ) : (
            <img
              src={user?.profilePic || imgUrl}
              alt="profilePic"
              className="w-28 h-28 rounded-full object-cover"
            />
          )}
          <div className="space-y-3 text-center flex flex-col items-center">
            <h2 className="text-3xl font-semibold">
              <span className="text-neutral-6000 dark:text-neutral-300">
                {loading ? (
                  <div className="w-56 h-10 bg-primary-50 rounded-lg animate-pulse"></div>
                ) : (
                  <div>{user?.name || "Notfound"}</div>
                )}
              </span>
            </h2>
            {/* <StartRating className="!text-base" /> */}
          </div>
          <div className="border-b border-neutral-200 dark:border-neutral-700 w-14"></div>
          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <IoHomeOutline className="text-neutral-400 text-xl" />
              <span className="text-neutral-6000 dark:text-neutral-300">
                {loading ? (
                  <div className="w-56 h-5 bg-primary-50 rounded-lg animate-pulse"></div>
                ) : (
                  <div>{user?.address || "Notfound"}</div>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <MdCastForEducation className="text-neutral-400 text-xl" />
              <span className="text-neutral-6000 dark:text-neutral-300">
                {loading ? (
                  <div className="w-56 h-5 bg-primary-50 rounded-lg animate-pulse"></div>
                ) : (
                  <div>{user?.spokenLanguage || "Notfound"}</div>
                )}
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <FaRegCalendarAlt className="text-neutral-400 text-xl" />
              <span className="text-neutral-6000 dark:text-neutral-300">
                {loading ? (
                  <div className="w-56 h-5 bg-primary-50 rounded-lg animate-pulse"></div>
                ) : (
                  <div>
                    {formatDate(user?.createdAt)
                      ? `Joined in ${formatDate(user?.createdAt)}`
                      : "Not Found"}
                  </div>
                )}
              </span>
            </div>
          </div>
          <div className=" flex justify-between items-center w-full px-4">
            <Link href="/account">
              <ButtonPrimary>
                <div className="flex items-center gap-x-1">
                  Edit <HiPencilSquare />
                </div>
              </ButtonPrimary>
            </Link>
            <ButtonPrimary
              onClick={() => {
                clearToken();
                logout();
              }}
            >
              Logout
            </ButtonPrimary>
          </div>
        </div>
      </>
    );
  };

  const renderSection1 = () => {
    return (
      <div className="listingSection__wrap">
        <div>
          <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
            {loading ? (
              <div className="w-80 h-7 bg-primary-50 rounded-lg animate-pulse"></div>
            ) : (
              <h2 className="text-2xl font-semibold">
                {`${token?.name} Properties ` || "Not Found"}
              </h2>
            )}
          </span>
        </div>

        <div>
          <Tab.Group
            onChange={(index) =>
              setSelectedRentalType(["Short Term", "Long Term"][index])
            }
          >
            <Tab.List className="flex space-x-1 overflow-x-auto ">
              {["Short Term", "Long Term"].map((item, index) => (
                <Tab key={index} as={Fragment}>
                  {({ selected }) => (
                    <button
                      className={`flex-shrink-0 block !leading-none font-medium px-5 py-2.5 text-sm sm:text-base sm:px-6 sm:py-3 capitalize rounded-full focus:outline-none ${
                        selected
                          ? "bg-secondary-900 text-secondary-50 "
                          : "text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                      } `}
                    >
                      {item}
                    </button>
                  )}
                </Tab>
              ))}
            </Tab.List>
            <Tab.Panels>
              {/* First Tab Panel: Short Term */}
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {loading ? (
                    [0, 1, 2, 3].map((n) => (
                      <div key={n}>
                        <div className="flex flex-col gap-y-2">
                          <div
                            key={n}
                            className="w-full h-64 bg-primary-50 rounded-lg animate-pulse"
                          ></div>
                          <div className="w-56 rounded-lg h-3 bg-slate-300 animate-pulse mt-2"></div>
                          <div className="w-40 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                          <div className="flex items-center justify-between">
                            <div className="w-32 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                            <div className="w-10 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className=" flex flex-col h-60 border border-neutral-700 rounded-lg justify-center items-center gap-y-2">
                        <Link href={"/add-listing/1"} target="_blank">
                          <FaRegSquarePlus className=" text-7xl text-neutral-600 hover:text-primary-6000 cursor-pointer" />
                        </Link>
                        <p className=" text-neutral-600 text-lg ">
                          Add Short Term Properties
                        </p>
                      </div>
                      {filteredProperties?.map((item, index: number) => (
                        <div key={index}>
                          <Link
                            className=" text-primary-6000 "
                            href={{
                              pathname: `/editproperty/${item._id}/${item.commonId}`,
                              query: { canAccess: true },
                            }}
                          >
                            <PropertyCard
                              key={item._id}
                              data={{
                                _id: item._id,
                                basePrice: [item.basePrice],
                                VSID: item.VSID,
                                postalCode: item.postalCode,
                                city: item.city,
                                country: item.country,
                                propertyType: item.propertyType,
                                beds: [item.beds],
                                propertyCoverFileUrl: item.propertyCoverFileUrl,
                                propertyPictureUrls: item.propertyPictureUrls,
                              }}
                            />
                            <BsPencilSquare className="  text-primary-6000 mt-2 text-xl rounded-lg" />
                          </Link>
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </Tab.Panel>
              <Tab.Panel className="">
                <div className="mt-8 grid grid-cols-1 gap-6 md:gap-7 sm:grid-cols-2">
                  {loading ? (
                    [0, 1, 2, 3].map((n) => (
                      <div key={n}>
                        <div className="flex flex-col gap-y-2">
                          <div
                            key={n}
                            className="w-full h-64 bg-primary-50 rounded-lg animate-pulse"
                          ></div>
                          <div className="w-56 rounded-lg h-3 bg-slate-300 animate-pulse mt-2"></div>
                          <div className="w-40 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                          <div className="flex items-center justify-between">
                            <div className="w-32 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                            <div className="w-10 rounded-lg h-3 bg-slate-300 animate-pulse mt-1"></div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className=" flex flex-col h-80 border border-neutral-700 rounded-lg justify-center items-center gap-y-2">
                        <Link href={"/add-listing/1"} target="_blank">
                          <FaRegSquarePlus className=" text-7xl text-neutral-600 hover:text-primary-6000 cursor-pointer" />
                        </Link>
                        <p className=" text-neutral-600 text-lg ">
                          Add Long Term Properties
                        </p>
                      </div>
                      {filteredProperties?.map((item, index) => (
                        <>
                          <Link
                            className="text-primary-6000 "
                            href={{
                              pathname: `/editproperty/${item._id}/${item.commonId}`,
                              query: { canAccess: true },
                            }}
                            key={index}
                          >
                            <PropertyCard
                              key={item._id}
                              data={{
                                _id: item._id,
                                basePrice: [item.basePrice],
                                VSID: item.VSID,
                                postalCode: item.postalCode,
                                city: item.city,
                                country: item.country,
                                propertyType: item.propertyType,
                                beds: [item.beds],
                                propertyCoverFileUrl: item.propertyCoverFileUrl,
                                propertyPictureUrls: item.propertyPictureUrls,
                              }}
                            />
                            <BsPencilSquare className="  text-primary-6000 mt-2 text-xl rounded-lg" />
                          </Link>
                        </>
                      ))}
                    </>
                  )}
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    );
  };

  return (
    <div className={`nc-AuthorPage `}>
      <main className="container mt-12 mb-24 lg:mb-32 flex flex-col lg:flex-row">
        <div className="block flex-grow mb-24 lg:mb-0">
          <div className="lg:sticky lg:top-24">{renderSidebar()}</div>
        </div>
        <div className="w-full lg:w-3/5 xl:w-2/3 space-y-8 lg:space-y-10 lg:pl-10 flex-shrink-0">
          {renderSection1()}
        </div>
      </main>
    </div>
  );
};

export default AuthorPage;
