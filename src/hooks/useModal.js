import { useContext } from "react";
import { TableContext } from "../context/tableContext";

const useModal = () => {
  const context = useContext(TableContext);

  if (!context) {
    throw new Error(
      "useModal debe ser usado dentro de un TableContextProvider"
    );
  }

  const { setRowClicked, setRowData, setModalState } = context;

  const closeModal = () => {
    setModalState({ type: null, trigger: false, children: null });
    setRowClicked("");
    setRowData({});
  };

  return { closeModal };
};

export default useModal;
