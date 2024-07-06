import React, { useCallback, useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/sessionContext";
import axios from "axios";
import useData from "../hooks/useData";
import CustomSelect from "./CustomSelect";
import useSelected from "../hooks/useSelected";
import { isOlderThan } from "../lib/utils";

const DashboardTable = ({ rowClicked, setRowClicked, setRowData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const updateStatus = useSelected();
  const { filteredHeaders, sortedData } = useData(setError, setLoading);
  const [tableData, setTableData] = useState([]);

  const dataFetched = sortedData.length > 0;

  useEffect(() => {
    setTableData(sortedData);
  }, [sortedData]);

  console.log(dataFetched);

  const statuses = [
    { value: "applied", label: "Applied", color: "#333" },
    {
      value: "screening",
      label: "Screening call",
      color: "#0043ce",
    },
    {
      value: "interviewing",
      label: "Interviewing",
      color: "#f1c21b",
    },
    {
      value: "waitingOffer",
      label: "Waiting for an offer",
      color: "#ff832b",
    },
    { value: "offer", label: "Got Offer", color: "#8a3ffc" },
    { value: "accepted", label: "Accepted!", color: "#24A148" },
    { value: "rejected ", label: "Rejected", color: "#da1e28" },
    { value: "ghosted", label: "Ghosted", color: "#6f6f6f" },
    { value: "other", label: "Other", color: "#8e6a00" },
  ];

  const handleStatusChange = useCallback(
    async (selected, rowId) => {
      try {
        await updateStatus(selected, rowId);
        setTableData((prevData) =>
          prevData.map((row) =>
            row.hiddenContent.id === rowId
              ? {
                  ...row,
                  shownContent: { ...row.shownContent, status: selected.value },
                }
              : row
          )
        );
      } catch (error) {
        console.error("Failed to update status:", error);
      }
    },
    [updateStatus]
  );

  const formatTableHeaders = () => {
    return filteredHeaders.map((header, cellIndex) => {
      return (
        <th className=" px-4 py-4 text-left z-20" key={header}>
          {header}
        </th>
      );
    });
  };

  const formatTableRows = () => {
    return tableData.map((rowDetails, rowIndex) => {
      return (
        <tr
          className={`m-  relative h-full hover:bg-light-gray cursor-pointer ${
            rowClicked === rowDetails.hiddenContent.id ? "bg-dark-sea-logo" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (rowClicked === rowDetails.hiddenContent.id) {
              setRowClicked("");
              setRowData({});
              return;
            }
            setRowClicked(rowDetails.hiddenContent.id);
            setRowData(rowDetails);
          }}
          key={rowIndex}
        >
          {Object.keys(rowDetails.shownContent).map((cellHeader) => {
            let content = rowDetails.shownContent[cellHeader];

            if (cellHeader === "company") {
              return (
                <td
                  className="group border-b border-dark-gray bg-light-sea-logo "
                  key={cellHeader}
                >
                  <a
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                    href={rowDetails.hiddenContent.url}
                    target="_blank"
                    className="group-hover:text-custom-blue flex items-center py-4 px-4 w-full h-full"
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
                } ${cellHeader === "date_applied" ? "" : ""}`}
                key={cellHeader}
              >
                {cellHeader === "status" ? (
                  <div onClick={(e) => e.stopPropagation()}>
                    <CustomSelect
                      options={statuses}
                      value={statuses.find(
                        (status) => status.value === content
                      )}
                      onChange={(selected) =>
                        handleStatusChange(
                          selected,
                          rowDetails.hiddenContent.id
                        )
                      }
                    />
                  </div>
                ) : (
                  content
                )}
              </td>
            );
          })}
        </tr>
      );
    });
  };

  console.log("rendering table");

  if (error) {
    return (
      <div className="flex justify-center items-center h-full">{error}</div>
    );
  }
  if (loading) {
    return (
      <div className="flex justify-center items-center h-full">Loading</div>
    );
  }

  return (
    <table
      className={`pr-8 table-auto text-soft-black w-full rounded-sm border-collapse relative ${
        rowClicked !== "" ? "pointer-events-none" : ""
      }`}
    >
      <thead className=" sticky top-[10vh]  rounded-xl bg-light-gray z-10 opacity-90  border-b border-dark-cyan">
        <tr className="relative">{dataFetched && formatTableHeaders()}</tr>
      </thead>
      <tbody className="w-full relative">
        {dataFetched && formatTableRows()}
      </tbody>
    </table>
  );
};
export default DashboardTable;
