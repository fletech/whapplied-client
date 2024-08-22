import { Controller } from "react-hook-form";
import CustomSelect from "./CustomSelect";

const inputStyle =
  "border-[1px] border-dark-gray p-2 rounded-lg mt-[4px] w-full font-regular h-[40px] hover:border-gray text-soft-black";

const formatDateForInput = (milliseconds) => {
  if (!milliseconds) return "";
  const date = new Date(parseInt(milliseconds));
  return date.toISOString().split("T")[0];
};

const InputField = ({ label, name, type, required, options, control }) => {
  return (
    <div className="flex flex-col items-start w-full">
      <label className="font-extrabold text-sm text-soft-black uppercase  ">
        {name}
      </label>

      <Controller
        name={label}
        control={control}
        rules={{ required: required }}
        render={({ field, fieldState: { error } }) => (
          <>
            {type === "customSelect" ? (
              <CustomSelect
                options={options}
                {...field}
                value={
                  field.value
                    ? options.find((option) => option.value === field.value)
                    : null
                }
                onChange={(selected) =>
                  field.onChange(selected ? selected.value : null)
                }
                defaultValue={""}
              />
            ) : type === "date" ? (
              <input
                {...field}
                type="date"
                className={inputStyle}
                value={formatDateForInput(field.value) || ""}
                onChange={(e) => {
                  const date = e.target.value ? new Date(e.target.value) : null;
                  field.onChange(date ? date.getTime().toString() : "");
                }}
              />
            ) : type === "textarea" ? (
              <textarea
                {...field}
                className={`${inputStyle} max-h-48 resize-y min-h-30 h-auto`}
              />
            ) : (
              <input {...field} type={type} className={inputStyle} />
            )}
            {error && (
              <small className="text-crimson font-light">
                This field is required
              </small>
            )}
          </>
        )}
      />

      {/* // <Controller
        //   name={label}
        //   control={control}
        //   rules={{ required: required }}
        //   render={({ field, fieldState: { error } }) => (
        //     <>
        //       {type === "customSelect" ? (
        //         <CustomSelect
        //           options={options}
        //           {...field}
        //           value={
        //             field.value
        //               ? options.find((option) => option.value === field.value)
        //               : null
        //           }
        //           onChange={(selected) =>
        //             field.onChange(selected ? selected.value : null)
        //           }
        //         />
        //       ) : type === "textarea" ? (
        //         <textarea
        //           {...field}
        //           className={`${inputStyle} max-h-[150px] resize-y`}
        //         />
        //       ) : (
        //         <input {...field} type={type} className={inputStyle} />
        //       )}
        //       {error && (
        //         <small className="text-crimson font-light">
        //           This field is required
        //         </small>
        //       )}
        //     </>
        //   )}
        // /> */}
    </div>
  );
};

export default InputField;
