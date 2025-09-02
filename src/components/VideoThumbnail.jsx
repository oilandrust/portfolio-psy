import { useState, useRef } from 'react';

const VideoThumbnail = ({ video, onClick, style }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  const handleClick = () => {
    if (onClick) {
      onClick(video);
    }
  };

  return (
    <div
      style={{
        position: 'relative',
        cursor: 'pointer',
        borderRadius: '6px',
        overflow: 'hidden',
        ...style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
    >
      {/* Video thumbnail or first frame */}
      <video
        ref={videoRef}
        src={video.path}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          borderRadius: '6px',
        }}
        muted
        preload='metadata'
        onLoadedData={() => {
          // Set video to first frame
          if (videoRef.current) {
            videoRef.current.currentTime = 0;
          }
        }}
      />

      {/* Play overlay */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px',
          height: '60px',
          background: 'rgba(0, 0, 0, 0.7)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.2s ease',
          opacity: isHovered ? 1 : 0.8,
        }}
      >
        <div
          style={{
            width: 0,
            height: 0,
            borderLeft: '15px solid white',
            borderTop: '10px solid transparent',
            borderBottom: '10px solid transparent',
            marginLeft: '3px',
          }}
        />
      </div>
    </div>
  );
};

export default VideoThumbnail;
