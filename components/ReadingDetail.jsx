'use client';

import { useParams, useRouter } from 'next/navigation';
import { parseMarkdown } from '../utils/markdown.jsx';

const ReadingDetail = ({ readings, currentLang }) => {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  
  const reading = readings.find(r => r.id?.toString() === id);

  if (!reading) {
    return (
      <div className='section'>
        <a
          onClick={(e) => {
            e.preventDefault();
            router.push(`/${currentLang}/lectures`);
          }}
          href={`/${currentLang}/lectures`}
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
          ← Retour aux lectures
        </a>
        <h2>Lecture non trouvée</h2>
        <p>La lecture demandée n'existe pas.</p>
      </div>
    );
  }

  return (
    <div className='section'>
      <a
        onClick={(e) => {
          e.preventDefault();
          router.push(`/${currentLang}/lectures`);
        }}
        href={`/${currentLang}/lectures`}
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
        ← Retour aux lectures
      </a>

      {/* Float layout: Thumbnail floats left, title/author on right, text wraps around thumbnail */}
      <div style={{
        fontSize: '1rem',
        lineHeight: '1.6',
        color: '#374151'
      }}>
        {/* Floating thumbnail image */}
        <div style={{
          float: 'left',
          marginRight: '2rem',
          marginBottom: '1rem'
        }}>
          <img 
            src={reading.thumbnail || '/data/readings/placeholder.jpg'} 
            alt={reading.title}
            style={{
              width: '200px',
              height: '280px',
              objectFit: 'contain',
              borderRadius: '8px',
              backgroundColor: '#f8f9fa'
            }}
          />
        </div>

        {/* Title and author */}
        <div style={{
          marginBottom: '2rem'
        }}>
          <h2 style={{
            margin: '0 0 0.5rem 0',
            fontSize: '1.8rem',
            lineHeight: '1.3',
            color: '#000'
          }}>
            {reading.title}
          </h2>
          <p style={{
            margin: '0',
            fontSize: '1.1rem',
            color: '#666',
            fontStyle: 'italic'
          }}>
            {reading.author}
          </p>
        </div>

        {/* Review content that wraps around the floated thumbnail */}
        <div>
          {reading.description ? parseMarkdown(reading.description) : (
            <p style={{ fontStyle: 'italic', color: '#666' }}>
              Aucun avis disponible pour le moment.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReadingDetail;
