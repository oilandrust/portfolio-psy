import InterestCard from './InterestCard';

const InterestsGrid = ({ interests }) => {
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          maxWidth: '1200px',
          margin: '0 auto'
        }}
      >
        {interests.map((interest) => (
          <InterestCard key={interest.id} interest={interest} />
        ))}
      </div>
    </div>
  );
};

export default InterestsGrid;
