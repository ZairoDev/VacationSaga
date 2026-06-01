"use client";

import React, { FC, useEffect, useState } from "react";
import { TaxonomyType } from "@/data/types";
import { useSwipeable } from "react-swipeable";
import { useWindowSize } from "react-use";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRightIcon,
  MapPinIcon,
} from "@heroicons/react/24/solid";
import {
  CameraIcon,
  FireIcon,
  HeartIcon,
  SparklesIcon,
  StarIcon,
} from "@heroicons/react/24/solid";
import { PathName } from "@/routers/types";

export interface SectionSliderNewCategoriesProps {
  className?: string;
  itemClassName?: string;
  heading?: string;
  subHeading?: string;
  categories?: TaxonomyType[];
  categoryCardType?: "card3" | "card4" | "card5" | (string & {});
  itemPerRow?: 4 | 5;
  sliderStyle?: "style1" | "style2";
  eyebrow?: string;
  ctaLabel?: string;
  ctaHref?: PathName;
}

// ── badge per slot (cycles) ──────────────────────────────────────────────────
const SLOT_BADGES = [
  { label: "Popular",        Icon: FireIcon,     cls: "text-orange-500" },
  { label: "Top rated",      Icon: StarIcon,     cls: "text-amber-400"  },
  { label: "Guest favorite", Icon: HeartIcon,    cls: "text-rose-500"   },
  { label: "New",            Icon: SparklesIcon, cls: "text-emerald-500"},
  { label: "Iconic",         Icon: CameraIcon,   cls: "text-violet-500" },
] as const;

