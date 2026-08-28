'use client';

import { useRouter, useParams } from 'next/navigation';
import InterestCard from './InterestCard';

const InterestsGrid = ({ interests }) => {
  const router = useRouter();
  const params = useParams();
  const currentLang = params?.lang || 'fr';

  const handleInterestClick = (interest) => {
    if (!interest?.slug) return;
    router.push(`/${currentLang}/articles/${interest.slug}`, { scroll: false });
  };

  return (
    <div className='section articles-page'>
      <h2>Articles</h2>

      <div className='articles-grid'>
        {interests.map((interest) => (
          <InterestCard
            key={interest.slug || interest.id}
            interest={interest}
            onClick={() => handleInterestClick(interest)}
          />
        ))}
      </div>
    </div>
  );
};

export default InterestsGrid;
