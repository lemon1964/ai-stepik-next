// ai-chat-next/src/services/authClientService.ts
import axios from "axios";
import { getSession, signOut } from "next-auth/react";
import store from "@/store/store";
import { showNotification } from "@/reducers/notificationReducer";
import { localizationService } from "@/services/localizationService";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Проверка истечения токена
const isTokenExpired = (token: string) => {
  if (!token) return true;

  const parts = token.split(".");
  if (parts.length !== 3) {
    console.error("Invalid token format");
    return true;
  }

  try {
    const payload = JSON.parse(atob(parts[1]));
    return !payload.exp || payload.exp * 1000 < Date.now();
  } catch (error) {
    console.error("Error decoding token payload", error);
    return true;
  }
};

let isSigningOut = false;

const handleSignOut = () => {
  if (!isSigningOut) {
    isSigningOut = true;
    store.dispatch(showNotification(localizationService.get("SessionExpired"), "info", 5));
    localStorage.removeItem("auto-guest-login");
    signOut();
    isSigningOut = false;
  }
};

const apiClient = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use(async (config) => {
  const session = await getSession();

  if (session?.accessToken && isTokenExpired(session.accessToken)) {
    try {
      const { data } = await axios.post(
        `${baseURL}/api/auth/refresh/`,
        { refresh: session.refreshToken }
      );
      session.accessToken = data.access;
      session.refreshToken = data.refresh;
    } catch {
      handleSignOut();
      throw new axios.Cancel("Session expired");
    }
  }

  if (session?.accessToken) {
    config.headers["Authorization"] = `Bearer ${session.accessToken}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.code === "ERR_NETWORK") {
      store.dispatch(
        showNotification(localizationService.get("ServerOfflineBanner"), "error", 6)
      );
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const session = await getSession();

      if (session?.refreshToken) {
        try {
          const { data } = await axios.post(
            `${baseURL}/api/auth/refresh/`,
            { refresh: session.refreshToken }
          );
          session.accessToken = data.access;
          session.refreshToken = data.refresh;
          originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
          return apiClient(originalRequest);
        } catch {
          handleSignOut();
          return Promise.reject(error);
        }
      } else {
        handleSignOut();
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;