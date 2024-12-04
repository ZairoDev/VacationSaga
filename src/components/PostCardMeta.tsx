import React, { FC } from "react";
import { PostDataType } from "@/data/types";
import { format } from "date-fns";
import Link from "next/link";

export interface PostCardMetaProps {
  className?: string;
  meta: Pick<PostDataType, "createdAt">;
  size?: "large" | "normal";
}
const PostCardMeta: FC<PostCardMetaProps> = ({
  className = "leading-none",
  meta,
  size = "normal",
}) => {
  const { createdAt } = meta;
  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center fledx-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-sm" : "text-base"
      } ${className}`}
      data-nc-id="PostCardMeta"
    >
      <>
        <span className="text-neutral-500 dark:text-neutral-400 font-normal line-clamp-1">
          {format(new Date(createdAt || ""), "MMMM dd, yyyy")}
        </span>
      </>
    </div>
  );
};

export default PostCardMeta;
