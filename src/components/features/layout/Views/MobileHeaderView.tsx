// ai-chat-next//src/components/features/layout/views/MobileHeaderView.tsx
"use client";

import { FC } from "react";
import { MODEL_OPTIONS } from "@/data/ModelOptions";
import { useDispatch } from "react-redux";
import { modelActions } from "@/reducers/modelReducer";
import { signOut, useSession } from "next-auth/react";
import { localizationService } from "@/services/localizationService";

interface MobileHeaderViewProps {
  onMenuToggle(): void;
  modelType: ModelType;
  selectedModel: string;
  onLanguageChange(lang: "ru" | "en"): void;
}

export const MobileHeaderView: FC<MobileHeaderViewProps> = ({
  onMenuToggle,
  modelType,
  selectedModel,
  onLanguageChange,
}) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();

  return (
    <header className="md:hidden flex items-center justify-between bg-gray-800 px-3 py-2 shadow">
      <button
        onClick={onMenuToggle}
        className="p-2 text-white hover:bg-gray-700 rounded"
        aria-label="Open menu"
      >
        ☰
      </button>

      <div className="flex-1 mx-2 space-y-1">
        <div className="flex justify-center space-x-1">
          <button
            onClick={() => onLanguageChange("en")}
            className="px-2 py-1 bg-blue-500 text-white rounded text-xs"
          >
            EN
          </button>
          <button
            onClick={() => onLanguageChange("ru")}
            className="px-2 py-1 bg-green-500 text-white rounded text-xs"
          >
            RU
          </button>
        </div>
        <div className="flex justify-center space-x-1">
          <select
            value={modelType}
            onChange={e => {
              dispatch(modelActions.setModelType(e.target.value as ModelType));
            }}
            className="bg-gray-700 text-white text-xs rounded px-1 py-0.5"
          >
            <option value="text">{localizationService.get("Texts")}</option>
            <option value="code">{localizationService.get("Codes")}</option>
            <option value="image">{localizationService.get("Images")}</option>
          </select>
          <select
            value={selectedModel}
            onChange={e => {
              dispatch(modelActions.setModel(e.target.value));
            }}
            className="bg-gray-700 text-white text-xs rounded px-1 py-0.5"
          >
            {MODEL_OPTIONS[modelType].map(m => (
              <option key={m.id} value={m.id}>
                {m.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {session && (
        <button
        onClick={() => {
          localStorage.removeItem("auto-guest-login");
          sessionStorage.setItem("justSignedOutAt", Date.now().toString());
          signOut();
        }}
          className="ml-8 p-2 text-white hover:bg-gray-700 rounded"
          aria-label="Sign out"
        >
          ⏏
        </button>
      )}
    </header>
  );
};