import ButtonPrimary from "@/shared/ButtonPrimary";
import React from "react";

interface PopupCardProps {
  message: string;
  onClose: () => void;
}

const PopupCard: React.FC<PopupCardProps> = ({ message, onClose }) => {
  return (
    <div className=" absolute inset-0 flex  items-center justify-center z-50">
      <div className="fixed inset-0 bg-black  bg-opacity-50 backdrop-blur-sm"></div>
      <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-sm mx-auto z-10">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {message}
        </h2>
        <div className="mt-4 flex justify-end">
          <ButtonPrimary onClick={onClose} className="">
            Got it
          </ButtonPrimary>
        </div>
      </div>
    </div>
  );
};

export default PopupCard;
