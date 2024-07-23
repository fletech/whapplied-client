/// <reference types="vite/client" />

import { IStatusOption } from "../types/interfaces";
import { StylesConfig } from "react-select";
import chroma from "chroma-js";

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
    ":hover": {
      ...styles[":hover"],
      border: "1px solid #808080",
    },
    color: "#232b2b",
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
        ? "#808080"
        : isSelected
        ? chroma.contrast(color, "white") > 2
          ? "white"
          : "black"
        : data.color,
      cursor: isDisabled ? "not-allowed" : "default",
      fontWeight: 500,

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

export default colourStyles;
