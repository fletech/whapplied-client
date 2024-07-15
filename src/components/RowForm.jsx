"useServer";

import React, { useContext } from "react";
import { useForm, Controller, get } from "react-hook-form";

import CustomSelect from "./CustomSelect";
import { statuses } from "../lib/statuses";
import { inputs } from "../lib/inputs";
import useData from "../hooks/useData";
import { TableContext } from "../context/tableContext";

const inputStyle =
  "border-[1px] border-dark-gray p-2 rounded-lg mt-[4px] w-full font-regular h-[40px] hover:border-gray text-soft-black";

const InputField = ({
  label,
  name,
  type,
  register,
  required,
  errors,
  options,
  control,
  value,
}) => {
  return (
    <div className="flex flex-col items-start w-full">
      <label className="text-custom-blue font-light pl-2">{name}</label>

      {type === "customSelect" && (
        <div className="flex flex-col w-full h-auto">
          <Controller
            name={label}
            control={control}
            rules={{ required: required }}
            render={({ field, fieldState }) => (
              <CustomSelect
                options={options}
                defaultValue={fieldState.default}
                value={field.value}
                onChange={(selected) => field.onChange(selected)}
              />
            )}
          />
        </div>
      )}

      {(type === "text" || type === "date") && (
        <input
          {...register(label, { required })}
          className={inputStyle}
          type={type}
        />
      )}
      {type === "textarea" && (
        <textarea
          {...register(label, { required })}
          className={`${inputStyle} max-h-[150px] resize-y `}
          type={type}
        />
      )}

      {errors[label] && (
        <small className="text-crimson font-light">
          This field is required
        </small>
      )}
    </div>
  );
};

const RowForm = ({ edit }) => {
  const { newItem } = useData();
  const { rowData } = useContext(TableContext);
  console.log(rowData);

  const rowValues = {
    company: rowData.shownContent?.company,
    position: rowData.shownContent?.position,
    description: rowData.hiddenContent?.description,
    location: rowData.shownContent?.location,
    url: rowData.hiddenContent?.url,
    date_applied: rowData.hiddenContent?.rawDates?.rawDateApplied,
    status: rowData.shownContent?.status,
    id: rowData.hiddenContent?.id,
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm({ defaultValues: edit ? rowValues : {} });

  const resetForm = () => {
    reset({
      company: "",
      position: "",
      description: "",
      location: "",
      url: "",
      date_applied: "",
      status: "",
      id: "",
    });
  };
  const onSubmit = async (data) => {
    await newItem(data);
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto p-2 ">
      <div className="grid grid-cols-2 w-full h-auto gap-4">
        {inputs.map((input) => (
          <div
            className={`w-full mt-2 ${
              input.type === "textarea" ? "col-span-2" : ""
            }`}
          >
            <InputField
              key={input.inputLabel}
              label={input.label}
              name={input.inputLabel}
              type={input.type}
              register={register}
              required={input.required}
              errors={errors}
              options={statuses}
              control={control}
            />
          </div>
        ))}
      </div>

      <div className="pr-2 mt-2 w-1/2">
        <input
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          className="cursor-pointer rounded-lg bg-custom-blue px-4 py-2 w-full h-[40px]  text-white font-semibold flex items-center p "
        />
      </div>
    </form>
  );
};

export default RowForm;

// import React, { useContext } from "react";
// import { useForm, Controller } from "react-hook-form";
// import CustomSelect from "./CustomSelect";
// import { statuses } from "../lib/statuses";
// import { inputs } from "../lib/inputs";
// import useData from "../hooks/useData";
// import { TableContext } from "../context/tableContext";

// const inputStyle =
//   "border-[1px] border-dark-gray p-2 rounded-lg mt-[4px] w-full font-regular h-[40px] hover:border-gray text-soft-black";

// const InputField = ({ label, name, type, required, options, control }) => {
//   return (
//     <div className="flex flex-col items-start w-full">
//       <label className="text-custom-blue font-light pl-2">{name}</label>

//       <Controller
//         name={label}
//         control={control}
//         rules={{ required: required }}
//         render={({ field, fieldState: { error } }) => (
//           <>
//             {type === "customSelect" ? (
//               <CustomSelect
//                 options={options}
//                 {...field}
//                 value={
//                   field.value
//                     ? options.find((option) => option.value === field.value)
//                     : null
//                 }
//                 onChange={(selected) =>
//                   field.onChange(selected ? selected.value : null)
//                 }
//               />
//             ) : type === "textarea" ? (
//               <textarea
//                 {...field}
//                 className={`${inputStyle} max-h-[150px] resize-y`}
//               />
//             ) : (
//               <input {...field} type={type} className={inputStyle} />
//             )}
//             {error && (
//               <small className="text-crimson font-light">
//                 This field is required
//               </small>
//             )}
//           </>
//         )}
//       />
//     </div>
//   );
// };

// const RowForm = ({ edit }) => {
//   const { newItem } = useData();
//   const { rowData } = useContext(TableContext);

//   const rowValues = edit
//     ? {
//         company: rowData.shownContent?.company || "",
//         position: rowData.shownContent?.position || "",
//         description: rowData.hiddenContent?.description || "",
//         location: rowData.shownContent?.location || "",
//         url: rowData.hiddenContent?.url || "",
//         date_applied: rowData.hiddenContent?.rawDates?.rawDateApplied || "",
//         status: rowData.shownContent?.status || "",
//         id: rowData.hiddenContent?.id || "",
//       }
//     : {};

//   const {
//     control,
//     handleSubmit,
//     reset,
//     formState: { isSubmitting },
//   } = useForm({
//     defaultValues: rowValues,
//   });

//   const resetForm = () => {
//     reset({
//       company: "",
//       position: "",
//       description: "",
//       location: "",
//       url: "",
//       date_applied: "",
//       status: "",
//       id: "",
//     });
//   };

//   const onSubmit = async (data) => {
//     await newItem(data);
//     resetForm();
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto p-2">
//       <div className="grid grid-cols-2 w-full h-auto gap-4">
//         {inputs.map((input) => (
//           <div
//             key={input.label}
//             className={`w-full mt-2 ${
//               input.type === "textarea" ? "col-span-2" : ""
//             }`}
//           >
//             <InputField
//               label={input.label}
//               name={input.inputLabel}
//               type={input.type}
//               required={input.required}
//               options={input.type === "customSelect" ? statuses : undefined}
//               control={control}
//             />
//           </div>
//         ))}
//       </div>

//       <div className="pr-2 mt-2 w-1/2">
//         <input
//           type="submit"
//           value={isSubmitting ? "Submitting..." : "Submit"}
//           className="cursor-pointer rounded-lg bg-custom-blue px-4 py-2 w-full h-[40px] text-white font-semibold flex items-center p"
//         />
//       </div>
//     </form>
//   );
// };

// export default RowForm;
