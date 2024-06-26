// hooks/useAuth.ts

import { useState, useEffect, useCallback } from "react";
import { IAuthService, ISessionManager, IUser } from "../types/interfaces";
import { AuthService } from "../services/authService";
import { SessionManager } from "../services/sessionManager";

const auth = new AuthService();
const session = new SessionManager();

export const useAuth = (
  authService: IAuthService = auth,
  sessionManager: ISessionManager = session
) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    sessionManager.getState().isLoggedIn
  );
  const [user, setUser] = useState<IUser | null>(
    sessionManager.getState().user
  );

  const checkAuthStatus = useCallback(async () => {
    const userData = await authService.checkAuthStatus();
    setIsLoggedIn(!!userData);
    setUser(userData);
    sessionManager.setState({ isLoggedIn: !!userData, user: userData });
  }, [authService, sessionManager]);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const login = useCallback(() => {
    authService.login();
  }, [authService]);

  const logout = useCallback(async () => {
    await authService.logout();
    sessionManager.setState({ isLoggedIn: false, user: null });
    setIsLoggedIn(false);
    setUser(null);
  }, [authService, sessionManager]);

  return { isLoggedIn, user, login, logout, checkAuthStatus };
};
