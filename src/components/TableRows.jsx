import React, { useContext } from "react";
import CustomSelect from "./CustomSelect";
import { TableContext } from "../context/tableContext";
import { statuses } from "../lib/statuses";
import useModal from "../hooks/useModal";
import { Controller, useForm } from "react-hook-form";
import Pill from "./Pill";
import TableRowDetails from "./TableRowDetails";

const TableCell = ({ cellHeader, children, stageValue }) => {
  return (
    <td
      className={`border-b border-dark-gray py-2 px-4 h-full ${
        cellHeader === "date_applied"
          ? "format-to-highlight-more-than-10-days"
          : ""
      } ${stageValue === "2" ? "text-gray" : ""}`}
    >
      {children}
    </td>
  );
};

const TableRows = () => {
  const {
    tableData,
    rowClicked,
    setRowClicked,

    setRowData,
    manyRowsClicked,
    setManyRowsClicked,
    pageFilter,
    setModalState,
  } = useContext(TableContext);

  const { control } = useForm({});
  const dataToShow =
    pageFilter === "overview" ? tableData.sortedData : tableData.filteredData;

  const openModalDetails = (e, rowDetails) => {
    e.stopPropagation();
    setRowClicked(rowDetails.hiddenContent.id);
    setRowData(rowDetails);
    setModalState({
      type: "details",
      trigger: true,
      children: <TableRowDetails />,
    });
  };

  return dataToShow?.map((rowDetails, rowIndex) => {
    return (
      <tr
        className={`relative h-full hover:bg-light-gray cursor-pointer ${
          rowClicked === rowDetails.hiddenContent.id
            ? "bg-light-custom-blue"
            : ""
        }`}
        onClick={(e) => {
          openModalDetails(e, rowDetails);
        }}
        key={rowIndex}
      >
        <td className="border-b border-dark-gray py-2 px-4 w-8">
          <input
            id={rowDetails.hiddenContent.id}
            type="checkbox"
            value={rowDetails.hiddenContent.id}
            checked={manyRowsClicked.includes(rowDetails.hiddenContent.id)}
            onClick={(e) => {
              e.stopPropagation();
            }}
            onChange={(e) => {
              setManyRowsClicked((prev) => {
                if (e.target.checked) {
                  return [...prev, e.target.value];
                }
                return prev.filter((id) => id !== e.target.value);
              });
            }}
            className="mt-1 w-5 h-5"
          />
        </td>
        {Object.entries(rowDetails.shownContent).map(
          ([cellHeader, content]) => {
            if (cellHeader === "company") {
              return (
                <TableCell
                  cellHeader={cellHeader}
                  key={cellHeader}
                  stageValue={content}
                >
                  <div className="relative flex w-full h-full items-center">
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={rowDetails.hiddenContent.url}
                      target="_blank"
                      className={`group group-hover:text-custom-blue flex items-center h-full w-full font-semibold ${
                        rowDetails.hiddenContent.stage === "2"
                          ? "text-gray"
                          : ""
                      }`}
                    >
                      <div className="group-hover:text-custom-blue font-semibold w-full h-full">
                        {content}
                      </div>
                      <span className="absolute -right-4 group-hover:opacity-100 opacity-0 -rotate-45">
                        {"->"}
                      </span>
                    </a>
                  </div>
                  <Pill
                    condition={rowDetails.hiddenContent?.stage === "2"}
                    position={" top-1"}
                    text="Archived"
                    extraStyles={
                      "border-[0.5px] border-gray text-gray bg-white-smoke px-1 text-[9px]"
                    }
                  />
                </TableCell>
              );
            }

            return (
              <TableCell
                cellHeader={cellHeader}
                key={cellHeader}
                stageValue={rowDetails.hiddenContent.stage}
              >
                {cellHeader === "status" ? (
                  <Controller
                    name="status"
                    control={control}
                    render={() => (
                      <CustomSelect
                        options={statuses}
                        value={statuses.find(
                          (status) => status.value === content
                        )}
                        rowDetails={rowDetails}
                        rowId={rowDetails.hiddenContent.id}
                      />
                    )}
                  />
                ) : (
                  content
                )}
              </TableCell>
            );
          }
        )}
      </tr>
    );
  });
};

export default React.memo(TableRows);
