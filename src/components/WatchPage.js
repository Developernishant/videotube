import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { sideMenu } from "../utils/appSlice";
import { useSearchParams } from "react-router-dom";


const WatchPage = () => {
    let [searchParams] = useSearchParams();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(sideMenu());
  }, []);
  return (
    <div>
      <iframe
        className="ml-12"
        width="820"
        height="470"
        src={"https://www.youtube.com/embed/" + searchParams.get('v')}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchPage;
