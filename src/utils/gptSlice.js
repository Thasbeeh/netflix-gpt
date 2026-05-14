import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
  },
  reducers: {
    setGptSearchView: (state, action) => {
      state.showGptSearch = action.payload;
    },
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
  },
});

export const { toggleGptSearchView, setGptSearchView } = gptSlice.actions;
export default gptSlice.reducer;
