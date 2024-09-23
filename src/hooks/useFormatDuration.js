import { useCallback } from 'react';

const useFormatDuration = () => {
  const formatDuration = useCallback((duration) => {
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].slice(0, -1).padStart(2, '0') : null;
    const minutes = match[2] ? match[2].slice(0, -1).padStart(2, '0') : '00';
    const seconds = match[3] ? match[3].slice(0, -1).padStart(2, '0') : '00';

    return hours ? `${hours}:${minutes}:${seconds}` : `${minutes}:${seconds}`;
  }, []);

  return formatDuration;
};

export default useFormatDuration;
