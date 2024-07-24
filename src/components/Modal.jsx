import React, { useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";

const Modal = ({ onClose, trigger, children }) => {
  const closeModalEscape = (e) => {
    if (e.key === "Escape") {
      onClose();
    }
  };

  useEffect(() => {
    if (trigger) {
      document.addEventListener("keydown", closeModalEscape);
      return () => document.removeEventListener("keydown", closeModalEscape);
    }
  });

  if (!trigger) {
    return null;
  }
  return (
    <div
      id="modal-backdrop"
      className="fixed bg-soft-black w-screen h-[90vh] top-[10vh] left-0 z-30 backdrop-blur-[2px] bg-opacity-30 "
    >
      <div className="fixed w-[50vw] left-[25vw]  h-[70vh] top-[10vh] bg-white z-40  bg-opacity-100 shadow-xl rounded-lg p-10 border-[8px] border-light-sea-logo overflow-auto">
        <button
          id="closeModal"
          onClick={onClose}
          className=" absolute top-1 right-1 p-2 rounded-full  w-auto h-auto flex items-center justify-center  "
        >
          <RiCloseFill size={24} />
        </button>
        <div className="w-full h-full flex items-stretch justify-center overflow-y-scroll">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
