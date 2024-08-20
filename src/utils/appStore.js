import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./appSlice";
<<<<<<< HEAD
import searchSlice from "./searchSlice";
=======
>>>>>>> 5ab4b40653984a5424d6364e0cab4275af3dcfea
import chatSlice from "./chatSlice";

const appStore = configureStore({
    reducer: {
        app:appSlice,
<<<<<<< HEAD
        search:searchSlice,
=======
>>>>>>> 5ab4b40653984a5424d6364e0cab4275af3dcfea
        chat:chatSlice,
    }
})

export default appStore;
