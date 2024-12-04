import React, { FC } from "react";
import PostCardMeta from "@/components/PostCardMeta";
import { PostDataType } from "@/data/types";
import Link from "next/link";
import { Route } from "next";

export interface Card13Props {
  className?: string;
  post: PostDataType;
}

const Card13: FC<Card13Props> = ({ className = "", post }) => {
  const { title, maintext, _id, tags, banner } = post;
  return (
    <div className={`nc-Card13 relative flex ${className}`} data-nc-id="Card13">
      <div className="flex flex-col h-full py-2">
        <h2
          className={`nc-card-title block line-clamp-2 font-semibold text-base`}
        >
          <Link href={`/blog/${_id}` as Route}>
            <h1 className="line-clamp-2">{title}</h1>
          </Link>
        </h2>
        <span className=" my-3 text-neutral-500 dark:text-neutral-400 ">
          <span className="line-clamp-2"> {maintext}</span>
        </span>

        <div className="flex flex-row gap-x-2 ">
          {tags?.slice(0, 2).map((tag, index) => (
            <span
              key={index}
              className="text-xs rounded-lg px-2 border border-neutral-700 py-1 flex gap-x-2"
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-auto hidden sm:block">
          <PostCardMeta meta={{ ...post }} />
        </div>
      </div>
      <img
        className=" w-40 h-40 object-cover rounded-xl"
        src={banner}
        alt={title}
      />
    </div>
  );
};

export default Card13;
