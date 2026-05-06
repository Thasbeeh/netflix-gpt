import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import userReducer from "./userSlice";

const appStore = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export default appStore;
