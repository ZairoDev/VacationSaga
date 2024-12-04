import React from "react";
import { LuLoader2 } from "react-icons/lu";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
  onDeny: () => void;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onAccept,
  onDeny,
  isLoading = false,
}) => {
  if (!isOpen) return null;

  const handleOutsideClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLDivElement).id === "modalOverlay") {
      onClose();
    }
  };

  return (
    <div
      id="modalOverlay"
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center "
      onClick={handleOutsideClick}
    >
      <div className="bg-slate-950 p-6 rounded-lg shadow-lg relative w-80 max-w-md">
        {/* Close Button */}
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Modal Content */}
        <h2 className="text-lg font-semibold mb-8">
          Do you really want to accept?
        </h2>

        {/* Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => {
              onDeny();
              onClose();
            }}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Deny
          </button>
          <button
            onClick={() => {
              onAccept();
              onClose();
            }}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            <p className=" flex items-center gap-x-2">
              Accept {isLoading && <LuLoader2 className=" animate-spin" />}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
