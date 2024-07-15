import axios from "axios";
import { useCallback, useContext, useEffect } from "react";
import { SessionContext } from "../context/sessionContext";
import { TableContext } from "../context/tableContext";
import useModal from "./useModal";

const useData = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const {
    tableData,
    updateTableState,
    setError,
    setLoading,
    optimisticTableUpdated,
  } = useContext(TableContext);
  const { closeModal } = useModal();

  const apiOptions = {
    accessToken: user?.accessToken,
    spreadSheetId: user?.spreadSheetId,
  };

  const getSpreadsheetData = async () => {
    try {
      const response = await axios.post(
        "/api/v1/data/spreadsheet-data",
        apiOptions
      );

      updateTableState({
        response: response.data,
      });
      setLoading(false);
    } catch (err) {
      console.error("Error fetching spreadsheet data:", err);
      setError("Failed to fetch data. Please try again later.");
    }
  };

  const newItem = useCallback(
    async (data) => {
      data = {
        id: crypto.randomUUID(),
        ...data,
        date_applied: new Date(data.date_applied).getTime(),
      };

      try {
        setLoading(true);
        // optimisticTableUpdated().showNewItem(data);
        const response = await axios.post("/api/v1/data/new-record", {
          ...apiOptions,
          data,
        });

        if (response.status !== 200) {
          throw new Error("Error saving selected option");
        }

        getSpreadsheetData();
        closeModal();
      } catch (err) {
        console.error("Error saving selected option:", err);
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
      response && console.log("Row deleted");
    } catch (err) {
      console.error("Error deleting row:", err);
      throw err;
    }
  };

  useEffect(() => {
    if (!user) {
      console.log("User not found");
      return;
    }

    if (tableData.sortedData) return;
    setLoading(true);
    getSpreadsheetData();
  }, [user, tableData.sortedData]);

  return {
    getSpreadsheetData,
    newItem,
    deleteRow,
  };
};

export default useData;
