import { createSlice } from "@reduxjs/toolkit";

const initialMovieState = {
  items: [],
  currentPage: 0,
  totalPages: null,
  isLoading: false,
  hasMore: true,
  error: null,
  initialized: false,
};

const movieSlice = createSlice({
  name: "movie",
  initialState: {
    nowPlayingMovies: initialMovieState,
    topRatedMovies: initialMovieState,
    upcomingMovies: initialMovieState,
    popularMovies: initialMovieState,
    trailerVideo: null,
  },
  reducers: {
    fetchStarted(state, action) {
      const category = action.payload.category;

      state[category].isLoading = true;
      state[category].error = null;
    },
    fetchSucceeded(state, action) {
      const { page, items, totalPages, category } = action.payload;

      if (page === 1) state[category].items = items;
      else state[category].items.push(...items);

      state[category].currentPage = page;
      state[category].totalPages = totalPages;
      state[category].isLoading = false;
      state[category].initialized = true;
      state[category].error = null;
      state[category].hasMore = page < totalPages;
    },
    fetchFailed(state, action) {
      const { category } = action.payload;

      state[category].isLoading = false;
      state[category].error = action.payload;
    },
    setTrailerVideo: (state, action) => {
      state.trailerVideo = action.payload;
    },
  },
});

export const { fetchStarted, fetchSucceeded, fetchFailed, setTrailerVideo } =
  movieSlice.actions;
export default movieSlice.reducer;
