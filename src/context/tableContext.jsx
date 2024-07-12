// interface ITableSessionProviderProps {
//   children: React.ReactNode;
// }

import React, { createContext, useEffect, useMemo, useState } from "react";
import { formatDate } from "../lib/formatDate";
import RowForm from "../components/RowForm";
import TableRowDetails from "../components/TableRowDetails";
import useData from "../hooks/useData";
// import { ITableData, ITableContext } from "../types/interfaces";

const TableContext = createContext();

const TableProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rowClicked, setRowClicked] = useState("");
  const [rowData, setRowData] = useState({});
  const [modalState, setModalState] = useState({ type: "", trigger: false });
  // const [modalState setModalState] = useState(false);

  const [tableData, setTableData] = useState({
    response: null,
    sortedData: null,
    filteredHeaders: null,
  });

  const [hiddenItems, setHiddenItems] = useState([
    "url",
    "id",
    "date_saved",
    "description",
  ]);
  const [order, setOrder] = useState([
    "date_applied",
    "company",
    "position",
    "location",
    "status",
    "rating",
  ]);

  // const renderModalChildren = (type, { props }) => {
  //   const componentsTypes = {
  //     new: <RowForm type={type} />,
  //     details: <TableRowDetails {...props} />,
  //   };
  //   return componentsTypes[type];
  // };

  const updateTableState = (newState) => {
    setTableData((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  const updateModalState = (newState) => {
    setTableData((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  // const openModalDetails = (e, rowDetails) => {
  //   e.stopPropagation();
  //   setRowClicked(rowDetails.hiddenContent.id);
  //   setRowData(rowDetails);
  //   setModalState({ type: "details", trigger: true });
  // };

  // const closeModal = () => {
  //   console.log(modified);
  //   setModalState({ type: null, trigger: false });
  //   setRowClicked("");
  //   setRowData({});
  //   return;
  // };

  const formattedHeaders = (responseHeaders) =>
    responseHeaders
      ?.filter((header) => {
        return !hiddenItems.includes(header);
      })
      .map((headerLowCase) => headerLowCase.toUpperCase().replace("_", " "));

  const formattedData = (responseData) =>
    responseData?.map((row) => {
      let rawDates = {
        rawDateApplied: row.date_applied,
        rawDateSaved: row.date_saved,
      };
      const shownContent = {};
      const hiddenContent = {};
      Object.keys(row).forEach((key) => {
        let content = row[key];
        // if (key === "date_saved" || key === "date_applied") {
        //   console.log(row[key]);
        //   content = formatDate(row[key]);
        // }
        if (key === "date_saved" || key === "date_applied") {
          content = formatDate(row[key]);
        }
        if (hiddenItems.includes(key)) {
          hiddenContent[key] = content;
        } else {
          shownContent[key] = content;
        }
      });
      hiddenContent.rawDates = rawDates;
      return { shownContent, hiddenContent };
    });

  useEffect(() => {
    if (!tableData.response) {
      return;
    }
    const sortedData = formattedData(tableData.response?.data);

    const filteredHeaders = formattedHeaders(tableData.response?.headers);

    updateTableState({ sortedData, filteredHeaders });
  }, [tableData.response]);

  useEffect(() => {
    if (!rowClicked) return;

    tableData.sortedData?.map((rowDetails, rowIndex) => {
      rowClicked === rowDetails.hiddenContent.id && setRowData(rowDetails);
    });
  }, [rowClicked]);

  const value = useMemo(
    () => ({
      tableData,
      updateTableState,
      loading,
      setLoading,
      error,
      setError,
      // modified,
      // setModified,
      rowClicked,
      setRowClicked,
      rowData,
      setRowData,
      modalState,
      setModalState,
      // openModalDetails,
      // closeModal,
    }),
    [
      tableData,
      loading,
      error,
      updateTableState,
      setLoading,
      setError,
      // modified,
      // setModified,
      rowClicked,
      setRowClicked,
      rowData,
      setRowData,
      modalState,
      setModalState,
      // openModalDetails,
      // closeModal,
    ]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export { TableProvider, TableContext };
