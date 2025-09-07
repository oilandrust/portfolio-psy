import { useEffect, useCallback } from 'react'
import VideoPlayer from './VideoPlayer'

const MediaCarousel = ({ 
  isOpen, 
  onClose, 
  media, 
  currentIndex, 
  onNavigate
}) => {
  // Reset video playing state when carousel opens/closes or media changes
  const handleClose = useCallback(() => {
    onClose()
  }, [onClose])

  const handleNavigate = useCallback((direction) => {
    onNavigate(direction)
  }, [onNavigate])

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return
    
    switch (e.key) {
      case 'Escape':
        handleClose()
        break
      case 'ArrowLeft':
        handleNavigate('prev')
        break
      case 'ArrowRight':
        handleNavigate('next')
        break
    }
  }, [isOpen, handleClose, handleNavigate])

  // Add keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  if (!isOpen || !media || media.length === 0) return null

  const currentMedia = media[currentIndex]
  const hasMultipleMedia = media.length > 1

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0, 0, 0, 0.9)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '2rem'
    }}>
      {/* Close button */}
      <button
        onClick={handleClose}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'rgba(255, 255, 255, 0.2)',
          border: 'none',
          color: 'white',
          fontSize: '2rem',
          cursor: 'pointer',
          borderRadius: '50%',
          width: '3rem',
          height: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'background 0.2s ease'
        }}
        onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
        onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
      >
        ×
      </button>

      {/* Navigation arrows */}
      {hasMultipleMedia && (
        <>
          <button
            onClick={() => handleNavigate('prev')}
            style={{
              position: 'absolute',
              left: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ‹
          </button>
          <button
            onClick={() => handleNavigate('next')}
            style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(255, 255, 255, 0.2)',
              border: 'none',
              color: 'white',
              fontSize: '2rem',
              cursor: 'pointer',
              borderRadius: '50%',
              width: '3rem',
              height: '3rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s ease'
            }}
            onMouseEnter={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.3)'}
            onMouseLeave={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.2)'}
          >
            ›
          </button>
        </>
      )}

      {/* Main media display */}
      {currentMedia.type === 'video' ? (
        <VideoPlayer
          video={currentMedia}
          onClose={handleClose}
        />
      ) : (
        <img
          src={currentMedia.path || currentMedia.thumbnail}
          alt={`Media ${currentIndex + 1}`}
          style={{
            maxWidth: '90%',
            maxHeight: '90%',
            objectFit: 'contain',
            borderRadius: '8px'
          }}
        />
      )}

      {/* Media counter */}
      {hasMultipleMedia && (
        <div style={{
          position: 'absolute',
          bottom: '2rem',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '20px',
          fontSize: '0.875rem'
        }}>
          {currentIndex + 1} / {media.length}
        </div>
      )}


    </div>
  )
}

export default MediaCarousel
