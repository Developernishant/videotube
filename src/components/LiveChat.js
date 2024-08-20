import React, { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import { generateMessage, nameGenerate } from "../utils/helper";

const LiveChat = () => {
  const dispatch = useDispatch();
  const [liveMessage, setLiveMessage] = useState("");
  const chatMessage = useSelector((store) => store.chat.messages);

  useEffect(() => {
    const i = setInterval(() => {
      console.log("API Polling");
      dispatch(
        addMessage({
          name: nameGenerate(),
          message: generateMessage(),
        })
      );
    }, 2000);
    return () => clearInterval(i);
  }, [dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (liveMessage.trim()) {
      dispatch(
        addMessage({
          name: "You", // You can replace this with the actual user's name
          message: liveMessage,
        })
      );
      setLiveMessage(""); // Clear the input field after submitting
    }
  };

  return (
    <div className="flex flex-col h-[460px] border border-gray-300 bg-white rounded-lg shadow-lg">
      <div className="flex-1 overflow-y-auto p-4 flex flex-col-reverse">
        {Array.isArray(chatMessage) && chatMessage.length > 0 ? (
          chatMessage.map((c, i) => (
            <ChatMessage key={i} name={c.name} message={c.message} />
          ))
        ) : (
          <div className="text-center text-gray-500">No messages yet.</div>
        )}
      </div>
      <form className="border-t border-gray-300 p-4 flex" onSubmit={handleSubmit}>
        <input
          className="flex-1 border-b-2 border-gray-300 focus:outline-none focus:border-blue-500 placeholder-gray-400"
          type="text"
          value={liveMessage}
          onChange={(e) => {
            setLiveMessage(e.target.value);
          }}
          placeholder="Type Something Here" // Placeholder message
        />
        <button className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200">
          Send
        </button>
      </form>
    </div>
  );
};

export default LiveChat;

