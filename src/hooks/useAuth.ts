import { useState, useEffect, useCallback } from "react";
import { IAuthService, ISessionManager, IUser } from "../types/interfaces";
import { AuthService } from "../services/authService";
import { SessionManager } from "../services/sessionManager";
import { useNavigate } from "react-router-dom";

const auth = new AuthService();
const session = new SessionManager();

export const useAuth = (
  authService: IAuthService = auth,
  sessionManager: ISessionManager = session
) => {
  const [authState, setAuthState] = useState<{
    isLoggedIn: boolean;
    user: IUser | null;
  }>(sessionManager.getState());

  const navigate = useNavigate();

  const updateAuthState = useCallback(
    (isLoggedIn: boolean, user: IUser | null) => {
      setAuthState({ isLoggedIn, user });
      sessionManager.setState({ isLoggedIn, user });
    },
    [sessionManager]
  );

  const checkAuthStatus = useCallback(async () => {
    const userData = await authService.checkAuthStatus();
    updateAuthState(!!userData, userData);
  }, [authService, updateAuthState]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(async () => {
    await authService.login();
    checkAuthStatus();
  }, [authService, checkAuthStatus]);

  const logout = useCallback(async () => {
    await authService.logout();
    checkAuthStatus();
    navigate("/");
  }, [authService, checkAuthStatus, navigate]);

  return { ...authState, login, logout, checkAuthStatus };
};
