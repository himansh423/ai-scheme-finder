import { createSlice } from "@reduxjs/toolkit";

interface UserInput {
  age: string;
  salary: string;
  occupation: string;
  description: string;
  location: string;
}

const initialState: { userInput: UserInput } = {
  userInput: {
    age: "",
    salary: "",
    occupation: "",
    description: "",
    location: "",
  },
};

const UserInputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInput: (state, action) => {
      const { data } = action.payload;
      state.userInput = data;
    },
  },
});

export const userInputAction = UserInputSlice.actions;

export default UserInputSlice;
