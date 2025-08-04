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
// // ai-chat-next//src/components/features/layout/MobileHeader.tsx
// "use client";

// import { FC, useEffect } from "react";
// import { useSession } from "next-auth/react";
// import { useDispatch } from "react-redux";
// import { showNotification } from "@/reducers/notificationReducer";
// import { AppDispatch, RootState } from "@/store/store";
// import { languageActions } from "@/reducers/languageReducer";
// import { localizationService } from "@/services/localizationService";
// import { MobileHeaderView } from "./Views/MobileHeaderView";
// import { useSelector } from "react-redux";
// import { useUserSession } from "@/hooks/useUserSession";

// export interface MobileHeaderProps {
//   onMenuToggle(): void;
//   modelType: ModelType;
//   selectedModel: string;
// }

// export const MobileHeader: FC<MobileHeaderProps> = ({
//   onMenuToggle,
//   modelType,
//   selectedModel,
// }) => {
//   const dispatch = useDispatch<AppDispatch>();
//   const { session, userName, status, isLoading } = useUserSession();
//   // const { data: session } = useSession();
//   const availableModels = useSelector((state: RootState) => state.availableModels);

//   useEffect(() => {
//     if (session) return;
//     if (window.innerWidth < 768) {
//       dispatch(showNotification(localizationService.get("MobileLoginOnly"), "info", 5));
//     }
//   }, [session, dispatch]);

//   const handleLanguageChange = (lang: "ru" | "en") => {
//     dispatch(languageActions.setLanguage(lang));
//     localizationService.syncLanguageSettings();
//   };

//   if (isLoading || status === "loading") {
//     return (
//       <header className="hidden md:flex items-center justify-between p-4 bg-gray-800 text-white">
//         <div className="animate-pulse">Загрузка...</div>
//       </header>
//     );
//   }

//   return (
//     <MobileHeaderView
//       onMenuToggle={onMenuToggle}
//       modelType={modelType}
//       selectedModel={selectedModel}
//       onLanguageChange={handleLanguageChange}
//       availableModels={availableModels}
//       userName={userName}
//     />
//   );
// };
