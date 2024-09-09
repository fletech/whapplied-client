import React, { createContext, useEffect, useMemo, useState } from "react";

import { formattedData, formattedHeaders } from "../lib/formatTableData";
import { set } from "react-hook-form";
import useData from "../hooks/useData";
import { sortDataByDate, sortDataByString } from "../lib/headerSortData.js";

export const TableContext = createContext();

export const TableProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rowClicked, setRowClicked] = useState("");
  const [pageFilter, setPageFilter] = useState(null);
  const [manyRowsClicked, setManyRowsClicked] = useState([]);
  const [rowData, setRowData] = useState({});
  const [modalState, setModalState] = useState({
    type: "",
    trigger: false,
    children: null,
  });

  const [tableData, setTableData] = useState({
    response: null,
    sortedData: null,
    filteredHeaders: null,
    filteredData: null,
    setSearch: null,
  });

  const [hiddenItems, setHiddenItems] = useState([
    "url",
    "id",
    "logs",
    "description",
    "stage",
  ]);
  const [order, setOrder] = useState([
    "date_applied",
    "company",
    "position",
    "location",
    "status",
    "stage",
  ]);
  const [sortDirection, setSortDirection] = useState("desc");
  const [sortColumn, setSortColumn] = useState("date_applied");

  const updateTableState = (newState) => {
    setTableData((prevState) => {
      const updatedState = { ...prevState, ...newState };
      // console.log("Estado de la tabla actualizado:", updatedState);
      return updatedState;
    });
  };

  const toggleSortDirection = () => {
    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  function optimisticTableUpdated() {
    return {
      showNewItem(newState) {
        const updatedTable = tableData.sortedData;
        const optimisticNewTable = formattedData([newState], hiddenItems);
        updatedTable.push(optimisticNewTable[0]);
        updateTableState({ sortedData: updatedTable });
      },
      filterDeletedItem(id) {
        const optimisiticFilteredTable = tableData.sortedData.filter(
          (item) => item.id !== id
        );

        updateTableState({ sortedData: optimisiticFilteredTable });
      },
    };
  }

  // const updateRowStatus = (rowId, newStatus, optimisticUpdatedLogsInDB) => {
  //   setTableData((prevState) => {
  //     const updatedSortedData = prevState.sortedData.map((row) =>
  //       row.hiddenContent.id === rowId
  //         ? {
  //             ...row,
  //             // shownContent: { ...row.shownContent, status: newStatus },
  //             // hiddenContent: {
  //             //   ...row.hiddenContent,
  //             //   logs: optimisticUpdatedLogsInDB,
  //             // },
  //           }
  //         : row
  //     );

  //     const updatedFilteredData = filterDataByPage(
  //       updatedSortedData,
  //       pageFilter
  //     );

  //     return {
  //       ...prevState,
  //       sortedData: updatedSortedData,
  //       filteredData: updatedFilteredData,
  //     };
  //   });
  // };

  const filterDataByPage = (data, filter) => {
    if (filter === "rejected") {
      return data.filter((item) => item.shownContent.status === "rejected");
    }
    if (filter === "active") {
      return data.filter(
        (item) =>
          item.hiddenContent.stage === "1" &&
          item.shownContent.status !== "rejected"
      );
    }
    if (filter === "archived") {
      return data.filter((item) => item.hiddenContent.stage === "2");
    }

    return data; // for "overview" or any other case
  };

  const toggleSort = (column) => {
    if (column === sortColumn) {
      // Si es la misma columna, cambia la dirección
      setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Si es una columna diferente, establece la nueva columna y dirección ascendente por defecto
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  useEffect(() => {
    if (!tableData.response) return;

    const sortedData = formattedData(tableData.response.data, hiddenItems);
    const filteredHeaders = formattedHeaders(
      tableData.response.headers,
      hiddenItems
    );

    let newSortedData;
    if (sortColumn === "date_applied") {
      newSortedData = sortDataByDate(sortedData, sortDirection);
    } else {
      newSortedData = sortDataByString(sortedData, sortColumn, sortDirection);
    }

    const filteredData = filterDataByPage(newSortedData, pageFilter);

    console.log(filteredData);

    updateTableState({
      sortedData: newSortedData,
      filteredData,
      filteredHeaders,
    });
  }, [tableData.response, sortDirection, sortColumn, pageFilter, hiddenItems]);

  useEffect(() => {
    if (!rowClicked || !tableData.sortedData) return;

    const selectedRow = tableData.sortedData.find(
      (rowDetails) => rowClicked === rowDetails.hiddenContent.id
    );

    if (selectedRow) {
      setRowData(selectedRow);
    }
  }, [rowClicked, tableData.sortedData]);

  //useEffect(() => {
  //  if (tableData.sortedData) {
  //    const sortedData = sortDataByDate(tableData.sortedData, sortDirection);
  //    updateTableState({ sortedData });
  //  }
  //}, [sortDirection, tableData.response]);
  //
  //useEffect(() => {
  //  if (tableData.sortedData) {
  //    const filteredData = filterDataByPage(tableData.sortedData, pageFilter);
  //    setTableData((prevState) => ({ ...prevState, filteredData }));
  //  }
  //}, [pageFilter, tableData.sortedData]);
  //
  //useEffect(() => {
  //  if (!tableData.response) {
  //    return;
  //  }
  //  const sortedData = formattedData(tableData.response?.data, hiddenItems);
  //
  //  const filteredHeaders = formattedHeaders(
  //    tableData.response?.headers,
  //    hiddenItems
  //  );
  //
  //  // console.log("previousData", previousData.response?.data);
  //  // console.log("tableData", tableData.response?.data);
  //
  //  updateTableState({ sortedData, filteredHeaders });
  //}, [tableData.response]);
  //
  //useEffect(() => {
  //  if (!rowClicked) return;
  //
  //  tableData.sortedData?.map((rowDetails, rowIndex) => {
  //    rowClicked === rowDetails.hiddenContent.id && setRowData(rowDetails);
  //  });
  //}, [rowClicked, tableData.sortedData]);

  const value = useMemo(
    () => ({
      tableData,
      updateTableState,
      loading,
      setLoading,
      error,
      setError,
      rowClicked,
      setRowClicked,
      manyRowsClicked,
      setManyRowsClicked,
      rowData,
      setRowData,
      modalState,
      setModalState,
      optimisticTableUpdated,
      pageFilter,
      setPageFilter,
      // updateRowStatus,
      toggleSortDirection,
      sortDirection,
      toggleSort,
      sortColumn,
    }),
    [
      tableData,
      loading,
      error,
      updateTableState,
      setLoading,
      setError,
      rowClicked,
      setRowClicked,
      manyRowsClicked,
      setManyRowsClicked,
      rowData,
      setRowData,
      modalState,
      setModalState,
      optimisticTableUpdated,
      pageFilter,
      setPageFilter,
      // updateRowStatus,
      sortDirection,
      toggleSort,
      sortColumn,
    ]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};
