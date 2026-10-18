import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

export const useLanguage = () => {
  return useSelector((state: RootState) => state.language.current);
};
