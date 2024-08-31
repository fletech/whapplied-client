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

interface SessionState {
  user: any | null;
  isAuthenticated: boolean;
}

interface SessionContextType {
  sessionState: SessionState;
  updateSessionState: (newState: Partial<SessionState>) => void;
}
import React, { createContext, useState, useEffect, useCallback } from "react";
import { AuthService } from "../services/authService";

export const SessionContext = createContext<SessionContextType | null>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionState, setSessionState] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return {
      user: storedUser ? JSON.parse(storedUser) : null,
      isAuthenticated: !!storedUser,
    };
  });

  const updateSessionState = useCallback((newState: Partial<SessionState>) => {
    setSessionState((prevState) => {
      const updatedState = { ...prevState, ...newState };
      if (updatedState.user) {
        localStorage.setItem("user", JSON.stringify(updatedState.user));
      } else {
        localStorage.removeItem("user");
      }
      return updatedState;
    });
  }, []);

  useEffect(() => {
    const checkAuth = async () => {
      const authService = new AuthService();
      const user = await authService.checkAuthStatus();
      updateSessionState({ user, isAuthenticated: !!user });
    };
    checkAuth();
  }, [updateSessionState]);

  return (
    <SessionContext.Provider value={{ sessionState, updateSessionState }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = React.useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
