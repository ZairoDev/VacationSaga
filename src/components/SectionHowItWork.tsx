import React, { FC } from "react";
import Image from "next/image";
import { BanknotesIcon, LockClosedIcon, ShieldCheckIcon, UserGroupIcon } from "@heroicons/react/24/outline";

export interface SectionHowItWorkProps {
  className?: string;
  /**
   * Kept for backward compatibility with older pages.
   * The new design ignores this prop.
   */
  data?: unknown;
}

const FEATURES = [
  {
    title: "Verified & Trusted",
    desc: "All properties are verified for quality and safety.",
    icon: ShieldCheckIcon,
  },
  {
    title: "Secure Payments",
    desc: "Your payments are safe with 256-bit encryption.",
    icon: LockClosedIcon,
  },
  {
    title: "No Hidden Fees",
    desc: "What you see is what you pay. Always.",
    icon: BanknotesIcon,
  },
  {
    title: "Local Support",
    desc: "Our local team is always here to help you.",
    icon: UserGroupIcon,
  },
] as const;

const SectionHowItWork: FC<SectionHowItWorkProps> = ({ className = "" }) => {
  return (
    <div
      className={`nc-SectionHowItWork relative z-10 w-full ${className}`}
      data-nc-id="SectionHowItWork"
    >
      <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-900">
        <div className="grid items-stretch lg:grid-cols-[3fr_7fr]">
          <div className="relative z-10 p-5 sm:p-7 lg:pr-4">
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-customOrange">
              Live more for less
            </p>
            <h2 className="mt-1 text-2xl font-semibold text-neutral-900 dark:text-neutral-100 sm:text-4xl">
              Stay longer. Live deeper.
            </h2>
            <p className="mt-2 max-w-xl text-sm text-neutral-600 dark:text-neutral-300">
              Perfect homes for remote workers, digital nomads, students and
              relocating professionals.
            </p>
            <button
              type="button"
              className="mt-5 inline-flex h-10 items-center justify-center rounded-full bg-orange-400 px-5 text-sm font-semibold text-white transition-colors hover:bg-customOrange/90"
            >
              Explore monthly stays
            </button>
          </div>
          <div className="relative min-h-[170px] sm:min-h-[210px] lg:min-h-full lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)] lg:[mask-image:linear-gradient(to_right,transparent_0%,black_18%,black_100%)]">
            <Image
              src="/girl.png"
              alt="Host working from vacation rental"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 70vw"
            />
            {/* Subtle overall vignette */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
          </div>
        </div>

        <div className="grid gap-5 border-t border-neutral-200 bg-white p-5 dark:border-neutral-700 dark:bg-neutral-950 sm:grid-cols-2 sm:p-6 lg:grid-cols-5">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-customOrange">
              Why book with us
            </p>
            <h3 className="mt-1 text-2xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
              More than a booking platform
            </h3>
          </div>
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} className="flex items-start gap-3">
                <div className="rounded-lg border border-neutral-200 p-2 dark:border-neutral-700">
                  <Icon className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {feature.title}
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    {feature.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SectionHowItWork;
