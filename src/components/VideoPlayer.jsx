import { useRef, useEffect, useState } from 'react';

const VideoPlayer = ({ video, onClose, style }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => setCurrentTime(video.currentTime);
    const handleLoadedMetadata = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
    };
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = e => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const seekTime = (clickX / width) * duration;
    video.currentTime = seekTime;
  };

  const formatTime = time => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div
      style={{
        position: 'relative',
        maxWidth: '90%',
        maxHeight: '90%',
        ...style,
      }}
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.path}
        style={{
          width: '100%',
          height: 'auto',
          maxHeight: '80vh',
          borderRadius: '8px',
          background: '#000',
        }}
        controls={false}
        preload='metadata'
      />

      {/* Custom video controls */}
      <div
        style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.8))',
          padding: '20px',
          borderRadius: '0 0 8px 8px',
        }}
      >
        {/* Progress bar */}
        <div
          style={{
            width: '100%',
            height: '4px',
            background: 'rgba(255,255,255,0.3)',
            borderRadius: '2px',
            cursor: 'pointer',
            marginBottom: '10px',
          }}
          onClick={handleSeek}
        >
          <div
            style={{
              width: `${(currentTime / duration) * 100}%`,
              height: '100%',
              background: 'var(--primary, #007bff)',
              borderRadius: '2px',
              transition: 'width 0.1s ease',
            }}
          />
        </div>

        {/* Controls */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            color: 'white',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <button
              onClick={togglePlay}
              style={{
                background: 'rgba(255,255,255,0.2)',
                border: 'none',
                color: 'white',
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
              }}
            >
              {isPlaying ? '⏸' : '▶'}
            </button>
            <span style={{ fontSize: '14px' }}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'rgba(255,255,255,0.2)',
              border: 'none',
              color: 'white',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px',
            }}
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
