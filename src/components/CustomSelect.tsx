import React from "react";
import Select from "react-select";
import useSelected from "../hooks/useSelected";
import { RiCloseFill } from "react-icons/ri";
import colourStyles from "./CustomSelectStyles";

function CustomSelect({
  options,
  value,
  rowDetails,
  onChange,
  defaultValue,
  rowId,
}) {
  const { isLoadingUI, errorUI, handleStatusChange } = useSelected();
  return (
    <div
      className="relative w-full h-auto rounded-lg"
      onClick={(e) => e.stopPropagation()}
    >
      <Select
        options={options}
        value={value || defaultValue}
        onChange={
          onChange
            ? onChange
            : (selected) => handleStatusChange(selected, value, rowId)
        }
        styles={colourStyles}
        placeholder="Have you applied?"
        className="font-regular text-gray mb-1 w-full"
        // maxMenuHeight={400}
      />
      {isLoadingUI && (
        <div className="absolute px-3 top-0 left-0 w-full h-full bg-white-smoke border-[1px] border-custom-blue rounded-lg opacity-90 z-60 text-custom-blue font-semibold flex items-center justify-start transition">
          <div className="w-[8px] rounded-full h-[8px] bg-custom-blue animate-ping"></div>
          <p className="ml-2">Saving...</p>
        </div>
      )}
      {errorUI && (
        <div className="absolute px-4 top-0 left-0 w-full h-full bg-white-smoke border-[3px] border-red rounded-lg opacity-90 z-60 text-red font-semibold flex items-center justify-start">
          <RiCloseFill size={24} />
          <p className="ml-2">Error</p>
        </div>
      )}
    </div>
  );
}

export default CustomSelect;
