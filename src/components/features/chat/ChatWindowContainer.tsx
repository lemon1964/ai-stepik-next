// ai-chat-front/src/components/features/chat/ChatWindowContainer.tsx

import { FC, useState, useRef, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSession } from "next-auth/react";
import { RootState, AppDispatch } from "@/store/store";
import { useGetQuestionsQuery, useCreateQuestionMutation } from "@/services/chatApi";
import { showNotification } from "@/reducers/notificationReducer";
import { useSpeechRecognition } from "@/hooks/useSpeechRecognition";
import { useTextToSpeech } from "@/hooks/useTextToSpeech";
import { useRateLimit } from "@/hooks/useRateLimit";
import { demoCategoryIds, demoMessages } from "@/data/demoChat";
import { localizationService } from "@/services/localizationService";
import { ChatWindowView } from "./ChatWindowViews/ChatWindowView";


export const ChatWindowContainer: FC<ChatWindowProps> = ({ categoryId, categoryName }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { modelType, selectedModel } = useSelector((state: RootState) => state.model);
  const session = useSession();

  const isDemoCategory = demoCategoryIds.includes(categoryId);
  const isDemo = isDemoCategory;

  const {
    data: messages,
    isLoading,
    isFetching,
    refetch,
    error,
  } = useGetQuestionsQuery(categoryId, { skip: isDemoCategory });

  const [audioModalOpen, setAudioModalOpen] = useState(false);
  const [createQuestion, { isLoading: isSending }] = useCreateQuestionMutation();
  const [input, setInput] = useState("");
  const sendButtonRef = useRef<HTMLButtonElement>(null);

  const { speakingId, speakText } = useTextToSpeech();
  const startListening = useSpeechRecognition(transcript => {
    setInput(transcript);
    sendButtonRef.current?.focus();
  });

  const PAGE_SIZE = 20;
  const [limit, setLimit] = useState(PAGE_SIZE);
  const { isAllowed, mark } = useRateLimit();

  useEffect(() => {
    setLimit(PAGE_SIZE);
  }, [categoryId]);

  const messagesToShow = useMemo<Message[]>(() => {
    if (isDemo) {
      return demoMessages[categoryId] || [];
    }
    return messages ? messages.slice(-limit).reverse() : [];
  }, [isDemo, categoryId, messages, limit]);

  const topRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesToShow.length > 0) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messagesToShow]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    if (container.scrollTop < 50 && messages && limit < messages.length) {
      setLimit(prev => Math.min(prev + PAGE_SIZE, messages.length));
    }
  };

  const scrollToTop = () => topRef.current?.scrollIntoView({ behavior: "smooth" });
  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" });

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const type = modelType as "text" | "code" | "image";
    const isPromo = JSON.parse(localStorage.getItem("isPromoUser") || "false");

    if (!isPromo) {
      const { ok, retryAfter } = isAllowed(type);
      if (!ok) {
        const when = retryAfter!.toLocaleString();
        const typeLabel = localizationService.get(type);
        const msg1 = localizationService.get("LimitReached", { type: typeLabel });
        const msg2 = localizationService.get("NextAllowedAt", { when });
        dispatch(showNotification(`${msg1} ${msg2}`, "error", 10));
        return;
      }
    }

    try {
      await createQuestion({
        categoryId,
        prompt: input.trim(),
        model: selectedModel,
        model_type: modelType,
        category_id: categoryId,
        language: localizationService.getCurrentLanguage(),
      }).unwrap();
      dispatch(showNotification(localizationService.get("QuestionSent"), "success", 2));
      mark(type);
      setInput("");
      refetch();
    } catch {
      dispatch(showNotification(localizationService.get("ErrorSendingQuestion"), "error", 3));
    }
  };

  if (session.data && isDemo) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-600">
        {localizationService.get("SelectCategory")}
      </div>
    );
  }

  return (
    <ChatWindowView
      key={categoryId}
      categoryName={categoryName}
      messagesToShow={messagesToShow}
      isLoading={isLoading}
      isFetching={isFetching}
      isSending={isSending}
      error={error}
      input={input}
      setInput={setInput}
      send={send}
      isDemo={isDemo}
      speakingId={speakingId}
      speakText={speakText}
      startListening={startListening}
      sendButtonRef={sendButtonRef}
      audioModalOpen={audioModalOpen}
      setAudioModalOpen={setAudioModalOpen}
      handleScroll={handleScroll}
      scrollToTop={scrollToTop}
      scrollToBottom={scrollToBottom}
      topRef={topRef}
      bottomRef={bottomRef}
    />
  );
};
