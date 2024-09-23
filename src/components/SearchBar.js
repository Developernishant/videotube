import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import useSearchSuggestions from "../hooks/useSearchSuggestions";

const SearchBar = ({ isSearchActive, setIsSearchActive }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // For keyboard navigation
  const navigate = useNavigate();

  const { suggestqueries, showSuggestions, setShowSuggestions } =
    useSearchSuggestions(searchQuery);

  const handleSearch = (query) => {
    if (query.trim() !== "") {
      setShowSuggestions(false);
      setSearchQuery(""); 
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleKeyDown = (e) => {
    if (showSuggestions) {
      if (e.key === "ArrowDown") {
        setHighlightedIndex((prevIndex) => Math.min(prevIndex + 1, suggestqueries.length - 1));
      } else if (e.key === "ArrowUp") {
        setHighlightedIndex((prevIndex) => Math.max(prevIndex - 1, 0));
      } else if (e.key === "Enter" && highlightedIndex >= 0) {
        handleSuggestionClick(suggestqueries[highlightedIndex]);
      }
    }
  };

  return (
    <div
      className={`relative w-full max-w-lg ${isSearchActive ? "xs:block" : "xs:hidden"} sm:block`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="flex mx-2">
        <input
          className="border px-3 w-full rounded-l-full bg-gray-100 focus:outline-none"
          type="text"
          value={searchQuery}
          placeholder="Search"
          onFocus={() => setIsSearchActive(true)}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setShowSuggestions(true);
          }}
        />
        <button
          className="border p-2 rounded-r-full bg-gray-100 hover:bg-gray-200"
          onClick={() => handleSearch(searchQuery)}
        >
          <img className="w-5 h-5 mx-2" src="https://i.ibb.co/YWmBQVK/search-v1.png" alt="search" />
        </button>
      </div>
      {showSuggestions && suggestqueries.length > 0 && (
        <div
          className="absolute left-0 right-0 bg-white mt-1 shadow-lg rounded-lg"
          onMouseLeave={() => setShowSuggestions(false)}
        >
          <ul>
            {suggestqueries.map((s, index) => (
              <li
                key={index}
                className={`p-2 hover:bg-gray-100 cursor-pointer ${index === highlightedIndex ? "bg-gray-200" : ""}`}
                onMouseDown={() => handleSuggestionClick(s)}
              >
                {s}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
