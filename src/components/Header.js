import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../utils/appSlice';
import { YOUTUBE_SEARCH_API } from '../utils/constants';

const Header = () => {
  const [searchQuery,setSearchQuery] = useState("")

  useEffect(() => {
    const timer = setTimeout(() => getSearchSuggestions(), 200)

    return () => {
      clearTimeout(timer);
    };
  },[searchQuery])

  const getSearchSuggestions = async () => {
    console.log("API CALL - ", searchQuery)
    const response = await fetch(YOUTUBE_SEARCH_API + searchQuery)
    const data = await response.json()
   // console.log(data)
  }
  
  const dispatch = useDispatch();

  getSearchSuggestions()
  const toggleMenuHandler = () => {
    dispatch(toggleMenu());
  };

  return (
    <div className="grid grid-flow-col shadow-lg p-3">
      <div className="flex col-span-1 cursor-pointer">
        <img
          className="h-7 hover:scale-90 rounded-full transition-transform duration-300"
          onClick={toggleMenuHandler}
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
        <input
          className="border p-1 w-1/2 justify-center rounded-l-full bg-gray-50"
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className="border p-1 rounded-r-full bg-gray-100">Search</button>
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