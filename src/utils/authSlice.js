import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
  isAuthChecked: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state) => {
      state.user = null;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    clearAccessToken: (state) => {
      state.accessToken = null;
    },
    setAuthChecked: (state, action) => {
      state.isAuthChecked = action.payload;
    },
  },
});

export const {
  addUser,
  removeUser,
  setAccessToken,
  clearAccessToken,
  setAuthChecked,
} = authSlice.actions;

export default authSlice.reducer;
