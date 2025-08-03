// ai-chat-next/src/hooks/useAppMode.ts
import { useSelector } from "react-redux";
import { RootState } from "@store/store";

export const useAppMode = () => {
  return useSelector((state: RootState) => state.mode.current);
};
