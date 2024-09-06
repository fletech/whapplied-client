import { useCallback, useContext, useState } from "react";
import { SessionContext } from "../context/sessionContext";
import axios from "axios";
import { TableContext } from "../context/tableContext";
import { generateLog } from "../lib/generateLog";
import useData from "./useData";

const useSelected = (rowDetails) => {
  const rowId = rowDetails?.hiddenContent.id;
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  const { updateRowStatus, tableData } = useContext(TableContext);
  const [isLoadingUI, setIsLoadingUI] = useState(false);
  const [errorUI, setErrorUI] = useState(false);
  const { getSpreadsheetData } = useData();
  const { VITE_API_BASE_URL, VITE_DEVELOPMENT } = import.meta.env;

  const BASE_URL = VITE_API_BASE_URL;

  const sendSelectedToAPI = useCallback(
    async (options) => {
      const { newStatus } = options;
      const [diffValues] = generateLog("updateStatus", options);
      try {
        setErrorUI(false);
        setIsLoadingUI(true);
        const response = await axios.post(
          `${BASE_URL}/api/v1/data/update-status`,
          {
            accessToken: user.accessToken,
            spreadSheetId: user.spreadSheetId,
            id: rowId,
            status: newStatus,
            rowData: tableData.response.data.filter(
              (item) => item.id === rowId
            )[0],
            diffValues: diffValues,
          },
          { withCredentials: true }
        );

        // const updatedLogs = JSON.parse(response.data[1].config.body).values[0];
        // return updatedLogs;
        console.log(response.data);
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

  const handleStatusChange = async (selected, previousValue) => {
    if (!rowId) {
      console.log("No rowId provided");
      return;
    }
    const options = {
      newStatus: selected.value,
      previousStatus: previousValue.value,
    };
    try {
      await sendSelectedToAPI(options);
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
