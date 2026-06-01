// import React, { FC } from "react";
// import LocationInput from "../LocationInput";
// import GuestsInput from "../GuestsInput";
// import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";

// export interface ExperiencesSearchFormProps {}

// const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = ({}) => {
//   const renderForm = () => {
//     return (
//       <form className="w-full relative mt-8 flex flex-col md:flex-row  rounded-3xl md:rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ">
//         <LocationInput className="flex-[1.5]" />
//         <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
//         <ExperiencesDateSingleInput className="flex-1" />
//         <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div>
//         <GuestsInput
//           className="flex-1"
//           buttonSubmitHref="/listing-experiences"
//         />
//       </form>
//     );
//   };

//   return renderForm();
// };

// export default ExperiencesSearchForm;

import React, { FC } from "react";
import LocationInput from "../LocationInput";
import GuestsInput from "../GuestsInput";
import ExperiencesDateSingleInput from "./ExperiencesDateSingleInput";
import { SearchInputContext, SearchInputProvider } from "@/context/SearchInput";
import { useMedia } from "react-use";

export interface ExperiencesSearchFormProps {
  rentalType?: string;
  formClassName?: string;
  monthlyStays?: boolean;
  onMonthlyStaysChange?: (value: boolean) => void;
}

const ExperiencesSearchForm: FC<ExperiencesSearchFormProps> = ({
  rentalType,
  formClassName = "",
  monthlyStays = true,
  onMonthlyStaysChange,
}) => {
  const isMobile = useMedia("(max-width: 640px)", true);
  const renderForm = () => {

    if (isMobile) {
      return (
        <SearchInputProvider>
          <form
            className={`w-full relative mt-8 flex flex-col shadow-xl dark:shadow-2xl rounded-lg bg-white dark:bg-neutral-800 ${formClassName}`}
          >
            <LocationInput className="flex-[1.5]" />
            {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
            <ExperiencesDateSingleInput className="flex-1" />
            {/* <div className="self-center border-r border-slate-200 dark:border-slate-700 h-8"></div> */}
            <GuestsInput
              className="flex-1"
              rentalType={rentalType}
              monthlyStays={monthlyStays}
              onMonthlyStaysChange={onMonthlyStaysChange}
            />
          </form>
        </SearchInputProvider>
      );
    }

    return (
      <SearchInputProvider>
        <form
          className={`w-full relative mt-8 flex items-center rounded-full shadow-xl dark:shadow-2xl bg-white dark:bg-neutral-800 ${formClassName}`}
        >
          <LocationInput className="flex-[1.5]" />
          <div className="self-center h-10 w-px bg-neutral-200/80 dark:bg-neutral-700" />
          <ExperiencesDateSingleInput className="flex-1" />
          <div className="self-center h-10 w-px bg-neutral-200/80 dark:bg-neutral-700" />
          <GuestsInput
            className="flex-1"
            rentalType={rentalType}
            monthlyStays={monthlyStays}
            onMonthlyStaysChange={onMonthlyStaysChange}
          />
        </form>
      </SearchInputProvider>
    );
  };

  return renderForm();
};

export default ExperiencesSearchForm;

