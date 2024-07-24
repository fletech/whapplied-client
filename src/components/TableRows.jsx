import React, { useContext } from "react";
import CustomSelect from "./CustomSelect";
import { TableContext } from "../context/tableContext";
import { statuses } from "../lib/statuses";
import useModal from "../hooks/useModal";
import { Controller, useForm } from "react-hook-form";

const TableCell = ({ cellHeader, children }) => {
  return (
    <td
      className={`border-b border-dark-gray py-2 px-4 h-full ${
        cellHeader === "date_applied"
          ? "format-to-highlight-more-than-10-days"
          : ""
      }`}
    >
      {children}
    </td>
  );
};

const TableRows = () => {
  const {
    tableData,
    rowClicked,
    manyRowsClicked,
    setManyRowsClicked,
    pageFilter,
  } = useContext(TableContext);
  const { openModalDetails } = useModal();
  const { control } = useForm({});

  const dataToShow =
    pageFilter === "overview" ? tableData.sortedData : tableData.filteredData;

  return dataToShow?.map((rowDetails, rowIndex) => {
    return (
      <tr
        className={`relative h-full hover:bg-light-gray cursor-pointer ${
          rowClicked[0] === rowDetails.hiddenContent.id && rowClicked.length > 1
            ? "bg-dark-sea-logo"
            : ""
        }`}
        onClick={(e) => {
          e.stopPropagation();
          openModalDetails(e, rowDetails);
        }}
        key={rowIndex}
      >
        <td className="border-b border-dark-gray py-2 px-4 w-10">
          <input
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
            className="w-4 h-4"
          />
        </td>
        {Object.entries(rowDetails.shownContent).map(
          ([cellHeader, content]) => {
            if (cellHeader === "company") {
              return (
                <TableCell cellHeader={cellHeader} key={cellHeader}>
                  <div className="relative flex w-full h-full items-center">
                    <a
                      onClick={(e) => e.stopPropagation()}
                      href={rowDetails.hiddenContent.url}
                      target="_blank"
                      className="group group-hover:text-custom-blue flex items-center h-full w-full font-semibold"
                    >
                      <div className="group-hover:text-custom-blue font-semibold w-full h-full">
                        {content}
                      </div>
                      <span className="absolute -right-4 group-hover:opacity-100 opacity-0 -rotate-45">
                        {"->"}
                      </span>
                    </a>
                  </div>
                </TableCell>
              );
            }

            return (
              <TableCell cellHeader={cellHeader} key={cellHeader}>
                {cellHeader === "status" ? (
                  <div onClick={(e) => e.stopPropagation()}>
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
                        />
                      )}
                    />
                  </div>
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
