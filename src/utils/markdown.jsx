import React from 'react';

/**
 * Parse markdown text and convert to JSX elements
 * Supports:
 * - Headers: # H1, ## H2, ### H3
 * - Lists: - item
 * - Bold text: **text**
 * - Italic text: *text*
 * - Links: [text](url)
 * - YouTube embeds: ![](https://www.youtube.com/watch?v=VIDEO_ID)
 * @param {string} text - The markdown text to parse
 * @param {string} fallbackText - Text to show when input is empty (default: 'Aucune information disponible.')
 * @returns {Array} Array of JSX elements (headers, paragraphs, or list items)
 */
// Helper function to extract YouTube video ID from URL
const extractYouTubeVideoId = (url) => {
  const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper function to create YouTube embed iframe
const createYouTubeEmbed = (videoId, elementIndex) => {
  return (
    <div
      key={`youtube-container-${elementIndex}`}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem 0'
      }}
    >
      <iframe
        key={`youtube-${elementIndex}`}
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${videoId}?si=xnFY2NyJyy7wEEsa`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{
          maxWidth: '100%',
          height: 'auto',
          aspectRatio: '16/9',
          borderRadius: '8px'
        }}
      />
    </div>
  );
};

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

    // Process YouTube embeds, links, bold text, and italic text in the same pass
    // Order matters: YouTube embeds first, then links, then bold, then italic (to avoid conflicts)
    const combinedRegex = /(!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*(.*?)\*\*|\*([^*]+)\*)/g;
    
    while ((match = combinedRegex.exec(line)) !== null) {
      // Add text before the match
      if (match.index > lastIndex) {
        parts.push(line.slice(lastIndex, match.index));
      }
      
      // Check what type of match this is
      if (match[0].startsWith('![')) {
        // It's an image/embed link ![](url) or ![alt](url)
        const url = match[3];
        const videoId = extractYouTubeVideoId(url);
        
        if (videoId) {
          // It's a YouTube video - create embed
          parts.push(createYouTubeEmbed(videoId, elementIndex++));
        } else {
          // It's a regular image - create img tag
          parts.push(
            <img 
              key={`img-${elementIndex}-${match.index}`}
              src={url} 
              alt={match[2] || ''} 
              style={{ maxWidth: '100%', height: 'auto', margin: '1rem 0' }}
            />
          );
        }
      } else if (match[0].startsWith('[')) {
        // It's a link [text](url)
        parts.push(
          <a 
            key={`link-${elementIndex}-${match.index}`}
            href={match[5]} 
            target="_blank" 
            rel="noopener noreferrer"
            className="markdown-link"
          >
            {match[4]}
          </a>
        );
      } else if (match[0].startsWith('**')) {
        // It's bold text **text**
        parts.push(
          <strong key={`bold-${elementIndex}-${match.index}`}>
            {match[6]}
          </strong>
        );
      } else if (match[0].startsWith('*') && match[0].endsWith('*') && match[0].length > 2) {
        // It's italic text *text* (but not **bold**)
        parts.push(
          <em key={`italic-${elementIndex}-${match.index}`}>
            {match[7]}
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
        <h3 key={`h3-${index}`} style={{ marginTop: '1.5rem', marginBottom: '0.5rem', fontSize: '1.25rem', fontWeight: '600', color: '#1f2937' }}>
          {processedContent}
        </h3>
      );
    } else if (trimmedLine.startsWith('## ')) {
      // This is an H2 header - flush any current list first
      flushCurrentList();
      
      const headerText = trimmedLine.replace(/^##\s*/, '');
      const processedContent = processLine(headerText);
      
      elements.push(
        <h2 key={`h2-${index}`} style={{ marginTop: '2rem', marginBottom: '0.75rem', fontSize: '1.5rem', fontWeight: '600', color: '#1f2937' }}>
          {processedContent}
        </h2>
      );
    } else if (trimmedLine.startsWith('# ')) {
      // This is an H1 header - flush any current list first
      flushCurrentList();
      
      const headerText = trimmedLine.replace(/^#\s*/, '');
      const processedContent = processLine(headerText);
      
      elements.push(
        <h1 key={`h1-${index}`} style={{ marginTop: '2.5rem', marginBottom: '1rem', fontSize: '2rem', fontWeight: '700', color: '#1f2937' }}>
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
