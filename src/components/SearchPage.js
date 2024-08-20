import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getYoutubeSearchResultApi } from "../utils/constants";
import { sideMenu } from "../utils/appSlice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const searchQuery = queryParams.get("query");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch()
  

  useEffect(() => {
    dispatch(sideMenu());
    if (searchQuery) {
      fetchResults(searchQuery);
    }
  }, [searchQuery]);

  const fetchResults = async (query) => {
    const response = await fetch(getYoutubeSearchResultApi(query));
    const data = await response.json();
    setResults(data.items || []);
    console.log(data.items)
    console.log(data.items[0].snippet.title)
    console.log(data.items[0].snippet.channelTitle)
    console.log(data.items[0].snippet.description);
  };

  return (
    <div className="w-5/6 mx-auto">
      <h2 className="ml-2">Results for: {searchQuery}</h2>
      
      <ul>
        {results.map((item) => (
          <Link to={"/watch?v="+item.id.videoId}>
          <li key={item.id.videoId}>
            <div className="flex m-5">
              <img className="rounded-lg" src={item.snippet.thumbnails.medium.url} alt={item.snippet.title}/>
              <div className="mx-5">
              <h3 className="font-bold text-xl">{item.snippet.title}</h3>
              <div className="flex my-2">
              <img className="w-6 h-6 mx-1" alt="channel-logo" src="https://i.ibb.co/JCNpF6X/user-profile.png"/>
              <span>{item.snippet.channelTitle}</span>
              </div>
              <span>{item.snippet.description}</span>
              </div>
            </div>
          </li>
          </Link>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
