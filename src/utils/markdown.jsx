import React from 'react';

/**
 * Parse markdown text and convert to JSX elements
 * Automatically detects list items and supports bold text (**text**) and links ([text](url))
 * @param {string} text - The markdown text to parse
 * @param {string} fallbackText - Text to show when input is empty (default: 'Aucune information disponible.')
 * @returns {Array} Array of JSX elements (paragraphs or list items)
 */
export const parseMarkdown = (text, fallbackText = 'Aucune information disponible.') => {
  if (!text) return fallbackText;

  const lines = text.split('\n');
  const elements = [];
  
  // Check if this should be rendered as a list (any line starts with "- ")
  const hasListItems = lines.some(line => line.trim().startsWith('- '));
  
  lines.forEach((line, index) => {
    if (!line.trim()) {
      if (!hasListItems) {
        elements.push("");
      }
      return;
    }

    // Clean line for list items (remove markdown list markers)
    const cleanLine = hasListItems ? line.replace(/^-\s*/, '') : line;
    
    const parts = [];
    let lastIndex = 0;
    let match;

    // Process both links and bold text in the same pass
    const combinedRegex = /(\[([^\]]+)\]\(([^)]+)\)|\*\*(.*?)\*\*)/g;
    
    while ((match = combinedRegex.exec(cleanLine)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(cleanLine.slice(lastIndex, match.index));
      }
      
      // Check if this is a link or bold text
      if (match[0].startsWith('[')) {
        // It's a link [text](url)
        parts.push(
          <a 
            key={`link-${index}-${match.index}`}
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
          <strong key={`bold-${index}-${match.index}`}>
            {match[4]}
          </strong>
        );
      }
      
      lastIndex = match.index + match[0].length;
    }
    
    // Add remaining text after the last match
    if (lastIndex < cleanLine.length) {
      parts.push(cleanLine.slice(lastIndex));
    }

    if (hasListItems) {
      elements.push(
        <li key={index} className="markdown-list-item">
          {parts.length > 0 ? parts : cleanLine}
        </li>
      );
    } else {
      elements.push(
        <p key={index} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
          {parts.length > 0 ? parts : cleanLine}
        </p>
      );
    }
  });

  return elements.filter(Boolean);
};
