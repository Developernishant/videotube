import React from "react";
import { useSelector } from "react-redux";
import useFormatDuration from "../hooks/useFormatDuration";

const formatViewCount = (count) => {
  if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
  if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
  return count;
};

const VideoCard = ({ info }) => {
  const { snippet, statistics, contentDetails } = info;
  const { title, channelTitle, thumbnails } = snippet;
  const duration = contentDetails ? contentDetails.duration : "0";
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);
  const formatDuration = useFormatDuration();

  const maxTitleLength = 50;
  const truncatedTitle =
    title.length > maxTitleLength
      ? title.slice(0, maxTitleLength) + "..."
      : title;

  return (
    <div
      className={`p-3 hover:shadow-xl rounded-md hover:scale-95 transition-transform duration-300 
        ${isMenuOpen ? "mx-1" : "mx-6 xs:ml-0"} 
        w-full md:w-72 xs:w-full`}
    >
      <div className="relative">
        <img
          className="rounded-lg w-full object-cover" 
          alt="thumbnails"
          src={thumbnails.medium.url}
          style={{ objectFit: 'cover' }}
        />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
          {formatDuration(duration)}
        </div>
      </div>
      <h1 className="font-bold mt-2">{truncatedTitle}</h1>
      <p className="font-medium">{channelTitle}</p>
      <p>{formatViewCount(statistics.viewCount)} views</p>
    </div>
  );
};

export default VideoCard;
