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

"use client";
import React, { FC, Suspense } from "react";
import SectionGridFeaturePlaces from "./SectionGridFeaturePlaces";

const MainPageContent: FC = () => {
  return <SectionGridFeaturePlaces />;
};

const MainPage: FC = () => {
  return (
    <Suspense
      fallback={
        <div className="container py-24 flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-primary-6000 border-t-transparent mb-4"></div>
            <p className="text-neutral-600 dark:text-neutral-400">Loading...</p>
          </div>
        </div>
      }
    >
      <MainPageContent />
    </Suspense>
  );
};

export default MainPage;
