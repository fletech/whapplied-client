const sortDataByDate = (data, direction) => {
  return [...data].sort((a, b) => {
    const dateA = a.hiddenContent.rawDates.rawDateApplied;
    const dateB = b.hiddenContent.rawDates.rawDateApplied;

    if (!dateA || !dateB) {
      console.error("Fecha faltante:", {
        aId: a.hiddenContent.id,
        bId: b.hiddenContent.id,
        dateA,
        dateB,
      });
      return 0;
    }

    const timeA = parseInt(dateA, 10);
    const timeB = parseInt(dateB, 10);

    if (isNaN(timeA) || isNaN(timeB)) {
      console.error("Fecha inválida encontrada:", {
        aId: a.hiddenContent.id,
        bId: b.hiddenContent.id,
        dateA,
        dateB,
        timeA,
        timeB,
      });
      return direction === "asc" ? 1 : -1;
    }

    if (timeA < timeB) return direction === "asc" ? -1 : 1;
    if (timeA > timeB) return direction === "asc" ? 1 : -1;
    return 0;
  });
};
const sortDataByString = (data, column, direction) => {
  return [...data].sort((a, b) => {
    const valueA = a.shownContent[column].toLowerCase();
    const valueB = b.shownContent[column].toLowerCase();

    if (valueA < valueB) return direction === "asc" ? -1 : 1;
    if (valueA > valueB) return direction === "asc" ? 1 : -1;
    return 0;
  });
};

export { sortDataByDate, sortDataByString };
