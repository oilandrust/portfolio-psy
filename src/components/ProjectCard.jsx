import { useState, useRef, useEffect } from 'react';
import VideoThumbnail from './VideoThumbnail';
import MediaCarousel from './MediaCarousel';

// Project URLs component
const ProjectUrls = ({ github_url, live_url }) => {
  if (!github_url && !live_url) return null;

  return (
    <div
      style={{
        display: 'flex',
        gap: '1rem',
        alignItems: 'center',
      }}
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
            src='/portfolio/github-mark.svg'
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
            fontSize: '24px',
          }}
          onMouseEnter={e => {
            e.target.style.opacity = '0.7';
          }}
          onMouseLeave={e => {
            e.target.style.opacity = '1';
          }}
        >
          🌐
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

const ProjectCard = ({ project, onImageClick }) => {
  const [carouselOpen, setCarouselOpen] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [mediaHeight, setMediaHeight] = useState(0);
  const [paragraphHeights, setParagraphHeights] = useState([]);
  const [splitIndex, setSplitIndex] = useState(null);
  const paragraphRefs = useRef([]);
  const mediaRef = useRef(null);

  // Get media array (now unified in the new structure)
  const projectMedia = project.media || [];

  // Compute media height and paragraph heights
  useEffect(() => {
    if (mediaRef.current) {
      const height = mediaRef.current.getBoundingClientRect().height;
      setMediaHeight(height);
    }
  }, [projectMedia, project.image_layout]);

  useEffect(() => {
    if (project.description && paragraphRefs.current.length > 0) {
      const heights = paragraphRefs.current.map(ref => 
        ref ? ref.getBoundingClientRect().height : 0
      );
      setParagraphHeights(heights);
    }
  }, [project.description]);

  // Calculate where to split paragraphs based on media height
  useEffect(() => {
    if (paragraphHeights.length > 0 && mediaHeight > 0) {
      let accumulatedHeight = 0;
      let splitIdx = null;
      
      for (let i = 0; i < paragraphHeights.length; i++) {
        accumulatedHeight += paragraphHeights[i];
        if (accumulatedHeight > mediaHeight) {
          splitIdx = i + 1; // Next index after we've reached the height
          break;
        }
      }
      
      setSplitIndex(splitIdx);
    }
  }, [paragraphHeights, mediaHeight]);

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
      <div
        className='project-card'
        style={{
          border: '1px solid var(--muted-border-color)',
          borderRadius: '8px',
          padding: '1.5rem',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
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

          {/* Project Tech */}
          <ProjectTech tech={project.tech} />
        </div>

        {/* Content Section - Description and Media */}
        <div 
          className='project-content'
          style={{
            display: 'flex',
            gap: '1.5rem',
            alignItems: 'flex-start',
          }}
        >
          <div style={{ flex: '1' }}>
            {project.description && (
              <div style={{ marginBottom: '1rem' }}>
                {project.description.split('\n\n').map((paragraph, index) => {
                  // Only render paragraphs that should be in the flex section
                  const shouldRender = splitIndex === null || index < splitIndex;
                  if (!shouldRender) return null;
                  
                  return (
                    <p 
                      key={index} 
                      ref={(el) => (paragraphRefs.current[index] = el)}
                      style={{ lineHeight: '1.6', marginBottom: index < project.description.split('\n\n').length - 1 ? '1rem' : '0' }}
                    >
                      {paragraph}
                    </p>
                  );
                })}
              </div>
            )}

          </div>

          {/* Project Media */}
          <div ref={mediaRef}>
            <ProjectMedia
              media={projectMedia}
              imageLayout={project.image_layout}
              projectTitle={project.title}
              onMediaClick={openCarousel}
            />
          </div>
        </div>

        {/* Additional paragraphs that exceed media height */}
        {project.description && splitIndex !== null && (
          <div style={{ marginTop: '0.0rem' }}>
            {project.description.split('\n\n').map((paragraph, index) => {
              // Only render paragraphs that should be below the flex section
              const shouldRender = index >= splitIndex;
              if (!shouldRender) return null;
              
              return (
                <p 
                  key={`below-${index}`} 
                  style={{ 
                    lineHeight: '1.6', 
                    marginBottom: index < project.description.split('\n\n').length - 1 ? '1rem' : '0' 
                  }}
                >
                  {paragraph}
                </p>
              );
            })}
          </div>
        )}

      </div>

      {/* Media Carousel */}
      <MediaCarousel
        isOpen={carouselOpen}
        onClose={closeCarousel}
        media={projectMedia}
        currentIndex={currentMediaIndex}
        onNavigate={navigateMedia}
      />
    </>
  );
};

export default ProjectCard;
