"use client";

import { useAuth } from "@/hooks/useAuth";
import React, { FC, useEffect, useRef, useState } from "react";
import Logo from "@/shared/Logo";
import useOutsideAlerter from "@/hooks/useOutsideAlerter";
import MenuBar from "@/shared/MenuBar";
import { SearchTab } from "../(HeroSearchForm)/HeroSearchForm";
import Link from "next/link";
import { usePathname } from "next/navigation";
import HeroSearchFormSmall from "../(HeroSearchFormSmall)/HeroSearchFormSmall";
import { StaySearchFormFields } from "../type";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { IoExitOutline } from "react-icons/io5";
import StaySearchForm from "../(HeroSearchFormSmall)/(stay-search-form)/StaySearchForm";
import LocationInput from "../(HeroSearchForm)/LocationInput";
import StayDatesRangeInput from "../(HeroSearchForm)/(stay-search-form)/StayDatesRangeInput";
import GuestsInput from "../(HeroSearchForm)/GuestsInput";
import { SearchInputProvider } from "@/context/SearchInput";

interface Header3Props {
  className?: string;
}

let WIN_PREV_POSITION = 0;

const Header3: FC<Header3Props> = ({ className = "" }) => {
  const headerInnerRef = useRef<HTMLDivElement>(null);
  const [showHeroSearch, setShowHeroSearch] =
    useState<StaySearchFormFields | null>(null);
  const [currentTab, setCurrentTab] = useState<SearchTab>("Short Term Rentals");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const loginRef = useRef<HTMLDivElement>(null);
  const [token, setToken] = useState<string>("");

  useOutsideAlerter(headerInnerRef, () => {
    setShowHeroSearch(null);
    setCurrentTab("Short Term Rentals");
  });

  const pathname = usePathname();

  useEffect(() => {
    setShowHeroSearch(null);
  }, [pathname]);

  // Fetch token on client side only
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token") || "");
      WIN_PREV_POSITION = window.pageYOffset;
    }
  }, []);

  // Hide search form on scroll
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        const currentScrollPos = window.pageYOffset;
        if (Math.abs(WIN_PREV_POSITION - currentScrollPos) > 100) {
          setShowHeroSearch(null);
          WIN_PREV_POSITION = currentScrollPos;
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const { isLoggedIn, logout } = useAuth();

  useEffect(() => {
    if (isLoggedIn) setIsSignedIn(true);
  }, [isLoggedIn]);

  const handleShowLogin = (event: MouseEvent) => {
    if (loginRef.current && !loginRef.current.contains(event.target as Node)) {
      setShowLogin(false);
    }
  };

  useEffect(() => {
    if (showLogin) {
      window.addEventListener("mousedown", handleShowLogin);
    } else {
      window.removeEventListener("mousedown", handleShowLogin);
    }
  }, [showLogin]);

  const renderHeroSearch = () => (
    <div
      className={`absolute inset-x-0 top-0 transition-all ${
        showHeroSearch
          ? "visible"
          : "-translate-x-0 -translate-y-[90px] scale-x-[0.395] scale-y-[0.6] opacity-0 invisible pointer-events-none"
      }`}
    >
      <div className="w-full max-w-4xl mx-auto pb-6">
        <HeroSearchFormSmall
          defaultFieldFocus={showHeroSearch || undefined}
          onTabChange={setCurrentTab}
          defaultTab={currentTab}
        />
      </div>
    </div>
  );

  const renderButtonOpenHeroSearch = () => (
    <div
      className={`w-full relative flex items-center justify-between border border-neutral-200 dark:border-neutral-6000 rounded-full shadow hover:shadow-md transition-all ${
        showHeroSearch
          ? "-translate-x-0 translate-y-20 scale-x-[2.55] scale-y-[1.8] opacity-0 pointer-events-none invisible"
          : "visible"
      }`}
    >
      <div className="flex items-center font-medium text-sm">
        <span
          onClick={() => setShowHeroSearch("location")}
          className="block pl-5 pr-4 cursor-pointer py-3"
        >
          Location
        </span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span
          onClick={() => setShowHeroSearch("dates")}
          className="block px-4 cursor-pointer py-3"
        >
          Check In
        </span>
        <span className="h-5 w-[1px] bg-neutral-300 dark:bg-neutral-700"></span>
        <span
          onClick={() => setShowHeroSearch("guests")}
          className="block px-4 cursor-pointer font-normal py-3"
        >
          Add guests
        </span>
      </div>

      <div
        className="flex-shrink-0 ml-auto pr-2 cursor-pointer"
        onClick={() => setShowHeroSearch("location")}
      >
        <span className="w-8 h-8 flex items-center justify-center rounded-full bg-primary-6000 text-white">
          <MagnifyingGlassIcon className="w-5 h-5" />
        </span>
      </div>
    </div>
  );

  return (
    <>
      <div
        className={`nc-Header nc-Header-3 fixed z-40 top-0 inset-0 bg-black/30 dark:bg-black/50 transition-opacity ${
          showHeroSearch ? "visible" : "invisible opacity-0 pointer-events-none"
        }`}
      ></div>
      {showHeroSearch && <div id="nc-Header-3-anchor"></div>}
      <header
        ref={headerInnerRef}
        className={`sticky top-0 z-40 ${className} bg-white dark:bg-[#111827]`}
      >
        <div className="relative px-4 lg:container h-[88px] flex ">
          <div className="flex-1 flex justify-between">
            <div className="relative z-10 md:flex flex-1 items-center">
              <Logo className=" w-44 h-24" />
            </div>

            <div className="hidden md:flex relative z-10 flex-1 justify-end text-neutral-700 dark:text-neutral-100">
              <div className="flex space-x-1 items-center gap-2">
                <Link
                  href="/add-listing/1"
                  className="self-center hidden xl:inline-flex px-4 py-3 border border-neutral-300 hover:border-neutral-400 dark:border-neutral-700 rounded-full items-center text-sm text-gray-700 dark:text-neutral-300 font-medium"
                >
                  List your property
                </Link>

                {token ? (
                  <Link href="/author">
                    <ButtonPrimary>My Profile</ButtonPrimary>
                  </Link>
                ) : (
                  <ButtonPrimary onClick={() => setShowLogin((prev) => !prev)}>
                    Login
                  </ButtonPrimary>
                )}

                <div
                  className={`flex flex-col gap-y-4 bg-[#142431] rounded-xl p-4 absolute top-24 right-0 transition-all ${
                    showLogin ? "opacity-100 scale-100" : "opacity-0 scale-50"
                  }`}
                  ref={loginRef}
                >
                  <Link
                    href={{ pathname: "/login", query: { role: "Traveller" } }}
                  >
                    <ButtonPrimary className="w-52 flex justify-between">
                      Login as Traveller{" "}
                      <IoExitOutline className="text-xl font-extrabold" />
                    </ButtonPrimary>
                  </Link>
                  <Link href={{ pathname: "/login", query: { role: "Owner" } }}>
                    <ButtonPrimary className="w-52 flex justify-between">
                      Login as Owner{" "}
                      <IoExitOutline className="text-xl font-extrabold" />
                    </ButtonPrimary>
                  </Link>
                </div>

                <MenuBar />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header3;
