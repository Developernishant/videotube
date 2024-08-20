const YOUTUBE_API_KEY = "AIzaSyCGm1DHejMPG4bJVO0a7AJO4Ks0ipFPLFo"
export const YOUTUBE_VID_API = "https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=51&hl=pa&relevanceLanguage=pa&regionCode=IN&videoCategoryId=10&key=" + YOUTUBE_API_KEY;
export const YOUTUBE_SEARCH_API = "http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";
export const getYoutubeCommentApi = (videoId) => `https://www.googleapis.com/youtube/v3/commentThreads?key=${YOUTUBE_API_KEY}+&textFormat=plainText&part=snippet&videoId=${videoId}&maxResults=30`
export const YOUTUBE_VIDEO_BYID = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&key=${YOUTUBE_API_KEY}&id=`;
export const LIVE_CHAT_COUNT = 25;
export const getYoutubeSearchResultApi = (keyword) => 
    `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${keyword}&type=video&key=${YOUTUBE_API_KEY}`;

