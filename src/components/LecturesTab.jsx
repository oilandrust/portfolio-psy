import { useParams, useNavigate } from 'react-router-dom';
import ReadingDetail from './ReadingDetail';

const LecturesTab = ({ readings = [] }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sort readings by ID (ascending order)
  const sortedReadings = [...readings].sort((a, b) => {
    const idA = a.id || 0;
    const idB = b.id || 0;
    return idA - idB;
  });

  const handleReadingClick = (reading) => {
    navigate(`/lectures/${reading.id}`);
  };

  // If there's an ID in the URL, show the detail view
  if (id) {
    return <ReadingDetail readings={readings} />;
  }

  // Otherwise show the grid
  return (
    <div className='section'>
      <h2>Lectures</h2>
      {sortedReadings.length > 0 ? (
        <div className="readings-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {sortedReadings.map((reading, index) => (
            <div 
              key={index} 
              className="reading-item" 
              style={{
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '1rem',
                textAlign: 'center',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                cursor: 'pointer'
              }}
              onClick={() => handleReadingClick(reading)}
              onMouseEnter={(e) => {
                if (e.target === e.currentTarget) {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (e.target === e.currentTarget) {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = 'none';
                }
              }}
            >
              <img 
                src={reading.thumbnail || '/data/readings/placeholder.jpg'} 
                alt={reading.title}
                style={{
                  height: '200px',
                  objectFit: 'contain',
                  borderRadius: '4px',
                  marginBottom: '0.75rem',
                  backgroundColor: '#f8f9fa'
                }}
              />
              <h4 style={{ 
                margin: '0 0 0.5rem 0', 
                fontSize: '0.9rem',
                lineHeight: '1.3'
              }}>
                {reading.title}
              </h4>
              <p style={{ 
                margin: '0', 
                fontSize: '0.8rem', 
                color: '#666',
                fontStyle: 'italic'
              }}>
                {reading.author}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>Aucune lecture disponible.</p>
      )}

      {/* Copyright notice */}
      {sortedReadings.length > 0 && (
        <p style={{
          marginTop: '2rem',
          fontSize: '0.8rem',
          color: '#888',
          textAlign: 'center',
          fontStyle: 'italic'
        }}>
          Toutes les couvertures © leurs éditeurs respectifs, utilisées à des fins de citation et de critique
        </p>
      )}
    </div>
  );
};

export default LecturesTab;
