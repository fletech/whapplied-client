import React, { createContext, useEffect, useMemo, useState } from "react";

import { formattedData, formattedHeaders } from "../lib/formatTableData";

const TableContext = createContext();

const TableProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [rowClicked, setRowClicked] = useState("");
  const [pageFilter, setPageFilter] = useState(null);
  const [manyRowsClicked, setManyRowsClicked] = useState([]);
  const [rowData, setRowData] = useState({});
  const [modalState, setModalState] = useState({ type: "", trigger: false });

  const [tableData, setTableData] = useState({
    response: null,
    sortedData: null,
    filteredHeaders: null,
    filteredData: null,
  });

  const [hiddenItems, setHiddenItems] = useState([
    "url",
    "id",
    "date_saved",
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

  const updateRowStatus = (rowId, newStatus) => {
    setTableData((prevState) => {
      const updatedSortedData = prevState.sortedData.map((row) =>
        row.hiddenContent.id === rowId
          ? { ...row, shownContent: { ...row.shownContent, status: newStatus } }
          : row
      );

      const updatedFilteredData = filterDataByPage(
        updatedSortedData,
        pageFilter
      );

      return {
        ...prevState,
        sortedData: updatedSortedData,
        filteredData: updatedFilteredData,
      };
    });
  };

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

  useEffect(() => {
    if (tableData.sortedData) {
      const filteredData = filterDataByPage(tableData.sortedData, pageFilter);
      setTableData((prevState) => ({ ...prevState, filteredData }));
    }
  }, [pageFilter, tableData.sortedData]);

  useEffect(() => {
    if (!tableData.response) {
      return;
    }
    const sortedData = formattedData(tableData.response?.data, hiddenItems);

    const filteredHeaders = formattedHeaders(
      tableData.response?.headers,
      hiddenItems
    );

    updateTableState({ sortedData, filteredHeaders });
  }, [tableData.response]);

  useEffect(() => {
    if (!rowClicked) return;

    tableData.sortedData?.map((rowDetails, rowIndex) => {
      rowClicked === rowDetails.hiddenContent.id && setRowData(rowDetails);
    });
  }, [rowClicked, tableData.sortedData]);

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
      updateRowStatus,
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
      updateRowStatus,
    ]
  );

  return (
    <TableContext.Provider value={value}>{children}</TableContext.Provider>
  );
};

export { TableProvider, TableContext };
