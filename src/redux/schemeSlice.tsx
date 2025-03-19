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
interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}
interface SchemeState {
  schemes: Scheme[];
  savedSchemes: Scheme[];
  comparisonList: ComparisonList[];
  showModal: boolean;
  chatOpen: boolean;
  selectedScheme: Scheme | null;
  chatMessages: ChatMessage[];
  userMessage:string;
}

const initialState: SchemeState = {
  schemes: [],
  savedSchemes: [],
  comparisonList: [],
  showModal: false,
  chatOpen: false,
  selectedScheme: null,
  chatMessages: [],
  userMessage:"",
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
    setShowModal: (state) => {
      state.showModal = !state.showModal;
    },
    setChatOpen: (state) => {
      state.chatOpen = !state.chatOpen;
    },
    setSelectedScheme: (state, action) => {
      const { data } = action.payload;
      state.selectedScheme = data;
    },
    setChatMessages: (state, action) => {
      const { data } = action.payload;
      state.chatMessages = data;
    },
    setUserMessage:(state,action) => {
      const {data} = action.payload;
      state.userMessage = data;
    }
  },
});

export const schemeAction = schemeSlice.actions;

export default schemeSlice;
