import React, { FC } from "react";
import HeroSearchForm from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import ButtonPrimary from "@/shared/ButtonPrimary";
import { PathName } from "@/routers/types";
import {
  CheckBadgeIcon,
  LockClosedIcon,
  LifebuoyIcon,
  UsersIcon,
  StarIcon,
  HomeModernIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";

export interface SectionHeroProps {
  className?: string;
}

const SectionHero: FC<SectionHeroProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHero relative ${className}`}
    >
      {/* Full-bleed hero background */}
      <div className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden">
        <div
          className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-[680px] bg-[url('/daylight.png')] dark:bg-[url('/night.png')] bg-cover bg-center"
        >
          {/* Overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-black/10" />

          <div className="container relative z-10 pt-10 lg:pt-16">
            <div className="max-w-2xl text-white pb-28 sm:pb-32 lg:pb-36">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur">
                <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white/20">
                  <StarIcon className="h-4 w-4" />
                </span>
                <span>Holiday homes & monthly rentals</span>
              </div>

              <h1 className="mt-6 text-4xl font-semibold leading-[1.08] sm:text-5xl lg:text-6xl">
                Find your next <br />
                chapter{" "}
                <span className="text-orange-400 drop-shadow-sm">abroad</span>
              </h1>

              <p className="mt-5 max-w-xl text-base text-white/85 sm:text-lg">
                Handpicked homes in the world&apos;s most desirable destinations.
              </p>

              <div className="mt-7 flex flex-wrap items-center gap-6 text-sm text-white/85">
                <div className="inline-flex items-center gap-2">
                  <CheckBadgeIcon className="h-5 w-5" />
                  <span>Verified Homes</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <LockClosedIcon className="h-5 w-5" />
                  <span>Secure Payments</span>
                </div>
                <div className="inline-flex items-center gap-2">
                  <LifebuoyIcon className="h-5 w-5" />
                  <span>24/7 Support</span>
                </div>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Search bar overlaps hero (half in photo, half out) */}
      <div className="relative z-30 -mt-10 sm:-mt-12 lg:-mt-16">
        <div className="container">
          <div className="mx-auto w-full max-w-6xl">
            <HeroSearchForm className="px-2 sm:px-0" formClassName="mt-0" defaultMonthlyStays />
          </div>
        </div>
      </div>

      {/* Stats strip */}
      <div className="container relative z-10 mt-10 sm:mt-12">
        <div className="w-full grid grid-cols-2 gap-8 rounded-3xl bg-white/85 p-8 sm:p-10 shadow-md ring-1 ring-black/5 backdrop-blur sm:grid-cols-4">
          <div className="flex items-center gap-4">
            <UsersIcon className="h-9 w-9 text-neutral-700" />
            <div>
              <div className="text-2xl font-semibold text-neutral-900 leading-none">25,000+</div>
              <div className="mt-1 text-sm text-neutral-600">Happy travellers</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <StarIcon className="h-9 w-9 text-neutral-700" />
            <div>
              <div className="text-2xl font-semibold text-neutral-900 leading-none">4.8 / 5</div>
              <div className="mt-1 text-sm text-neutral-600">Average rating</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <HomeModernIcon className="h-9 w-9 text-neutral-700" />
            <div>
              <div className="text-2xl font-semibold text-neutral-900 leading-none">10,000+</div>
              <div className="mt-1 text-sm text-neutral-600">Verified properties</div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <ChatBubbleLeftRightIcon className="h-9 w-9 text-neutral-700" />
            <div>
              <div className="text-2xl font-semibold text-neutral-900 leading-none">24/7</div>
              <div className="mt-1 text-sm text-neutral-600">Customer support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionHero;
