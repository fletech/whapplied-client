import axios from "axios";
import { useContext, useEffect, useMemo, useState } from "react";
import { SessionContext } from "../context/sessionContext";

const useData = (setError, setLoading) => {
  const { sessionState } = useContext(SessionContext);
  const { user } = sessionState;
  console.log(user);
  const [hiddenItems, setHiddenItems] = useState([
    "url",
    "id",
    "date_saved",
    "description",
  ]);
  const [order, setOrder] = useState([
    "date_applied",
    "company",
    "position",
    "location",
    "status",
    "rating",
  ]);

  const [data, setData] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    const getSpreadsheetData = async () => {
      try {
        setLoading(true);
        const response = await axios.post("/api/v1/auth/spreadsheet-data", {
          accessToken: user.accessToken,
          spreadSheetId: user.spreadSheetId,
        });

        let datita = response.data.data;
        setTableHeaders(response.data.headers);

        setData(datita);
      } catch (err) {
        console.error("Error fetching spreadsheet data:", err);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    getSpreadsheetData();
  }, [user]);

  const filteredHeaders = useMemo(
    () =>
      tableHeaders
        .filter((header) => {
          return !hiddenItems.includes(header);
        })
        .map((headerLowCase) => headerLowCase.toUpperCase().replace("_", " ")),
    [hiddenItems, tableHeaders]
  );

  const sortedData = useMemo(
    () =>
      data.map((row) => {
        let rawDates = {
          rawDateApplied: row.date_applied,
          rawDateSaved: row.date_saved,
        };
        const shownContent = {};
        const hiddenContent = {};
        Object.keys(row).forEach((key) => {
          let content = row[key];
          if (key === "date_saved" || key === "date_applied") {
            content = new Date(Number(row[key]) * 1000).toLocaleDateString();
          }
          if (hiddenItems.includes(key)) {
            hiddenContent[key] = content;
          } else {
            shownContent[key] = content;
          }
        });
        hiddenContent.rawDates = rawDates;
        return { shownContent, hiddenContent };
      }),
    [data, hiddenItems]
  );

  return { filteredHeaders, sortedData };
};

export default useData;
