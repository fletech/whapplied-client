import { useContext } from "react";
import { TableContext } from "../context/tableContext";

const useModal = () => {
  const { setRowClicked, setRowData, setModalState } = useContext(TableContext);

  const openModalDetails = (e, rowDetails) => {
    e.stopPropagation();
    setRowClicked(rowDetails.hiddenContent.id);
    setRowData(rowDetails);
    setModalState({ type: "details", trigger: true });
  };

  const closeModal = () => {
    setModalState({ type: null, trigger: false });
    setRowClicked("");
    setRowData({});
    return;
  };

  return { openModalDetails, closeModal };
};

export default useModal;
