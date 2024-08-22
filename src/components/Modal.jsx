import React, { useContext, useEffect } from "react";
import { RiCloseFill } from "react-icons/ri";
import { TableContext } from "../context/tableContext";

const Modal = ({ onClose, trigger, children }) => {
  const { modalState } = useContext(TableContext);
  const closeModalEscape = (e) => {
    if (e.key === "Escape") {
      onClose();
    }

    if (e.target.id === "modal-backdrop") {
      console.log("clicked outside");
      onClose();
    }
  };

  useEffect(() => {
    if (trigger) {
      document.addEventListener("keydown", closeModalEscape);
      document.addEventListener("mousedown", closeModalEscape);

      return () => {
        document.removeEventListener("keydown", closeModalEscape);
        document.removeEventListener("mousedown", closeModalEscape);
      };
    }
  });

  if (!trigger) {
    return null;
  }
  return (
    <div
      id="modal-backdrop"
      className="fixed bg-soft-black w-screen h-[90vh] top-[10vh] left-0 z-30 backdrop-blur-[1px] bg-opacity-40"
    >
      <div className="fixed w-[50vw] right-[0vw]  h-[90vh] top-[0vh] bg-white z-100  bg-opacity-100 shadow-xl rounded-s-lg p-2 border-[1px] border-gray ">
        {/* <div className="fixed w-[50vw] left-[25vw]  h-[70vh] top-[10vh] bg-white z-40  bg-opacity-100 shadow-xl rounded-lg p-2 border-[1px] border-gray "> */}
        <button
          id="closeModal"
          onClick={onClose}
          className=" fixed top-[1dvh] right-[47dvw] p-2 rounded-full  w-auto h-auto flex items-center justify-center z-20 "
        >
          {/* <button
          id="closeModal"
          onClick={onClose}
          className=" fixed top-[12vh] right-[26vw] p-2 rounded-full  w-auto h-auto flex items-center justify-center z-20 "
        > */}
          <RiCloseFill size={24} />
        </button>
        <div
          className={`w-full h-full flex items-start justify-center overflow-y-scroll p-8 ${
            trigger
              ? "animate-fade-in transition-all duration-300"
              : "animate-fade-out transition-all"
          }`}
        >
          {modalState?.children || children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
