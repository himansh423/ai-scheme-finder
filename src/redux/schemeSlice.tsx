import { createSlice } from "@reduxjs/toolkit";

interface Scheme {
  name: string;
  category: string;
  eligibility: string;
  reason: string;
  TrustScore: string;
  schemeId:string,
}
interface SchemeState {
  schemes: Scheme[]; 
  savedSchemes:Scheme[];
}

const initialState: SchemeState = {
  schemes: [],
  savedSchemes:[],
};
const schemeSlice = createSlice({
  name: "scheme",
  initialState,
  reducers: {
    setSchemes: (state, action) => {
      const { data } = action.payload;
      state.schemes = data;
    },
    setSavedSchemes:(state,action) => {
      const {data} = action.payload;
      state.savedSchemes = data;
    
    }
  },
});

export const schemeAction = schemeSlice.actions;

export default schemeSlice;
