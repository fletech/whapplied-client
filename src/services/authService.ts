/// <reference types="vite/client" />
import { IAuthService, IUser } from "../types/interfaces";

const { VITE_API_BASE_URL, VITE_DEVELOPMENT } = import.meta.env;

const BASE_URL = VITE_DEVELOPMENT ? "" : VITE_API_BASE_URL;

export class AuthService implements IAuthService {
  login(): void {
    window.location.href = `https://coral-app-bktni.ondigitalocean.app/api/v1/auth/google`;
    // window.location.href = `https://whapplied-server.vercel.app/api/v1/auth/google`;
    // window.location.href = `${BASE_URL}/api/v1/auth/google`;
  }

  async logout(): Promise<void> {
    try {
      const response = await fetch(
        `https://coral-app-bktni.ondigitalocean.app/api/v1/auth/logout`,
        {
          // const response = await fetch(`https://whapplied-server.vercel.app/api/v1/auth/logout`,{
          // const response = await fetch(`${BASE_URL}/api/v1/auth/logout`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin":
              "https://whapplied-client.vercel.app",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Content-Type": "application/json",
          },
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
        `https://coral-app-bktni.ondigitalocean.app/api/v1/auth/me`,
        // `https://whapplied-server.vercel.app/api/v1/auth/me`,
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Access-Control-Allow-Origin":
              "https://whapplied-client.vercel.app",
            "Access-Control-Allow-Credentials": "true",
            "Access-Control-Allow-Methods": "GET,OPTIONS,PATCH,DELETE,POST,PUT",
            "Access-Control-Allow-Headers":
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        }
      );
      // const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
      //   method: "GET",
      //   credentials: "include",
      //   headers: {
      //     // Accept: "application/json",
      //     "Content-Type": "application/json",
      //     // "Access-Control-Allow-Origin": "*",
      //     // "Access-Control-Allow-Credentials": "true",
      //   },
      // });

      // if (!response.ok) {
      //   if (response.status === 401) {
      //     console.log("Token has expired, attempting to refresh...");
      //     // Intentamos forzar la revalidación si se recibe un 401
      //     // El middleware del backend debería revalidar y devolver un nuevo token
      //     const refreshResponse = await fetch(`https://whapplied-server.vercel.app/api/v1/auth/me`, {
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
