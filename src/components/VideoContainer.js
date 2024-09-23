import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import VideoCard from "./VideoCard";
import { YOUTUBE_VID_API } from "../utils/constants";
import { Link } from "react-router-dom";

const VideoContainer = () => {
  const [videos, setVideos] = useState([]);
  const isMenuOpen = useSelector((state) => state.app.isMenuOpen);

  useEffect(() => {
    getVideoData();
  }, []);

  const getVideoData = async () => {
    const data = await fetch(YOUTUBE_VID_API);
    const json = await data.json();
    setVideos(json.items);

  };

  return (
    <div className={`mb-10 flex flex-wrap ${isMenuOpen ? "ml-40" : ""} xs:ml-0 xs:mt-10 md:mt-10 lg:mt-10 xl:mt-10 sm:mt-10`}>
      {videos.map((video) => (
        <Link key={video.id} to={"/watch?v=" + video.id}>
          <VideoCard info={video} />
        </Link>
      ))}
    </div>
  );
};

export default VideoContainer;