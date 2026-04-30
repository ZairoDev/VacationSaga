import React from "react";
import { TaxonomyType } from "@/data/types";
import Image from "next/image";
import Link from "next/link";
import {
  BoltIcon,
  HomeModernIcon,
  ShieldCheckIcon,
  WifiIcon,
} from "@heroicons/react/24/outline";
import {
  FireIcon,
  HeartIcon,
  SparklesIcon,
  StarIcon,
  SunIcon,
} from "@heroicons/react/24/solid";
import { PathName } from "@/routers/types";

export interface SectionGridCategoryBoxProps {
  categories?: TaxonomyType[];
  headingCenter?: boolean;
  categoryCardType?: "card1";
  className?: string;
  gridClassName?: string;
}

const DEMO_CATS: TaxonomyType[] = [
  {
    id: "1",
    href: "/listing-stay?place=athens",
    name: "Athens",
    taxonomy: "category",
    count: 240,
    thumbnail:"/athens.png",
  },
  {
    id: "2",
    href: "/listing-stay?place=thessaloniki",
    name: "Thessaloniki",
    taxonomy: "category",
    count: 288,
    thumbnail:
        "/thessaloniki.png",
    },
  {
    id: "3",
    href: "/listing-stay?place=chania",
    name: "Chania",
    taxonomy: "category",
    count: 128,
    thumbnail:
      "/chania.png",
  },
  {
    id: "4",
    href: "/listing-stay?place=corfu",
    name: "Corfu",
    taxonomy: "category",
    count: 112,
    thumbnail:
      "/corfu.png",
  },
  {
    id: "5",
    href: "/listing-stay?place=iraklio",
    name: "Iraklio",
    taxonomy: "category",
    count: 323,
    thumbnail:
      "https://mi4realestate.com/wp-content/uploads/2021/07/Untitled-design-8-799x670.png",
  },
  {
    id: "6",
    href: "/listing-stay?place=nikiti",
    name: "Nikiti",
    taxonomy: "category",
    count: 2223,
    thumbnail:
      "https://images.pexels.com/photos/11433848/pexels-photo-11433848.jpeg",
  },
  {
    id: "7",
    href: "/listing-stay?place=cinisi",
    name: "Cinisi",
    taxonomy: "category",
    count: 1775,
    thumbnail:"/cinisi.png",
  },
  {
    id: "8",
    href: "/listing-stay?place=piraeus",
    name: "Piraeus",
    taxonomy: "category",
    count: 1288,
    thumbnail:
      "https://www.greece-is.com/wp-content/uploads/2019/08/01-empedokleous-04.jpg",
  },
];

const SectionGridCategoryBox: React.FC<SectionGridCategoryBoxProps> = ({
  categories = DEMO_CATS,
  className = "",
  gridClassName = "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
}) => {
  const uiCats = categories.slice(0, 8);
  const PRICE_BY_NAME: Record<string, string> = {
    Athens: "€1,150",
    Thessaloniki: "€980",
    Chania: "€1,250",
    Corfu: "€1,300",
    Iraklio: "€1,100",
    Nikiti: "€990",
    Cinisi: "€1,180",
    Piraeus: "€950",
  };
  const BADGE_BY_NAME: Record<string, { label: string; cls: string }> = {
    Athens: { label: "Popular", cls: "bg-orange-100 text-customOrange" },
    Chania: { label: "New", cls: "bg-emerald-100 text-emerald-700" },
    Corfu: { label: "Guest Favorite", cls: "bg-violet-100 text-violet-700" },
    Iraklio: { label: "Beach Life", cls: "bg-sky-100 text-sky-700" },
    Cinisi: { label: "Scenic Views", cls: "bg-neutral-100 text-neutral-700" },
  };
  const BADGE_ICON_BY_LABEL: Record<string, React.ElementType> = {
    Popular: FireIcon,
    New: StarIcon,
    "Guest Favorite": HeartIcon,
    "Beach Life": SunIcon,
    "Scenic Views": SparklesIcon,
  };

  return (
    <div className={`nc-SectionGridCategoryBox relative w-full ${className}`}>
      <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-customOrange">
            <span className="inline-block h-2 w-2 rounded-full bg-customOrange" />
            Monthly Rentals
          </div>
          <h2 className="mt-2 text-3xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100 sm:text-4xl">
            Stay Longer, Live Better
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-neutral-600 dark:text-neutral-300">
            Fully furnished monthly rentals in Europe&apos;s most loved cities.
            Flexible stays. Better rates. Real homes.
          </p>
        </div>

        <Link
          href="/listing-stay"
          className="inline-flex items-center gap-2 text-sm font-medium text-customOrange hover:text-customOrange/80"
        >
          View all monthly rentals <span aria-hidden="true">→</span>
        </Link>
      </div>

      <div className="mb-6 grid gap-4 rounded-2xl border border-neutral-200 bg-white p-4 dark:border-neutral-700 dark:bg-neutral-900 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { title: "Fully Furnished", desc: "Move in hassle-free", Icon: HomeModernIcon },
          { title: "High Speed WiFi", desc: "Stay connected", Icon: WifiIcon },
          { title: "Utilities Included", desc: "No hidden charges", Icon: BoltIcon },
          { title: "Flexible Stays", desc: "30+ nights", Icon: ShieldCheckIcon },
        ].map(({ title, desc, Icon }) => (
          <div key={title} className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-customOrange dark:bg-neutral-800">
              <Icon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                {title}
              </p>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className={`grid ${gridClassName} gap-5 sm:gap-6 md:gap-7`}>
        {uiCats.map((item) => {
          const badge = BADGE_BY_NAME[item.name];
          const price = PRICE_BY_NAME[item.name] || "€1,000";
          return (
            <Link
              key={item.id}
              href={(item.href || "/listing-stay") as PathName}
              className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
            >
              <div className="relative h-[200px] w-full">
                {badge ? (
                  <span
                    className={`absolute left-3 top-3 z-10 inline-flex items-center rounded-full px-2 py-1 text-[10px] font-semibold ${badge.cls}`}
                  >
                    {(() => {
                      const Icon = BADGE_ICON_BY_LABEL[badge.label];
                      return Icon ? (
                        <Icon className="mr-1.5 h-3.5 w-3.5" aria-hidden="true" />
                      ) : null;
                    })()}
                    {badge.label}
                  </span>
                ) : null}
                {item.thumbnail ? (
                  <Image
                    src={item.thumbnail}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-100 dark:bg-neutral-800" />
                )}
              </div>

              <div className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-base font-semibold text-neutral-900 dark:text-neutral-100">
                      {item.name}
                    </p>
                    <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                      {item.count || 0} monthly stays available
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-semibold text-customOrange">
                      From {price}
                    </p>
                    <p className="text-[10px] text-orange-400">
                      / month
                    </p>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-3 text-[10px] text-neutral-500 dark:text-neutral-400">
                  <span className="inline-flex items-center gap-1">
                    <HomeModernIcon className="h-3.5 w-3.5" />
                    Furnished
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <WifiIcon className="h-3.5 w-3.5" />
                    WiFi
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <BoltIcon className="h-3.5 w-3.5" />
                    Utilities
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-900 sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-50 text-customOrange dark:bg-neutral-800">
              <ShieldCheckIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                Can&apos;t find what you&apos;re looking for?
              </p>
              <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                Contact us and we’ll help you find the perfect monthly stay.
              </p>
            </div>
          </div>
          <Link
            href="/contact"
            className="inline-flex h-10 items-center justify-center rounded-full bg-orange-400 px-5 text-sm font-semibold text-white"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SectionGridCategoryBox;
