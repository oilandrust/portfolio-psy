import React from 'react';

/**
 * Parse markdown text and convert to JSX elements
 * Supports:
 * - Headers: # H1, ## H2, ### H3
 * - Lists: - item
 * - Bold text: **text**
 * - Italic text: *text* or _text_
 * - Links: [text](url) and bare URLs (https://... or www....)
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

// Helper function to normalize URLs (add https:// for www. links)
const normalizeUrl = (url) => (url.startsWith('www.') ? `https://${url}` : url);

const URL_REGEX = /https?:\/\/[^\s<>,.;:!?)]+|www\.[^\s<>,.;:!?)]+/g;

const createMarkdownLink = (href, children, key) => (
  <a
    key={key}
    href={normalizeUrl(href)}
    target="_blank"
    rel="noopener noreferrer"
    className="markdown-link"
  >
    {children}
  </a>
);

const linkifyPlainText = (text, keyPrefix) => {
  if (!text) return [];

  const parts = [];
  let lastIndex = 0;
  let match;
  let idx = 0;

  URL_REGEX.lastIndex = 0;
  while ((match = URL_REGEX.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    const url = match[0];
    parts.push(createMarkdownLink(url, url, `${keyPrefix}-url-${idx++}`));
    lastIndex = match.index + url.length;
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }

  return parts.length > 0 ? parts : [text];
};

const processInline = (text, keyPrefix = 'inline') => {
  const parts = [];
  let i = 0;
  let partIndex = 0;

  const pushPlain = (segment) => {
    if (!segment) return;
    linkifyPlainText(segment, `${keyPrefix}-plain-${partIndex}`).forEach((part) => parts.push(part));
  };

  while (i < text.length) {
    const linkMatch = text.slice(i).match(/^\[([^\]]+)\]\(([^)]+)\)/);
    if (linkMatch) {
      parts.push(createMarkdownLink(linkMatch[2], linkMatch[1], `${keyPrefix}-link-${partIndex++}`));
      i += linkMatch[0].length;
      continue;
    }

    if (text.startsWith('**', i)) {
      const end = text.indexOf('**', i + 2);
      if (end !== -1) {
        parts.push(
          <strong key={`${keyPrefix}-bold-${partIndex++}`}>
            {processInline(text.slice(i + 2, end), `${keyPrefix}-bold-${partIndex}`)}
          </strong>
        );
        i = end + 2;
        continue;
      }
    }

    if (text[i] === '*' && text[i + 1] !== '*') {
      const end = text.indexOf('*', i + 1);
      if (end !== -1) {
        parts.push(
          <em key={`${keyPrefix}-em-${partIndex++}`}>
            {processInline(text.slice(i + 1, end), `${keyPrefix}-em-${partIndex}`)}
          </em>
        );
        i = end + 1;
        continue;
      }
    }

    if (text[i] === '_') {
      const end = text.indexOf('_', i + 1);
      if (end !== -1) {
        parts.push(
          <em key={`${keyPrefix}-em-${partIndex++}`}>
            {processInline(text.slice(i + 1, end), `${keyPrefix}-em-${partIndex}`)}
          </em>
        );
        i = end + 1;
        continue;
      }
    }

    let next = text.length;
    for (const marker of ['[', '**', '*', '_']) {
      const pos = text.indexOf(marker, i);
      if (pos !== -1 && pos < next) next = pos;
    }

    const urlMatch = text.slice(i).match(URL_REGEX);
    if (urlMatch?.index !== undefined) {
      const urlPos = i + urlMatch.index;
      if (urlPos < next) next = urlPos;
    }

    if (next > i) {
      pushPlain(text.slice(i, next));
      i = next;
    } else {
      pushPlain(text[i]);
      i += 1;
    }
  }

  return parts.length > 0 ? parts : text;
};
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

  // Remove HTML comments (<!--- --->) before parsing
  text = text.replace(/<!---[\s\S]*?--->/g, '');
  
  // Remove Obsidian comments (%% text %%) before parsing
  text = text.replace(/%%[\s\S]*?%%/g, '');

  const lines = text.split('\n');
  const elements = [];
  let listRoots = [];
  let listStack = [];
  let elementIndex = 0;

  const getListIndentLevel = (line) => {
    const leadingWhitespace = line.match(/^(\s*)/)?.[1] ?? '';
    const tabs = (leadingWhitespace.match(/\t/g) || []).length;
    const spaces = leadingWhitespace.length - tabs;
    return tabs + Math.floor(spaces / 2);
  };

  const renderListTree = (nodes, keyPrefix) => (
    <ul key={keyPrefix} className="markdown-list">
      {nodes.map((node, i) => (
        <li key={`${keyPrefix}-li-${i}`} className="markdown-list-item">
          {node.content}
          {node.children.length > 0 && renderListTree(node.children, `${keyPrefix}-nested-${i}`)}
        </li>
      ))}
    </ul>
  );
  
  const appendInline = (parts, text, keyPrefix) => {
    const result = processInline(text, keyPrefix);
    if (Array.isArray(result)) {
      parts.push(...result);
    } else if (result) {
      parts.push(result);
    }
  };

  const processLine = (line, keyPrefix = 'line') => {
    const parts = [];
    let lastIndex = 0;
    let match;
    const embedRegex = /!\[([^\]]*)\]\(([^)]+)\)/g;

    while ((match = embedRegex.exec(line)) !== null) {
      if (match.index > lastIndex) {
        appendInline(parts, line.slice(lastIndex, match.index), `${keyPrefix}-text-${lastIndex}`);
      }

      const url = match[2];
      const videoId = extractYouTubeVideoId(url);

      if (videoId) {
        parts.push(createYouTubeEmbed(videoId, elementIndex++));
      } else {
        parts.push(
          <img
            key={`img-${elementIndex++}`}
            src={url}
            alt={match[1] || ''}
            style={{ maxWidth: '100%', height: 'auto', margin: '1rem 0' }}
          />
        );
      }

      lastIndex = match.index + match[0].length;
    }

    if (lastIndex < line.length) {
      appendInline(parts, line.slice(lastIndex), `${keyPrefix}-text-${lastIndex}`);
    }

    return parts.length > 0 ? parts : line;
  };

  const flushCurrentList = () => {
    if (listRoots.length > 0) {
      elements.push(renderListTree(listRoots, `list-${elementIndex++}`));
      listRoots = [];
      listStack = [];
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
      const indentLevel = getListIndentLevel(line);
      const cleanLine = trimmedLine.replace(/^-\s*/, '');
      const processedContent = processLine(cleanLine);
      const node = { content: processedContent, children: [] };

      while (listStack.length > 0 && listStack[listStack.length - 1].indent >= indentLevel) {
        listStack.pop();
      }

      if (listStack.length === 0) {
        listRoots.push(node);
      } else {
        listStack[listStack.length - 1].node.children.push(node);
      }

      listStack.push({ indent: indentLevel, node });
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
      
      // Check if the line contains only a YouTube embed (or mostly just a YouTube embed)
      const youtubeRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
      const youtubeMatch = trimmedLine.match(youtubeRegex);
      const videoId = youtubeMatch ? extractYouTubeVideoId(youtubeMatch[2]) : null;
      
      // If it's a YouTube video and the line is mostly just that, add it as a block element
      if (videoId && trimmedLine.replace(youtubeRegex, '').trim().length === 0) {
        elements.push(createYouTubeEmbed(videoId, elementIndex++));
      } else {
        // Regular paragraph
        const processedContent = processLine(line);
        
        // Check if processedContent contains a div (YouTube embed) - if so, split it
        const hasDiv = Array.isArray(processedContent) && processedContent.some(
          part => React.isValidElement(part) && part.type === 'div'
        );
        
        if (hasDiv && Array.isArray(processedContent)) {
          // Split content: text parts go in <p>, div parts go as separate elements
          let currentTextParts = [];
          
          processedContent.forEach((part, partIndex) => {
            if (React.isValidElement(part) && part.type === 'div') {
              // Flush any accumulated text into a paragraph
              if (currentTextParts.length > 0) {
                elements.push(
                  <p key={`p-${index}-${partIndex}`} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                    {currentTextParts}
                  </p>
                );
                currentTextParts = [];
              }
              // Add the div as a separate element
              elements.push(part);
            } else {
              // Accumulate text parts
              currentTextParts.push(part);
            }
          });
          
          // Flush any remaining text parts
          if (currentTextParts.length > 0) {
            elements.push(
              <p key={`p-${index}-final`} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
                {currentTextParts}
              </p>
            );
          }
        } else {
          // Normal case: wrap in paragraph
          elements.push(
            <p key={`p-${index}`} style={{ marginBottom: '1rem', lineHeight: '1.6' }}>
              {processedContent}
            </p>
          );
        }
      }
    }
  });

  // Flush any remaining list items
  flushCurrentList();

  return elements.filter(Boolean);
};
