import { useState } from 'react';
import VideoThumbnail from './VideoThumbnail';
import MediaCarousel from './MediaCarousel';
import ErrorBoundary from './ErrorBoundary';
import { STYLES, ERROR_MESSAGES } from '../config/constants.js';

// Project URLs component
const ProjectUrls = ({ github_url, live_url }) => {
  if (!github_url && !live_url) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
        flexDirection: 'row',
      }}
      className="project-urls"
    >
      {github_url && (
        <a
          href={github_url}
          target='_blank'
          rel='noopener noreferrer'
          title='View on GitHub'
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => {
            e.target.style.opacity = '0.7';
          }}
          onMouseLeave={e => {
            e.target.style.opacity = '1';
          }}
        >
          <img
            src='/portfolio-psy/github-mark.svg'
            alt='GitHub'
            style={{ width: '24px', height: '24px' }}
          />
        </a>
      )}
      {live_url && (
        <a
          href={live_url}
          target='_blank'
          rel='noopener noreferrer'
          title='View Live Demo'
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            textDecoration: 'none',
            transition: 'opacity 0.2s ease',
          }}
          onMouseEnter={e => {
            e.target.style.opacity = '0.7';
          }}
          onMouseLeave={e => {
            e.target.style.opacity = '1';
          }}
        >
          <svg
            width="30"
            height="30"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
              fill="#000000"
            />
          </svg>
        </a>
      )}
    </div>
  );
};

// Project Tech component
const ProjectTech = ({ tech }) => {
  if (!tech || tech.length === 0) return null;

  return (
    <div style={{ marginTop: '1rem' }}>
      {tech.map((techItem, techIndex) => {
        if (techItem.icon) {
          // Display icon if available
          return (
            <img
              key={techIndex}
              src={techItem.icon}
              alt={techItem.name}
              title={techItem.name}
              style={{
                width: '32px',
                height: '32px',
                margin: '0.25rem 0.25rem 0.25rem 0',
                borderRadius: '4px',
                objectFit: 'contain',
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
                fontWeight: '500',
              }}
            >
              {techItem.name || techItem}
            </span>
          );
        }
      })}
    </div>
  );
};

