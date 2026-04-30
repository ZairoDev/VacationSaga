"use client";

import React, { FC } from "react";

export interface SectionSubscribe2Props {
  className?: string;
}

const SectionSubscribe2: FC<SectionSubscribe2Props> = ({ className = "" }) => {
  return (
    <section
      className={`nc-SectionSubscribe2 relative overflow-hidden rounded-2xl bg-white border border-neutral-100 shadow-[0_2px_32px_rgba(0,0,0,0.06)] ${className}`}
      data-nc-id="SectionSubscribe2"
    >
      {/* Subtle warm wash */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-orange-50/70 via-white/60 to-amber-50/40" />

      {/* Decorative concentric rings — far right */}
      <div className="pointer-events-none absolute -right-16 top-1/2 h-56 w-56 -translate-y-1/2 rounded-full border border-orange-100/80" />
      <div className="pointer-events-none absolute -right-6 top-1/2 h-32 w-32 -translate-y-1/2 rounded-full border border-orange-200/60" />
      <div className="pointer-events-none absolute right-6 top-1/2 h-14 w-14 -translate-y-1/2 rounded-full bg-orange-400/10" />

      {/* Left accent bar */}
      <div className="absolute bottom-0 left-0 top-0 w-[3px] rounded-r-full bg-gradient-to-b from-orange-400 via-amber-300 to-orange-200" />

      <div className="relative flex flex-col items-start gap-5 px-7 py-5 sm:px-10 lg:flex-row lg:items-center lg:justify-between lg:gap-8">

        {/* ── Left: icon + copy ── */}
        <div className="flex flex-shrink-0 items-center gap-4">
          {/* Compass icon badge */}
          <div className="hidden h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border border-orange-100 bg-orange-50 sm:flex">
            <svg className="h-5 w-5 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" />
              <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
            </svg>
          </div>

          <div>
            <p className="text-[10.5px] font-bold uppercase tracking-[0.22em] text-orange-500">
              VacationSaga Insider
            </p>
            <h3 className="mt-0.5 text-sm font-semibold leading-snug text-neutral-900 sm:text-base">
              Discover exceptional stays before they&apos;re gone
            </h3>
          </div>
        </div>

        {/* ── Centre: trust pills — hidden below xl ── */}
        <div className="hidden xl:flex items-center gap-5 flex-shrink-0">
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            50&thinsp;000+ travelers
          </div>
          <div className="h-3.5 w-px bg-neutral-200" />
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-orange-400" />
            Weekly curated drops
          </div>
          <div className="h-3.5 w-px bg-neutral-200" />
          <div className="flex items-center gap-1.5 text-xs font-medium text-neutral-500">
            <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
            Unsubscribe anytime
          </div>
        </div>

        {/* ── Right: email form ── */}
        <form
          className="flex w-full flex-shrink-0 items-center gap-2 lg:w-auto"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="relative flex-1 lg:w-72">
            <svg
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400"
              viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            <input
              required
              type="email"
              placeholder="Your email address"
              className="h-11 w-full rounded-xl border border-neutral-200 bg-white pl-10 pr-4 text-sm text-neutral-800 shadow-sm placeholder:text-neutral-400 transition focus:border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-200"
            />
          </div>
          <button
            type="submit"
            className="h-11 whitespace-nowrap rounded-xl bg-orange-500 px-5 text-sm font-semibold text-white shadow-sm shadow-orange-200/60 transition hover:bg-orange-600 active:scale-[0.97]"
          >
            Get Access
            <span className="ml-1.5 inline-block translate-y-px">→</span>
          </button>
        </form>

      </div>
    </section>
  );
};

export default SectionSubscribe2;
