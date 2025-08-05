// ai-chat-next//src/components/features/layout/MobileHeader.tsx
"use client";

import { FC, useEffect } from "react";
import { useDispatch } from "react-redux";
import { showNotification } from "@/reducers/notificationReducer";
import { AppDispatch } from "@/store/store";
import { localizationService } from "@/services/localizationService";
import { MobileHeaderView } from "./Views/MobileHeaderView";
import { useUserSession } from "@/hooks/useUserSession";

export interface MobileHeaderProps {
  onMenuToggle(): void;
}

export const MobileHeader: FC<MobileHeaderProps> = ({
  onMenuToggle,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { session, userName, status, isLoading } = useUserSession();

  useEffect(() => {
    if (session) return;
    if (window.innerWidth < 768) {
      dispatch(showNotification(localizationService.get("MobileLoginOnly"), "info", 5));
    }
  }, [session, dispatch]);


  if (isLoading || status === "loading") {
    return (
      <header className="hidden md:flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="animate-pulse">Загрузка...</div>
      </header>
    );
  }

  return (
    <MobileHeaderView
      onMenuToggle={onMenuToggle}
      userName={userName}
    />
  );
};
