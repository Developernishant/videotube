const YOUTUBE_API_KEY = "AIzaSyDPDuVjEQRMZcDRHFLHsDqXlZ1zDUFJrfA";

export const YOUTUBE_VID_API =
  "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=51&hl=pa&relevanceLanguage=pa&regionCode=IN&videoCategoryId=10&key=" +
  YOUTUBE_API_KEY;

export const YOUTUBE_SEARCH_API =
  "https://thingproxy-760k.onrender.com/fetch/http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";

export const getYoutubeCommentApi = (videoId) =>
  `https://www.googleapis.com/youtube/v3/commentThreads?key=${YOUTUBE_API_KEY}+&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=30`;

export const YOUTUBE_VIDEO_BYID = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${YOUTUBE_API_KEY}&id=`;

export const LIVE_CHAT_COUNT = 25;

export const getYoutubeSearchResultApi = (keyword) =>
  `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=50&q=${keyword}&type=video&key=${YOUTUBE_API_KEY}`;

export const LEFT_ARROW = "https://cdn-icons-png.flaticon.com/512/271/271220.png"

export const MENU_ICON = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png"

export const LOGO = "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_Logo_2017.svg/512px-YouTube_Logo_2017.svg.png?20230929095411"

export const SEARCH_ICON = "https://i.ibb.co/YWmBQVK/search-v1.png"

export const USER_ICON = "https://www.seekpng.com/png/small/41-410093_circled-user-icon-user-profile-icon-png.png"