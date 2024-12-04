import { SocialType } from "@/shared/SocialsShare";
import React, { FC } from "react";
import { FaPinterest, FaXTwitter } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { FaFacebookSquare } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";

export interface SocialsListProps {
  className?: string;
  itemClass?: string;
  socials?: SocialType[];
}

const socialsDemo: SocialType[] = [
  {
    name: "Facebook",
    icon: "lab la-facebook-square",
    href: "https://www.facebook.com/Vacationsaga",
  },
  { name: "X", icon: "lab la-twitter", href: "#" },
  // { name: "Youtube", icon: "<BsTwitterX />", href: "#" },
  {
    name: "Instagram",
    icon: "lab la-instagram",
    href: "https://www.instagram.com/vacationsaga/",
  },
  {
    name: "Pinterest",
    icon: "lab la-pinterest",
    href: "https://in.pinterest.com/vacationsaga/",
  },
];

const SocialsList: FC<SocialsListProps> = ({
  className = "",
  itemClass = "block",
  socials = socialsDemo,
}) => {
  return (
    <nav
      className={`nc-SocialsList flex space-x-2.5 text-2xl text-neutral-6000 dark:text-neutral-300 ${className}`}
      data-nc-id="SocialsList"
    >
      {socials.map((item, i) => (
        <a
          key={i}
          className={`${itemClass}`}
          href={item.href}
          target="_blank"
          rel="noopener noreferrer"
          title={item.name}
        >
          {/* <i className={item.icon}></i> */}
          {item.name == "Facebook" && <FaFacebookSquare className=" text-md" />}
          {item.name == "X" && <FaXTwitter className=" text-md" />}
          {item.name == "Community" && <GrGroup className=" text-md" />}
          {item.name == "Instagram" && <FiInstagram className=" text-md" />}
          {item.name == "Pinterest" && <FaPinterest className=" text-md" />}
        </a>
      ))}
    </nav>
  );
};

export default SocialsList;
