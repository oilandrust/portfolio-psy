import { useState } from 'react';
import InterestCard from './InterestCard';

const InterestsGrid = ({ interests }) => {
  const [expandedInterest, setExpandedInterest] = useState(null);

  const handleInterestClick = (interest) => {
    if (expandedInterest === interest.id) {
      setExpandedInterest(null);
    } else {
      setExpandedInterest(interest.id);
    }
  };

  return (
    <div className='section'>
      <h2 style={{ 
        marginBottom: '2rem', 
        color: '#000000',
        fontSize: '2rem'
      }}>
        Intérêts
      </h2>
      
      <div
        className='interests-grid'
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {Array.from({ length: Math.ceil(interests.length / 2) }, (_, rowIndex) => (
          <div key={rowIndex}>
            <div
              className="interests-row"
              style={{
                display: 'flex',
                gap: '1rem',
                alignItems: 'flex-start'
              }}
            >
              {[0, 1].map((colIndex) => {
                const interestIndex = rowIndex * 2 + colIndex;
                const interest = interests[interestIndex];
                
                if (!interest) return null;
                
                return (
                  <div
                    key={interest.id}
                    style={{
                      flex: 1,
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    <InterestCard 
                      interest={interest} 
                      onClick={() => handleInterestClick(interest)}
                      isExpanded={expandedInterest === interest.id}
                    />
                  </div>
                );
              })}
            </div>
            
            {/* Expanded content row - always render but control height */}
            <div
              style={{
                marginTop: '1rem',
                maxHeight: interests.slice(rowIndex * 2, (rowIndex + 1) * 2).some(interest => expandedInterest === interest.id) ? '1500px' : '0',
                overflow: 'hidden',
                transition: 'max-height 0.3s ease-in-out, opacity 0.3s ease-in-out',
                backgroundColor: '#f8f9fa',
                border: '1px solid #e2e8f0',
                borderRadius: '12px',
                padding: interests.slice(rowIndex * 2, (rowIndex + 1) * 2).some(interest => expandedInterest === interest.id) ? '1.5rem' : '0',
                opacity: interests.slice(rowIndex * 2, (rowIndex + 1) * 2).some(interest => expandedInterest === interest.id) ? 1 : 0
              }}
            >
              <div
                style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  color: '#374151',
                  whiteSpace: 'pre-wrap'
                }}
              >
                {interests.find(interest => expandedInterest === interest.id)?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterestsGrid;
