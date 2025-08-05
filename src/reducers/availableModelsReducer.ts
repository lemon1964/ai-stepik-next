// src/reducers/availableModelsReducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Model {
  id: string;
  name: string;
}

interface AvailableModelsState {
  text: Model[];
  code: Model[];
  image: Model[];
}

const initialState: AvailableModelsState = {
  text: [],
  code: [],
  image: [
    { id: "flux_schnell_free", name: "Flux" },
  ],
};

export const availableModelsSlice = createSlice({
  name: "availableModels",
  initialState,
  reducers: {
    setAvailableModels: (
      state,
      action: PayloadAction<{
        text_models: Array<{ brand: string; model_id: string }>;
        code_models: Array<{ brand: string; model_id: string }>;
      }>
    ) => {
      // --- TEXT
      const realText = action.payload.text_models.map((m) => ({
        id: m.model_id,
        name: capitalize(m.brand),
      }));

      state.text = realText.length > 0
        ? [{ id: realText[0].id, name: "Neira" }, ...realText]
        : [];

      // --- CODE
      const realCode = action.payload.code_models.map((m) => ({
        id: m.model_id,
        name: capitalize(m.brand),
      }));

      state.code = realCode.length > 0
        ? [{ id: realCode[0].id, name: "Neira" }, ...realCode]
        : [];

      // --- IMAGE (всегда одна модель — flux_schnell_free)
      state.image = [
        { id: "flux_schnell_free", name: "Neira" },
        { id: "flux_schnell_free", name: "Flux" },
      ];
    },
  },
});

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export const { setAvailableModels } = availableModelsSlice.actions;
export default availableModelsSlice.reducer;

// // src/reducers/availableModelsReducer.ts
// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// interface AvailableModelsState {
//   text: Array<{ id: string; name: string }>;
//   code: Array<{ id: string; name: string }>;
//   image: Array<{ id: string; name: string }>;
// }

// const initialState: AvailableModelsState = {
//   text: [],
//   code: [],
//   image: [{ id: "flux_schnell_free", name: "Flux" }],
// };

// export const availableModelsSlice = createSlice({
//   name: "availableModels",
//   initialState,
//   reducers: {
//     setAvailableModels: (state, action: PayloadAction<{
//       text_models: Array<{ brand: string; model_id: string }>;
//       code_models: Array<{ brand: string; model_id: string }>;
//     }>) => {
//       state.text = action.payload.text_models.map(m => ({
//         id: m.model_id,
//         name: m.brand.charAt(0).toUpperCase() + m.brand.slice(1),
//       }));
//       state.code = action.payload.code_models.map(m => ({
//         id: m.model_id,
//         name: m.brand.charAt(0).toUpperCase() + m.brand.slice(1),
//       }));
//     },
//   },
// });

// export const { setAvailableModels } = availableModelsSlice.actions;
// export default availableModelsSlice.reducer;