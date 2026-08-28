import { parseMarkdown } from '../utils/markdown.jsx';

const AboutTab = ({ profile, currentLang = 'fr' }) => {
  const title = currentLang === 'en' ? 'About' : 'À propos';

  return (
    <div className='section'>
      <h2>{title}</h2>
      <div>
        {parseMarkdown(profile?.about)}
      </div>
    </div>
  );
};

export default AboutTab;
