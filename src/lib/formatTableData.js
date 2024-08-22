import { formatDate } from "./formatDate";

export const formattedHeaders = (responseHeaders, hiddenItems) =>
  responseHeaders
    ?.filter((header) => {
      return !hiddenItems.includes(header);
    })
    .map((headerLowCase) => headerLowCase.toUpperCase().replace("_", " "));

export const formattedData = (responseData, hiddenItems) =>
  responseData?.map((row) => {
    let rawDates = {
      rawDateApplied: row.date_applied,
      rawDateSaved: row.logs,
    };
    const shownContent = {};
    const hiddenContent = {};
    Object.keys(row).forEach((key) => {
      let content = row[key];
      if (key === "date_applied") {
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
