import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sideMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { getYoutubeCommentApi, YOUTUBE_VIDEO_BYID } from "../utils/constants";
import CommentContainer from "./CommentContainer";
import LiveChat from "./LiveChat"; // Import LiveChat component
import SearchPage from "./SearchPage";

const WatchPage = () => {
  let [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [comments, setComments] = useState([]);
  const dispatch = useDispatch();
  const videoDetails = YOUTUBE_VIDEO_BYID + searchParams.get("v");
  const [videoInfo, setVideoInfo] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const apiUrl = getYoutubeCommentApi(videoId);

  const getVideoComment = async () => {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setComments(data);
  };

  useEffect(() => {
    dispatch(sideMenu());
    if (videoId) {
      getVideoComment();
    }
    const getVideoInfo = async () => {
      const data = await fetch(videoDetails);
      const json = await data.json();
      setVideoInfo(json.items);
    };
    getVideoInfo();
  }, [videoId]);

  const formatViewCount = (count) => {
    if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
    return count;
  };

  return (
    <div>
      <div>
        <div className="flex">
          <div>
            <iframe
              className="ml-12 rounded-2xl"
              width="845"
              height="470"
              src={"https://www.youtube.com/embed/" + searchParams.get("v")}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
          <div className="w-full mt-1 ml-4">
            <LiveChat />
          </div>
        </div>
        {videoInfo.map((video) => {
          return (
            <React.Fragment key={video.id}>
              {/* Subscriber Section */}
              <div className="mt-4">
              <div className="w-4/6 ">
                <h1 className="text-ellipsis overflow-hidden font-bold text-xl m-2 ml-12">
                  {video?.snippet?.title}
                </h1>
                </div>
                <div className="flex ml-10 w-full">
                  <div className="flex">
                    <img
                      className="w-12 h-12 mr-1"
                      src={`https://i.ibb.co/JCNpF6X/user-profile.png`}
                      alt="user-profile"
                    />
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800 overflow-hidden">
                        {video?.snippet?.channelTitle}
                      </span>
                      <span className="text-sm">
                        {video?.statistics?.subscriberCount} Subscribers
                      </span>
                    </div>
                  </div>
                  <span className="flex">
                    <button className="bg-black text-white border border-gray-200 shadow-sm px-5 py-1 rounded-full m-2 ml-5 hover:bg-slate-800">
                      Subscribe
                    </button>
                    <div className="flex">
                      <button className="border flex border-gray-200 shadow-sm pl-2 pr-5 py-1 bg-gray-200 rounded-l-full my-2 border-r-gray-400 hover:bg-gray-300 ml-24">
                        <img
                          className="w-6 h-6 py-1 px-1"
                          src="https://i.ibb.co/nPdcWx2/like.png"
                          alt="like"
                        />
                        {formatViewCount(video?.statistics?.likeCount)}
                      </button>
                      <button className="border flex border-gray-200 shadow-sm pr-5 py-1 bg-gray-200 rounded-r-full my-2 hover:bg-gray-300">
                        <img
                          className="w-6 h-6 py-1 px-1"
                          src="https://i.ibb.co/f2m1Kyh/dont-like.png"
                          alt="dont-like"
                        />
                        {formatViewCount(video?.statistics?.likeCount / 8)}
                      </button>
                    </div>
                    <button className=" flex border border-gray-200 shadow-sm pl-2 pr-4 py-1 bg-gray-200 rounded-full m-2 hover:bg-gray-300 ">
                      <img
                        className="w-6 h-6 py-1 px-1"
                        src="https://i.ibb.co/qWv2pcw/share.png"
                        alt="share"
                      />
                      Share
                    </button>
                    <button className="flex border border-gray-200 shadow-sm pl-1 pr-4 py-1 bg-gray-200 rounded-full m-2 hover:bg-gray-300 ">
                      <img
                        className="w-6 h-6 py-1 px-1"
                        src="https://i.ibb.co/KwM0hfp/download.png"
                        alt="download"
                      />{" "}
                      Download
                    </button>
                  </span>
                </div>
              </div>
              <div className="m-2 rounded-lg shadow-sm bg-gray-100 p-2 w-3/5 ml-16">
                <span className="font-bold">
                  {formatViewCount(video?.statistics?.viewCount)} Views
                  {video?.snippet?.publishedAt}
                </span>
                <div>
                  {isExpanded
                    ? video?.snippet?.description
                    : `${video?.snippet?.description.slice(0, 200)}...`}
                  <span
                    onClick={toggleExpand}
                    className="text-blue-500 cursor-pointer"
                  >
                    {isExpanded ? " Read less" : " Read more"}
                  </span>
                </div>
              </div>
              <div>
                <CommentContainer data={comments} />
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
   
  );
};

export default WatchPage;
