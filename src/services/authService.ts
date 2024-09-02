/// <reference types="vite/client" />
import { IAuthService, IUser } from "../types/interfaces";

const { VITE_API_BASE_URL, VITE_DEVELOPMENT } = import.meta.env;

const BASE_URL = VITE_DEVELOPMENT ? "" : VITE_API_BASE_URL;

export class AuthService implements IAuthService {
  login(): void {
    window.location.href = `https://whapplied-server.vercel.app/api/v1/auth/google`;
    // window.location.href = `${BASE_URL}/api/v1/auth/google`;
  }

  async logout(): Promise<void> {
    try {
      const response = await fetch(
        `https://whapplied-server.vercel.app/api/v1/auth/logout`,
        {
          // const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
          method: "GET",
          credentials: "include",
        }
      );
      if (!response.ok) {
        throw new Error("Logout failed");
      }
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    }
  }

  // async checkAuthStatus(): Promise<IUser | null> {
  //   try {
  //     const response = await fetch(`https://whapplied-server.vercel.app/api/v1/auth/me`, {
  //       method: "GET",
  //       credentials: "include",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //     });

  //     return response.ok ? ((await response.json()).user as IUser) : null;
  //   } catch (error) {
  //     console.error("Error checking auth status:", error);
  //     return null;
  //   }
  // }
  async checkAuthStatus(): Promise<IUser | null> {
    console.log(BASE_URL);
    try {
      const response = await fetch(
        `https://whapplied-server.vercel.app/api/v1/auth/me`,
        {
          method: "GET",
          // const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
          credentials: "include",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );

      // if (!response.ok) {
      //   if (response.status === 401) {
      //     console.log("Token has expired, attempting to refresh...");
      //     // Intentamos forzar la revalidación si se recibe un 401
      //     // El middleware del backend debería revalidar y devolver un nuevo token
      //     const refreshResponse = await fetch(`https://whapplied-server.vercel.app/api/v1/auth/me`, {
      //       method: "GET",
      //       credentials: "include",
      //       headers: {
      //         Accept: "application/json",
      //         "Content-Type": "application/json",
      //       },
      //     });

      //     if (refreshResponse.ok) {
      //       return (await refreshResponse.json()).user as IUser;
      //     } else {
      //       return null;
      //     }
      //   }
      //   return null;
      // }

      if (!response.ok) {
        return null;
      }

      return (await response.json()).user as IUser;
    } catch (error) {
      console.error("Error checking auth status:", error);
      return null;
    }
  }
}
