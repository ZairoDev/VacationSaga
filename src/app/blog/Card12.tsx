import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import { DEMO_POSTS } from "@/data/posts";
import Link from "next/link";
import { Route } from "next";

export interface Card12Props {
  className?: string;
  post?: PostDataType;
}

const Card12: FC<Card12Props> = ({
  className = "h-full",
  post = DEMO_POSTS[0],
}) => {
  const { title, banner, _id, maintext, tags } = post;
  return (
    <div className={`nc-Card12 group relative flex flex-col ${className}`}>
      <img
        src={banner}
        alt={title}
        className="rounded-xl"
        sizes="(max-width: 768px) 100vw, 400px"
      />
      <div className=" mt-8 pr-10 flex flex-col">
        <Link href={`/blog/${_id}` as Route}>
          <h2
            className={`nc-card-title block font-semibold text-neutral-900 dark:text-neutral-100 transition-colors text-lg sm:text-2xl`}
          >
            <h1> {title}</h1>
          </h2>
        </Link>
        <span className="hidden sm:block mt-4 text-neutral-500 dark:text-neutral-400">
          <span className="line-clamp-2"> {maintext}</span>
        </span>
      </div>
    </div>
  );
};

export default Card12;
