"use client";
import React, { FC, ReactNode, useContext, useEffect, useState } from "react";
import imagePng from "@/images/hero-right2.png";
import HeroSearchForm, {
  SearchTab,
} from "../(client-components)/(HeroSearchForm)/HeroSearchForm";
import Image, { StaticImageData } from "next/image";
import { useSearchParams } from "next/navigation";
import { MyContext } from "@/context/propertyContext";
import { PropertyDataType } from "@/data/types";

export interface SectionHeroArchivePageProps {
  className?: string;
  listingType?: ReactNode;
  // currentPage: "Stays" | "Experiences" | "Cars" | "Flights";
  currentPage: "Short Term Rentals" | "Long Term Rentals";
  currentTab: SearchTab;
  rightImage?: StaticImageData;
}

const places = [
  {
    id: "1",
    placename: "Greece",
    description:
      "Greece, a country of ancient history and stunning landscapes, offers visitors a blend of cultural heritage and natural beauty. Its sun-kissed islands are famous for white-washed houses and crystal-clear waters. The mainland is rich with ancient ruins, including the iconic Parthenon in Athens. Greek cuisine, with its Mediterranean flavors, is another highlight. Whether exploring vibrant cities or relaxing on serene beaches, Greece offers an unforgettable experience.",
  },
  {
    id: "2",
    placename: "Italy",
    description:
      "Italy is renowned for its rich cultural history, exquisite cuisine, and breathtaking landscapes. Visitors can explore world-famous landmarks like the Colosseum in Rome, the canals of Venice, and the art of Florence. The country is also known for its picturesque countryside, particularly in Tuscany. Italy's diverse regions offer something for everyone, from the rugged beauty of the Alps to the sunny beaches of the Amalfi Coast.",
  },
  {
    id: "3",
    placename: "Romania",
    description:
      "Romania is a country of rich folklore, medieval castles, and stunning natural landscapes. The Carpathian Mountains offer great hiking and skiing opportunities. The famous Bran Castle, often associated with Dracula, is a major attraction. Romania's vibrant cities, like Bucharest, blend history with modernity. Visitors can also explore the traditional villages of Transylvania and experience Romania's unique culture.",
  },
  {
    id: "4",
    placename: "Spain",
    description:
      "Spain is a country known for its diverse culture, vibrant cities, and stunning beaches. The architecture of Antoni Gaudí in Barcelona is world-renowned. Madrid, the capital, offers a rich blend of art, history, and nightlife. Spain is also famous for its culinary delights, including tapas and paella. Whether exploring the historic streets of Seville or relaxing on the Mediterranean coast, Spain has something to offer every traveler.",
  },
  {
    id: "5",
    placename: "Croatia",
    description:
      "Croatia is a country of pristine beaches, historic towns, and stunning natural parks. The Dalmatian Coast is famous for its crystal-clear waters and ancient cities like Dubrovnik. The country's national parks, such as Plitvice Lakes, offer breathtaking landscapes. Croatia's rich cultural heritage is reflected in its architecture, cuisine, and traditions. Visitors can enjoy both the vibrant coastal life and the serene countryside.",
  },
  {
    id: "6",
    placename: "Slovenia",
    description:
      "Slovenia is a small but diverse country, known for its stunning natural beauty and charming towns. Lake Bled, with its island church, is one of the most picturesque spots in Europe. The capital, Ljubljana, is a vibrant city with a mix of modern and medieval architecture. Slovenia is also home to beautiful caves, like Postojna, and the towering Julian Alps. The country offers a peaceful escape with plenty of outdoor activities.",
  },
  {
    id: "7",
    placename: "Slovakia",
    description:
      "Slovakia is a land of castles, mountains, and rich cultural heritage. The High Tatras mountains are a paradise for hikers and nature lovers. The capital, Bratislava, offers a blend of medieval charm and modern vibrancy. Slovakia is dotted with well-preserved castles, like Spiš Castle. Traditional Slovak cuisine, with hearty dishes like bryndzové halušky, is another highlight. The country offers a mix of history, culture, and outdoor adventure.",
  },
];

const SectionHeroArchivePage: FC<SectionHeroArchivePageProps> = ({
  className = "",
  listingType,
  currentPage,
  currentTab,
  rightImage = imagePng,
}) => {
  const searchParams = useSearchParams();
  const country: string = searchParams.get("place") || "";
  // const [allPropertiesTemp, setAllPropertiesTemp] = useState<PropertyDataType | undefined> (undefined);
  const [countryPropertyCount, setCountryPropertyCount] = useState(0);
  const [countryContext, setCountryContext] = useState<
    PropertyDataType | undefined
  >(undefined);
  const [placeCount, setPlaceCount] = useState<number>(0);
  const guests: number = searchParams.get("guests")
    ? Number(searchParams.get("guests"))
    : 2;

  const context = useContext(MyContext);

  let description = "We connect travelers with unique and diverse accommodations across multiple countries. Whether you're looking for a luxurious villa by the sea, a peaceful farmhouse in the countryside, a modern apartment in the heart of a city, or a cozy cottage for a serene getaway, we have the perfect property for every kind of traveler. Our extensive range of rentals includes holiday homes for families, stylish apartments for city explorers, and charming cottages for those seeking tranquility. With properties in stunning locations around the world, we make it easy for you to find the perfect place to stay, no matter your destination.";
  places.forEach((item) => {
    if (country === item.placename) {
      description = item.description;
    }
  });

  useEffect(() => {
    let countryCount = 0;
    let placeCount = 0;
    const contextArray = Array.isArray(context) ? context : [context];
    contextArray.forEach((property) => {
      if (property?.country === country && property?.guests[0] >= guests) {
        placeCount++;
      }
      if (property?.city === country && property?.guests[0] >= guests) {
        placeCount++;
      }
    });
    setCountryPropertyCount(countryCount);
    setPlaceCount(placeCount);
  }, [countryContext, context, country]);

  return (
    <div
      className={`nc-SectionHeroArchivePage flex flex-col relative ${className}`}
      data-nc-id="SectionHeroArchivePage"
    >
      <div className="flex flex-col lg:flex-row lg:items-center">
        <div className="flex-shrink-0 lg:w-1/2 flex flex-col items-start space-y-6 lg:space-y-10 pb-14 lg:pb-64 xl:pb-80 xl:pr-14 lg:mr-10 xl:mr-0">
          <h2 className="font-medium text-4xl md:text-5xl xl:text-7xl leading-[110%]">
            {country}
          </h2>
          <div className="flex items-center text-base md:text-lg text-neutral-500 dark:text-neutral-400">
            {country && <i className="text-2xl las la-map-marked"></i>}
            <span className="ml-2.5">{country} </span>
            <span className="mx-5"></span>
            {listingType ? (
              listingType
            ) : (
              <>
                {/* <i className="text-2xl las la-home"></i> */}
                {/* <span className="ml-2.5">{greecePropertyCount} Properties</span> */}
                {/* <span className="ml-2.5">{placeCount} Properties</span> */}
              </>
            )}
          </div>
          <div className=" text-lg text-neutral-500 mt-2">{description}</div>
        </div>
        <div className="flex-grow">
          <Image
            className="w-full"
            src={rightImage}
            alt="hero"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </div>
      </div>

      <div className="hidden lg:flow-root w-full">
        {/* <div className="z-10 lg:-mt-40 xl:-mt-56 w-full">
          <HeroSearchForm currentPage={currentPage} currentTab={currentTab} />
        </div> */}
      </div>
    </div>
  );
};

export default SectionHeroArchivePage;
