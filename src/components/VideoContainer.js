import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import { YOUTUBE_VID_API } from "../utils/constants";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos,setVideos] = useState([])

  useEffect(() => {
    getVideoData();
  }, []);

  const getVideoData = async () => {
    const data = await fetch(YOUTUBE_VID_API);
    const json = await data.json();
    setVideos(json.items)
  };

  return (
    <div className="flex flex-wrap ml-1">
      {videos.map(video => <Link key={video.id} to={"/watch?v="+video.id}> <VideoCard info={video} /></Link>)}
    </div>
  
  );
};

export default VideoContainer;