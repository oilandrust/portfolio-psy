'use client';

import { useRouter, useParams } from 'next/navigation';
import InterestCard from './InterestCard';

const InterestsGrid = ({ interests }) => {
  const router = useRouter();
  const params = useParams();
  const currentLang = params?.lang || 'fr';

  const handleInterestClick = (interest) => {
    if (!interest?.slug) return;
    router.push(`/${currentLang}/interests/${interest.slug}`, { scroll: false });
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
        {Array.from({ length: Math.ceil(interests.length / 2) }, (_, rowIndex) => {
          const rowInterests = interests.slice(rowIndex * 2, (rowIndex + 1) * 2);
          
          return (
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
                  
                  // Check if this is the last row with only one item
                  const isLastRowWithOneItem = rowInterests.length === 1 && colIndex === 0;
                  
                  return (
                    <div
                      key={interest.slug || interest.id}
                      style={{
                        flex: isLastRowWithOneItem ? '0 0 calc(50% - 0.5rem)' : 1,
                        display: 'flex',
                        flexDirection: 'column'
                      }}
                    >
                      <InterestCard 
                        interest={interest} 
                        onClick={() => handleInterestClick(interest)}
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default InterestsGrid;
