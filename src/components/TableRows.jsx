import React, { useCallback, useContext, useEffect, useState } from "react";
import CustomSelect from "./CustomSelect";
import useSelected from "../hooks/useSelected";
import useData from "../hooks/useData";
import { TableContext } from "../context/tableContext";
import { statuses } from "../lib/statuses";
import useModal from "../hooks/useModal";

const TableRows = ({ openModal }) => {
  const { tableData, rowClicked } = useContext(TableContext);
  const { openModalDetails } = useModal();

  return tableData.sortedData?.map((rowDetails, rowIndex) => {
    return (
      <tr
        className={`relative h-full hover:bg-light-gray cursor-pointer ${
          rowClicked === rowDetails.hiddenContent.id ? "bg-dark-sea-logo" : ""
        }`}
        onClick={(e) => {
          openModalDetails(e, rowDetails);
        }}
        key={rowIndex}
      >
        {Object.entries(rowDetails.shownContent).map(
          ([cellHeader, content]) => {
            if (cellHeader === "company") {
              return (
                <td
                  className="group border-b border-dark-gray bg-"
                  key={cellHeader}
                >
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    href={rowDetails.hiddenContent.url}
                    target="_blank"
                    className="group-hover:text-custom-blue flex items-center py-4 px-4 w-full h-full font-semibold"
                  >
                    {content}
                    <span className="group-hover:opacity-100 opacity-0 ml-2 -rotate-45">
                      {"->"}
                    </span>
                  </a>
                </td>
              );
            }

            return (
              <td
                className={`border-b border-dark-gray py-2 px-4 h-full ${
                  cellHeader == "rating" || cellHeader == "date_applied"
                    ? "text-center"
                    : "text-left"
                } ${
                  cellHeader === "date_applied"
                    ? "format-to-highlight-more-than-10-days"
                    : ""
                }`}
                key={cellHeader}
              >
                {cellHeader === "status" ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    <CustomSelect
                      options={statuses}
                      value={statuses.find(
                        (status) => status.value === content
                      )}
                      rowDetails={rowDetails}
                    />
                  </div>
                ) : (
                  content
                )}
              </td>
            );
          }
        )}
      </tr>
    );
  });
};

export default React.memo(TableRows);
