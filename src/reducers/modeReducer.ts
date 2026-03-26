// ai-chat-next/src/reducers/modeReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ModeState {
    current: "auth" | "neira" | "demo";
  }

const initialState: ModeState = {
  current: "auth",
};

const modeSlice = createSlice({
  name: "mode",
  initialState,
  reducers: {
    setMode: (state, action: PayloadAction<"auth" | "neira" | "demo">) => {
        state.current = action.payload;
      },
  },
});

export const modeActions =  modeSlice.actions;
export default modeSlice.reducer;

