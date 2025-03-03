import { configureStore } from "@reduxjs/toolkit";
import schemeSlice from "./schemeSlice";
import UserInputSlice from "./userInputSlice";

export const store = configureStore({
  reducer: {
    scheme: schemeSlice.reducer,
    userInput: UserInputSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
