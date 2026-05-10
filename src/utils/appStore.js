import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import movieReducer from "./movieSlice";
import gptReducer from "./gptSlice";
import configReducer from "./configSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    movie: movieReducer,
    gpt: gptReducer,
    config: configReducer,
  },
});

export default appStore;