// ── country lookup ────────────────────────────────────────────────────────────
const COUNTRY: Record<string, string> = {
  Athens: "Greece", Chania: "Greece", Thessaloniki: "Greece",
  Corfu: "Greece",  Iraklio: "Greece", Santorini: "Greece",
  Milan: "Italy",   Rome: "Italy",    Florence: "Italy",
  Barcelona: "Spain", Seville: "Spain",
  Dubrovnik: "Croatia", Split: "Croatia",
  Paris: "France", Bucharest: "Romania",
  Italy: "Europe", Greece: "Europe", Spain: "Europe",
  Croatia: "Europe", Romania: "Europe",
};

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1", href: "/listing-stay", name: "Athens",
    taxonomy: "category", count: 276,
    thumbnail: "https://images.pexels.com/photos/14811125/pexels-photo-14811125.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: "2", href: "/listing-stay", name: "Chania",
    taxonomy: "category", count: 118,
    thumbnail: "https://images.pexels.com/photos/1285625/pexels-photo-1285625.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "3", href: "/listing-stay", name: "Thessaloniki",
    taxonomy: "category", count: 302,
    thumbnail: "https://images.pexels.com/photos/3534080/pexels-photo-3534080.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "4", href: "/listing-stay", name: "Milan",
    taxonomy: "category", count: 32,
    thumbnail: "https://images.pexels.com/photos/28821762/pexels-photo-28821762.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "5", href: "/listing-stay", name: "Rome",
    taxonomy: "category", count: 0,
    thumbnail: "https://images.pexels.com/photos/1701595/pexels-photo-1701595.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "6", href: "/listing-stay", name: "Corfu",
    taxonomy: "category", count: 88,
    thumbnail: "https://images.pexels.com/photos/5378701/pexels-photo-5378701.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "7", href: "/listing-stay", name: "Santorini",
    taxonomy: "category", count: 140,
    thumbnail: "https://images.pexels.com/photos/3225531/pexels-photo-3225531.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    id: "8", href: "/listing-stay", name: "Barcelona",
    taxonomy: "category", count: 215,
    thumbnail: "https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const SectionSliderNewCategories: FC<SectionSliderNewCategoriesProps> = ({
  eyebrow    = "Explore",
  heading    = "Popular destinations",
  subHeading = "Discover beautiful places to stay around the world.",
  className  = "",
  categories = DEMO_CATS,
  itemPerRow = 5,
  ctaLabel   = "View all destinations",
  ctaHref    = "/listing-stay" as PathName,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [numberOfItems, setNumberOfItems] = useState(0);
  const [realCounts, setRealCounts] = useState<Record<string, number>>({});

  const windowWidth = useWindowSize().width;

  useEffect(() => {
    if (windowWidth < 380)  return setNumberOfItems(1);
    if (windowWidth < 640)  return setNumberOfItems(2);
    if (windowWidth < 1024) return setNumberOfItems(3);
    if (windowWidth < 1280) return setNumberOfItems(4);
    setNumberOfItems(itemPerRow);
  }, [itemPerRow, windowWidth]);

  useEffect(() => {
    const names = categories.map((c) => c.name).filter(Boolean);
    if (!names.length) return;
    const controller = new AbortController();
    (async () => {
      try {
        const res = await fetch(
          `/api/destination-counts?names=${encodeURIComponent(names.join(","))}&match=either`,
          { signal: controller.signal }
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data?.counts) setRealCounts(data.counts);
      } catch { /* ignore */ }
    })();
    return () => controller.abort();
  }, [categories]);

  const totalPages = Math.max(1, categories.length - numberOfItems + 1);

  const goPrev = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const goNext = () => setCurrentIndex((i) => Math.min(totalPages - 1, i + 1));

  const handlers = useSwipeable({
    onSwipedLeft:  () => goNext(),
    onSwipedRight: () => goPrev(),
    trackMouse: true,
  });

  const renderCard = (item: TaxonomyType, slot: number) => {
    const href   = (item.href || "/listing-stay") as PathName;
    const badge  = SLOT_BADGES[slot % SLOT_BADGES.length];
    const BadgeIcon = badge.Icon;
    const country = COUNTRY[item.name] || item.desc || "";
    const rawCount = typeof realCounts[item.name] === "number"
      ? realCounts[item.name]
      : item.count ?? 0;
    const stays = `${rawCount.toLocaleString()} stay${rawCount === 1 ? "" : "s"}`;

    return (
      <Link
        key={item.id}
        href={href}
        className="group relative block w-full overflow-hidden rounded-3xl bg-neutral-200 focus:outline-none"
      >
        <div className="relative aspect-[3/4] w-full">
          {/* Image */}
          <Image
            src={item.thumbnail || ""}
            alt={item.name}
            fill
            sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 20vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          />

          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

          {/* Badge chip — top-left */}
          <div className="absolute left-3 top-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white px-2.5 py-1 text-[11px] font-semibold text-neutral-900 shadow-md">
              <BadgeIcon className={`h-3.5 w-3.5 ${badge.cls}`} aria-hidden="true" />
              {badge.label}
            </span>
          </div>

          {/* Bottom content */}
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="flex items-end justify-between gap-3">
              <div className="min-w-0">
                <p className="text-2xl font-bold text-white drop-shadow">
                  {item.name}
                  <span className="mt-1 block h-[3px] w-8 rounded-full bg-orange-400" />
                </p>
                {country ? (
                  <p className="mt-0.5 inline-flex items-center gap-1 text-sm font-medium text-white">
                    <MapPinIcon className="h-3.5 w-3.5 flex-none" aria-hidden="true" />
                    {country}
                  </p>
                ) : null}
                <p className="mt-1 text-xs text-white/70">{stays}</p>
              </div>

              {/* Arrow circle */}
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-white shadow-md transition-transform duration-300 group-hover:scale-110">
                <ArrowUpRightIcon className="h-4 w-4 text-neutral-900" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  };

  if (!numberOfItems) return null;

  return (
    <div className={`nc-SectionSliderNewCategories ${className}`}>
      {/* ── Header ─────────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-orange-400">
            {eyebrow}
          </p>
          <h2 className="mt-2 text-[2rem] font-bold leading-tight text-neutral-900 dark:text-neutral-50 sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            {subHeading}
          </p>
        </div>

        <div className="flex-none sm:mt-1">
          <Link
            href={ctaHref}
            className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-4 py-2.5 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-700"
          >
            {ctaLabel}
            <ArrowUpRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* ── Slider ─────────────────────────────────────────────────────────── */}
      <div className="relative mt-3 overflow-hidden" {...handlers}>
        <div className="overflow-hidden">
          <ul
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / numberOfItems)}%)` }}
          >
            {categories.map((item, idx) => (
              <li
                key={item.id}
                className="flex-none px-2"
                style={{ width: `${100 / numberOfItems}%` }}
              >
                {renderCard(item, idx)}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* ── Pagination dots ─────────────────────────────────────────────────── */}
      <div className="mt-3 flex items-center justify-center gap-2.5">
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Go to page ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            className={
              i === currentIndex
                ? "h-2.5 w-2.5 rounded-full bg-orange-400 transition-all"
                : "h-2.5 w-2.5 rounded-full border-2 border-neutral-300 bg-transparent transition-all hover:border-neutral-400 dark:border-neutral-600"
            }
          />
        ))}
      </div>
    </div>
  );
};

export default SectionSliderNewCategories;
