import { useParams, useNavigate } from 'react-router-dom';
import { parseMarkdown } from '../utils/markdown.jsx';

const InterestDetail = ({ interests }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const interest = interests.find(int => int.id.toString() === id);

  if (!interest) {
    return (
      <div className='section'>
        <a
          onClick={(e) => {
            e.preventDefault();
            navigate('/interests');
          }}
          href="/interests"
          style={{
            display: 'inline-block',
            marginBottom: '1rem',
            color: '#6b7280',
            fontSize: '0.9rem',
            textDecoration: 'none',
            cursor: 'pointer',
            transition: 'color 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#374151';
          }}
          onMouseLeave={(e) => {
            e.target.style.color = '#6b7280';
          }}
        >
          ← Retour aux intérêts
        </a>
        <h2>Intérêt non trouvé</h2>
        <p>L'intérêt demandé n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className='section'>
      <a
        onClick={(e) => {
          e.preventDefault();
          navigate('/interests');
        }}
        href="/interests"
        style={{
          display: 'inline-block',
          marginBottom: '1.5rem',
          color: '#6b7280',
          fontSize: '0.9rem',
          textDecoration: 'none',
          cursor: 'pointer',
          transition: 'color 0.2s ease'
        }}
        onMouseEnter={(e) => {
          e.target.style.color = '#374151';
        }}
        onMouseLeave={(e) => {
          e.target.style.color = '#6b7280';
        }}
      >
        ← Retour aux intérêts
      </a>

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '1.5rem', 
        marginBottom: '2rem' 
      }}>
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
        
        <div>
          <h2 style={{ 
            margin: '0 0 0.5rem 0',
            color: '#000000',
            fontSize: '2rem'
          }}>
            {interest.title}
          </h2>
          
          {interest.subtitle && (
            <p style={{
              margin: 0,
              fontSize: '1.1rem',
              color: 'var(--muted-color)',
              fontStyle: 'italic'
            }}>
              {interest.subtitle}
            </p>
          )}
        </div>
      </div>

      <div
        style={{
          fontSize: '1rem',
          lineHeight: '1.6',
          color: '#374151',
          maxWidth: '900px'
        }}
      >
        {parseMarkdown(interest.description)}
      </div>
    </div>
  );
};

export default InterestDetail;
