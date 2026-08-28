'use client';

import { useParams, useRouter } from 'next/navigation';
import { parseMarkdown } from '../utils/markdown.jsx';

const ReadingDetail = ({ readings, currentLang }) => {
  const params = useParams();
  const router = useRouter();
  const slugParam = params?.slug;
  const legacyIdParam = params?.id;

  const reading = readings.find(r => {
    if (slugParam && r.slug) {
      return r.slug === slugParam;
    }
    if (legacyIdParam) {
      return r.id?.toString() === legacyIdParam;
    }
    return false;
  });

  const lecturesPath = `/${currentLang}/lectures`;

  const handleBackToLectures = (e) => {
    e.preventDefault();
    router.push(lecturesPath, { scroll: false });
  };

  const backLabel = currentLang === 'en' ? '← Back to readings' : '← Retour aux lectures';
  const notFoundTitle = currentLang === 'en' ? 'Reading not found' : 'Lecture non trouvée';
  const notFoundText = currentLang === 'en'
    ? 'The requested reading does not exist.'
    : "La lecture demandée n'existe pas.";
  const noReviewText = currentLang === 'en'
    ? 'No review available yet.'
    : 'Aucun avis disponible pour le moment.';

  if (!reading) {
    return (
      <div className='section reading-content'>
        <a
          onClick={handleBackToLectures}
          href={lecturesPath}
          className="article-back-link"
        >
          {backLabel}
        </a>
        <h2>{notFoundTitle}</h2>
        <p>{notFoundText}</p>
      </div>
    );
  }

  return (
    <div className='section reading-content'>
      <a
        onClick={handleBackToLectures}
        href={lecturesPath}
        className="article-back-link"
      >
        {backLabel}
      </a>

      <div className="article-header reading-book-header">
        <img
          src={reading.thumbnail || '/data/readings/placeholder.jpg'}
          alt={reading.title}
          className="reading-cover"
        />

        <div>
          <h2>{reading.title}</h2>
          <p className="article-subtitle">{reading.author}</p>
        </div>
      </div>

      <div className="reading-body">
        {reading.description ? parseMarkdown(reading.description) : (
          <p style={{ fontStyle: 'italic', color: '#64748b' }}>
            {noReviewText}
          </p>
        )}
      </div>
    </div>
  );
};

export default ReadingDetail;
