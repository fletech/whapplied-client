import { useCallback, useContext } from "react";
import { SessionContext } from "../context/sessionContext";
import axios from "axios";

const useSelected = () => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;

  const updateStatus = useCallback(
    async (selectedOption, rowId) => {
      console.log(selectedOption);
      try {
        const response = await axios.post("/api/v1/auth/update-status", {
          accessToken: user.accessToken,
          spreadSheetId: user.spreadSheetId,
          status: selectedOption.value,
          id: rowId,
        });
        return response.data;
      } catch (err) {
        console.error("Error saving selected option:", err);
        throw err;
      }
    },
    [user]
  );

  return updateStatus;
};

export default useSelected;
