import { useCallback, useContext, useState } from "react";
import { SessionContext } from "../context/sessionContext";
import axios from "axios";
import { TableContext } from "../context/tableContext";
import { generateLog } from "../lib/generateLog";
import useData from "./useData";

const useSelected = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { updateRowStatus, tableData } = useContext(TableContext);
  const [isLoadingUI, setIsLoadingUI] = useState(false);
  const [errorUI, setErrorUI] = useState(false);
  const { getSpreadsheetData } = useData();
  const { VITE_API_BASE_URL, VITE_DEVELOPMENT } = import.meta.env;

  const BASE_URL = VITE_API_BASE_URL;

  const sendSelectedToAPI = useCallback(
    async (options, rowId) => {
      const { newStatus } = options;
      const [diffValues] = generateLog("updateStatus", options);
      try {
        setErrorUI(false);
        setIsLoadingUI(true);
        const row_data = tableData.response.data.filter(
          (item) => item.id === rowId
        );
        const accessToken = localStorage.getItem("accessToken");
        const response = await axios.post(
          `${BASE_URL}/api/v1/data/update-status`,
          {
            spreadSheetId: user.spreadSheetId,
            id: rowId,
            status: newStatus,
            rowData: row_data[0],
            diffValues: diffValues,
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        return response.data;
      } catch (err) {
        setIsLoadingUI(false);
        setErrorUI(true);
        console.error("Error saving selected option:", err);
        throw err;
      }
    },
    [user]
  );

  const handleStatusChange = async (selected, previousValue, rowId) => {
    if (!rowId) {
      console.log("No rowId provided");
      return;
    }
    const options = {
      newStatus: selected.value,
      previousStatus: previousValue.value,
    };
    try {
      await sendSelectedToAPI(options, rowId);
      await getSpreadsheetData();
      // updateRowStatus(rowId, selected.value, optimisticUpdatedLogsInDB);
      setIsLoadingUI(false);
    } catch (error) {
      setIsLoadingUI(false);
      console.error("Failed to update status:", error);
    }
  };

  return { handleStatusChange, isLoadingUI, errorUI };
};

export default useSelected;
