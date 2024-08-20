import { createSlice } from "@reduxjs/toolkit";
import { LIVE_CHAT_COUNT } from "../utils/constants"; // Ensure the path is correct

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    messages: [],
  },
  reducers: {
    addMessage: (state, action) => {
        state.messages.splice(LIVE_CHAT_COUNT, 1); // Remove the oldest message if limit is reached
      state.messages.unshift(action.payload); // Add the new message
    },
  },
});

export const { addMessage } = chatSlice.actions;
<<<<<<< HEAD
export default chatSlice.reducer;
=======
export default chatSlice.reducer;
>>>>>>> 5ab4b40653984a5424d6364e0cab4275af3dcfea
