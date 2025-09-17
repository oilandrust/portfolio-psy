import { useEffect } from 'react';
import { STYLES } from '../config/constants.js';

const InterestModal = ({ isOpen, onClose, interest }) => {
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !interest) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '1rem'
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: STYLES.BORDER_RADIUS.LG,
          padding: '2rem',
          maxWidth: '600px',
          width: '100%',
          maxHeight: '80vh',
          overflow: 'auto',
          boxShadow: STYLES.SHADOWS.XL,
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem',
            right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#6b7280',
            padding: '0.5rem',
            borderRadius: '50%',
            width: '40px',
            height: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background-color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#f3f4f6';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'transparent';
          }}
        >
          ×
        </button>

        {/* Modal content */}
        <div style={{ paddingRight: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1.5rem', gap: '1rem' }}>
            {interest.thumbnail && (
              <img
                src={interest.thumbnail}
                alt={interest.title}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  flexShrink: 0
                }}
              />
            )}
            <h2 style={{
              margin: 0,
              color: '#000000',
              fontSize: '1.5rem',
              fontWeight: '600',
              lineHeight: '1.3'
            }}>
              {interest.title}
            </h2>
          </div>

          <div
            style={{
              fontSize: '1rem',
              lineHeight: '1.6',
              color: '#374151',
              whiteSpace: 'pre-wrap'
            }}
          >
            {interest.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterestModal;
