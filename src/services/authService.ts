/// <reference types="vite/client" />
import axios from "axios";
import { IAuthService, IUser } from "../types/interfaces";

const { VITE_API_BASE_URL, VITE_ENV } = import.meta.env;

const BASE_URL = VITE_API_BASE_URL;

export class AuthService implements IAuthService {
  login(): void {
    window.location.href = `${BASE_URL}/api/v1/auth/google`;
  }

  async logout(): Promise<void> {
    try {
      const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
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
      console.log("Checking auth status...");
      const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        console.log("Auth check failed");
        return null;
      }

      const data = await response.json();
      console.log("Auth check successful:", data);
      return data.user as IUser;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return null;
    }
  }
}
