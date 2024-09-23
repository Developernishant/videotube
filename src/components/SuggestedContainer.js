import React, { useEffect, useState } from 'react';
import { SUGGESTED_VID_API } from '../utils/constants';
import SuggestedVideo from './SuggestedVideo'; // Import SuggestedVideo from the correct file
import { Link } from 'react-router-dom';

const SuggestedContainer = () => {
  const [suggestedVideos, setSuggestedVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestedVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(SUGGESTED_VID_API);
        if (!response.ok) {
          throw new Error('Failed to fetch suggested videos');
        }
        const data = await response.json();
        setSuggestedVideos(data.items);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching suggested videos:', error);
        setError(error.message);
        setIsLoading(false);
      }
    };

    fetchSuggestedVideos();
  }, []);

  if (isLoading) {
    return <div className="suggested-videos">Loading suggested videos...</div>;
  }

  if (error) {
    return <div className="suggested-videos">Error: {error}</div>;
  }

  return (
    <div className="suggested-videos ml-0 sm:ml-0 md:ml-0"> {/* Remove margin-left for sm and md screens */}
      <h2 className="text-lg font-bold mb-3">Suggested videos</h2>
      {console.log(suggestedVideos)}
      {suggestedVideos && suggestedVideos.length > 0 ? (
        <div className="flex flex-wrap">
          {suggestedVideos.map((video) => (
            <Link key={video.id} to={"/watch?v=" + video.id}>
              <SuggestedVideo key={video.id} info={video} />
            </Link>
          ))}
        </div>
      ) : (
        <p>No suggested videos available</p>
      )}
    </div>
  );
};

export default SuggestedContainer;
