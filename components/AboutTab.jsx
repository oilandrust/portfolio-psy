import { parseMarkdown } from '../utils/markdown.jsx';
import SessionCta from './SessionCta';

const AboutTab = ({ profile, currentLang = 'fr' }) => {
  const title = currentLang === 'en' ? 'About' : 'À propos';

  return (
    <div className='section reading-content'>
      <h2>{title}</h2>
      <div className="reading-body">
        {parseMarkdown(profile?.about)}
      </div>

      <SessionCta currentLang={currentLang} />
    </div>
  );
};

export default AboutTab;
