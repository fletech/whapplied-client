interface SessionState {
  user: any | null;
  isAuthenticated: boolean;
}

type SessionContextType = {
  sessionState: SessionState;
  updateSessionState: (newState: Partial<SessionState>) => void;
} | null;
import React, {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
} from "react";
import { authService } from "../services/authService";
import Cookies from "js-cookie";

export const SessionContext = createContext<SessionContextType>(null);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [sessionState, setSessionState] = useState<SessionState>({
    user: null,
    isAuthenticated: false,
  });

  const updateSessionState = useCallback((newState: Partial<SessionState>) => {
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

    const unsubscribe = authService.onAuthStatusChanged((user) => {
      if (isMounted) {
        updateSessionState({ user, isAuthenticated: !!user });
      }
    });

    checkAuth();

    return () => {
      isMounted = false;
      unsubscribe();
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
