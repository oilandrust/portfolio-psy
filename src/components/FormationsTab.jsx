const FormationsTab = ({ formations = '' }) => {
  // Function to parse markdown and convert to JSX
  const parseMarkdownToJSX = (text) => {
    // Split by line breaks and process each line
    return text.split('\n').map((line, index) => {
      if (!line.trim()) return null;
      
      // Remove the markdown list marker
      const cleanLine = line.replace(/^-\s*/, '');
      
      // Process links in the format [text](url)
      const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = linkRegex.exec(cleanLine)) !== null) {
        // Add text before the link
        if (match.index > lastIndex) {
          parts.push(cleanLine.slice(lastIndex, match.index));
        }
        
        // Add the link
        parts.push(
          <a 
            key={`link-${index}-${match.index}`}
            href={match[2]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="formation-link"
          >
            {match[1]}
          </a>
        );
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text after the last link
      if (lastIndex < cleanLine.length) {
        parts.push(cleanLine.slice(lastIndex));
      }
      
      return (
        <li key={index} className="formation-markdown-item">
          {parts.length > 0 ? parts : cleanLine}
        </li>
      );
    }).filter(Boolean);
  };

  return (
    <div className='section'>
      <h2>Formations</h2>
      <ul className="formations-markdown-list">
        {parseMarkdownToJSX(formations)}
      </ul>
    </div>
  );
};

export default FormationsTab;
