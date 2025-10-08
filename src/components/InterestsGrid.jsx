import { useNavigate } from 'react-router-dom';
import InterestCard from './InterestCard';

const InterestsGrid = ({ interests }) => {
  const navigate = useNavigate();

  const handleInterestClick = (interest) => {
    navigate(`/interests/${interest.id}`);
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
