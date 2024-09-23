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
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sideMenu());
    if (searchQuery) {
      fetchResults(searchQuery);
    }
  }, [searchQuery, dispatch]);

  const fetchResults = async (query) => {
    const response = await fetch(getYoutubeSearchResultApi(query));
    const data = await response.json();
    setResults(data.items || []);
  };

  return (
    <div className="w-full mt-10">
      <div className="md:hidden lg:hidden sm:hidden text-xl mx-4">
        <h1 className="mb-4">Results for : {searchQuery}</h1>
        <div className="grid xs:grid-cols-1 gap-4">
          {results.map((item) => (
            <Link
              key={item.id.videoId}
              to={`/watch?v=${item.id.videoId}`}
              className="xs:flex xs:flex-col bg-white shadow-md rounded-lg overflow-hidden p-3 xs:w-full"
            >
              <div className="flex justify-center xs:mb-3">
                <img
                  className="w-full xs:w-full sm:w-auto rounded-md"
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                />
              </div>
              <div className="xs:text-left">
                <h2 className="text-lg font-bold line-clamp-2">
                  {item.snippet.title}
                </h2>
                <div className="flex items-center mt-2">
                  <img
                    className="w-6 h-6 mr-2"
                    src={item.snippet.thumbnails.default.url}
                    alt="channel-logo"
                  />
                  <p className="text-sm text-gray-500">
                    {item.snippet.channelTitle}
                  </p>
                </div>
                <p className="text-sm text-gray-700 mt-2 line-clamp-2 xs:hidden sm:block">
                  {item.snippet.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="hidden sm:block md:block lg:block w-5/6 mx-auto">
        <h2 className="ml-2 text-xl">Results for: {searchQuery}</h2>
        <ul>
          {results.map((item) => (
            <Link to={"/watch?v=" + item.id.videoId} key={item.id.videoId}>
              <li>
                <div className="flex m-5">
                  <img
                    className="rounded-lg w-60 h-auto md:h-36 sm:h-36"
                    src={item.snippet.thumbnails.medium.url}
                    alt={item.snippet.title}
                  />
                  <div className="mx-5">
                    <h3 className="font-bold text-xl sm:text-base">{item.snippet.title}</h3>
                    <div className="flex items-center my-2">
                      <img
                        className="w-6 h-6 mx-1 rounded-full"
                        alt="channel-logo"
                        src={item.snippet.thumbnails.default.url}
                      />
                      <span>{item.snippet.channelTitle}</span>
                    </div>
                    <p className="text-sm lg:block md:hidden sm:hidden">{item.snippet.description}</p>
                  </div>
                </div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
