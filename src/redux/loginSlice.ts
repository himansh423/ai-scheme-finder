import { createSlice } from "@reduxjs/toolkit";

interface LoginState {
  error: string;
}

const initialState: LoginState = {
  error: "",
};

const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    setError: (state, actions) => {
      const { data } = actions.payload;
      state.error = data;
    },
  },
});

export const loginAction = loginSlice.actions;
export default loginSlice;
