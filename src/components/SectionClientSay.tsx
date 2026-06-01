"use client";

import React, { FC, useMemo, useState } from "react";
import clientSay1 from "@/images/clientSay1.png";
import clientSay2 from "@/images/clientSay2.png";
import clientSay3 from "@/images/clientSay3.png";
import clientSay4 from "@/images/clientSay4.png";
import clientSay5 from "@/images/clientSay5.png";
import clientSay6 from "@/images/clientSay6.png";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";

export interface SectionClientSayProps {
  className?: string;
  data?: typeof DEMO_DATA;
}

const DEMO_DATA = [
  {
    id: 1,
    clientName: "Alex Tarran - Customer",
    clientAddress: "Greece",
    content:
      "I’m settled in very well now to the long-term rental apartment that Vacation Saga in particular helped me find. I found the traditional agents mostly very unresponsive (or rude) and online advertisements were often not up to date or duplicated by several agencies. Vacation Saga actually understood what to do. Their online agent sent me many photos of available properties, honed these for price and requirements, and the on-the-ground agent met me to show me around (and meet the owner when s/he was free). All properties I visited were owned by Greek nationals (as I wanted), who, like me, had decided to avoid traditional agents. All the paperwork was done in person with the owner and with lawyers. When I said I’d prefer not to send documents to go to the owner through Vacation Saga, Abhay completely understood and we arranged an in-person meet with the owner. It’s best to think of Vacation Saga for long-term rentals as an introduction agency, like traditional agencies, but one that, for a change, does its job extremely well. I didn’t find a property that was too expensive. For the charge and the work involved, I got really good value and have already recommended the company to friends.",
  },
  {
    id: 2,
    clientName: "Eva Luksic - Customer",
    clientAddress: "Slovenia",
    content:
      "I was very stressed when looking for accommodation in Athens, since there are scammers everywhere. Therefore I’m very thankful i came across their page, because they found us the best possible landlord.",
  },
  {
    id: 3,
    clientName: "Elena Z - Customer",
    clientAddress: "Greece",
    content:
      "The whole experience with Saga company is great. High level professional profile, great and easy communication, quick support, safe and clear terms and conditions rules. Happy to corporate with Sagas. Definitely recommend for any kind of service you may need for your vacation.",
  },
  {
    id: 4,
    clientName: "Alrick Blokland - Customer",
    clientAddress: "Greece",
    content:
      "Very fast finding a nice place, always available and have a solution for everything, found a 2 bedroom in Athens, highly recommend",
  },
  {
    id: 5,
    clientName: "Romy Valentijn - Customer",
    clientAddress: "Nethlerland",
    content:
      "Had some issues In the beginning, but he has found another great place for me to stay In very fast. Nice area. He very empathetic and really helps out. Great service!",
  },
  {
    id: 6,
    clientName: "Andrea Gachuz - Customer",
    clientAddress: "Nethlerland",
    content:
      "I used their services to rent an apartment in Thessaloniki for my semester there, after having much trouble finding something suitable and they help me out so much. The communication was really good, even with the big time difference (I come from Mexico). Also, they were always really nice and patient to follow through with a lot of options until we found the perfect match. They asked me for my budget and the requirements that I was looking for and, they found me the perfect place. I was a little hesitant at first to make the deal, since my cousin got scammed by another company, but I'm glad I did it cause everything turned out great. I'm actively recommending their services to family and friends, and I can tell you that if you're looking for accomodation, this is a great way to go and a safe bet so you don't lose your money.",
  },
  {
    id: 7,
    clientName: "Alessandro Darmian - Customer",
    clientAddress: "Nethlerland",
    content:
      "The agent is very professional and helped me out for my vacation rental, the apartment was clean and the landlord is very helfpul, Good Service I am happy.",
  },
  {
    id: 8,
    clientName: "Luana - Customer",
    clientAddress: "Italy",
    content:
      "I recently transferred a hold fee from one home to another. I was a bit worried about it would work but the agent and his team made it so easy. agent call me right away and input all the information needed to transfer my application and hold my fee to another home. I really appericate the support.",
  },
  {
    id: 9,
    clientName: "Eva Kalbaki - Customer",
    clientAddress: "Greece",
    content:
      "They made sure that the apartment was clean and nice and also helped to have a good communication with the landlord. He always answered my questions and made sure I was pleased with the apartment. I definitely recommend him and I would choose him again.",
  },
  {
    id: 10,
    clientName: "Andrea Gachuz - Customer",
    clientAddress: "Greece",
    content:
      "I used their services to rent an apartment in Thessaloniki for my semester there, after having much trouble finding something suitable and they help me out so much. The communication was really good, even with the big time difference (I come from Mexico). Also, they were always really nice and patient to follow through with a lot of options until we found the perfect match. They asked me for my budget and the requirements that I was looking for and, they found me the perfect place. I was a little hesitant at first to make the deal, since my cousin got scammed by another company, but I'm glad I did it cause everything turned out great. I'm actively recommending their services to family and friends, and I can tell you that if you're looking for accomodation, this is a great way to go and a safe bet so you don't lose your money.",
  },
];

