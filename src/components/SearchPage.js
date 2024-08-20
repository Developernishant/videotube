import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getYoutubeSearchResultApi } from "../utils/constants";
import { sideMenu } from "../utils/appSlice";
import { useDispatch } from "react-redux";

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
  };

  return (
    <div>
      <h2>Results for: {searchQuery}</h2>
      <ul>
        {results.map((item) => (
          <li key={item.id.videoId}>
            <div>
              <h3>{item.snippet.title}</h3>
              <p>{item.snippet.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchPage;
