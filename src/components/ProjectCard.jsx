import { useState } from 'react'
import VideoThumbnail from './VideoThumbnail'
import VideoPlayer from './VideoPlayer'

const ProjectCard = ({ project, onImageClick }) => {
  const [carouselOpen, setCarouselOpen] = useState(false)
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  // Merge images and videos into a single media array for backward compatibility
  const getMediaArray = () => {
    const media = []
    
    // Add images from the old images field
    if (project.images && project.images.length > 0) {
      project.images.forEach(img => {
        media.push({
          ...img,
          type: 'image'
        })
      })
    }
    
    // Add videos from the videos field
    if (project.videos && project.videos.length > 0) {
      project.videos.forEach(video => {
        media.push({
          ...video,
          type: 'video'
        })
      })
    }
    
    // If no media found, return empty array
    return media
  }

  const projectMedia = getMediaArray()

  const openCarousel = (mediaIndex = 0) => {
    setCurrentMediaIndex(mediaIndex)
    setCarouselOpen(true)
    setIsVideoPlaying(false)
  }

  const closeCarousel = () => {
    setCarouselOpen(false)
    setCurrentMediaIndex(0)
    setIsVideoPlaying(false)
  }

  const nextMedia = () => {
    if (projectMedia.length > 1) {
      setCurrentMediaIndex((prev) => 
        prev === projectMedia.length - 1 ? 0 : prev + 1
      )
      setIsVideoPlaying(false)
    }
  }

  const prevMedia = () => {
    if (projectMedia.length > 1) {
      setCurrentMediaIndex((prev) => 
        prev === 0 ? projectMedia.length - 1 : prev - 1
      )
      setIsVideoPlaying(false)
    }
  }

  const handleKeyDown = (e) => {
    if (!carouselOpen) return
    
    switch (e.key) {
      case 'Escape':
        closeCarousel()
        break
      case 'ArrowLeft':
        prevMedia()
        break
      case 'ArrowRight':
        nextMedia()
        break
    }
  }

  // Add keyboard event listener
  useState(() => {
    if (carouselOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [carouselOpen])

  return (
    <>
      <div className="project-card" style={{
        border: '1px solid var(--muted-border-color)',
        borderRadius: '8px',
        padding: '1.5rem',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        background: 'var(--card-background-color, white)',
        display: 'flex',
        gap: '1.5rem',
        alignItems: 'flex-start'
      }}>
        <div style={{ flex: '1' }}>
          <h3 style={{ marginBottom: '0.5rem', color: '#000000' }}>{project.title}</h3>
          
          {project.subtitle && (
            <p style={{ 
              marginBottom: '0.75rem', 
              fontSize: '1rem', 
              color: 'var(--muted-color)',
              fontStyle: 'italic'
            }}>
              {project.subtitle}
            </p>
          )}
          
          {project.tech && project.tech.length > 0 && (
            <div style={{ marginTop: '1rem' }}>
              {project.tech.map((tech, techIndex) => {
                if (tech.icon) {
                  // Display icon if available
                  return (
                    <img
                      key={techIndex}
                      src={tech.icon}
                      alt={tech.name}
                      title={tech.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        margin: '0.25rem 0.25rem 0.25rem 0',
                        borderRadius: '4px',
                        objectFit: 'contain'
                      }}
                    />
                  );
                } else {
                  // Fallback to badge for technologies without icons
                  return (
                    <span
                      key={techIndex}
                      style={{
                        display: 'inline-block',
                        background: 'var(--primary)',
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '20px',
                        fontSize: '0.875rem',
                        margin: '0.25rem 0.25rem 0.25rem 0',
                        fontWeight: '500'
                      }}
                    >
                      {tech.name || tech}
                    </span>
                  );
                }
              })}
            </div>
          )}

          {project.description && (
            <p style={{ marginBottom: '1rem', lineHeight: '1.6' }}>{project.description}</p>
          )}

          {/* Project URLs */}
          {(project.github_url || project.live_url) && (
            <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {project.github_url && (
                <a
                  href={project.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View on GitHub"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--muted-border-color)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--primary)'
                    e.target.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--muted-border-color)'
                    e.target.style.transform = 'scale(1)'
                  }}
                >
                  <img 
                    src="/portfolio/github-mark.svg" 
                    alt="GitHub" 
                    style={{ width: '20px', height: '20px' }}
                  />
                </a>
              )}
              {project.live_url && (
                <a
                  href={project.live_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="View Live Demo"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    background: 'var(--muted-border-color)',
                    transition: 'all 0.2s ease',
                    textDecoration: 'none',
                    fontSize: '20px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'var(--success)'
                    e.target.style.transform = 'scale(1.1)'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'var(--muted-border-color)'
                    e.target.style.transform = 'scale(1)'
                  }}
                >
                  🌐
                </a>
              )}
            </div>
          )}

        </div>
        
        {projectMedia.length > 0 ? (
          <div style={{
            display: project.image_layout === 'column' ? 'flex' : 'grid',
            flexDirection: project.image_layout === 'column' ? 'column' : 'row',
            gridTemplateColumns: project.image_layout === 'grid' 
              ? 'repeat(auto-fit, minmax(150px, 1fr))' 
              : 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '0.5rem',
            width: project.image_layout === 'column' ? '200px' : '300px',
            flexShrink: '0'
          }}>
            {projectMedia.map((media, mediaIndex) => {
              if (media.type === 'video') {
                return (
                  <VideoThumbnail
                    key={mediaIndex}
                    video={media}
                    onClick={() => openCarousel(mediaIndex)}
                    style={{
                      width: '100%',
                      height: '150px'
                    }}
                  />
                )
              } else {
                return (
                  <img 
                    key={mediaIndex}
                    src={media.thumbnail || media.path} 
                    alt={`${project.title} - Image ${mediaIndex + 1}`}
                    style={{
                      width: '100%',
                      height: '150px',
                      objectFit: 'cover',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'transform 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseLeave={(e) => e.target.style.transform = 'scale(1)'}
                    onClick={() => openCarousel(mediaIndex)}
                  />
                )
              }
            })}
          </div>
        ) : (
          <div style={{
            width: '300px',
            height: '200px',
            background: 'var(--card-background-color)',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--muted-color)',
            fontSize: '0.875rem',
            flexShrink: '0'
          }}>
            No media available
          </div>
        )}
      </div>

      {/* Media Carousel Modal */}
      {carouselOpen && (
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
            onClick={closeCarousel}
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
          {projectMedia.length > 1 && (
            <>
              <button
                onClick={prevMedia}
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
                onClick={nextMedia}
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
          {projectMedia[currentMediaIndex].type === 'video' ? (
            <VideoPlayer
              video={projectMedia[currentMediaIndex]}
              onClose={closeCarousel}
            />
          ) : (
            <img
              src={projectMedia[currentMediaIndex].path || projectMedia[currentMediaIndex].thumbnail}
              alt={`${project.title} - Image ${currentMediaIndex + 1}`}
              style={{
                maxWidth: '90%',
                maxHeight: '90%',
                objectFit: 'contain',
                borderRadius: '8px'
              }}
            />
          )}

          {/* Media counter */}
          {projectMedia.length > 1 && (
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
              {currentMediaIndex + 1} / {projectMedia.length}
            </div>
          )}

          {/* Project title */}
          <div style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '8px',
            fontSize: '1.125rem',
            fontWeight: '600'
          }}>
            {project.title}
          </div>
        </div>
      )}
    </>
  )
}

export default ProjectCard

