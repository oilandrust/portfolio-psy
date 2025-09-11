const LecturesTab = ({ readings = [] }) => {
  return (
    <div className='section'>
      <h2>Lectures</h2>
      {readings.length > 0 ? (
        <div className="readings-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '1.5rem',
          marginTop: '1rem'
        }}>
          {readings.map((reading, index) => (
            <div key={index} className="reading-item" style={{
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1rem',
              textAlign: 'center',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'pointer'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = 'none';
            }}>
              <img 
                src={reading.path} 
                alt={reading.title}
                style={{
                  width: '100%',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px',
                  marginBottom: '0.75rem'
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
    </div>
  );
};

export default LecturesTab;
