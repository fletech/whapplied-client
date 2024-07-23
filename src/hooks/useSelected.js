import { useCallback, useContext, useState } from "react";
import { SessionContext } from "../context/sessionContext";
import axios from "axios";
import { TableContext } from "../context/tableContext";

const useSelected = (rowDetails) => {
  const rowId = rowDetails?.hiddenContent.id;
  const { sessionState } = useContext(SessionContext);
  const { updateRowStatus } = useContext(TableContext);
  const { user } = sessionState;
  const [isLoadingUI, setIsLoadingUI] = useState(false);
  const [errorUI, setErrorUI] = useState(false);

  const sendSelectedToAPI = useCallback(
    async (selectedOption, rowId) => {
      try {
        setErrorUI(false);
        setIsLoadingUI(true);
        const response = await axios.post("/api/v1/data/update-status", {
          accessToken: user.accessToken,
          spreadSheetId: user.spreadSheetId,
          status: selectedOption.value,
          id: rowId,
        });
        return response.data;
      } catch (err) {
        setErrorUI(true);
        setIsLoadingUI(false);
        console.error("Error saving selected option:", err);
        throw err;
      }
    },
    [user]
  );

  const handleStatusChange = async (selected) => {
    if (!rowId) {
      console.log("No rowId provided");
      return;
    }
    try {
      await sendSelectedToAPI(selected, rowId);
      updateRowStatus(rowId, selected.value);
      setIsLoadingUI(false);
    } catch (error) {
      setIsLoadingUI(false);
      console.error("Failed to update status:", error);
    }
  };

  return { handleStatusChange, isLoadingUI, errorUI };
};

export default useSelected;
