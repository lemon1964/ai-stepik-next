// ai-chat-next/src/components/features/common/ClientChatPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { localizationService } from "@/services/localizationService";
import { Layout } from "@features/layout/Layout";
import { ChatWindowContainer } from "@features/chat/ChatWindowContainer";
import { RootState } from "@/store/store";
import Notification from "@features/common/Notification";
import { Session } from "next-auth";
import useBackendWakeUp from "@/hooks/useBackendWakeUp";
import ChatSkeleton from "@ui/common/Preloader";
import { ErrorBoundary } from "@ui/common/ErrorBoundary";
import { signIn } from "next-auth/react";
import { useModels } from "@/hooks/useModels";


export default function ClientChatPage({ session }: { session: Session | null }) {
  const [selected, setSelected] = useState<null | { id: string; name: string }>(null);
  const isWakingUp = useBackendWakeUp();
  const currentLanguage = useSelector((state: RootState) => state.language.current);
  const { isLoadingModels } = useModels(); // 💡 Модели подгружаются сразу


  useEffect(() => {
    localizationService.syncLanguageSettings();
  }, [currentLanguage]);

  // После других эффектов
  useEffect(() => {
    setSelected(null);
  }, [session]);

  useEffect(() => {
    const alreadyAutoLoggedIn = localStorage.getItem("auto-guest-login");
    const justSignedOutAt = parseInt(sessionStorage.getItem("justSignedOutAt") || "0", 10);
    const recentlySignedOut = Date.now() - justSignedOutAt < 5000;
  
    if (!session && !alreadyAutoLoggedIn && !recentlySignedOut) {
      signIn("credentials", {
        email: "lemon.design@mail.ru",
        password: "Q195375q",
        redirect: false,
      }).then(() => {
        localStorage.setItem("auto-guest-login", "true");
      });
    }
  }, [session]);

  if (isWakingUp) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ChatSkeleton />
        <span className="ml-2 text-gray-600">Пробуждаем сервер, ждем…</span>
      </div>
    );
  }

  if (isLoadingModels) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ChatSkeleton />
        <span className="ml-2 text-gray-600">Загружаем модели..</span>
      </div>
    );
  }

  return (
    <>
      <Notification />
      <Layout onCategorySelect={(id, name) => setSelected({ id, name })}>
        {selected ? (
          <ErrorBoundary>
            <ChatWindowContainer categoryId={selected.id} categoryName={selected.name} />
          </ErrorBoundary>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            {localizationService.get("SelectCategory")}
          </div>
        )}
      </Layout>
    </>
  );
}
