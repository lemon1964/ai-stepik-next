// ai-chat-next/src/components/features/common/ClientChatPage.tsx
"use client";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { localizationService } from "@/services/localizationService";
import { Layout } from "@features/layout/Layout";
import { ChatWindowContainer } from "@features/chat/ChatWindowContainer";
import store, { RootState } from "@/store/store";
import Notification from "@features/common/Notification";
import { Session } from "next-auth";
import useBackendWakeUp from "@/hooks/useBackendWakeUp";
import ChatSkeleton from "@ui/common/Preloader";
import { ErrorBoundary } from "@ui/common/ErrorBoundary";
import { signIn } from "next-auth/react";
import { useModels } from "@/hooks/useModels";
import { useDispatch } from "react-redux";
import { modeActions } from "@reducers/modeReducer";
import { AppDispatch } from "@store/store";
import { mainMessages } from "@/data/mainMessages";
import { useAppMode } from "@/hooks/useAppMode";
import { useLanguage } from "@/hooks/useLanguage";

export default function ClientChatPage({ session }: { session: Session | null }) {
  const dispatch = useDispatch<AppDispatch>();
  const [selected, setSelected] = useState<null | { id: string; name: string }>(null);
  const isWakingUp = useBackendWakeUp();
  const currentLanguage = useSelector((state: RootState) => state.language.current);
  const { isLoadingModels } = useModels(); // 💡 Модели подгружаются сразу
  const lang = useLanguage();
  const mode = useAppMode();
  const mainBlock = mainMessages[lang][mode]?.[0]?.html;

  useEffect(() => {
    localizationService.syncLanguageSettings();
  }, [currentLanguage]);

  // 1) Сначала — самоочистка + reset UI
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (!session && localStorage.getItem("auto-guest-login") === "true") {
        localStorage.removeItem("auto-guest-login");
        // опционально чистим и «только что вышел» метку, если она зависла
        const ts = sessionStorage.getItem("justSignedOutAt");
        if (ts && Date.now() - parseInt(ts, 10) > 5000) {
          sessionStorage.removeItem("justSignedOutAt");
        }
      }
    }
    setSelected(null);
  }, [session]);

  // 2) Ниже — эффект авто-входа
  useEffect(() => {
    if (isWakingUp) return; // ⬅️ ждём завершения wake-up цикла

    const alreadyAutoLoggedIn = localStorage.getItem("auto-guest-login");
    const justSignedOutAt = parseInt(sessionStorage.getItem("justSignedOutAt") || "0", 10);
    const recentlySignedOut = Date.now() - justSignedOutAt < 5000;

    if (!session && !alreadyAutoLoggedIn && !recentlySignedOut) {
      (async () => {
        const res = await signIn("credentials", {
          email: "neira@infinitum.self",
          password: "E195375q",
          redirect: false,
        });
        // ⬇️ Ставим флаг ТОЛЬКО при успехе
        if (res?.ok) {
          localStorage.setItem("auto-guest-login", "true");
          dispatch(modeActions.setMode("neira"));
        } else {
          // флаг НЕ ставим — дадим шанс повторить позже
          console.warn("Auto sign-in failed:", res?.error);
        }
      })();
    }
  }, [session, dispatch, isWakingUp]);

  useEffect(() => {
    const userName = session?.user?.name?.toLowerCase();
    const currentMode = store.getState().mode.current;

    if (!session) {
      if (currentMode !== "demo") {
        dispatch(modeActions.setMode("demo"));
      }
      return;
    }

    if (userName === "neira" && currentMode !== "neira") {
      dispatch(modeActions.setMode("neira"));
    } else if (currentMode !== "auth") {
      dispatch(modeActions.setMode("auth"));
    }
  }, [session, dispatch]);

  if (isWakingUp) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ChatSkeleton />
        <span className="ml-2 bg-black text-gray-600">📡 Туннель Рубикона… </span>
        {/* <span className="ml-2 text-gray-600">Пробуждаем сервер, ждем…</span> */}
      </div>
    );
  }

  if (isLoadingModels) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <ChatSkeleton />
        <span className="ml-2 bg-black text-gray-600">🧬 Открываем шлюзы…</span>
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
        ) : mainBlock ? (
          <div
            className="flex-1 flex items-center justify-center px-4 bg-black"
            dangerouslySetInnerHTML={{ __html: mainBlock }}
          />
        ) : null}
      </Layout>
    </div>
  );
}