function getFlagEmoji(country: string) {
  const c = country.toLowerCase();
  if (c.includes("united kingdom") || c.includes("uk")) return "🇬🇧";
  if (c.includes("greece")) return "🇬🇷";
  if (c.includes("france")) return "🇫🇷";
  if (c.includes("italy")) return "🇮🇹";
  if (c.includes("slovenia")) return "🇸🇮";
  if (c.includes("mexico")) return "🇲🇽";
  if (c.includes("netherland") || c.includes("netherlands")) return "🇳🇱";
  return "🌍";
}

const SectionClientSay: FC<SectionClientSayProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const avatars = useMemo(
    () => [clientSay1, clientSay2, clientSay3, clientSay4, clientSay5, clientSay6],
    []
  );

  const pageSize = 3;
  const pages = useMemo(() => {
    const out: typeof DEMO_DATA[] = [];
    for (let i = 0; i < data.length; i += pageSize) {
      out.push(data.slice(i, i + pageSize));
    }
    return out;
  }, [data]);

  const [page, setPage] = useState(0);
  const canPrev = pages.length > 1;
  const canNext = pages.length > 1;

  const goPrev = () => {
    setPage((p) => (pages.length ? (p - 1 + pages.length) % pages.length : 0));
  };
  const goNext = () => {
    setPage((p) => (pages.length ? (p + 1) % pages.length : 0));
  };

  return (
    <div className={`nc-SectionClientSay relative w-full ${className}`}>
      <div className="mb-6 flex items-center">
        <h2 className="text-2xl font-semibold text-neutral-900 dark:text-neutral-100">
          Loved by travelers worldwide
        </h2>
      </div>

      <div className="relative">
        <button
          type="button"
          aria-label="Previous reviews"
          onClick={goPrev}
          disabled={!canPrev}
          className={`absolute left-0 top-1/2 z-10 hidden -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 p-3 shadow-sm backdrop-blur transition hover:shadow-md disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900/90 md:flex`}
        >
          <ChevronLeftIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
        </button>

        <button
          type="button"
          aria-label="Next reviews"
          onClick={goNext}
          disabled={!canNext}
          className={`absolute right-0 top-1/2 z-10 hidden translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-neutral-200 bg-white/95 p-3 shadow-sm backdrop-blur transition hover:shadow-md disabled:opacity-40 dark:border-neutral-700 dark:bg-neutral-900/90 md:flex`}
        >
          <ChevronRightIcon className="h-5 w-5 text-neutral-700 dark:text-neutral-200" />
        </button>

        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${page * 100}%)` }}
          >
            {pages.map((pageItems, pageIndex) => (
              <div key={pageIndex} className="w-full flex-shrink-0">
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {pageItems.map((item, i) => {
                    const avatar = avatars[(pageIndex * pageSize + i) % avatars.length];
                    const flag = getFlagEmoji(item.clientAddress);
                    return (
                      <div
                        key={item.id}
                        className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm dark:border-neutral-700 dark:bg-neutral-900"
                      >
                        <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                          <span className="line-clamp-4">{item.content}</span>
                        </p>

                        <div className="mt-6 flex items-end justify-between gap-4">
                          <div>
                            <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
                              {item.clientName}
                            </p>
                            <p className="mt-1 flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                              <span className="text-sm">{flag}</span>
                              <span>{item.clientAddress}</span>
                            </p>
                          </div>
                          <div className="relative h-12 w-12 overflow-hidden rounded-full border border-neutral-200 dark:border-neutral-700">
                            <Image
                              src={avatar}
                              alt={item.clientName}
                              fill
                              className="object-cover"
                              sizes="48px"
                            />
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2">
          {pages.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to reviews page ${i + 1}`}
              onClick={() => setPage(i)}
              className={`h-2 w-2 rounded-full ${
                i === page ? "bg-customOrange" : "bg-neutral-300/70 dark:bg-neutral-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
