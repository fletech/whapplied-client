import React, { createContext, useState } from "react";

// Crear el contexto
const SessionContext = createContext();

// Componente proveedor del contexto
const SessionProvider = ({ children }) => {
  // Definir el estado del contexto
  const [sessionState, setSessionState] = useState({ user: null, error: null });

  // Función para actualizar el estado del contexto
  const updateSessionState = (newState) => {
    setSessionState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  // Pasar el estado y la función de actualización como valores del contexto
  return (
    <SessionContext.Provider value={{ sessionState, updateSessionState }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
