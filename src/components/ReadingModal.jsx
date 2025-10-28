import { useEffect, useCallback, useState } from 'react';
import { parseMarkdown } from '../utils/markdown.jsx';

const ReadingModal = ({ 
  isOpen, 
  onClose, 
  reading 
}) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  // Check if screen is mobile size
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (!isOpen) return;
    
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [isOpen, handleClose]);

  // Add keyboard event listener
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = 'unset';
      };
    }
  }, [isOpen]);

  if (!isOpen || !reading) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: isMobile ? '0.5rem' : '2rem'
    }}
    onClick={(e) => {
      if (e.target === e.currentTarget) {
        handleClose();
      }
    }}
    >
      <div style={{
        backgroundColor: 'white',
        borderRadius: '12px',
        maxWidth: isMobile ? '95vw' : '800px',
        width: '100%',
        maxHeight: '90vh',
        overflow: 'auto',
        position: 'relative',
        boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
      }}>
        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'rgba(0, 0, 0, 0.1)',
            border: 'none',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            fontSize: '1.5rem',
            color: '#666',
            transition: 'background-color 0.2s ease',
            zIndex: 1
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(0, 0, 0, 0.1)';
          }}
        >
          ×
        </button>

        {/* Modal content */}
        <div style={{ 
          padding: isMobile ? '0.3rem' : '2rem'
        }}>
          {/* Float layout: Thumbnail floats left, title/author on right, text wraps around thumbnail */}
          <div style={{
            fontSize: '1rem',
            lineHeight: '1.6',
            color: '#374151'
          }}>
            {/* Floating thumbnail image only */}
            <div style={{
              float: 'left',
              marginRight: '2rem',
              marginBottom: '1rem'
            }}>
              <img 
                src={reading.thumbnail || '/data/readings/placeholder.jpg'} 
                alt={reading.title}
                style={{
                  width: '200px',
                  height: '280px',
                  objectFit: 'contain',
                  borderRadius: '8px',
                  backgroundColor: '#f8f9fa'
                }}
              />
            </div>

            {/* Title and author on the right, before text starts */}
            <div style={{
              marginBottom: '2rem'
            }}>
              <h2 style={{
                margin: '0 0 0.5rem 0',
                fontSize: '1.8rem',
                lineHeight: '1.3',
                color: '#000'
              }}>
                {reading.title}
              </h2>
              <p style={{
                margin: '0',
                fontSize: '1.1rem',
                color: '#666',
                fontStyle: 'italic'
              }}>
                {reading.author}
              </p>
            </div>

            {/* Review content that wraps around the floated thumbnail */}
            <div>
              {reading.description ? parseMarkdown(reading.description) : (
                <p style={{ fontStyle: 'italic', color: '#666' }}>
                  Aucun avis disponible pour le moment.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReadingModal;
