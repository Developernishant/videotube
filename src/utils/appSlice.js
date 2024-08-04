import { createSlice } from "@reduxjs/toolkit";

const appSlice = createSlice({
    name: "app",
    initialState: {
        isMenuOpen:true,
    },
    reducers: {
        toggleMenu:(state)=> {
            state.isMenuOpen = !state.isMenuOpen
        },
        sideMenu:(state)=> {
            state.isMenuOpen = false
        }
    }
})

export const {toggleMenu,sideMenu} = appSlice.actions;
export default appSlice.reducer;