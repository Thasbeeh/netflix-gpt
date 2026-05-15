import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGptSearch: false,
    movieResults: null,
    isLoading: false,
  },
  reducers: {
    setGptSearchView: (state, action) => {
      state.showGptSearch = action.payload;
    },
    toggleGptSearchView: (state) => {
      state.showGptSearch = !state.showGptSearch;
    },
    gptMoviesResult: (state, action) => {
      state.movieResults = action.payload;
    },
    clearGptMoviesResult: (state) => {
      state.movieResults = null;
    },
    setGptLoading: (state) => {
      state.isLoading = !state.isLoading;
    },
  },
});

export const {
  toggleGptSearchView,
  setGptLoading,
  setGptSearchView,
  gptMoviesResult,
  clearGptMoviesResult,
} = gptSlice.actions;
export default gptSlice.reducer;
