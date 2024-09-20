import { YOUTUBE_SEARCH_API } from './constants';

export const getSearchSuggestions = async (searchQuery) => {
  if (searchQuery.trim() === "") return [];
  const response = await fetch(YOUTUBE_SEARCH_API + searchQuery);
  const data = await response.json();
  return data[1] || [];
};
