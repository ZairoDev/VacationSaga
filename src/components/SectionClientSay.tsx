"use client";

import Heading from "@/shared/Heading";
import React, { FC, useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import clientSayMain from "@/images/clientSayMain.png";
import clientSay1 from "@/images/clientSay1.png";
import clientSay2 from "@/images/clientSay2.png";
import clientSay3 from "@/images/clientSay3.png";
import clientSay4 from "@/images/clientSay4.png";
import clientSay5 from "@/images/clientSay5.png";
import clientSay6 from "@/images/clientSay6.png";
import quotationImg from "@/images/quotation.png";
import quotationImg2 from "@/images/quotation2.png";
import { MapPinIcon } from "@heroicons/react/24/outline";
import { AnimatePresence, motion, MotionConfig } from "framer-motion";
import Image from "next/image";
import { useSwipeable } from "react-swipeable";
import { variants } from "@/utils/animationVariants";
import { MdCancel } from "react-icons/md";

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

const SectionClientSay: FC<SectionClientSayProps> = ({
  className = "",
  data = DEMO_DATA,
}) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  function changeItemId(newVal: number) {
    if (newVal > index) {
      setDirection(1);
    } else {
      setDirection(-1);
    }
    setIndex(newVal);
  }

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < data?.length - 1) {
        changeItemId(index + 1);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        changeItemId(index - 1);
      }
    },
    trackMouse: true,
  });

  let currentItem = data[index];

  const renderBg = () => {
    return (
      <div className="hidden md:block">
        <Image
          className="absolute top-9 -left-20"
          src={clientSay1}
          alt="client 1"
        />
        <Image
          className="absolute bottom-[100px] right-full mr-40"
          src={clientSay2}
          alt="client 2"
        />
        <Image
          className="absolute top-full left-[140px]"
          src={clientSay3}
          alt="client 3"
        />
        <Image
          className="absolute -bottom-10 right-[140px]"
          src={clientSay4}
          alt="client 4"
        />
        <Image
          className="absolute left-full ml-32 bottom-[80px]"
          src={clientSay5}
          alt="client 5"
        />
        <Image
          className="absolute -right-10 top-10 "
          src={clientSay6}
          alt="client 6"
        />
      </div>
    );
  };

  const [isOpenReviewModal, setIsOpenReviewModal] = useState<boolean[]>(
    Array.from({ length: data.length }, () => false)
  );

  const openReviewModal = (index: number) => {
    console.log("index: ", index);
    const newModal = [...isOpenReviewModal];
    newModal[index - 1] = !isOpenReviewModal[index - 1];
    setIsOpenReviewModal(newModal);
  };

  const closeReviewModal = (index: number) => {
    console.log("index closed: ", index);
    const newModal = [...isOpenReviewModal];
    newModal[index - 1] = !isOpenReviewModal[index - 1];
    setIsOpenReviewModal(newModal);
  };

  const renderReviews = (index: number) => {
    return (
      <Transition appear show={isOpenReviewModal[index - 1]} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          // onClose={closeModalAmenities}
          onClose={() => closeReviewModal(index)}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block py-8 h-screen w-full max-w-2xl">
                <div className="inline-flex pb-2 flex-col w-full text-left align-middle transition-all transform overflow-hidden rounded-2xl bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 dark:text-neutral-100 shadow-xl h-full max-h-[40vh]">
                  <div className="relative flex-shrink-0 px-6 py-4 border-b border-neutral-200 dark:border-neutral-800 text-center">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900"
                      id="headlessui-dialog-title-70"
                    >
                      Reviews
                    </h3>
                    <span className="absolute left-3 top-3">
                      {/* <ButtonClose onClick={closeModalAmenities} /> */}
                      <button onClick={() => closeReviewModal(index)}>
                        <MdCancel className=" text-3xl"/>
                      </button>
                    </span>
                  </div>
                  <div className="px-8 py-4 overflow-auto text-neutral-700 dark:text-neutral-300 divide-y divide-neutral-200">
                    {currentItem.content}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  };

  return (
    <div className={`nc-SectionClientSay relative ${className} `}>
      <Heading desc="Let's see what people think of Vacation Saga" isCenter>
        Good news from far away
      </Heading>
      <div className="relative md:mb-16 max-w-2xl mx-auto">
        {renderBg()}
        <Image className="mx-auto" src={clientSayMain} alt="" />
        <div className={`mt-12 lg:mt-16 relative `}>
          <Image
            className="opacity-50 md:opacity-100 absolute -mr-16 lg:mr-3 right-full top-1"
            src={quotationImg}
            alt=""
          />
          <Image
            className="opacity-50 md:opacity-100 absolute -ml-16 lg:ml-3 left-full top-1"
            src={quotationImg2}
            alt=""
          />

          <MotionConfig
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
          >
            <div
              className={`relative whitespace-nowrap overflow-hidden`}
              {...handlers}
            >
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants(200, 1)}
                  initial="enter"
                  animate="center"
                  // exit="exit"
                  className="inline-flex flex-col items-center text-center whitespace-normal "
                >
                  <>
                    <span
                      className="block text-2xl line-clamp-3 overflow-hidden"
                      style={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        textOverflow: "ellipsis",
                      }}
                    >
                      {currentItem.content}
                    </span>
                    {/* <button onClick={(currentItem.id) => handleModal(currentItem.id)</>} className=" border-b"> */}
                    <button
                      onClick={() => openReviewModal(currentItem.id)}
                      className=" border-b"
                    >
                      See More
                    </button>
                    <span className="block mt-8 text-2xl font-semibold">
                      {currentItem.clientName}
                    </span>
                    <div className="flex items-center space-x-2 text-lg mt-2 text-neutral-400">
                      <MapPinIcon className="h-5 w-5" />
                      <span>{currentItem.clientAddress}</span>
                    </div>
                  </>
                </motion.div>
              </AnimatePresence>

              <div className="mt-10 flex items-center justify-center space-x-2">
                {data.map((item, i) => (
                  <button
                    className={`w-2 h-2 rounded-full ${
                      i === index ? "bg-black/70" : "bg-black/10 "
                    }`}
                    onClick={() => changeItemId(i)}
                    key={i}
                  />
                ))}
              </div>
            </div>
          </MotionConfig>
          {renderReviews(currentItem.id)}
        </div>
      </div>
    </div>
  );
};

export default SectionClientSay;
