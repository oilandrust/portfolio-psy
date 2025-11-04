import { STYLES } from '../config/constants.js';

const LoadingSpinner = ({ 
  size = 'medium', 
  message = 'Loading...', 
  showMessage = true,
  style = {} 
}) => {
  const sizeMap = {
    small: '20px',
    medium: '40px',
    large: '60px',
  };

  const spinnerSize = sizeMap[size] || sizeMap.medium;

  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: STYLES.SPACING.XL,
        ...style
      }}
    >
      <div
        style={{
          width: spinnerSize,
          height: spinnerSize,
          border: `3px solid ${STYLES.COLORS.MUTED_BORDER}`,
          borderTop: `3px solid ${STYLES.COLORS.PRIMARY}`,
          borderRadius: '50%',
          animation: 'spin 1s linear infinite',
          marginBottom: showMessage ? STYLES.SPACING.MD : 0,
        }}
      />
      
      {showMessage && (
        <p style={{
          margin: 0,
          color: STYLES.COLORS.MUTED,
          fontSize: '0.875rem',
          textAlign: 'center',
        }}>
          {message}
        </p>
      )}
      
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default LoadingSpinner;
