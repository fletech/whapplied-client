import { useEffect, useCallback, useContext } from "react";
import { IAuthService, ISessionContext, IUser } from "../types/interfaces";
import { AuthService } from "../services/authService";

import { useNavigate } from "react-router-dom";
import { SessionContext } from "../context/sessionContext.jsx";

const auth = new AuthService();

export const useAuth = (authService: IAuthService = auth) => {
  const { updateSessionState } = useContext(SessionContext);

  const navigate = useNavigate();

  const checkAuthStatus = useCallback(async () => {
    const userData = await authService.checkAuthStatus();

    updateSessionState({ user: userData });
    const storageData = {
      accessToken: userData?.accessToken,
      spreadSheetId: userData?.spreadSheetId,
    };
    localStorage.setItem("user", JSON.stringify(storageData));
  }, [authService]);

  useEffect(() => {
    checkAuthStatus();
  }, [checkAuthStatus]);

  const login = useCallback(async () => {
    await authService.login();
    checkAuthStatus();
  }, [authService, checkAuthStatus]);

  const logout = useCallback(async () => {
    await authService.logout();
    localStorage.removeItem("user");
    checkAuthStatus();
    navigate("/");
  }, [authService, checkAuthStatus, navigate]);

  const handleApiError = async (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 400)
    ) {
      try {
        await checkAuthStatus(); // Intenta refrescar el token
        return true; // Indica que se debe reintentar la solicitud
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        logout(); // Si no se puede refrescar, cierra la sesión
        return false;
      }
    }
    return false;
  };

  return { login, logout, checkAuthStatus, handleApiError };
};
