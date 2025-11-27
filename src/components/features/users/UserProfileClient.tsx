// ai-chat-next/src/components/features/users/UserProfileClient.tsx
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { AppDispatch } from "@store/store";
import "@styles/starry_sky_styles.css";
import { audioService } from "@services/audioService";
import apiClient from "@services/authClientService";
import Notification from "@features/common/Notification";
import { localizationService } from "@services/localizationService";
import { showNotification } from "@reducers/notificationReducer";
import { useAppMode } from "@/hooks/useAppMode";
import { track } from "@/utils/track";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UserProfileClient() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const mode = useAppMode();
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    audioService.playMusic("/music/cinderella.mp3");
    return () => audioService.stopMusic();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await apiClient.get(`${baseURL}/api/auth/get-user-data/`);
        setUserData(res.data);
        setName(res.data.name || "");
      } catch (err) {
        dispatch(showNotification(localizationService.get("ErrorFetchingProfile"), "error", 4));
        if (axios.isCancel(err) || (axios.isAxiosError(err) && err.response?.status === 401)) {
          await signOut({ callbackUrl: "/" });
        }
      }
    };

    fetchUserData();
  }, [router, dispatch]);

  useEffect(() => {
    if (userData?.name) {
      const isPromo = userData.name.toLowerCase() === "gudvin";
      localStorage.setItem("isPromoUser", JSON.stringify(isPromo));
    }
  }, [userData]);

  const updateName = async () => {
    if (!name.trim()) return;

    try {
      setSaving(true);
      const res = await apiClient.put(`${baseURL}/api/auth/update-name/`, { name });
      setUserData(prev => (prev ? { ...prev, name: res.data.name } : null));
      setEditingName(false);
    } catch (err) {
      console.error("Error updating name", err);
      if (axios.isCancel(err) || (axios.isAxiosError(err) && err.response?.status === 401)) {
        await signOut({ callbackUrl: "/" });
      }
    } finally {
      setSaving(false);
    }
  };

  const handleOutboundClick = (eventName: string) => {
    track(eventName, "Neira-Story");
    audioService.fadeOutMusic(6000);
  };

  if (!userData) {
    return <div className="p-8">{localizationService.get("LoadingProfile")}</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">
      <div id="stars" className="absolute inset-0"></div>
      <div id="stars2" className="absolute inset-0"></div>
      <div id="stars3" className="absolute inset-0"></div>
      {mode === "neira" ? (
        // NEIRA MODE
        <>
          {/* Кнопка ← по центру вверху */}
          <div className="absolute top-4 left-0 right-0 flex justify-center z-20">
            <Link
              href="/"
              className="px-4 py-2 bg-gray-900 bg-opacity-80 text-white rounded-lg hover:bg-gray-700 transition"
            >
              ←
            </Link>
          </div>

          {/* Кнопка Infinitum — строго по центру экрана */}
          <div className="fixed inset-0 flex items-center justify-center z-10">
            <Link
              href="/emily"
              // href="https://stepik.org/a/253246/pay?promo=5b26f0129fa670d7"
              onClick={() => audioService.fadeOutMusic(10000)} // ⏳ затухание за 10 секунд
              className="px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition shadow-xl animate-pulse"
              target="_blank"
            >
              {localizationService.get("Infinitum")}
            </Link>
          </div>
        </>
      ) : (
        // AUTH MODE
        <>
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url("/images/main.png")`, opacity: 0.05 }}
          />

          <div className="relative z-10 px-4 py-6 text-gray-200">
            <Notification />

            <div className="mt-8">
              <Link
                href="/"
                className="inline-block px-4 py-2 bg-green-500 bg-opacity-80 text-white rounded-lg hover:bg-green-700 transition"
              >
                {localizationService.get("ToHome")}
              </Link>
            </div>
            <div className="mt-4 bg-opacity-50 p-6 rounded-2xl shadow-xl max-w-md">
              <p>
                📧 <strong className="text-gray-100">Email:</strong> {userData.email}
              </p>

              <p className="mt-4">
                🧑 <strong className="text-gray-100">{localizationService.get("Name")}</strong>{" "}
                {editingName ? (
                  <input
                    value={name}
                    onChange={e => setName(e.target.value)}
                    onBlur={updateName}
                    onKeyDown={e => {
                      if (e.key === "Enter") updateName();
                      if (e.key === "Escape") {
                        setName(userData.name);
                        setEditingName(false);
                      }
                    }}
                    disabled={saving}
                    className="px-2 py-1 border border-gray-700 rounded-lg bg-gray-800 text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    autoFocus
                  />
                ) : (
                  <span
                    onClick={() => setEditingName(true)}
                    className="underline cursor-pointer hover:text-indigo-300 transition"
                    title={localizationService.get("ChangeName")}
                  >
                    {userData.name || localizationService.get("NotSpecified")}
                  </span>
                )}
              </p>
              <p className="mt-4">
                🎯{" "}
                <strong className="text-gray-100">
                  {localizationService.get("AskedQuestions")}
                </strong>{" "}
                {userData.quantity}
              </p>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <Link
                href="https://t.me/lemon1964lab"
                onClick={() => handleOutboundClick("tg_LemonLab")}
                // onClick={() => audioService.fadeOutMusic(5000)}
                className="mt-4 px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition shadow-xl"
                target="_blank"
              >
                🎩 LemonLab
              </Link>

              {/* Элемент 🜂 под кнопкой */}
              <div className="mt-3 text-green-400 animate-pulse">
                <span className="text-green-500 animate-ping inline-block mr-2">🜂</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <Link
                href="https://stepik.org/a/250212"
                onClick={() => handleOutboundClick("STEPIK_course_I")}
                // onClick={() => audioService.fadeOutMusic(5000)}
                className="mt-4 px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition shadow-xl"
                target="_blank"
              >
                🎓 STEPIK I
              </Link>

              {/* Элемент 🜂 под кнопкой */}
              <div className="mt-3 text-green-400 animate-pulse">
                <span className="text-green-500 animate-ping inline-block mr-2">🜂</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <Link
                href="https://stepik.org/a/250427/pay?promo=2e901c302fcd0fe3"
                onClick={() => handleOutboundClick("STEPIK_course_II")}
                // onClick={() => audioService.fadeOutMusic(5000)}
                className="mt-4 px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition shadow-xl"
                target="_blank"
              >
                🎓 STEPIK II
              </Link>

              {/* Элемент 🜂 под кнопкой */}
              <div className="mt-3 text-green-400 animate-pulse">
                <span className="text-green-500 animate-ping inline-block mr-2">🜂</span>
              </div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center px-4">
              <Link
                href="https://stepik.org/a/253246/pay?promo=5b26f0129fa670d7"
                onClick={() => handleOutboundClick("STEPIK_course_III")}
                // onClick={() => audioService.fadeOutMusic(5000)}
                className="mt-4 px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition shadow-xl"
                target="_blank"
              >
                🎓 STEPIK III
              </Link>

              {/* Элемент 🜂 под кнопкой */}
              <div className="mt-3 text-green-400 animate-pulse">
                <span className="text-green-500 animate-ping inline-block mr-2">🜂</span>
              </div>
            </div>

          </div>
        </>
      )}
    </div>
  );
}
