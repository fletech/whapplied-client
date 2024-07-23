import React, { createContext, useEffect, useMemo, useState } from "react";
import { formatDate } from "../lib/formatDate";

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
    "rating",
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

  function optimisticTableUpdated() {
    return {
      showNewItem(newState) {
        const updatedTable = tableData.sortedData;
        const optimisticNewTable = formattedData([newState]);
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
      return data.filter((item) => item.shownContent.status !== "rejected");
    }
    return data; // for "overview" or any other case
  };

  useEffect(() => {
    if (tableData.sortedData) {
      const filteredData = filterDataByPage(tableData.sortedData, pageFilter);
      setTableData((prevState) => ({ ...prevState, filteredData }));
    }
  }, [pageFilter, tableData.sortedData]);

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
  }, [rowClicked, tableData.sortedData]);

  // useEffect(() => {
  //   const filteredData = tableData.sortedData?.filter((item) => {
  //     if (pageFilter == "rejected") {
  //       return item.shownContent.status == "rejected";
  //     }
  //     if (pageFilter == "active") {
  //       return item.shownContent.status != "rejected";
  //     }
  //   });

  //   updateTableState({ filteredData: filteredData });
  // }, [pageFilter]);

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
