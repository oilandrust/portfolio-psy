import { parseMarkdown } from '../utils/markdown.jsx';

const FormationsTab = ({ formations = '' }) => {

  return (
    <div className='section'>
      <h2>Formations</h2>
      <ul className="markdown-list">
        {parseMarkdown(formations, null)}
      </ul>
    </div>
  );
};

export default FormationsTab;
