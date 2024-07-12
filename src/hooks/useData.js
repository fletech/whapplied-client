import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
    // modified,
    // setModified,
  } = useContext(TableContext);
  const { closeModal } = useModal();
  const [modified, setModified] = useState(false);

  useEffect(() => {
    console.log("useData useEffect", modified);
    if (!user) {
      console.log("User not found");
      return;
    }
    console.log(user);
    if (!modified && tableData.sortedData) return;

    if (modified) {
      closeModal();
    }

    const getSpreadsheetData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/v1/data/spreadsheet-data", {
          accessToken: user.accessToken,
          spreadSheetId: user.spreadSheetId,
        });
        setLoading(false);
        updateTableState({
          response: response.data,
        });
      } catch (err) {
        console.error("Error fetching spreadsheet data:", err);
        setError("Failed to fetch data. Please try again later.");
      }
    };

    getSpreadsheetData();
    console.log("setModified to false");
  }, [user, modified]);

  return { modified, setModified };
};

export default useData;
