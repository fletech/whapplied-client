/// <reference types="vite/client" />
// import axios from "axios";
// import { IAuthService, IUser } from "../types/interfaces";
// import getGoogleOAuthUrl from "../utils/getGoogleUrl";
// import Cookies from "js-cookie";

// const { VITE_API_BASE_URL, VITE_ENV } = import.meta.env;

// const BASE_URL = VITE_API_BASE_URL;

// export class AuthService implements IAuthService {
//   login(): string {
//     return getGoogleOAuthUrl().login;
//   }

//   logout(): string {
//     return getGoogleOAuthUrl().logout;
//   }

//   async checkAuthStatus(): Promise<IUser | null> {
//     try {
//       console.log("Checking auth status...");
//       const response = await fetch(`${BASE_URL}/api/v1/auth/me`, {
//         method: "GET",
//         credentials: "include",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//       });

//       console.log("Response status:", response.status);
//       console.log("Response ok:", response.ok);

//       const data = await response.json();
//       console.log("Response data:", data);

//       if (!response.ok) {
//         console.log("Auth check failed ");
//         return null;
//       }

//       if (data && data.user) {
//         console.log("Auth check successful:", data.user);
//         return data.user as IUser;
//       } else {
//         console.log("No user data in response");
//         return null;
//       }
//     } catch (error) {
//       console.error("Error checking auth status:", error);
//       return null;
//     }
//   }
// }

import { EventEmitter } from "events";
import { IAuthService, IUser } from "../types/interfaces";
import getGoogleOAuthUrl from "../utils/getGoogleUrl";
import Cookies from "js-cookie";

const { VITE_API_BASE_URL } = import.meta.env;
const BASE_URL = VITE_API_BASE_URL;

export function createAuthService(): IAuthService {
  const authEventEmitter = new EventEmitter();
  let isCheckingAuth = false;
  let authCheckPromise: Promise<IUser | null> | null = null;

  const login = (): string => {
    return getGoogleOAuthUrl().login;
  };

  const logout = (): string => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    return getGoogleOAuthUrl().logout;
  };

  const checkAuthStatus = async (): Promise<IUser | null> => {
    if (isCheckingAuth) {
      return authCheckPromise;
    }

    isCheckingAuth = true;
    authCheckPromise = new Promise(async (resolve) => {
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

        const data = await response.json();

        if (response.ok && data && data.user) {
          console.log("Auth check successful:", data.user);
          authEventEmitter.emit("authStatusChanged", data.user);
          resolve(data.user as IUser);
        } else {
          console.log("Auth check failed");
          authEventEmitter.emit("authStatusChanged", null);
          resolve(null);
        }
      } catch (error) {
        console.error("Error checking auth status:", error);
        authEventEmitter.emit("authStatusChanged", null);
        resolve(null);
      } finally {
        isCheckingAuth = false;
        authCheckPromise = null;
      }
    });

    return authCheckPromise;
  };

  const onAuthStatusChanged = (callback: (user: IUser | null) => void) => {
    authEventEmitter.on("authStatusChanged", callback);
    return () => {
      authEventEmitter.off("authStatusChanged", callback);
    };
  };

  return {
    login,
    logout,
    checkAuthStatus,
    onAuthStatusChanged,
  };
}

export const authService = createAuthService();
