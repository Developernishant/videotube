import React from "react";
import { useSelector } from "react-redux";

const list = [
  "All",
  "Cricket",
  "Music",
  "Movies",
  "Comedy",
  "News",
  "Computer Science",
  "Live",
  "Ai",
  "Science Fiction",
  "Android",
  "Laptops",
];

const Button = () => {
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen)
  return (
    <div className={isMenuOpen ? "ml-12" : "ml-24"}>
      {list.map((value) => (
        <button
          key={value}
          className="bg-gray-200 text-black rounded-lg px-3 py-1 text-lg mr-2 hover:bg-black hover:text-white"
        >
          {value}
        </button>
      ))}
    </div>
  );
};

export default Button;