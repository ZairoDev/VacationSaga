// import rightImg from "@/images/about-hero-right.png";
// import React, { FC } from "react";
// import SectionFounder from "./SectionFounder";
// import SectionStatistic from "./SectionStatistic";
// import SectionHero from "./SectionHero";
// import BgGlassmorphism from "@/components/BgGlassmorphism";
// import BackgroundSection from "@/components/BackgroundSection";
// import SectionClientSay from "@/components/SectionClientSay";
// import SectionSubscribe2 from "@/components/SectionSubscribe2";

// export interface PageAboutProps {}

// const PageAbout: FC<PageAboutProps> = ({}) => {
//   return (
//     <div className={`nc-PageAbout overflow-hidden relative`}>
//       {/* ======== BG GLASS ======== */}
//       <BgGlassmorphism />

//       <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
//         <SectionHero
//           rightImg={rightImg}
//           heading="👋 About Us."
//           btnText=""
//           subHeading="We’re impartial and independent, and every day we create distinctive, world-class programmes and content which inform, educate and entertain millions of people in the around the world."
//         />

//         <SectionFounder />
//         <div className="relative py-16">
//           <BackgroundSection />
//           <SectionClientSay />
//         </div>

//         <SectionStatistic />

//         <SectionSubscribe2 />
//       </div>
//     </div>
//   );
// };

// export default PageAbout;

import { Metadata } from "next";
import React, { FC } from "react";

import rightImg from "@/images/vs-about-us.png";
import SectionClientSay from "@/components/SectionClientSay";
import SectionSubscribe2 from "@/components/SectionSubscribe2";
import BackgroundSection from "@/components/BackgroundSection";

import Ourfeature from "./Ourfeature";
import SectionHero from "./SectionHero";
import AdvertComponent from "./AdvertComponent";
import SectionStatistic from "./SectionStatistic";

export interface PageAboutProps { }

export const metadata: Metadata = {
  title: "About Us",
};

const PageAbout: FC<PageAboutProps> = ({ }) => {
  return (
    <div className={`nc-PageAbout overflow-hidden relative `}>
      <div className="container space-y-16 lg:space-y-28 ">
        <SectionHero
          rightImg={rightImg}
          heading="👋 About Us."
          btnText=""
          subHeading="Vacation Saga is a prime vacation holiday rental brand, welcoming guests by providing them suitable holiday lettings. We help our travellers to find ideal holiday homes and allow you to search holiday lettings easily by filtering the price range, date, amenities, according to your needs. Stays are extremely affordable in holiday apartments and country cottages."
        />
        <Ourfeature />
        <AdvertComponent />
        {/* <SectionFounder /> */}
        <SectionStatistic />
        <div className="relative py-16">
          <BackgroundSection />
          <SectionClientSay />
        </div>

        {/* <SectionStatistic /> */}

        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageAbout;
