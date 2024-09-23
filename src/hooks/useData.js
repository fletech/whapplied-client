import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { SessionContext } from "../context/sessionContext";
import { TableContext } from "../context/tableContext";
import useModal from "./useModal";

import { generateLog } from "../lib/generateLog";
import { redirect } from "react-router-dom";
import { authService } from "../services/authService";
const { VITE_API_BASE_URL, VITE_DEVELOPMENT } = import.meta.env;

const useData = () => {
  const BASE_URL = VITE_API_BASE_URL;
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
    rowData,
  } = useContext(TableContext);
  const { closeModal } = useModal();

  const apiOptions = {
    accessToken: user?.accessToken,
    spreadSheetId: user?.spreadSheetId,
    user: user,
  };

  console.log("apiOptions", apiOptions);

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

  const handleApiError = async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400)
    ) {
      try {
        await authService.checkAuthStatus(); // Intenta refrescar el token
        return true; // Indica que se debe reintentar la solicitud
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        logout(); // Si no se puede refrescar, cierra la sesión
        return false;
      }
    }
    return false;
  };

  const getSpreadsheetData = async () => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/v1/data/spreadsheet-data`,
        apiOptions,
        { withCredentials: true }
      );

      updateTableState({
        response: await response.data,
      });
      setLoading(false);
      return await response.data;
    } catch (err) {
      // const shouldRetry = await handleApiError(err);
      // console.log(err);
      // if (shouldRetry) {
      //   return await getSpreadsheetData(); // Reintenta la solicitud
      // }

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
        const response = await axios.post(
          `${BASE_URL}/api/v1/data/new-record`,
          {
            ...apiOptions,
            data,
          },
          { withCredentials: true }
        );

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
      const response = await axios.put(
        `${BASE_URL}/api/v1/data/delete-item`,
        {
          ...apiOptions,
          id,
        },
        { withCredentials: true }
      );
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
      const response = await axios.put(
        `${BASE_URL}/api/v1/data/update-row`,
        {
          ...apiOptions,
          data,
          diffValues: diffValues,
        },
        { withCredentials: true }
      );
      // setLoading(true);
      getSpreadsheetData();
      closeModal();
    } catch (err) {
      console.error("Error updating row:", err);
      throw err;
    }
  };

  const archiveRow = async (id) => {
    const rowDataFlat = tableData.response.data.filter(
      (item) => item.id === id
    );

    // optimisticTableUpdated().filterDeletedItem(id);
    const [diffValues] = generateLog("archiveRow", {
      stage: rowDataFlat[0].stage,
    });

    try {
      setLoading(true);
      const response = await axios.put(
        `${BASE_URL}/api/v1/data/archive-item`,
        {
          ...apiOptions,
          id,
          rowData: rowDataFlat[0],
          diffValues: diffValues,
        },
        { withCredentials: true }
      );

      setLoading(true);
      await getSpreadsheetData();
      closeModal();
    } catch (err) {
      console.error("Error archiving a row:", err);
      throw err;
    }
  };

  // const getBulkAction = () => {
  //   let bulkAction = "";
  //   if (manyRowsClicked.length === 0) return { bulkAction };

  //   let dataFiltered = [];
  //   dataFiltered = manyRowsClicked.map((rowClickedId) => {
  //     return tableData.response.data.filter(
  //       (item) => rowClickedId === item.id
  //     )[0];
  //   });
  //   const isAllActive = dataFiltered.every((item) => item.stage === "1");
  //   const isAllArchived = dataFiltered.every((item) => item.stage === "2");
  //   const isMixed = dataFiltered.some(
  //     (item) => item.stage === "1" || item.stage === "2"
  //   );

  //   if (isAllArchived) {
  //     bulkAction = "unarchiveManyRows";
  //     dataFiltered = dataFiltered.filter((item) => item.stage === "2");
  //     return { dataFiltered, bulkAction, isAllActive, isAllArchived, isMixed };
  //   }

  //   if (isAllActive || isMixed) {
  //     bulkAction = "archiveManyRows";
  //     dataFiltered = dataFiltered.filter((item) => item.stage === "1");
  //     return { dataFiltered, bulkAction, isAllActive, isAllArchived, isMixed };
  //   }

  // };

  const getBulkAction = () => {
    if (manyRowsClicked.length === 0) return { bulkAction: "" };

    const filteredData = manyRowsClicked
      .map((id) => tableData.response.data.find((item) => item.id === id))
      .filter(Boolean);

    const activeItems = filteredData.filter((item) => item.stage === "1");
    const archivedItems = filteredData.filter((item) => item.stage === "2");

    const isAllActive = activeItems.length === filteredData.length;
    const isAllArchived = archivedItems.length === filteredData.length;
    const isMixed = !isAllActive && !isAllArchived;

    let bulkAction, dataFiltered;

    if (isAllArchived) {
      bulkAction = "unarchiveManyRows";
      dataFiltered = archivedItems;
    } else {
      bulkAction = "archiveManyRows";
      dataFiltered = activeItems;
    }
    return { dataFiltered, bulkAction, isAllActive, isAllArchived, isMixed };
  };

  const archiveMultipleRows = async () => {
    const { bulkAction, dataFiltered, isAllActive, isAllArchived, isMixed } =
      getBulkAction();

    const [diffValues] = generateLog("archiveManyRows", {
      isAllActive,
      isAllArchived,
      isMixed,
    });

    setLoading(true);
    try {
      const response = await axios.put(
        `${BASE_URL}/api/v1/data/archive-multiple-items`,
        {
          ...apiOptions,
          ids: manyRowsClicked,
          dataFiltered: dataFiltered,
          diffValues: diffValues,
          bulkAction: bulkAction,
        },
        { withCredentials: true }
      );

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
    getBulkAction,
  };
};

export default useData;
