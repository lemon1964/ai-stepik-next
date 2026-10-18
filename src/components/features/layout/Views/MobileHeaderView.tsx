// ai-chat-next//src/components/features/layout/views/MobileHeaderView.tsx
"use client";

import { FC, useState } from "react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

interface MobileHeaderViewProps {
  onMenuToggle(): void;
  userName: string;
}

export const MobileHeaderView: FC<MobileHeaderViewProps> = ({
  onMenuToggle,
  userName,
}) => {
  const { data: session } = useSession();
  const [, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    window.location.reload();
  };

  return (
    <header className="md:hidden flex items-center justify-between bg-gray-800 px-3 py-2 shadow">
      {/* Кнопка меню (всегда слева) */}
      <button
        onClick={onMenuToggle}
        className="p-2 text-white hover:bg-gray-700 rounded"
        aria-label="Open menu"
      >
        ☰
      </button>
  
      {/* Имя пользователя (по центру, только при наличии сессии) */}
      {session && (
        <div className="flex-1 text-center mx-2 truncate">
          <p className="text-gray-200 inline-block">
            <span className="font-medium">📍</span>{" "}
            <Link href="/user" className="underline hover:text-blue-400">
              {userName}
            </Link>
          </p>
        </div>
      )}
  
      {/* Кнопка выхода/обновления (всегда справа) */}
      <div className="w-8 flex justify-end">
        {status === "loading" ? (
          <span className="p-2 opacity-50">⟳</span>
        ) : session ? (
          <button
            onClick={() => {
              localStorage.removeItem("auto-guest-login");
              sessionStorage.setItem("justSignedOutAt", Date.now().toString());
              signOut();
            }}
            className="p-2 text-white hover:bg-gray-700 rounded"
            aria-label="Sign out"
          >
            ⏏
          </button>
        ) : (
          <button
            onClick={handleRefresh}
            className="p-2 text-white hover:bg-gray-700 rounded"
            aria-label="Refresh"
          >
            ⟳
          </button>
        )}
      </div>
    </header>
  );
};
