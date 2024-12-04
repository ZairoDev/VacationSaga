import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import Link from "next/link";

export function BentoGridDemo({ allImages }: { allImages: string[] }) {
  return (
    <BentoGrid className="max-w-4xl mx-auto">
      {allImages.map((item, i) => (
        <BentoGridItem
          key={i}
          // title={item.title}
          // description={item.description}
          header={<Skeleton url={item} />}
          // icon={item.icon}
          className={
            (i - 3) % 7 == 0 || (i - 6) % 7 == 0 ? "md:col-span-2" : ""
          }
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = ({ url }: { url: string }) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl overflow-hidden">
    <Link
      href={new URL(url)}
      target="_blank"
      className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl"
    >
      {" "}
      <img
        src={url || "https://vacationsaga.b-cdn.net/placeholder.png"}
        alt="Placeholder"
        className="w-full h-full object-cover rounded-xl hover:scale-125 transition ease-in-out"
      />
    </Link>
  </div>
);
// const items = [
//   {
//     title: "The Dawn of Innovation",
//     description: "Explore the birth of groundbreaking ideas and inventions.",
//     header: <Skeleton />,
//     icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Digital Revolution",
//     description: "Dive into the transformative power of technology.",
//     header: <Skeleton />,
//     icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Art of Design",
//     description: "Discover the beauty of thoughtful and functional design.",
//     header: <Skeleton />,
//     icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Power of Communication",
//     description:
//       "Understand the impact of effective communication in our lives.",
//     header: <Skeleton />,
//     icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Pursuit of Knowledge",
//     description: "Join the quest for understanding and enlightenment.",
//     header: <Skeleton />,
//     icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Joy of Creation",
//     description: "Experience the thrill of bringing ideas to life.",
//     header: <Skeleton />,
//     icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
//   },
//   {
//     title: "The Spirit of Adventure",
//     description: "Embark on exciting journeys and thrilling discoveries.",
//     header: <Skeleton />,
//     icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
//   },
// ];
