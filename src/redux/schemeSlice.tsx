import { createSlice } from "@reduxjs/toolkit";

interface Scheme {
  name: string;
  category: string;
  eligibility: string;
  reason: string;
  TrustScore: string;
  schemeId: string;
}

interface ComparisonList {
  name: string;
  category: string;
  eligibility: string;
  reason: string;
  TrustScore: string;
  schemeId: string;
}
interface SchemeState {
  schemes: Scheme[];
  savedSchemes: Scheme[];
  comparisonList: ComparisonList[];
}

const initialState: SchemeState = {
  schemes: [],
  savedSchemes: [],
  comparisonList: [],
};
const schemeSlice = createSlice({
  name: "scheme",
  initialState,
  reducers: {
    setSchemes: (state, action) => {
      const { data } = action.payload;
      state.schemes = data;
    },
    setSavedSchemes: (state, action) => {
      const { data } = action.payload;
      state.savedSchemes = data;
    },
    setComparisonList: (state, action) => {
      const { data } = action.payload;
      state.comparisonList = data;
    },
  },
});

export const schemeAction = schemeSlice.actions;

export default schemeSlice;
