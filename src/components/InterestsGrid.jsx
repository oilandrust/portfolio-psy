import { useState } from 'react';
import InterestCard from './InterestCard';
import InterestModal from './InterestModal';

const InterestsGrid = ({ interests }) => {
  const [selectedInterest, setSelectedInterest] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleInterestClick = (interest) => {
    setSelectedInterest(interest);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedInterest(null);
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
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {interests.map((interest) => (
          <InterestCard 
            key={interest.id} 
            interest={interest} 
            onClick={() => handleInterestClick(interest)}
          />
        ))}
      </div>

      <InterestModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        interest={selectedInterest}
      />
    </div>
  );
};

export default InterestsGrid;
