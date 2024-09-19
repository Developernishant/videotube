import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResult } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestqueries, setSuggestQueries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1); // For keyboard navigation
  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestQueries(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => {
      clearTimeout(timer);
    };
  }, [searchQuery]);

  const getSearchSuggestions = async () => {
    if (searchQuery.trim() === "") {
      setSuggestQueries([]);
      setShowSuggestions(false);
      return;
    }
    const data = await fetch(YOUTUBE_SEARCH_API + searchQuery);
    const json = await data.json();
    setSuggestQueries(json[1] || []);
    setShowSuggestions(true);
    dispatch(
      cacheResult({
        [searchQuery]: json[1],
      })
    );
  };

  const handleSearch = (query) => {
    if (query.trim() !== "") {
      setShowSuggestions(false);
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      if (highlightedIndex >= 0 && highlightedIndex < suggestqueries.length) {
        // If a suggestion is highlighted, select it
        handleSuggestionClick(suggestqueries[highlightedIndex]);
      } else {
        // Otherwise, search for the typed query
        handleSearch(searchQuery);
      }
    } else if (e.key === "ArrowDown") {
      // Move highlight down
      setHighlightedIndex((prevIndex) =>
        prevIndex < suggestqueries.length - 1 ? prevIndex + 1 : prevIndex
      );
    } else if (e.key === "ArrowUp") {
      // Move highlight up
      setHighlightedIndex((prevIndex) =>
        prevIndex > 0 ? prevIndex - 1 : prevIndex
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleBackClick = () => {
    setIsSearchActive(false);
    setSearchQuery("");
  };

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full bg-white shadow-md p-2 z-50">
      <div className="flex items-center">
        {isSearchActive ? (
          <>
            <button onClick={handleBackClick} className="xs:block hidden">
              <img
                className="h-7 hover:scale-90 rounded-full transition-transform duration-300 cursor-pointer"
                src="https://cdn-icons-png.flaticon.com/512/271/271220.png"
                alt="back"
              />
            </button>
            <img
              className="h-7 hover:scale-90 rounded-full transition-transform duration-300 cursor-pointer xs:hidden"
              onClick={() => dispatch(toggleMenu())}
              alt="menu"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
            />
          </>
        ) : (
          <img
            className="h-7 hover:scale-90 rounded-full transition-transform duration-300 cursor-pointer"
            onClick={() => dispatch(toggleMenu())}
            alt="menu"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
          />
        )}
        {(!isSearchActive || window.innerWidth > 640) && (
          <a href="/" className="ml-5">
            <img
              className="h-7 hover:scale-95 transition-transform duration-200"
              alt="logo"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png?20230929095411"
            />
          </a>
        )}
      </div>
      <div
        className={`flex justify-center flex-grow mx-5 ${
          isSearchActive ? "xs:w-full" : "xs:w-auto"
        }`}
      >
        <div
          className={`relative w-full max-w-lg ${
            isSearchActive ? "xs:block" : "xs:hidden"
          } sm:block`}
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
              onKeyDown={handleKeyDown}
            />
            <button
              className="border p-2 rounded-r-full bg-gray-100 hover:bg-gray-200"
              onClick={() => handleSearch(searchQuery)}
            >
              <img
                className="w-5 h-5 mx-2"
                src="https://i.ibb.co/YWmBQVK/search-v1.png"
                alt="search"
              />
            </button>
          </div>
          {showSuggestions && suggestqueries.length > 0 && (
            <div
              className="absolute left-0 right-0 bg-white mt-1 shadow-lg rounded-lg"
              onMouseLeave={() => setShowSuggestions(false)} // Hide suggestions on mouse leave
            >
              <ul>
                {suggestqueries.map((s, index) => (
                  <li
                    key={index}
                    className={`p-2 hover:bg-gray-100 cursor-pointer ${
                      index === highlightedIndex ? "bg-gray-200" : ""
                    }`}
                    onMouseDown={() => handleSuggestionClick(s)}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center mr-2">
        {(!isSearchActive || window.innerWidth > 640) && (
          <>
            <button
              className="p-2 mx-2 rounded-full hover:bg-gray-200 xs:block sm:hidden"
              onClick={() => setIsSearchActive(true)}
            >
              <img
                className="w-5 h-5"
                src="https://i.ibb.co/YWmBQVK/search-v1.png"
                alt="search"
              />
            </button>

            <img
              className="h-8 hover:scale-105 transition-transform duration-150 cursor-pointer"
              alt="user"
              src="https://www.seekpng.com/png/small/41-410093_circled-user-icon-user-profile-icon-png.png"
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
