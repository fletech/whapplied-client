// import React, { createContext, useState } from "react";

// const SessionContext = createContext();

// const SessionProvider = ({ children }) => {
//   const [sessionState, setSessionState] = useState({ user: null });

//   const updateSessionState = (newState) => {
//     setSessionState((prevState) => ({
//       ...prevState,
//       ...newState,
//     }));
//   };

//   return (
//     <SessionContext.Provider value={{ sessionState, updateSessionState }}>
//       {children}
//     </SessionContext.Provider>
//   );
// };

// export { SessionContext, SessionProvider };

interface SessionProviderProps {
  children: React.ReactNode;
}
import React, { createContext, useState } from "react";
import { ISessionContext, ISessionState } from "../types/interfaces";
const SessionContext = createContext<ISessionContext>(null as any);

const SessionProvider: React.FC<SessionProviderProps> = ({ children }) => {
  const [sessionState, setSessionState] = useState<ISessionState>({
    user: null,
  });

  const updateSessionState = (newState: Partial<ISessionState>) => {
    setSessionState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  return (
    <SessionContext.Provider value={{ sessionState, updateSessionState }}>
      {children}
    </SessionContext.Provider>
  );
};

export { SessionContext, SessionProvider };
