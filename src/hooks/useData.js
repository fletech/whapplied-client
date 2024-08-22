import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/sessionContext";
import { TableContext } from "../context/tableContext";
import useModal from "./useModal";
import { useAuth } from "./useAuth";
import { generateLog } from "../lib/generateLog";
import { redirect } from "react-router-dom";

const useData = () => {
  const [hasFetchedData, setHasFetchedData] = useState(false);
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const {
    tableData,
    updateTableState,
    setError,
    setLoading,
    optimisticTableUpdated,
    manyRowsClicked,
    setManyRowsClicked,
  } = useContext(TableContext);
  const { closeModal } = useModal();
  const { handleApiError } = useAuth();

  const apiOptions = {
    accessToken: user?.accessToken,
    spreadSheetId: user?.spreadSheetId,
  };

  // const generateLog = (action, options) => {
  //   let newLog = {
  //     timestamp: Date.now(),
  //     action,
  //   };
  //   if (action === "updateRow") {
  //     const { data, dirtyFields, formValues, rowData } = options;
  //     const updatedFields = Object.keys(dirtyFields);
  //     const diffValues = updatedFields.map((field) => ({
  //       field,
  //       previous: formValues[field],
  //       current: data[field],
  //     }));
  //     newLog.fields = updatedFields;
  //     newLog.diffValues = diffValues;
  //     console.log(diffValues);
  //     return [diffValues];
  //   }
  //   if (action === "updateStatus")

  //   // const dataLog = JSON.stringify([
  //   //   ...JSON.parse(rowData.hiddenContent?.logs || "[]"),
  //   //   newLog,
  //   // ]);º
  // };

  const getSpreadsheetData = async () => {
    try {
      const response = await axios.post(
        "/api/v1/data/spreadsheet-data",
        apiOptions,
        { withCredentials: true }
      );

      updateTableState({
        response: await response.data,
      });
      setLoading(false);
      return await response.data;
    } catch (err) {
      const shouldRetry = await handleApiError(err);
      console.log(err);
      if (shouldRetry) {
        return await getSpreadsheetData(); // Reintenta la solicitud
      }

      console.error("Error fetching spreadsheet data:", err);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  const newItem = useCallback(
    async (data) => {
      data = {
        id: crypto.randomUUID(),
        ...data,
      };

      try {
        setLoading(true);
        // optimisticTableUpdated().showNewItem(data);
        const response = await axios.post("/api/v1/data/new-record", {
          ...apiOptions,
          data,
        });

        if (response.status !== 200) {
          throw new Error("Error saving new item");
        }

        getSpreadsheetData();
        closeModal();
      } catch (err) {
        console.error("Error saving new item:", err);
        throw err;
      }
    },
    [user]
  );

  const deleteRow = async (id) => {
    // optimisticTableUpdated().filterDeletedItem(id);
    try {
      setLoading(true);
      const response = await axios.put("/api/v1/data/delete-item", {
        ...apiOptions,
        id,
      });
      //por que tarda tanto en borrar????

      // setLoading(true);
      getSpreadsheetData();
      closeModal();
    } catch (err) {
      console.error("Error deleting row:", err);
      throw err;
    }
  };

  const updateRow = async (data, dirtyFields, formValues, rowData) => {
    // optimisticTableUpdated().filterDeletedItem(id);
    const [diffValues] = generateLog("updateRow", {
      data,
      dirtyFields,
      formValues,
      rowData,
    });
    // data.logs = dataLog;
    try {
      setLoading(true);
      const response = await axios.put("/api/v1/data/update-row", {
        ...apiOptions,
        data,
        diffValues: diffValues,
      });
      // setLoading(true);
      getSpreadsheetData();
      closeModal();
    } catch (err) {
      console.error("Error updating row:", err);
      throw err;
    }
  };

  const archiveRow = async (id) => {
    const rowData = tableData.response.data.filter((item) => item.id === id);

    // optimisticTableUpdated().filterDeletedItem(id);
    const [diffValues] = generateLog("archiveRow", { rowData });
    try {
      setLoading(true);
      const response = await axios.put("/api/v1/data/archive-item", {
        ...apiOptions,
        id,
        rowData: rowData[0],
        diffValues: diffValues,
      });

      // setLoading(true);
      await getSpreadsheetData();
      closeModal();
    } catch (err) {
      console.error("Error archiving a row:", err);
      throw err;
    }
  };

  const archiveMultipleRows = async () => {
    // optimisticTableUpdated().filterDeletedItem(id);
    // generateLog("archiveRow", {
    //   selectedRows: manyRowsClicked,
    //   data: tableData.response.data,
    // });

    const [diffValues] = generateLog("archiveRow");

    const dataFiltered = manyRowsClicked.map((rowClickedId) => {
      return tableData.response.data.filter(
        (item) => rowClickedId === item.id
      )[0];
    });

    console.log(dataFiltered);

    setLoading(true);
    try {
      const response = await axios.put("/api/v1/data/archive-multiple-items", {
        ...apiOptions,
        ids: manyRowsClicked,
        dataFiltered: dataFiltered,
        diffValues: diffValues,
      });

      // setLoading(true);
      await getSpreadsheetData();
      setManyRowsClicked([]);
    } catch (err) {
      console.error("Error archiving rows:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (!user || hasFetchedData) {
      return;
    }

    if (tableData.sortedData) return;
    setLoading(true);
    getSpreadsheetData();
    setHasFetchedData(true);
  }, [user, tableData.sortedData, tableData.filteredData]);

  return {
    getSpreadsheetData,
    newItem,
    updateRow,
    deleteRow,
    archiveRow,
    archiveMultipleRows,
  };
};

export default useData;
