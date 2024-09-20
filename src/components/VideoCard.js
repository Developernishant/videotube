import React from 'react';
import { useSelector } from 'react-redux';

// Function to format the view count
const formatViewCount = (count) => {
  if (count >= 1e6) return `${(count / 1e6).toFixed(1)}M`;
  if (count >= 1e3) return `${(count / 1e3).toFixed(1)}K`;
  return count;
};

const VideoCard = ({ info }) => {
  const { snippet, statistics } = info;
  const { title, channelTitle, thumbnails } = snippet;
  
  // Get the sidebar state (open/closed)
  const isMenuOpen = useSelector((store) => store.app.isMenuOpen);

  // Limit the title length to 80 characters
  const maxTitleLength = 80;
  const truncatedTitle = title.length > maxTitleLength ? title.slice(0, maxTitleLength) + '...' : title;

  return (
    <div 
      className={`p-3 hover:shadow-xl rounded-md hover:scale-95 transition-transform duration-300 
        ${isMenuOpen ? "mx-1" : "ml-12"} 
        w-96 
        md:w-72 // Adjust width on medium screens
        xs:w-[90%] xs:mx-auto`} // Center and adjust width for xs
    >
      <img className='rounded-lg w-full' alt='thumbnails' src={thumbnails.medium.url} />
      <h1 className='font-bold mt-2'>{truncatedTitle}</h1>
      <p className='font-medium'>{channelTitle}</p>
      <p>{formatViewCount(statistics.viewCount)} views</p>
    </div>
  );
};

export default VideoCard;
