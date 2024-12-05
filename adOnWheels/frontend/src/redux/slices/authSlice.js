// authSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: null,
  isAuthenticated: false,
  type: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action) {
      state.token = action.payload.token;
      state.isAuthenticated = true;
      state.type = action.payload.type;
      localStorage.setItem("token", action.payload.token); // Save token in localStorage
      localStorage.setItem("user", action.payload.type);
    },
    logout(state) {
      state.token = null;
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem("token"); // Clear token from localStorage
      localStorage.removeItem("user");
    },
    loadToken(state) {
      const token = localStorage.getItem("token");
      const type = localStorage.getItem("user");
      if (token) {
        state.token = token;
        state.isAuthenticated = true;
        state.type = type;
      }
    },
  },
});

export const { login, logout, loadToken } = authSlice.actions;
export default authSlice.reducer;
