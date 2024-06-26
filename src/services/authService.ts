/// <reference types="vite/client" />
import { IAuthService, IUser } from "../types/interfaces";

export class AuthService implements IAuthService {
  login(): void {
    window.location.href = `/api/v1/auth/google`;
  }

  async logout(): Promise<void> {
    try {
      const response = await fetch(`/api/v1/auth/logout`, {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  async checkAuthStatus(): Promise<IUser | null> {
    try {
      const response = await fetch(`/api/v1/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        return data.user as IUser;
      }
      return null;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return null;
    }
  }
}
