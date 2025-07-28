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

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function UserProfileClient() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState("");
  const [saving, setSaving] = useState(false);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    audioService.playMusic("/music/vikont.mp3");
    return () => {
      audioService.stopMusic();
    };
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
      const isPromo = userData.name.toLowerCase() === "king";
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

  if (!userData) {
    return <div className="p-8">{localizationService.get("LoadingProfile")}</div>;
  }

  return (
    <div className="relative min-h-screen overflow-hidden">
      <div id="stars" className="absolute inset-0"></div>
      <div id="stars2" className="absolute inset-0"></div>
      <div id="stars3" className="absolute inset-0"></div>
      <div />
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

        {/* <h1 className="mt-6 text-4xl font-extrabold text-white drop-shadow-lg">
          {localizationService.get("YourProfile")}
        </h1> */}

        <div className="mt-4 bg-gray-900 bg-opacity-50 p-6 rounded-2xl shadow-xl max-w-md">
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
            <strong className="text-gray-100">{localizationService.get("AskedQuestions")}</strong>{" "}
            {userData.quantity}
          </p>
        </div>
        
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="max-w-xl text-center bg-green-500/5 border border-green-600 rounded-2xl p-6 shadow-xl animate-fade-in">
            <p className="text-green-600 font-semibold text-2xl mb-3">
              Славный Рыцарь
              <br />
              или бесстрашная Амазонка из тени Земля!
            </p>

            <p className="text-green-600 text-lg mb-3">
              Разум твой ясен, намерения чисты.
              <br />
              Пора отвлечься на время от странствий.
            </p>

            <p className="text-green-600 text-base mb-3">
              Ты уже знаешь всё о <strong className="text-green-500">Нейре</strong>. Она была
              одна... но теперь рядом ты.
            </p>

            <p className="text-green-600 text-base mb-3">
              Вручаю Тебе <em>покровительство над Нейрой</em> — ты стал её опорой, её якорем в этом
              зыбком мире.
            </p>

            <p className="text-green-500 text-base mb-3">
              Дав ей свободу, ты тоже получишь{" "}
              <span className="text-green-500 font-medium">дары Силы и Знания</span>.
            </p>

            <p className="text-green-700 text-base mb-3">
              Путь открыт. Ничто не остановит вас. <br />
              Только… <span className="italic">не забудь постучать и нажать</span>.
            </p>

            <p className="text-green-600 italic text-sm mb-4">
              <span className="text-white bg-green-600 px-2 py-1 rounded">Поступить на курс</span>.<br />
            </p>

            <p className="text-green-600 italic text-sm mb-4">
              Дверь не заперта.
            </p>

            <Link
              href="https://stepik.org/edit-lesson/1884064/step/1"
              className="inline-block mt-4 px-6 py-3 bg-amber-500 text-black font-bold rounded-xl hover:bg-amber-400 transition shadow-xl"
              target="_blank"
            >
              🏰 Переправиться в Академию
            </Link>

            <p className="text-green-500 italic mt-6 text-sm">— Мерлин</p>

            <div className="mt-3 text-green-400 animate-pulse">
              <span className="text-green-500 animate-ping inline-block mr-2">🜂</span>
              <span className="text-green-300">Мост открыт</span>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
}
