// ai-chat-next/src/hooks/useUserSession.ts
"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { localizationService } from "@/services/localizationService";
import apiClient from "@/services/authClientService";
import { useDispatch } from "react-redux";
import { showNotification } from "@/reducers/notificationReducer";
import { AppDispatch } from "@/store/store";

export function useUserSession() {
  const { data: session, status } = useSession();
  const dispatch = useDispatch<AppDispatch>();
  const [userName, setUserName] = useState("🫥");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const verify = async () => {
      if (!session?.refreshToken) return;
      try {
        await apiClient.post("/api/auth/token/verify/", {
          token: session.refreshToken,
        });
      } catch {}
    };
    verify();
  }, [session]);

  useEffect(() => {
    if (!session) {
      setIsLoading(false);
      return;
    }
    
    (async () => {
      try {
        const res = await apiClient.get("/api/auth/get-user-data/");
        setUserName(res.data.name || "🫥");
        // dispatch(showNotification(localizationService.get("RateLimitRules"), "info", 5));
      } catch {
        setUserName("🫥");
        dispatch(showNotification(localizationService.get("ErrorFetchingProfile"), "error", 4));
      } finally {
        setIsLoading(false);
      }
    })();
  }, [session, dispatch]);

  return { 
    session, 
    userName,
    status, // Добавляем статус загрузки
    isLoading // Добавляем флаг загрузки
  };
}