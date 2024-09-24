import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { authService } from "../services/authService";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessionState, setSessionState] = useState({
    user: null,
    isAuthenticated: false,
  });

  const updateSessionState = useCallback((newState) => {
    setSessionState((prevState) => ({ ...prevState, ...newState }));
  }, []);

  useEffect(() => {
    let isMounted = true;

    const checkAuth = async () => {
      try {
        const user = await authService.checkAuthStatus();
        if (isMounted) {
          updateSessionState({ user, isAuthenticated: !!user });
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        if (isMounted) {
          updateSessionState({ user: null, isAuthenticated: false });
        }
      }
    };

    checkAuth();

    return () => {
      isMounted = false;
    };
  }, [updateSessionState]);

  return (
    <SessionContext.Provider value={{ sessionState, updateSessionState }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession must be used within a SessionProvider");
  }
  return context;
};
