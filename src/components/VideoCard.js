import React from 'react'
import { useSelector } from 'react-redux';

const VideoCard = ({info}) => {
    const {snippet,statistics} = info;
    const {title,channelTitle,thumbnails} = snippet;
    const isMenuOpen = useSelector(store => store.app.isMenuOpen)
  return (
    <div className={`w-96 p-3 m-auto hover:shadow-xl rounded-md hover:scale-95 transition-transform duration-300 ${isMenuOpen ? "mx-1" : "mx-7"}`}>
        <img className='rounded-lg w-96' alt='thumbnails' src={thumbnails.medium.url}/>
        <h1 className='font-bold mt-2'>{title}</h1>
        <p className='font-medium'>{channelTitle}</p>
        <p>{statistics.viewCount} views</p>
    </div>
  )
}

export default VideoCard