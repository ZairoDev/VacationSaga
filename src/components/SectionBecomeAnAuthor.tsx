import React, { FC } from "react";
import rightImgDemo from "@/images/interior.png";
import ButtonPrimary from "@/shared/ButtonPrimary";
import Image from "next/image";
import type { StaticImageData } from "next/image";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string | StaticImageData;
}



const SectionBecomeAnAuthor: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative z-10 mx-auto w-full max-w-screen-xl overflow-hidden rounded-3xl px-4 sm:px-6 xl:max-w-[1340px] xl:px-0 2xl:max-w-screen-2xl ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex flex-col overflow-hidden rounded-3xl shadow-lg ring-1 ring-neutral-200/80 dark:ring-neutral-700/60 lg:flex-row lg:min-h-[360px] xl:h-[30vh] xl:min-h-0 2xl:h-[30vh]">

        {/* ── Left: content panel ── */}
        <div className="relative flex w-full flex-col justify-center gap-0 bg-white px-8 py-8 dark:bg-neutral-900 lg:w-[44%] lg:px-10 xl:w-[42%] xl:px-12 2xl:w-[38%]">

          {/* subtle top-left decorative blot */}
          <div className="pointer-events-none absolute -left-10 -top-10 h-40 w-40 rounded-full bg-orange-100/50 blur-3xl dark:bg-orange-900/20" />

          <span className="relative inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-customOrange">
            <span className="h-2 w-2 rounded-full bg-customOrange" />
            Become a Host
          </span>

          <h2 className="relative mt-3 text-2xl font-bold leading-snug text-neutral-900 dark:text-neutral-50 sm:text-3xl xl:text-[1.85rem] 2xl:text-[2.1rem]">
            Earn more with{" "}
            <span className="text-customOrange">Vacation Saga</span>
          </h2>

          <p className="relative mt-2.5 max-w-xs text-sm leading-relaxed text-neutral-500 dark:text-neutral-400 xl:text-[0.82rem]">
            List your home to international travelers and grow your income
            effortlessly.
          </p>

          <div className="relative mt-5 flex flex-wrap items-center gap-3">
            <ButtonPrimary className="h-10 rounded-full bg-customOrange px-5 text-sm font-semibold shadow-md shadow-orange-200 hover:bg-orange-500 dark:shadow-none">
              Become a Host &rarr;
            </ButtonPrimary>
            <button
              type="button"
              className="inline-flex h-10 items-center justify-center rounded-full border border-neutral-300 bg-white px-5 text-sm font-medium text-neutral-700 transition-all hover:border-neutral-400 hover:shadow-sm dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-200"
            >
              Learn More
            </button>
          </div>

          {/* Stats */}
         
        </div>

        {/* ── Right: image panel ── */}
        <div className="relative h-[280px] w-full lg:h-auto lg:w-[56%] xl:w-[58%] 2xl:w-[62%]">
          <Image
            alt="Vacation Saga host banner"
            src={rightImg}
            className="h-full w-full object-cover"
            sizes="(max-width: 1024px) 100vw, (max-width: 1536px) 58vw, 62vw"
          />
          {/* left fade into content */}
          <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-32 bg-gradient-to-r from-white to-transparent dark:from-neutral-900 lg:block xl:w-40 2xl:w-52" />
          {/* bottom fade for mobile */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/60 to-transparent dark:from-neutral-900/60 lg:hidden" />
        </div>

      </div>
    </div>
  );
};

export default SectionBecomeAnAuthor;
