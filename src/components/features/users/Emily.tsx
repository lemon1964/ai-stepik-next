/// Улучшенная версия Emily.tsx с прелоадером
'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Unicorn from "@ui/common/Unicorn";

export default function Emily() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleCanPlay = () => {
      setIsLoading(false);
      video.play().catch(console.error);
    };

    const handleVideoEnd = () => {
      router.back();
    };

    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('ended', handleVideoEnd);

    return () => {
      video.removeEventListener('canplay', handleCanPlay);
      video.removeEventListener('ended', handleVideoEnd);
    };
  }, [router]);

  return (
    <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <Unicorn />
          {/* <div className="text-white text-xl">🦄</div> */}
        </div>
      )}
      
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        autoPlay
        muted
        playsInline
        preload="auto"
      >
        <source src="/video/Emily.mov" type="video/mp4" />
        <source src="/video/Emily.mov" type="video/quicktime" />
        Ваш браузер не поддерживает видео.
      </video>
      
      <button
        onClick={() => router.back()}
        className="absolute top-4 right-4 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition backdrop-blur-sm"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}





// // ai-chat-next/src/components/features/users/Emily.tsx
// 'use client';

// import { useEffect, useRef } from 'react';
// import { useRouter } from 'next/navigation';

// export default function Emily() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const router = useRouter();

//   useEffect(() => {
//     const video = videoRef.current;
//     if (!video) return;

//     const handleVideoEnd = () => {
//       // После завершения видео возвращаемся назад
//       router.back();
//     };

//     video.addEventListener('ended', handleVideoEnd);
    
//     // Автовоспроизведение с звуком
//     video.play().catch(console.error);

//     return () => {
//       video.removeEventListener('ended', handleVideoEnd);
//     };
//   }, [router]);

//   return (
//     <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
//       <video
//         ref={videoRef}
//         className="w-full h-full object-cover"
//         autoPlay
//         muted // Сначала без звука для автовоспроизведения
//         playsInline
//       >
//         <source src="/video/Emily.mov" type="video/mp4" />
//         <source src="/video/Emily.mov" type="video/quicktime" />
//         Ваш браузер не поддерживает видео.
//       </video>
      
//       {/* Кнопка закрытия */}
//       <button
//         onClick={() => router.back()}
//         className="absolute top-4 right-4 z-10 bg-white/20 text-white p-2 rounded-full hover:bg-white/30 transition backdrop-blur-sm"
//       >
//         <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//         </svg>
//       </button>
//     </div>
//   );
// }