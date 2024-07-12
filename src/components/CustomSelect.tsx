/// <reference types="vite/client" />

import React, { useCallback, useContext } from "react";
import Select, { StylesConfig } from "react-select";
import chroma from "chroma-js";
import { IStatusOption, IRowDetails } from "../types/interfaces";
import useSelected from "../hooks/useSelected";
import { RiCloseFill } from "react-icons/ri";

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 20,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 10,
    width: 10,
  },
});

const colourStyles: StylesConfig<IStatusOption> = {
  control: (styles) => ({
    ...styles,
    backgroundColor: "white",
    borderRadius: 8,
    height: "40px",
    marginTop: "4px",
    border: "1px solid #f1f1f1",
  }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    const color = chroma(data.color);
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? color.alpha(0.3).css()
        : undefined,
      color: isDisabled
        ? "#ccc"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",

      ":active": {
        ...styles[":active"],
        backgroundColor: !isDisabled
          ? isSelected
            ? data.color
            : color.alpha(0.5).css()
          : undefined,
      },
    };
  },
  input: (styles) => ({ ...styles, ...dot() }),
  placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
  singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
};

function CustomSelect({ options, value, rowDetails, onChange }) {
  const { isLoadingUI, errorUI, handleStatusChange } = useSelected(rowDetails);

  return (
    <div className="relative w-auto h-auto rounded-lg">
      <Select
        options={options}
        value={value}
        onChange={
          onChange ? onChange : (selected) => handleStatusChange(selected)
        }
        styles={colourStyles}
        placeholder="Applied?"
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
