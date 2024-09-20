// appSlice.js
import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
  name: "app",
  initialState: {
    isMenuOpen: true,
  },
  reducers: {
    toggleMenu: (state) => {
      state.isMenuOpen = !state.isMenuOpen;
    },
    sideMenu: (state) => {
      state.isMenuOpen = false;
    },
    closeMenu: (state) => {
      state.isMenuOpen = false;  // New reducer to handle closing the sidebar
    }
  },
});

export const { toggleMenu, sideMenu, closeMenu } = appSlice.actions;
export default appSlice.reducer;
