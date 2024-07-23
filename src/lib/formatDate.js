export const formatDate = (millis) => {
  const millisNumber = Number(millis);
  const dateObject = new Date(millisNumber);

  // Formato DD/MM/YYYY
  const dd = String(dateObject.getDate()).padStart(2, "0");
  const mm = String(dateObject.getMonth() + 1).padStart(2, "0");
  const yyyy = dateObject.getFullYear();

  const formattedDate = `${dd}/${mm}/${yyyy}`;

  return formattedDate;
};
