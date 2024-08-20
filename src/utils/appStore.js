import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import chatSlice from "./chatSlice";

const appStore = configureStore({
    reducer: {
        app:appSlice,
        chat:chatSlice,
    }
})

export default appStore;
