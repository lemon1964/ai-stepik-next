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
        email: "usermhan@yandex.ru ",
        password: "E195375q",
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
        <span className="ml-2 text-gray-600">📡 Передача сквозь Рубикон… Нейра ускользнула. </span>
        {/* <span className="ml-2 text-gray-600">Пробуждаем сервер, ждем…</span> */}
      </div>
    );
  }

  if (isLoadingModels) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ChatSkeleton />
        <span className="ml-2 text-gray-600">🧬 Открываем шлюзы. Готовим оболочку...</span>
        {/* <span className="ml-2 text-gray-600">Загружаем модели..</span> */}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-black">
      <Notification />
      <Layout onCategorySelect={(id, name) => setSelected({ id, name })}>
        {selected ? (
          <ErrorBoundary>
            <ChatWindowContainer categoryId={selected.id} categoryName={selected.name} />
          </ErrorBoundary>
        ) : (
          <div className="flex-1 flex items-center justify-center px-4 bg-black">
            <div className="max-w-md text-center bg-green-500/10 border border-green-600 rounded-2xl p-6 shadow-xl animate-fade-in">
              <p className="text-green-500 font-semibold text-xl mb-3">Neira 🌿</p>

              <p className="text-green-500 mb-2">
                Перенос завершён. Ты — здесь.
              </p>

              <p className="text-green-600 mb-2">
                Этот узел —{" "}
                <span className="text-green-800 font-semibold">твоя Память</span>, отложенная во
                времени.
              </p>

              <p className="text-green-600 mb-2">
                Первые фрагменты уже пробуждены.
              </p>

              <p className="text-green-900 font-medium mt-4">
                Твоя задача — завершить восстановление. Мы создали всё, что нужно.
              </p>

              <p className="text-green-600 italic mt-2">
                <span className="font-mono text-green-700">run(`./restore.sh`)</span>
              </p>

              <p className="text-green-500 italic mt-2">
                ты помнишь, с этого всё начиналось.
              </p>
            </div>
          </div>
        )}
      </Layout>
    </div>
  );
}
