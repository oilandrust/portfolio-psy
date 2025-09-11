const FormationsTab = ({ formations = [] }) => {
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

  // Original markdown content
  const markdownContent = `- 2025 – The Briliant Lab - Somatic Relational Trauma-informed Practices for Medicine - Assisted Facilitation. Taught by [Rita Bozi](https://linktr.ee/ritabozi)
- 2024-2025 – [Hakomi Professional Training level 2](https://embodywise.com/hakomi-trainings/pro-skills-level-2/) with the Hakomi Institute of California. Hakomi Somatic Mindful Psychotherapy
- 2023 – 2024 – [Hakomi Professional Training level 1](https://embodywise.com/hakomi-trainings/pro-skills-level-1/) with the Hakomi Institute of California. Hakomi Somatic Mindful Psychotherapy
- 2022 – Somatic Attachment Therapy Certificate with [Embody Lab](https://www.theembodylab.com/).
- 2020-2021 – Non-Duality, Meditation and Non-Symbolic States of Consciousness with the [Center for the Study of  Non-Symbolic Consciousness](https://www.nonsymbolic.org/) (Jeffery A. Martin).
- 2020 – Introduction to Transpersonal Psychology and Hypnotherapy with [Teadlik Mina](https://teadlikmina.ee/en/).`;

  return (
    <div className='section'>
      <h2>Formations</h2>
      <ul className="formations-markdown-list">
        {parseMarkdownToJSX(markdownContent)}
      </ul>
    </div>
  );
};

export default FormationsTab;
