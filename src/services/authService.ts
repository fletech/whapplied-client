/// <reference types="vite/client" />
import axios from "axios";
import { IAuthService, IUser } from "../types/interfaces";
import getGoogleOAuthUrl from "../utils/getGoogleUrl";
import Cookies from "js-cookie";

const { VITE_API_BASE_URL, VITE_ENV } = import.meta.env;

const BASE_URL = VITE_API_BASE_URL;

// Obtener una cookie

export class AuthService implements IAuthService {
  login(): string {
    return getGoogleOAuthUrl().login;
  }

  logout(): string {
    return getGoogleOAuthUrl().logout;
    // try {
    //   const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       "Content-Type": "application/json",
    //       Accept: "application/json",
    //     },
    //   });
    //   if (!response.ok) {
    //     throw new Error("Logout failed");
    //   }
    // } catch (error) {
    //   console.error("Logout failed:", error);
    //   throw error;
    // }
  }

  async checkAuthStatus(): Promise<IUser | null> {
    //necesito capturar los token de las cookies
    //está devolviendo undifined

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

      console.log("Response status:", response.status);
      console.log("Response ok:", response.ok);

      const data = await response.json();
      console.log("Response data:", data);

      if (!response.ok) {
        console.log("Auth check failed ");
        return null;
      }

      if (data && data.user) {
        console.log("Auth check successful:", data.user);
        return data.user as IUser;
      } else {
        console.log("No user data in response");
        return null;
      }
    } catch (error) {
      console.error("Error checking auth status:", error);
      return null;
    }
  }
}
