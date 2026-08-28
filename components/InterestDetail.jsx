'use client';

import { useParams, useRouter } from 'next/navigation';
import { parseMarkdown } from '../utils/markdown.jsx';

const InterestDetail = ({ interests, currentLang }) => {
  const params = useParams();
  const router = useRouter();
  const slugParam = params?.slug;
  const legacyIdParam = params?.id;

  const interest = interests.find(int => {
    if (slugParam && int.slug) {
      return int.slug === slugParam;
    }
    if (legacyIdParam) {
      return int.id?.toString() === legacyIdParam;
    }
    return false;
  });

  const articlesPath = `/${currentLang}/articles`;

  const handleBackToArticles = (e) => {
    e.preventDefault();
    router.push(articlesPath, { scroll: false });
  };

  const backLabel = currentLang === 'en' ? '← Back to articles' : '← Retour aux articles';
  const notFoundTitle = currentLang === 'en' ? 'Article not found' : 'Article non trouvé';
  const notFoundText = currentLang === 'en'
    ? 'The requested article does not exist.'
    : "L'article demandé n'existe pas.";

  if (!interest) {
    return (
      <div className='section reading-content'>
        <a
          onClick={handleBackToArticles}
          href={articlesPath}
          className="article-back-link"
        >
          {backLabel}
        </a>
        <h2>{notFoundTitle}</h2>
        <p>{notFoundText}</p>
      </div>
    );
  }

  const handleBackClick = (e) => {
    e.preventDefault();
    router.push(articlesPath, { scroll: false });
  };

  return (
    <div className='section reading-content'>
      <a
        onClick={handleBackClick}
        href={articlesPath}
        className="article-back-link"
      >
        {backLabel}
      </a>

      <div className="article-header">
        {interest.thumbnail && (
          <img
            src={interest.thumbnail}
            alt={interest.title}
          />
        )}

        <div>
          <h2>{interest.title}</h2>

          {interest.subtitle && (
            <p className="article-subtitle">
              {interest.subtitle}
            </p>
          )}
        </div>
      </div>

      <div className="reading-body">
        {parseMarkdown(interest.description)}
      </div>
    </div>
  );
};

export default InterestDetail;