// Project Media component
const ProjectMedia = ({ media, imageLayout, projectTitle, onMediaClick }) => {
  // Sort media by filename
  const sortedMedia = [...media].sort((a, b) => {
    const filenameA = a.filename || '';
    const filenameB = b.filename || '';
    return filenameA.localeCompare(filenameB);
  });
  
  // Use sortedMedia instead of media for the rest of the function
  media = sortedMedia;
  if (!media || media.length === 0) {
    return (
      <div
        style={{
          width: '300px',
          height: '200px',
          background: 'var(--card-background-color)',
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'var(--muted-color)',
          fontSize: '0.875rem',
          flexShrink: '0',
        }}
      >
        No media available
      </div>
    );
  }

  if (imageLayout === 'featured') {
    const featuredItem = media[0];
    const thumbnailItems = media.slice(1);
    const thumbnailWidth = thumbnailItems.length > 0 ? `${100 / thumbnailItems.length}%` : '100%';
    
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.5rem',
          width: '100%',
          maxWidth: '350px',
          flexShrink: '0',
        }}
      >
        {/* Featured Image */}
        {featuredItem && (
          featuredItem.type === 'video' ? (
            <VideoThumbnail
              key={0}
              video={featuredItem}
              onClick={() => onMediaClick(0)}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
          ) : (
            <img
              key={0}
              src={featuredItem.thumbnail || featuredItem.path}
              alt={`${projectTitle} - Featured Image`}
              style={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
              onClick={() => onMediaClick(0)}
            />
          )
        )}
        
        {/* Thumbnail Row */}
        {thumbnailItems.length > 0 && (
          <div
            style={{
              display: 'flex',
              gap: '0.25rem',
            }}
          >
            {thumbnailItems.map((mediaItem, index) => {
              const mediaIndex = index + 1; // Adjust index for original array
              return mediaItem.type === 'video' ? (
                <VideoThumbnail
                  key={mediaIndex}
                  video={mediaItem}
                  onClick={() => onMediaClick(mediaIndex)}
                  style={{
                    width: thumbnailWidth,
                    height: '60px',
                    objectFit: 'cover',
                  }}
                />
              ) : (
                <img
                  key={mediaIndex}
                  src={mediaItem.thumbnail || mediaItem.path}
                  alt={`${projectTitle} - Thumbnail ${mediaIndex}`}
                  style={{
                    width: thumbnailWidth,
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    transition: 'transform 0.2s ease',
                  }}
                  onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
                  onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
                  onClick={() => onMediaClick(mediaIndex)}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      style={{
        display: imageLayout === 'column' ? 'flex' : 'grid',
        flexDirection: imageLayout === 'column' ? 'column' : 'row',
        gridTemplateColumns:
          imageLayout === 'grid'
            ? 'repeat(auto-fit, minmax(150px, 1fr))'
            : 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '0.5rem',
        width: imageLayout === 'column' ? '200px' : '300px',
        flexShrink: '0',
      }}
    >
      {media.map((mediaItem, mediaIndex) => {
        if (mediaItem.type === 'video') {
          return (
            <VideoThumbnail
              key={mediaIndex}
              video={mediaItem}
              onClick={() => onMediaClick(mediaIndex)}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
              }}
            />
          );
        } else {
          return (
            <img
              key={mediaIndex}
              src={mediaItem.thumbnail || mediaItem.path}
              alt={`${projectTitle} - Image ${mediaIndex + 1}`}
              style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease',
              }}
              onMouseEnter={e => (e.target.style.transform = 'scale(1.05)')}
              onMouseLeave={e => (e.target.style.transform = 'scale(1)')}
              onClick={() => onMediaClick(mediaIndex)}
            />
          );
        }
      })}
    </div>
  );
};

const ProjectCard = ({ project }) => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  // Get media array (now unified in the new structure)
  const projectMedia = project.media || [];

  const openCarousel = (mediaIndex = 0) => {
    setCurrentMediaIndex(mediaIndex);
    setCarouselOpen(true);
  };

  const closeCarousel = () => {
    setCarouselOpen(false);
    setCurrentMediaIndex(0);
  };

  const navigateMedia = direction => {
    if (projectMedia.length > 1) {
      if (direction === 'next') {
        setCurrentMediaIndex(prev =>
          prev === projectMedia.length - 1 ? 0 : prev + 1
        );
      } else {
        setCurrentMediaIndex(prev =>
          prev === 0 ? projectMedia.length - 1 : prev - 1
        );
      }
    }
  };

  return (
    <>
      <ErrorBoundary fallbackMessage={`Unable to load project: ${project.title}`}>
        <div
          className='project-card'
          style={{
            border: `1px solid ${STYLES.COLORS.MUTED_BORDER}`,
            borderRadius: STYLES.BORDER_RADIUS.LG,
            padding: STYLES.SPACING.LG,
            boxShadow: STYLES.SHADOWS.SM,
            background: 'var(--card-background-color, white)',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
        {/* Header Section */}
        <div className='project-header'>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
            <div>
              <h3 style={{ marginBottom: '0.5rem', color: '#000000' }}>
                {project.title}
              </h3>

              {project.subtitle && (
                <p
                  style={{
                    marginBottom: '0',
                    fontSize: '1rem',
                    color: 'var(--muted-color)',
                    fontStyle: 'italic',
                  }}
                >
                  {project.subtitle}
                </p>
              )}
            </div>

            {/* Project URLs - moved to header */}
            <ProjectUrls
              github_url={project.github_url}
              live_url={project.live_url}
            />
          </div>

        </div>

        {/* Content Section - Float Layout */}
        <div className='project-content'>
          {/* Project Media - Float on desktop, block on mobile */}
          <div 
            className="project-media-float"
            style={{
              float: 'right',
              margin: '0 0 1rem 1.5rem',
              clear: 'right'
            }}
          >   
            <ProjectMedia
              media={projectMedia}
              imageLayout={project.image_layout}
              projectTitle={project.title}
              onMediaClick={openCarousel}
            />
          </div>

          {/* Project Description - Wraps around floated media */}
          {project.description && (
            <div>
              {project.description.split('\n\n').map((paragraph, index) => (
                <p 
                  key={index} 
                  style={{ 
                    lineHeight: '1.6', 
                    marginBottom: index < project.description.split('\n\n').length - 1 ? '1rem' : '0' 
                  }}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {/* Clearfix to ensure proper float clearing */}
          <div style={{ clear: 'both' }}></div>
        </div>

        {/* Project Tech - after all content */}
        {project.tech && project.tech.length > 0 && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '0.75rem',
              flexWrap: 'wrap'
            }}>
              <span style={{ 
                fontSize: '0.875rem', 
                fontWeight: '600', 
                color: 'var(--muted-color)',
                letterSpacing: '0.05em'
              }}>
                Tech:
              </span>
              <ProjectTech tech={project.tech} />
            </div>
          </div>
        )}

        </div>
      </ErrorBoundary>

      {/* Media Carousel */}
      <ErrorBoundary fallbackMessage={ERROR_MESSAGES.FALLBACK_MESSAGES.MEDIA}>
        <MediaCarousel
          isOpen={carouselOpen}
          onClose={closeCarousel}
          media={projectMedia}
          currentIndex={currentMediaIndex}
          onNavigate={navigateMedia}
        />
      </ErrorBoundary>
    </>
  );
};

export default ProjectCard;
