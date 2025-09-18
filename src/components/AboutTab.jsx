const AboutTab = ({ profile }) => {
  // Simple markdown parser for the about content
  const parseMarkdown = (text) => {
    if (!text) return 'Aucune information disponible.';
    
    return text.split('\n').map((line, index) => {
      if (!line.trim()) return "";
      
      // Handle bold text **text**
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts = [];
      let lastIndex = 0;
      let match;
      
      while ((match = boldRegex.exec(line)) !== null) {
        // Add text before the bold
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }
        
        // Add the bold text
        parts.push(
          <strong key={`bold-${index}-${match.index}`}>
            {match[1]}
          </strong>
        );
        
        lastIndex = match.index + match[0].length;
      }
      
      // Add remaining text after the last bold
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }
      
      return (
        <p key={index} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          {parts.length > 0 ? parts : line}
        </p>
      );
    });
  };

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
