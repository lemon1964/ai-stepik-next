// src/store/store.ts
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer from "@reducers/notificationReducer";
import modelReducer from "@reducers/modelReducer";
import availableModelsReducer from "@reducers/availableModelsReducer";
import languageReducer from "@/reducers/languageReducer";
import { chatApi } from "@services/chatApi";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    model: modelReducer,
    availableModels: availableModelsReducer,
    language: languageReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().concat(chatApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
// // src/store/store.ts
// import { configureStore } from "@reduxjs/toolkit";
// import notificationReducer from "@/reducers/notificationReducer";
// import modelReducer from "@/reducers/modelReducer";
// import languageReducer from "@/reducers/languageReducer";
// import { chatApi } from "@/services/chatApi";

// const store = configureStore({
//   reducer: {
//     notification: notificationReducer,
//     model: modelReducer,
//     language: languageReducer,
//     [chatApi.reducerPath]: chatApi.reducer,
//   },
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(chatApi.middleware),
// });

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
// export default store;