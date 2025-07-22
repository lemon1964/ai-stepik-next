// ai-chat-next//src/components/features/layout/MobileHeader.tsx
"use client";

import { FC, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { showNotification } from "@/reducers/notificationReducer";
import { AppDispatch, RootState } from "@/store/store";
import { languageActions } from "@/reducers/languageReducer";
import { localizationService } from "@/services/localizationService";
import { MobileHeaderView } from "./Views/MobileHeaderView";
import { useSelector } from "react-redux";

export interface MobileHeaderProps {
  onMenuToggle(): void;
  modelType: ModelType;
  selectedModel: string;
}

export const MobileHeader: FC<MobileHeaderProps> = ({
  onMenuToggle,
  modelType,
  selectedModel,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const { data: session } = useSession();
  const availableModels = useSelector((state: RootState) => state.availableModels);

  useEffect(() => {
    if (session) return;
    if (window.innerWidth < 768) {
      dispatch(showNotification(localizationService.get("MobileLoginOnly"), "info", 5));
    }
  }, [session, dispatch]);

  const handleLanguageChange = (lang: "ru" | "en") => {
    dispatch(languageActions.setLanguage(lang));
    localizationService.syncLanguageSettings();
  };

  return (
    <MobileHeaderView
      onMenuToggle={onMenuToggle}
      modelType={modelType}
      selectedModel={selectedModel}
      onLanguageChange={handleLanguageChange}
      availableModels={availableModels}
    />
  );
};
