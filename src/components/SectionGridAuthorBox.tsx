import { DEMO_AUTHORS } from "@/data/authors";
import { AuthorType } from "@/data/types";
import Avatar from "@/shared/Avatar";
import { StarIcon } from "@heroicons/react/24/solid";
import React, { FC } from "react";

export interface SectionGridAuthorBoxProps {
  className?: string;
  authors?: AuthorType[];
  boxCard?: "box1" | "box2";
  gridClassName?: string;
}

const DEMO_DATA = DEMO_AUTHORS.filter((_, i) => i < 10);
const RESPONSE_TIMES = ["8 mins", "15 mins", "6 mins", "10 mins", "7 mins", "9 mins"];

const SectionGridAuthorBox: FC<SectionGridAuthorBoxProps> = ({
  className = "",
  authors = DEMO_DATA,
}) => {
  const uiAuthors = authors;
  const marqueeAuthors = [...uiAuthors, ...uiAuthors];

  return (
    <div
      className={`nc-SectionGridAuthorBox relative z-10 w-full overflow-hidden ${className}`}
      data-nc-id="SectionGridAuthorBox"
    >
      <div className="mb-5 flex items-center">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Trusted Hosts Guests Love
        </h2>
      </div>

      <div className="relative overflow-hidden">
        <div className="marquee-track flex w-max gap-4">
          {marqueeAuthors.map((author, index) => {
            const normalizedIndex = index % uiAuthors.length;
          const rating = Number(author.starRating || 4.9).toFixed(1);
            const reviews = 70 + normalizedIndex * 18;
            const properties = author.count || 8 + normalizedIndex;
            const replyIn =
              RESPONSE_TIMES[normalizedIndex % RESPONSE_TIMES.length] || "10 mins";

            return (
              <div
                key={`${author.id}-${index}`}
                className="w-[220px] flex-shrink-0 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900"
              >
                <div className="mt-1 flex flex-col items-center text-center">
                  <Avatar
                    sizeClass="h-16 w-16 text-xl"
                    radius="rounded-full"
                    imgUrl={author.avatar}
                    userName={author.displayName}
                  />
                  <h3 className="mt-3 text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                    {author.displayName}
                  </h3>
                  <p className="mt-1 inline-flex items-center gap-1 text-xs text-neutral-600 dark:text-neutral-300">
                    <StarIcon className="h-3.5 w-3.5 text-orange-400" />
                    <span className="font-semibold text-neutral-800 dark:text-neutral-100">
                      {rating}
                    </span>
                    <span>({reviews} reviews)</span>
                  </p>
                  <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
                    {properties} Properties
                  </p>
                  <p className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    Replies in {replyIn}
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

export default SectionGridAuthorBox;
