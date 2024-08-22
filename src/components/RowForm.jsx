import React, { useContext } from "react";
import { get, useForm } from "react-hook-form";
import InputField from "./InputField";
import { statuses } from "../lib/statuses";
import { inputs } from "../lib/inputs";
import useData from "../hooks/useData";
import { TableContext } from "../context/tableContext";
import useModal from "../hooks/useModal";
import Pill from "./Pill";

const RowForm = ({ edit, hideActivityContent }) => {
  const { newItem, updateRow } = useData();
  const { rowData } = useContext(TableContext);
  const { closeModal } = useModal();

  let rowValues = edit
    ? {
        company: rowData.shownContent?.company || "",
        logs: rowData.hiddenContent?.logs || "",
        position: rowData.shownContent?.position || "",
        description: rowData.hiddenContent?.description || "",
        location: rowData.shownContent?.location || "",
        url: rowData.hiddenContent?.url || "",
        date_applied: rowData.hiddenContent?.rawDates?.rawDateApplied || "",
        status: rowData.shownContent?.status || "",
        id: rowData.hiddenContent?.id || "",
        stage: rowData.hiddenContent?.stage || "",
      }
    : {};

  const {
    control,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors, isDirty, isValid, dirtyFields },
  } = useForm({
    defaultValues: rowValues,
  });

  const onReset = () => {
    reset({
      company: "",
      position: "",
      description: "",
      location: "",
      url: "",
      date_applied: "",
      status: null,
      stage: "",
    });
    edit && closeModal();
  };

  const onSubmit = async (data) => {
    if (!isDirty) return;
    if (edit) {
      // const logString = generateLog("update", data, dirtyFields, rowValues);
      // data.logs = logString;
      hideActivityContent(false);
      await updateRow(data, dirtyFields, rowValues);
      return;
    }
    // const logString = generateLog("create");
    // data.logs = logString;
    await newItem(data);
    onReset();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full h-full"
      onReset={() => onReset()}
    >
      <div className="grid grid-cols-2 w-full h-auto gap-4 relative pt-4">
        <Pill
          condition={rowData.hiddenContent?.stage === "2"}
          position={"left-0 top-0"}
          text="Archived"
        />
        {inputs.map((input) => (
          <div
            key={input.label}
            className={`w-full mt-2 ${
              input.type === "textarea" ? "col-span-2" : ""
            }`}
          >
            <InputField
              id={input.inputLabel}
              label={input.label}
              name={input.inputLabel}
              type={input.type}
              required={input.required}
              options={input.type === "customSelect" ? statuses : undefined}
              control={control}
            />
          </div>
        ))}
      </div>

      <div className=" mt-6 w-full flex gap-4">
        <div className="w-1/2">
          {isDirty && (
            <button
              type="reset"
              className="cursor-pointer rounded-lg px-4 py-2 w-full h-[40px] text-soft-black font-semibold flex items-center  justify-center border border-soft-black"
            >
              {edit ? "Cancel" : "Reset"}
            </button>
          )}
        </div>
        <div className={` rounded-lg w-1/2  flex items-center relative`}>
          {/* {isSubmitting ? (
          ) : (
            ""
          )} */}
          <button
            type="submit"
            className={`rounded-lg px-4 py-2 w-full h-[40px] font-semibold flex items-center justify-center ${
              isDirty && isValid
                ? "bg-custom-blue cursor-pointer text-white"
                : "bg-gray cursor-not-allowed text-dark-gray click-events-none"
            }`}
          >
            <div className="flex items-center ">
              {isSubmitting ? (
                <span className="animate-ping size-4 rounded-full bg-white mr-4"></span>
              ) : (
                ""
              )}

              <span>
                {edit && isSubmitting
                  ? "Saving..."
                  : isSubmitting
                  ? "Saving..."
                  : edit
                  ? "Save"
                  : "Submit"}
              </span>
            </div>
          </button>
          {/* <input
            type="submit"
            value={
              edit && isSubmitting
                ? "Updating..."
                : isSubmitting
                ? "Submitting..."
                : edit
                ? "Update"
                : "Submit"
            }
            className={` rounded-lg  px-4 py-2 w-full h-[40px]  font-semibold flex items-center ${
              isDirty && isValid
                ? "bg-custom-blue cursor-pointer text-white"
                : "bg-gray cursor-not-allowed text-dark-gray click-events-none"
            }`}
          /> */}
        </div>
      </div>
    </form>
  );
};

export default RowForm;
