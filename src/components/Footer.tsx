"use client";

import Image from "next/image";
import Link from "next/link";
import { PathName } from "@/routers/types";
import React from "react";
import roundLogo from "@/images/companyLogo/logo1.png";
import { FaFacebookSquare, FaPinterest } from "react-icons/fa";
import { FiInstagram } from "react-icons/fi";
import { FaXTwitter } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import FooterNav from "./FooterNav";

const COLUMNS = [
  {
    title: "Category",
    links: [
      { label: "Monthly Stays",   href: "/listing-stay" },
      { label: "Short Stays",     href: "/listing-stay" },
      { label: "Luxury Rentals",  href: "/listing-stay" },
      { label: "City Apartments", href: "/listing-stay" },
      // { label: "Beach Houses",    href: "/listing-stay" },
    ],
  },
  {
    title: "Guests",
    links: [
      { label: "Help Center",    href: "/traveller-help" },
      { label: "FAQ",            href: "/faq" },
      { label: "Become a Host",  href: "/subscription" },
      { label: "Travel Guides",  href: "/blog" },
      // { label: "Sitemap",        href: "/" },
    ],
  },
  {
    title: "Hosts",
    links: [
      { label: "Become a Host",   href: "/subscription" },
      { label: "Host Dashboard",  href: "/dashboard" },
      { label: "Owner Help",      href: "/owner-help" },
      { label: "Host Support",    href: "/contact" },
      { label: "More Info",       href: "/about" },
    ],
  },
  {
    title: "Destinations",
    links: [
      { label: "Greece",   href: "/listing-stay?place=Greece" },
      { label: "Italy",    href: "/listing-stay?place=Italy" },
      { label: "Romania",  href: "/listing-stay?place=Romania" },
      { label: "Spain",    href: "/listing-stay?place=Spain" },
      { label: "Croatia",  href: "/listing-stay?place=Croatia" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "info@vacationsaga.com",  href: "mailto:info@vacationsaga.com" },
      {
        label: "+91 8960980806",
        href: "https://wa.me/918960980806"
      },
      { label: "Privacy Policy",         href: "/privacy-policy" },
      { label: "Terms & Conditions",     href: "/termsandconditions" },
    ],
  },
];

const SOCIALS = [
  { name: "Facebook",  href: "https://www.facebook.com/Vacationsaga",            Icon: FaFacebookSquare },
  { name: "Twitter",   href: "https://x.com/vacationsaga",                       Icon: FaXTwitter },
  { name: "Instagram", href: "https://www.instagram.com/vacationsaga/",          Icon: FiInstagram },
  { name: "Community", href: "https://www.facebook.com/share/cQVoYkgSxmp465km/", Icon: GrGroup },
  { name: "Pinterest", href: "https://in.pinterest.com/vacationsaga/",           Icon: FaPinterest },
];

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-t from-orange-100 to-white dark:from-neutral-900 dark:to-neutral-800">
      <FooterNav />

      <div className="mx-auto max-w-screen-xl px-6 pt-10 pb-6 xl:max-w-[1340px] xl:px-10 2xl:max-w-screen-2xl">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-[1.4fr_repeat(5,_1fr)]">

          {/* ── Brand column ──────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Image src={roundLogo} alt="Vacation Saga Logo" width={40} height={40} className="rounded-full" />
              <span className="text-base font-bold text-neutral-900 dark:text-neutral-50">
                Vacation Saga
              </span>
            </div>
            <p className="text-xs leading-5 text-neutral-600 dark:text-neutral-400">
              117/N/70 3rd Floor Kakadeo Kanpur
            </p>
            <a
              href="mailto:info@vacationsaga.com"
              className="text-xs text-neutral-700 hover:text-customOrange dark:text-neutral-300"
            >
              info@vacationsaga.com
            </a>

            {/* Social icons */}
            <div className="mt-1 flex items-center gap-3">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-orange-200 bg-white/70 text-neutral-700 shadow-sm transition-colors hover:bg-customOrange hover:text-white dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {/* ── Link columns ──────────────────────────────────── */}
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-neutral-900 dark:text-neutral-100">
                {col.title}
              </h3>
              <ul className="space-y-2">
                {col.links.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href as PathName}
                      className="text-xs text-neutral-600 transition-colors hover:text-customOrange dark:text-neutral-400 dark:hover:text-orange-400"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* ── Bottom bar ────────────────────────────────────────── */}
        <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-orange-200/70 pt-5 dark:border-neutral-700 sm:flex-row">
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            © {new Date().getFullYear()} Vacation Saga. All rights reserved. Managed by{" "}
            <span className="font-medium text-neutral-700 dark:text-neutral-300">
              Zairo International Private Limited.
            </span>
          </p>

          <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
            <svg className="h-4 w-4 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span>Secure Payments</span>

            {/* Visa */}
            <span className="inline-flex h-6 items-center rounded border border-orange-200 bg-white px-2 dark:border-neutral-700 dark:bg-neutral-800">
              <svg viewBox="0 0 48 16" className="h-3.5 w-auto" aria-label="Visa">
                <text x="0" y="13" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="15" fill="#1A1F71" letterSpacing="0.5">VISA</text>
              </svg>
            </span>

            {/* Mastercard */}
            <span className="inline-flex h-6 items-center rounded border border-orange-200 bg-white px-2 dark:border-neutral-700 dark:bg-neutral-800">
              <svg viewBox="0 0 38 24" className="h-4 w-auto" aria-label="Mastercard">
                <circle cx="13" cy="12" r="11" fill="#EB001B" />
                <circle cx="25" cy="12" r="11" fill="#F79E1B" />
                <path d="M19 4.8a11 11 0 0 1 0 14.4A11 11 0 0 1 19 4.8z" fill="#FF5F00" />
              </svg>
            </span>

            {/* PayPal */}
            <span className="inline-flex h-6 items-center rounded border border-orange-200 bg-white px-2 dark:border-neutral-700 dark:bg-neutral-800">
              <svg viewBox="0 0 64 20" className="h-3.5 w-auto" aria-label="PayPal">
                <text x="0" y="15" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="#003087">Pay</text>
                <text x="28" y="15" fontFamily="Arial, sans-serif" fontWeight="bold" fontSize="14" fill="#009cde">Pal</text>
              </svg>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
