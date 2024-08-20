import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResult } from "../utils/searchSlice";
import { useNavigate } from "react-router-dom";  // Import useNavigate

const Header = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestqueries, setSuggestQueries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);

  const dispatch = useDispatch();
  const navigate = useNavigate();  // Initialize useNavigate

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
      handleSearch(searchQuery);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion);
    handleSearch(suggestion);
  };

  return (
    <div className="grid grid-flow-col shadow-lg p-3" onMouseLeave={() => setShowSuggestions(false)}>
      <div className="flex col-span-1 cursor-pointer">
        <img
          className="h-7 hover:scale-90 rounded-full transition-transform duration-300"
          onClick={() => dispatch(toggleMenu())}
          alt="menu"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"
        />
        <a href="/">
          <img
            className="h-7 ml-5 hover:scale-95 transition-transform duration-200"
            alt="logo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png?20230929095411"
          />
        </a>
      </div>
      <div className="col-span-10 text-center mr-5">
        <div className="relative inline-block w-1/2">
          <div className="flex">
            <input
              className="border px-3 w-full rounded-l-full bg-gray-50"
              type="text"
              value={searchQuery}
              placeholder="Search Here"
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSuggestions(true);
              }}
              onKeyDown={handleKeyDown} // Trigger search on Enter key press
              onBlur={() => setShowSuggestions(false)}
            />
            <button
              className="border p-1 rounded-r-full bg-gray-100"
              onClick={() => handleSearch(searchQuery)}
            >
              <img
                className="w-6 h-6 mx-5"
                src="https://i.ibb.co/YWmBQVK/search-v1.png"
                alt="search--v1"
              />
            </button>
          </div>
          {showSuggestions && suggestqueries.length > 0 && (
            <div className="text-left w-[25rem] bg-white mt-2 fixed shadow-lg rounded-lg">
              <ul className="cursor-default">
                {suggestqueries.map((s, index) => (
                  <li
                    key={index}
                    className="my-2 p-1 flex items-center hover:bg-slate-200 shadow-sm"
                    onMouseDown={() => handleSuggestionClick(s)}
                  >
                    <img
                      className="w-4 h-4 mx-2"
                      src="https://img.icons8.com/ios/50/search--v1.png"
                      alt="search--v1"
                    />
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className="col-span-1 flex justify-end mr-5">
        <img
          className="h-8 hover:scale-105 transition-transform duration-150"
          alt="user"
          src="https://www.seekpng.com/png/small/41-410093_circled-user-icon-user-profile-icon-png.png"
        />
      </div>
    </div>
  );
};

export default Header;
