import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleMenu } from "../utils/appSlice";
import SearchBar from "./SearchBar";
import { LEFT_ARROW, LOGO, MENU_ICON, SEARCH_ICON, USER_ICON } from "../utils/constants";

const Header = () => {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const dispatch = useDispatch();

  const handleBackClick = () => {
    setIsSearchActive(false);
  };

  return (
    <div className="flex justify-between items-center fixed top-0 left-0 w-full bg-white shadow-md p-2 z-50">
      <div className="flex items-center">
        {isSearchActive ? (
          <button onClick={handleBackClick} className="xs:block hidden">
            <img
              className="h-7 hover:scale-90 rounded-full transition-transform duration-300 cursor-pointer"
              src={LEFT_ARROW}
              alt="back"
            />
          </button>
        ) : (
          <img
            className="h-7 hover:scale-90 rounded-full transition-transform duration-300 cursor-pointer"
            onClick={() => dispatch(toggleMenu())}
            alt="menu"
            src={MENU_ICON}
          />
        )}
        
        {(!isSearchActive || window.innerWidth > 640) && (
          <a href="/" className="ml-5">
            <img
              className="h-7 hover:scale-95 transition-transform duration-200"
              alt="logo"
              src={LOGO}
            />
          </a>
        )}
      </div>

      <SearchBar
        isSearchActive={isSearchActive}
        setIsSearchActive={setIsSearchActive}
      />

      <div className="flex items-center mr-2">
        {(!isSearchActive || window.innerWidth > 640) && (
          <>
            <button
              className="p-2 mx-2 rounded-full hover:bg-gray-200 xs:block sm:hidden"
              onClick={() => setIsSearchActive(true)}
            >
              <img className="w-5 h-5" src={SEARCH_ICON} alt="search" />
            </button>
            <img
              className="h-8 hover:scale-105 transition-transform duration-150 cursor-pointer"
              alt="user"
              src={USER_ICON}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
