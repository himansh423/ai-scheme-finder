import { configureStore } from "@reduxjs/toolkit";
import schemeSlice from "./schemeSlice";
import UserInputSlice from "./userInputSlice";
import userSlice from "./userSlice";
import loginSlice from "./loginSlice";
import emailSlice from "./emailSlice";

export const store = configureStore({
  reducer: {
    scheme: schemeSlice.reducer,
    userInput: UserInputSlice.reducer,
    login: loginSlice.reducer,
    user: userSlice.reducer,
    email: emailSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
