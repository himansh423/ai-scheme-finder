import { createSlice } from "@reduxjs/toolkit";

interface UserState {
  loggedInUser: {
    firstName: string;
    lastName: string;
    userId: string;
    username: string;
    email: string;
    isAnswersPresent: boolean;
    isProfilePictureUploaded: boolean;
    isBioAdded: boolean;
  } | null;
}

const initialState: UserState = {
  loggedInUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLoggedInUser: (state, action) => {
      const { data } = action.payload;
      state.loggedInUser = data;
    },
    clearUser: (state) => {
      state.loggedInUser = null;
    },
  },
});

export const userAction = userSlice.actions;
export default userSlice;
