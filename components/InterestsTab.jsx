'use client';

import InterestsGrid from './InterestsGrid';

const InterestsTab = ({ interests }) => {
  // Always show the grid - detail pages are separate routes
  return <InterestsGrid interests={interests} />;
};

export default InterestsTab;
