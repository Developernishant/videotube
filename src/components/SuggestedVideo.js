import React from 'react';
import useFormatDuration from '../hooks/useFormatDuration';

const formatViewCount = (count) => {
  if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
  if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
  return count;
};

const SuggestedVideo = ({ info }) => {
  const { snippet, statistics, contentDetails } = info;
  const { title, channelTitle, thumbnails } = snippet;
  const { viewCount } = statistics;
  const duration = contentDetails ? contentDetails.duration : '0';
  const formatDuration = useFormatDuration()

  const maxTitleLength = 50;
  const truncatedTitle = title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '...' : title;

  return (
    <div
      className={`flex items-start p-3 cursor-pointer rounded-md transition-transform duration-300 w-full `}
    > 
      <div className="relative">
        <img className="rounded-lg w-80" alt="thumbnail" src={thumbnails.medium.url} />
        <div className="absolute bottom-1 right-1 bg-black bg-opacity-75 text-white text-xs px-1 rounded">
          {formatDuration(duration)}
        </div>
      </div>
      <div className="ml-4 w-full">
        <h1 className="font-bold text-sm text-black">{truncatedTitle}</h1>
        <p className="text-black text-sm">{channelTitle}</p>
        <p className="text-black text-sm">{formatViewCount(viewCount)} views</p>
      </div>
    </div>
  );
};

export default SuggestedVideo;
