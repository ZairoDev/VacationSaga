"use client";

import Logo from "@/shared/Logo";
import SocialsList1 from "@/shared/SocialsList1";
import { CustomLink } from "@/data/types";
import React, { FC } from "react";
import FooterNav from "./FooterNav";
import roundLogo from "@/images/companyLogo/logo1.png";
import { SocialType } from "@/shared/SocialsShare";
import { FaXTwitter } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaPinterest } from "react-icons/fa";

export interface WidgetFooterMenu {
  id: string;
  title: string;
  menus: CustomLink[];
  icon?: string;
}

export interface SocialsList1Props {
  className?: string;
}

const widgetMenus: WidgetFooterMenu[] = [
  {
    id: "5",
    title: "Useful Links",
    menus: [
      { href: "/about", label: "About Us" },
      { href: "#", label: "How we Work" },
      { href: "/subscription", label: "Becoma Host" },
      { href: "/blog", label: "Blogs" },
      { href: "/contact", label: "Contact Us" },
    ],
  },
  // {
  //   id: "1",
  //   title: "Explore",
  //   menus: [
  //     { href: "#", label: "Design features" },
  //     { href: "#", label: "Prototyping" },
  //     { href: "#", label: "Design systems" },
  //     { href: "#", label: "Pricing" },
  //     { href: "#", label: "Security" },
  //   ],
  // },
  {
    id: "1",
    title: "Destinations",
    menus: [
      { href: "/listing-stay?place=Greece", label: "Greece" },
      { href: "/listing-stay?place=Italy", label: "Italy" },
      { href: "/listing-stay?place=Romania", label: "Romania" },
      { href: "/listing-stay?place=Spain", label: "Spain" },
      { href: "/listing-stay?place=Croatia", label: "Croatia" },
    ],
  },
  {
    id: "2",
    title: "Help Desk",
    menus: [
      { href: "/owner-help", label: "Owner Help" },
      { href: "/traveller-help", label: "Traveller Help" },
      { href: "/privacy-policy", label: "Privacy Policy" },
      { href: "/termsandconditions", label: "Terms & Conditions" },
      { href: "/contact", label: "Support" },
    ],
  },
  // {
  //   id: "4",
  //   title: "Social Handles",
  //   menus: [
  //     { href: "https://www.facebook.com/Vacationsaga", label: "Facebook" },
  //     { href: "https://x.com/vacationsaga", label: "Twitter" },
  //     { href: "https://www.instagram.com/vacationsaga/", label: "Instagram" },
  //     // { href: "#", label: "117/N/70 3rd Floor Kakadeo Kanpur"}
  //     // { href: "#", label: "Contributing" },
  //     // { href: "#", label: "Concurrent Mode" },
  //   ],
  // },
];

const socials: SocialType[] = [
  {
    name: "Facebook",
    icon: "lab la-facebook-square",
    href: "https://www.facebook.com/Vacationsaga",
  },
  {
    name: "Twitter",
    icon: "lab la-xtwitter",
    href: "https://x.com/vacationsaga",
  },
  // { name: "Youtube", icon: "lab la-youtube", href: "#" },
  {
    name: "Instagram",
    icon: "lab la-instagram",
    href: "https://www.instagram.com/vacationsaga/",
  },
  {
    name: "Community",
    icon: "lab la-instagram",
    href: "https://www.facebook.com/share/cQVoYkgSxmp465km/",
  },
  {
    name: "Pinterest",
    icon: "lab la-instagram",
    href: "https://in.pinterest.com/vacationsaga/",
  },
];

const renderItem = (item: SocialType, index: number) => {
  return (
    <a
      href={item.href}
      className="flex items-center text-2xl my-4 text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white leading-none space-x-2 group"
      key={index}
    >
      {item.name == "Facebook" && <FaFacebookSquare className=" text-md" />}
      {item.name == "Twitter" && <FaXTwitter className=" text-md" />}
      {item.name == "Community" && <GrGroup className=" text-md" />}
      {item.name == "Instagram" && <FiInstagram className=" text-md" />}
      {item.name == "Pinterest" && <FaPinterest className=" text-md" />}
      <span className="hidden lg:block text-sm ml-8">{item.name}</span>
    </a>
  );
};

const Footer: React.FC = () => {
  const renderWidgetMenuItem = (menu: WidgetFooterMenu, index: number) => {
    return (
      <div key={index} className="text-sm px-4 ">
        <h2 className="font-semibold text-neutral-700 dark:text-neutral-200">
          {menu.title}
        </h2>
        <ul className="mt-5 space-y-2">
          {menu.menus.map((item, index) => (
            <li key={index}>
              <a
                key={index}
                className="text-neutral-6000 dark:text-neutral-300 hover:text-black dark:hover:text-white"
                href={item.href}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className=" py-2 bg-white dark:bg-[#111827] px-8">
      <FooterNav />

      <div className="nc-Footer relative  border-t border-neutral-200 dark:border-neutral-700">
        <div className=" w-full">
          <div className=" w-full flex flex-col items-center mt-4">
            {/* <Logo /> */}
            <img src={roundLogo.src} alt="Logo" className=" w-28 mb-2" />
            <p className=" text-primary-6000 text-2xl my-2 font-bold whitespace-nowrap">
              Vacation Saga
            </p>
            <p className="text-center my-2">
              117/N/70 3rd Floor Kakadeo Kanpur
            </p>
            <a href="mailto:info@vacationsaga.com">info@vacationsaga.com</a>
          </div>
          <div className="col-span-2 flex items-center md:col-span-3">
            {/* <SocialsList1 className="flex items-center space-x-3 lg:space-x-0 lg:flex-col lg:space-y-2.5 lg:items-start" /> */}
          </div>
        </div>
        <div className=" mt-8 flex flex-wrap gap-y-8 justify-around">
          {widgetMenus.map(renderWidgetMenuItem)}
          <div className="flex flex-col items-center ">
            <h3 className="font-semibold text-neutral-700 dark:text-neutral-200 text-sm">
              Social Handles
            </h3>
            <p>{socials.map(renderItem)}</p>
          </div>
        </div>
        <div className=" w-full flex justify-center">
          <h1>
            Managed by{" "}
            <span className=" text-md">Zairo International Pvt. Ltd.</span>
          </h1>
          {/* <img src="/zairo.jfif" alt="" /> */}
        </div>
      </div>
    </div>
  );
};

export default Footer;
