import { useParams } from 'react-router-dom';
import InterestsGrid from './InterestsGrid';
import InterestDetail from './InterestDetail';

const InterestsTab = ({ interests }) => {
  const { id } = useParams();
  
  // If there's an ID in the URL, show the detail view
  if (id) {
    return <InterestDetail interests={interests} />;
  }
  
  // Otherwise show the grid
  return <InterestsGrid interests={interests} />;
};

export default InterestsTab;
