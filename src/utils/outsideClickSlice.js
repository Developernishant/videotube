import { createSlice } from "@reduxjs/toolkit";

const outsideClickSlice = createSlice({
    name: "outsideClick",
    initialState: {
        closeOnOutsideClick: false,  // Initially false
    },
    reducers: {
        enableOutsideClickClose: (state) => {
            state.closeOnOutsideClick = true;
        },
        disableOutsideClickClose: (state) => {
            state.closeOnOutsideClick = false;
        },
    }
});

export const { enableOutsideClickClose, disableOutsideClickClose } = outsideClickSlice.actions;
export default outsideClickSlice.reducer;
