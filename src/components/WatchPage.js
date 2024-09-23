import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { sideMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";
import { getYoutubeCommentApi, YOUTUBE_VIDEO_BYID } from "../utils/constants";
import LiveChat from "./LiveChat";
import SuggestedContainer from "./SuggestedContainer";
import CommentList from "./CommentList";

const WatchPage = () => {
  const [searchParams] = useSearchParams();
  const videoId = searchParams.get("v");
  const [comments, setComments] = useState([]);
  const [videoInfo, setVideoInfo] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(sideMenu());
    if (videoId) {
      getVideoComment();
      getVideoInfo();
    }
  }, [videoId, dispatch]);

  const getVideoComment = async () => {
    const response = await fetch(getYoutubeCommentApi(videoId));
    const data = await response.json();
    setComments(data.items); 
  };

  const getVideoInfo = async () => {
    const response = await fetch(YOUTUBE_VIDEO_BYID + videoId);
    const data = await response.json();
    setVideoInfo(data.items[0]);
  };

  const formatCount = (count) => {
    if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
    if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
    return count;
  };

  if (!videoInfo) return null;

  return (
    <div className="flex flex-col lg:flex-row mt-14 mx-4 xs:mx-3 mb-10">
      <div className="lg:w-[calc(100%-400px)] lg:mr-4">
        <div className="w-full">
          <iframe
            className="w-full aspect-video rounded-xl"
            src={`https://www.youtube.com/embed/${videoId}`}
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div>
        <div className="w-full ">
          <h1 className="text-ellipsis overflow-hidden font-bold text-xl m-2 xs:text-base">
            {videoInfo?.snippet?.title}
          </h1>
        </div>
        <div className="md:flex items-center justify-between">
          <div className="flex items-center mx-2">
            <img
              className="w-10 h-10 rounded-full mr-1"
              src={videoInfo.snippet.thumbnails.default.url}
              alt="Channel avatar"
            />
            <div className="mr-2 xs:m-3">
              <p className="font-bold text-ellipsis overflow-hidden whitespace-nowrap xs:mr-20">
                {videoInfo.snippet.channelTitle.length > 15 
                  ? `${videoInfo.snippet.channelTitle.slice(0, 15)}...` 
                  : videoInfo.snippet.channelTitle}
              </p>
              <p className="text-sm text-gray-500">subscribers</p>
            </div>
            <button className="bg-black text-white px-4 py-2 rounded-full hover:bg-opacity-90">
              Subscribe
            </button>
          </div>
          <div className="flex space-x-2 mt-3 mx-3">
            <div className="flex rounded-full bg-gray-100">
              <button className="px-4 py-2 flex items-center">
                <img
                  className="w-6 h-6 mr-2"
                  src="https://i.ibb.co/nPdcWx2/like.png"
                  alt="like"
                />
                <span>{formatCount(videoInfo.statistics.likeCount)}</span>
              </button>
              <button className="px-4 py-2 border-l-2 xs:hidden">
                <img
                  className="w-6 h-6"
                  src="https://i.ibb.co/f2m1Kyh/dont-like.png"
                  alt="dislike"
                />
              </button>
            </div>
            <button className="bg-gray-100 px-4 py-2 rounded-full flex items-center">
              <img
                className="w-6 h-6 mr-2"
                src="https://i.ibb.co/qWv2pcw/share.png"
                alt="share"
              />
              Share
            </button>
            <button className="bg-gray-100 px-4 py-2 rounded-full flex items-center">
              <img
                className="w-6 h-6 mr-2"
                src="https://i.ibb.co/KwM0hfp/download.png"
                alt="download"
              />
              Download
            </button>
          </div>
        </div>

        <div className="mt-4 bg-gray-100 p-3 rounded-lg">
          <p className="font-bold">
            {formatCount(videoInfo.statistics.viewCount)} views •{" "}
            {new Date(videoInfo.snippet.publishedAt).toLocaleDateString()}
          </p>
          <p className="mt-2 max-w-full"> 
            {isExpanded
              ? videoInfo.snippet.description
              : `${videoInfo.snippet.description.slice(0, 100)}...`}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 ml-2"
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          </p>
        </div>
        <div className="block lg:hidden mt-4">
          <SuggestedContainer />
        </div>
        <div className="mt-4 xs:border-t-2">
          <CommentList comments={comments} />
        </div>
      </div>
      <div className="hidden lg:block lg:w-[400px] mt-4 lg:mt-0">
        <div className="mb-4">
          <LiveChat />
        </div>
        <SuggestedContainer />
      </div>
    </div>
  );
};

export default WatchPage;
