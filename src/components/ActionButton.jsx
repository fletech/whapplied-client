const ActionButton = (props) => {
  const { onClick, hoverBorderColor, tooltip, children } = props;
  return (
    <div className="group relative">
      <button
        className={` text-soft-black px-2 py-1 transition-all rounded-lg hover:bg-gainsboro border-[2px] border-white hover:border-${hoverBorderColor} hover:shadow-lg mt-4 w-auto font-semibold flex items-center`}
        onClick={onClick}
      >
        {children}
      </button>
      <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-soft-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {tooltip}
      </span>
    </div>
  );
};
export default ActionButton;
