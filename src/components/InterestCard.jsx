import { STYLES } from '../config/constants.js';

const InterestCard = ({ interest, onClick, isExpanded = false }) => {
  return (
    <div
      className='interest-card'
      style={{
        border: `1px solid ${STYLES.COLORS.MUTED_BORDER}`,
        borderRadius: STYLES.BORDER_RADIUS.LG,
        padding: STYLES.SPACING.LG,
        boxShadow: STYLES.SHADOWS.SM,
        background: 'var(--card-background-color, white)',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        textAlign: 'left',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-radius 0.3s ease',
        cursor: 'pointer',
        minHeight: '80px',
        gap: '1rem'
      }}
      onClick={onClick}
      onMouseEnter={e => {
        if (e.target === e.currentTarget) {
          e.target.style.transform = 'translateY(-2px)';
          e.target.style.boxShadow = STYLES.SHADOWS.MD;
        }
      }}
      onMouseLeave={e => {
        if (e.target === e.currentTarget) {
          e.target.style.transform = 'translateY(0)';
          e.target.style.boxShadow = STYLES.SHADOWS.SM;
        }
      }}
    >
      {interest.thumbnail && (
        <img
          src={interest.thumbnail}
          alt={interest.title}
          style={{
            height: '150px',
            objectFit: 'contain',
            borderRadius: '8px',
            flexShrink: 0
          }}
        />
      )}
      
      <div style={{ flex: 1, minWidth: 0 }}>
        <h3 
          style={{ 
            margin: '0 0 0.25rem 0', 
            color: '#000000',
            fontSize: '1.1rem',
            fontWeight: '600',
            lineHeight: '1.3',
            textShadow: 'none',
            boxShadow: 'none'
          }}
        >
          {interest.title}
        </h3>
        
        {(interest.subtitle || interest.description) && (
          <p
            style={{
              margin: '0',
              fontSize: '0.85rem',
              color: 'var(--muted-color)',
              lineHeight: '1.4',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textShadow: 'none',
              boxShadow: 'none'
            }}
          >
            {interest.subtitle || interest.description}
          </p>
        )}
      </div>
    </div>
  );
};

export default InterestCard;
