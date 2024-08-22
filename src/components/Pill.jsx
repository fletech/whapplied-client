import React from "react";

const Pill = ({ position, condition, text, extraStyles }) => {
  //   const positionClass = {
  //     right: position?.right || "",
  //     _right: position?._right || "",
  //     left: position?.left || "",
  //     _left: position?._left || "",
  //     top: position?.top || "",
  //     _top: position?._top || "",
  //     bottom: position?.bottom || "",
  //     _bottom: position?._bottom || "",
  //   ${positionClass.right}
  //   ${positionClass._right}
  //   ${positionClass.left}
  //   ${positionClass._left}
  //   ${positionClass.top}
  //   ${positionClass._top}
  //   ${positionClass.bottom}
  //   ${positionClass._bottom}
  //   };
  return (
    condition && (
      <span
        className={`absolute   w-auto h-auto bg-gainsboro rounded flex text-[10px] px-2 text-gray ${position} ${extraStyles}
      `}
      >
        {text}
      </span>
    )
  );
};

export default Pill;
