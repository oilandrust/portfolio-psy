import { STYLES } from '../config/constants.js';

const InterestCard = ({ interest }) => {
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
        flexDirection: 'column',
        alignItems: 'center',
        textAlign: 'center',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        cursor: 'pointer',
        minHeight: '150px',
        justifyContent: 'center'
      }}
      onMouseEnter={e => {
        e.target.style.transform = 'translateY(-4px)';
        e.target.style.boxShadow = STYLES.SHADOWS.MD;
      }}
      onMouseLeave={e => {
        e.target.style.transform = 'translateY(0)';
        e.target.style.boxShadow = STYLES.SHADOWS.SM;
      }}
    >
      <h3 
        style={{ 
          marginBottom: '0.5rem', 
          color: '#000000',
          fontSize: '1.1rem',
          fontWeight: '600'
        }}
      >
        {interest.title}
      </h3>
      
      {interest.description && (
        <p
          style={{
            margin: '0',
            fontSize: '0.9rem',
            color: 'var(--muted-color)',
            lineHeight: '1.4'
          }}
        >
          {interest.description}
        </p>
      )}
    </div>
  );
};

export default InterestCard;
