import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { YOUTUBE_SEARCH_API } from "../utils/constants";
import { cacheResult } from "../utils/searchSlice";

const useSearchSuggestions = (searchQuery) => {
  const [suggestqueries, setSuggestQueries] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchCache = useSelector((store) => store.search);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchCache[searchQuery]) {
        setSuggestQueries(searchCache[searchQuery]);
      } else {
        getSearchSuggestions();
      }
    }, 200);

    return () => clearTimeout(timer);
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
    dispatch(cacheResult({ [searchQuery]: json[1] }));
  };

  return { suggestqueries, showSuggestions, setShowSuggestions };
};

export default useSearchSuggestions;
