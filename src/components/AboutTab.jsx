import { parseMarkdown } from '../utils/markdown.jsx';

const AboutTab = ({ profile }) => {

  return (
    <div className='section'>
      <h2>À propos</h2>
      <div>
        {parseMarkdown(profile?.about)}
      </div>
    </div>
  );
};

export default AboutTab;
