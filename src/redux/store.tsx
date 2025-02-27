import { configureStore } from "@reduxjs/toolkit";
import schemeSlice from "./schemeSlice";

export const store = configureStore({
  reducer: {
    scheme: schemeSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
