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
    const checkAuth = async () => {
      const user = await authService.checkAuthStatus();
      updateSessionState({ user, isAuthenticated: !!user });
    };

    checkAuth();
  }, []);

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
