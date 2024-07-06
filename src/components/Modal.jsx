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
      className="fixed bg-dark-gray w-screen h-[90vh] top-[10vh] left-0 z-30 backdrop-blur-[2px] bg-opacity-10 "
    >
      <div className="fixed w-[50vw] left-[25vw]  h-[60vh] top-[15vh] bg-white z-40  bg-opacity-100 shadow-xl rounded-lg p-10 border-[8px] border-light-sea-logo">
        <button
          id="closeModal"
          onClick={onClose}
          className=" absolute top-1 right-1 p-2 rounded-full  w-auto h-auto flex items-center justify-center  "
        >
          <RiCloseFill size={24} />
        </button>
        <div className="w-full h-full flex ">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
