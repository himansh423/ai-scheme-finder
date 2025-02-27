import { createSlice } from "@reduxjs/toolkit";

interface Scheme {
  name: string;
  category: string;
  eligibility: string;
  reason: string;
  TrustScore: string;
}
interface SchemeState {
  schemes: Scheme[];
}

const initialState: SchemeState = {
  schemes: [],
};
const schemeSlice = createSlice({
  name: "scheme",
  initialState,
  reducers: {
    setSchemes: (state, action) => {
      const { data } = action.payload;
      state.schemes = data;
    },
  },
});

export const schemeAction = schemeSlice.actions;

export default schemeSlice;
