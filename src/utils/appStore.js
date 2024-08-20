import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
import searchSlice from "./searchSlice";
import chatSlice from "./chatSlice";

const appStore = configureStore({
    reducer: {
        app:appSlice,
        search:searchSlice,
        chat:chatSlice,
    }
})

export default appStore;