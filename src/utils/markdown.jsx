import React from 'react';

/**
 * Parse markdown text and convert to JSX elements
 * Supports:
 * - Headers: # H1, ## H2, ### H3
 * - Lists: - item
 * - Bold text: **text**
 * - Italic text: *text*
 * - Links: [text](url)
 * @param {string} text - The markdown text to parse
 * @param {string} fallbackText - Text to show when input is empty (default: 'Aucune information disponible.')
 * @returns {Array} Array of JSX elements (headers, paragraphs, or list items)
 */
export const parseMarkdown = (text, fallbackText = 'Aucune information disponible.') => {
  if (!text) return fallbackText;

  const lines = text.split('\n');
  const elements = [];
  let currentListItems = [];
  let elementIndex = 0;
  
  const processLine = (line) => {
    const parts = [];
    let lastIndex = 0;
    let match;

    // Process links, bold text, and italic text in the same pass
    // Order matters: links first, then bold, then italic (to avoid conflicts)
    const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*(.*?)\*\*|\*([^*]+)\*)/g;
    
    while ((match = combinedRegex.exec(line)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      
      // Check what type of match this is
      if (match[0].startsWith('[')) {
        // It's a link [text](url)
        parts.push(
          <a 
            key={`link-${elementIndex}-${match.index}`}
            href={match[3]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="markdown-link"
          >
            {match[2]}
          </a>
        );
      } else if (match[0].startsWith('**')) {
        // It's bold text **text**
        parts.push(
          <strong key={`bold-${elementIndex}-${match.index}`}>
            {match[4]}
          </strong>
        );
      } else if (match[0].startsWith('*') && match[0].endsWith('*') && match[0].length > 2) {
        // It's italic text *text* (but not **bold**)
        parts.push(
          <em key={`italic-${elementIndex}-${match.index}`}>
            {match[5]}
          </em>
        );
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text after the last match
    if (lastIndex < line.length) {
      parts.push(line.slice(lastIndex));
    }

    return parts.length > 0 ? parts : line;
  };

  const flushCurrentList = () => {
    if (currentListItems.length > 0) {
      elements.push(
        <ul key={`list-${elementIndex++}`} className="markdown-list">
          {currentListItems}
        </ul>
      );
      currentListItems = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmedLine = line.trim();
    
    if (!trimmedLine) {
      // Empty line - flush current list if any
      flushCurrentList();
      return;
    }

    if (trimmedLine.startsWith('- ')) {
      // This is a list item
      const cleanLine = line.replace(/^-\s*/, '');
      const processedContent = processLine(cleanLine);
      
      currentListItems.push(
        <li key={`li-${index}`} className="markdown-list-item">
          {processedContent}
        </li>
      );
    } else if (trimmedLine.startsWith('### ')) {
      // This is an H3 header - flush any current list first
      flushCurrentList();
      
      const headerText = trimmedLine.replace(/^###\s*/, '');
      const processedContent = processLine(headerText);
      
      elements.push(
        <h3 key={`h3-${index}`} style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '600' }}>
          {processedContent}
        </h3>
      );
    } else if (trimmedLine.startsWith('## ')) {
      // This is an H2 header - flush any current list first
      flushCurrentList();
      
      const headerText = trimmedLine.replace(/^##\s*/, '');
      const processedContent = processLine(headerText);
      
      elements.push(
        <h2 key={`h2-${index}`} style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.5rem', fontWeight: '600' }}>
          {processedContent}
        </h2>
      );
    } else if (trimmedLine.startsWith('# ')) {
      // This is an H1 header - flush any current list first
      flushCurrentList();
      
      const headerText = trimmedLine.replace(/^#\s*/, '');
      const processedContent = processLine(headerText);
      
      elements.push(
        <h1 key={`h1-${index}`} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '2rem', fontWeight: '700' }}>
          {processedContent}
        </h1>
      );
    } else {
      // This is a regular paragraph - flush any current list first
      flushCurrentList();
      
      const processedContent = processLine(line);
      elements.push(
        <p key={`p-${index}`} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          {processedContent}
        </p>
      );
    }
  });

  // Flush any remaining list items
  flushCurrentList();

  return elements.filter(Boolean);
};
