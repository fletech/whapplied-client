import React, { useCallback, useContext } from "react";
import { useForm, Controller } from "react-hook-form";
import { SessionContext } from "../context/sessionContext";
import axios from "axios";
import { TableContext } from "../context/tableContext";
import CustomSelect from "./CustomSelect";
import { statuses } from "../lib/statuses";
import useData from "../hooks/useData";

const inputStyle =
  "border-[1px] border-dark-gray p-2 rounded-lg mt-[4px] w-full font-semibold h-[40px]";
const inputs = [
  {
    inputLabel: "Company name",
    label: "company_name",
    required: true,
    type: "",
    readOnly: false,
  },

  {
    inputLabel: "Position",
    label: "position",
    required: true,
    type: "",
    readOnly: false,
  },
  {
    inputLabel: "URL",
    label: "url",
    required: true,
    type: "",
    readOnly: false,
  },
  {
    inputLabel: "Location",
    label: "location",
    required: true,
    type: "",
    readOnly: false,
  },

  {
    inputLabel: "Status",
    label: "status",
    required: true,
    type: "customSelect",
    readOnly: false,
  },

  {
    inputLabel: "Date Applied",
    label: "date_applied",
    required: true,
    type: "date",
    readOnly: true,
  },
  {
    inputLabel: "Description",
    label: "description",
    required: true,
    type: "textarea",
    readOnly: false,
  },
];

const InputField = ({ label, name, type, register, required, errors }) => {
  return (
    <div className="flex flex-col items-start w-full">
      <label className="text-custom-blue font-light pl-2">{name}</label>
      <input
        {...register(label, { required })}
        className={inputStyle}
        type={type}
      />
      {errors[label] && (
        <small className="text-crimson font-light">
          This field is required
        </small>
      )}
    </div>
  );
};

const RowForm = ({ formType }) => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { setModified } = useData();

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
    control,
  } = useForm();

  const onSubmit = useCallback(
    async (data) => {
      console.log(data.date_applied);

      try {
        const response = await axios.post("/api/v1/data/new-record", {
          accessToken: user.accessToken,
          spreadSheetId: user.spreadSheetId,
          data: data,
        });

        if (response.status !== 200) {
          throw new Error("Error saving selected option");
        }
        setModified(true);

        reset({
          company_name: "",
          position: "",
          description: "",
          location: "",
          url: "",
          date_applied: "",
          status: "",
          id: "",
        });
      } catch (err) {
        console.error("Error saving selected option:", err);
        throw err;
      }
    },
    [user]
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full h-auto p-2 ">
      <div className="grid grid-cols-2 w-full h-full gap-4">
        {inputs.map((input) => {
          if (input.type === "customSelect") {
            return (
              <div className="flex flex-col w-full h-auto">
                <label className="text-custom-blue font-light pl-2">
                  {input.inputLabel}
                </label>
                <Controller
                  name={input.label}
                  control={control}
                  rules={{ required: input.required }}
                  render={({ field }) => (
                    <CustomSelect
                      options={statuses}
                      value={field.value}
                      onChange={(selected) => field.onChange(selected)}
                    />
                  )}
                />
              </div>
            );
          } else {
            return (
              <InputField
                key={input.inputLabel}
                label={input.label}
                name={input.inputLabel}
                type={input.type}
                register={register}
                required={input.required}
                errors={errors}
              />
            );
          }
        })}
      </div>

      <div className="mr-4 mt-2">
        <input
          type="submit"
          value={isSubmitting ? "Submitting..." : "Submit"}
          className="cursor-pointer rounded-lg bg-custom-blue px-4 py-2 w-1/2 h-[40px]  text-white font-semibold flex items-center p "
        />
      </div>
    </form>
  );
};

export default RowForm;
