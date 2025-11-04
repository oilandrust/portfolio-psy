module.exports = [
"[project]/utils/markdown.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseMarkdown",
    ()=>parseMarkdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
;
;
/**
 * Parse markdown text and convert to JSX elements
 * Supports:
 * - Headers: # H1, ## H2, ### H3
 * - Lists: - item
 * - Bold text: **text**
 * - Italic text: *text* or _text_
 * - Links: [text](url)
 * - YouTube embeds: ![](https://www.youtube.com/watch?v=VIDEO_ID)
 * @param {string} text - The markdown text to parse
 * @param {string} fallbackText - Text to show when input is empty (default: 'Aucune information disponible.')
 * @returns {Array} Array of JSX elements (headers, paragraphs, or list items)
 */ // Helper function to extract YouTube video ID from URL
const extractYouTubeVideoId = (url)=>{
    const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/;
    const match = url.match(regex);
    return match ? match[1] : null;
};
// Helper function to create YouTube embed iframe
const createYouTubeEmbed = (videoId, elementIndex)=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem 0'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
            width: "560",
            height: "315",
            src: `https://www.youtube.com/embed/${videoId}?si=xnFY2NyJyy7wEEsa`,
            title: "YouTube video player",
            frameBorder: "0",
            allow: "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
            referrerPolicy: "strict-origin-when-cross-origin",
            allowFullScreen: true,
            style: {
                maxWidth: '100%',
                height: 'auto',
                aspectRatio: '16/9',
                borderRadius: '8px'
            }
        }, `youtube-${elementIndex}`, false, {
            fileName: "[project]/utils/markdown.jsx",
            lineNumber: 34,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, `youtube-container-${elementIndex}`, false, {
        fileName: "[project]/utils/markdown.jsx",
        lineNumber: 26,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const parseMarkdown = (text, fallbackText = 'Aucune information disponible.')=>{
    if (!text) return fallbackText;
    const lines = text.split('\n');
    const elements = [];
    let currentListItems = [];
    let elementIndex = 0;
    const processLine = (line)=>{
        const parts = [];
        let lastIndex = 0;
        let match;
        // Process YouTube embeds, links, bold text, and italic text in the same pass
        // Order matters: YouTube embeds first, then links, then bold, then italic (to avoid conflicts)
        const combinedRegex = /(!\[([^\]]*)\]\(([^)]+)\)|\[([^\]]+)\]\(([^)]+)\)|\*\*(.*?)\*\*|\*([^*]+)\*|_(.+?)_)/g;
        while((match = combinedRegex.exec(line)) !== null){
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
                    parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: url,
                        alt: match[2] || '',
                        style: {
                            maxWidth: '100%',
                            height: 'auto',
                            margin: '1rem 0'
                        }
                    }, `img-${elementIndex}-${match.index}`, false, {
                        fileName: "[project]/utils/markdown.jsx",
                        lineNumber: 90,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)));
                }
            } else if (match[0].startsWith('[')) {
                // It's a link [text](url)
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    href: match[5],
                    target: "_blank",
                    rel: "noopener noreferrer",
                    className: "markdown-link",
                    children: match[4]
                }, `link-${elementIndex}-${match.index}`, false, {
                    fileName: "[project]/utils/markdown.jsx",
                    lineNumber: 101,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)));
            } else if (match[0].startsWith('**')) {
                // It's bold text **text**
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: match[6]
                }, `bold-${elementIndex}-${match.index}`, false, {
                    fileName: "[project]/utils/markdown.jsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)));
            } else if (match[0].startsWith('*') && match[0].endsWith('*') && match[0].length > 2 && !match[0].startsWith('**')) {
                // It's italic text *text* (but not **bold**)
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                    children: match[7]
                }, `italic-${elementIndex}-${match.index}`, false, {
                    fileName: "[project]/utils/markdown.jsx",
                    lineNumber: 121,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)));
            } else if (match[0].startsWith('_') && match[0].endsWith('_') && match[0].length > 2) {
                // It's italic text _text_
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                    children: match[8]
                }, `italic-${elementIndex}-${match.index}`, false, {
                    fileName: "[project]/utils/markdown.jsx",
                    lineNumber: 128,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)));
            }
            lastIndex = match.index + match[0].length;
        }
        // Add remaining text after the last match
        if (lastIndex < line.length) {
            parts.push(line.slice(lastIndex));
        }
        return parts.length > 0 ? parts : line;
    };
    const flushCurrentList = ()=>{
        if (currentListItems.length > 0) {
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "markdown-list",
                children: currentListItems
            }, `list-${elementIndex++}`, false, {
                fileName: "[project]/utils/markdown.jsx",
                lineNumber: 148,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)));
            currentListItems = [];
        }
    };
    lines.forEach((line, index)=>{
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
            currentListItems.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                className: "markdown-list-item",
                children: processedContent
            }, `li-${index}`, false, {
                fileName: "[project]/utils/markdown.jsx",
                lineNumber: 171,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)));
        } else if (trimmedLine.startsWith('### ')) {
            // This is an H3 header - flush any current list first
            flushCurrentList();
            const headerText = trimmedLine.replace(/^###\s*/, '');
            const processedContent = processLine(headerText);
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                style: {
                    marginTop: '1.5rem',
                    marginBottom: '0.5rem',
                    fontSize: '1.25rem',
                    fontWeight: '600',
                    color: '#1f2937'
                },
                children: processedContent
            }, `h3-${index}`, false, {
                fileName: "[project]/utils/markdown.jsx",
                lineNumber: 183,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)));
        } else if (trimmedLine.startsWith('## ')) {
            // This is an H2 header - flush any current list first
            flushCurrentList();
            const headerText = trimmedLine.replace(/^##\s*/, '');
            const processedContent = processLine(headerText);
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    marginTop: '2rem',
                    marginBottom: '0.75rem',
                    fontSize: '1.5rem',
                    fontWeight: '600',
                    color: '#1f2937'
                },
                children: processedContent
            }, `h2-${index}`, false, {
                fileName: "[project]/utils/markdown.jsx",
                lineNumber: 195,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)));
        } else if (trimmedLine.startsWith('# ')) {
            // This is an H1 header - flush any current list first
            flushCurrentList();
            const headerText = trimmedLine.replace(/^#\s*/, '');
            const processedContent = processLine(headerText);
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                style: {
                    marginTop: '2.5rem',
                    marginBottom: '1rem',
                    fontSize: '2rem',
                    fontWeight: '700',
                    color: '#1f2937'
                },
                children: processedContent
            }, `h1-${index}`, false, {
                fileName: "[project]/utils/markdown.jsx",
                lineNumber: 207,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)));
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
                const hasDiv = Array.isArray(processedContent) && processedContent.some((part)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(part) && part.type === 'div');
                if (hasDiv && Array.isArray(processedContent)) {
                    // Split content: text parts go in <p>, div parts go as separate elements
                    let currentTextParts = [];
                    processedContent.forEach((part, partIndex)=>{
                        if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].isValidElement(part) && part.type === 'div') {
                            // Flush any accumulated text into a paragraph
                            if (currentTextParts.length > 0) {
                                elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    style: {
                                        marginBottom: '1rem',
                                        lineHeight: '1.6'
                                    },
                                    children: currentTextParts
                                }, `p-${index}-${partIndex}`, false, {
                                    fileName: "[project]/utils/markdown.jsx",
                                    lineNumber: 241,
                                    columnNumber: 19
                                }, ("TURBOPACK compile-time value", void 0)));
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
                        elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            style: {
                                marginBottom: '1rem',
                                lineHeight: '1.6'
                            },
                            children: currentTextParts
                        }, `p-${index}-final`, false, {
                            fileName: "[project]/utils/markdown.jsx",
                            lineNumber: 258,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)));
                    }
                } else {
                    // Normal case: wrap in paragraph
                    elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            marginBottom: '1rem',
                            lineHeight: '1.6'
                        },
                        children: processedContent
                    }, `p-${index}`, false, {
                        fileName: "[project]/utils/markdown.jsx",
                        lineNumber: 266,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)));
                }
            }
        }
    });
    // Flush any remaining list items
    flushCurrentList();
    return elements.filter(Boolean);
};
}),
"[project]/app/[lang]/cv/page.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/markdown.jsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
'use client';
;
;
;
;
;
const CVPage = ()=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const currentLang = params?.lang || 'fr';
    const [portfolioData, setPortfolio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const cvDocumentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const fetchCVData = async ()=>{
            try {
                setLoading(true);
                setError(null);
                let dataLoaded = false;
                let lastError = null;
                const cvFetchStrategies = [
                    '/data/portfolio.json',
                    './data/portfolio.json',
                    'data/portfolio.json'
                ];
                for (const strategy of cvFetchStrategies){
                    try {
                        const response = await fetch(strategy);
                        if (!response.ok) {
                            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                        }
                        const data = await response.json();
                        if (data && data.fr && data.en) {
                            const langData = data[currentLang] || data.fr;
                            setPortfolio(langData);
                            dataLoaded = true;
                            break;
                        } else if (data && data.cv) {
                            setPortfolio(data);
                            dataLoaded = true;
                            break;
                        }
                    } catch (strategyError) {
                        lastError = strategyError;
                    }
                }
                if (!dataLoaded) {
                    throw lastError || new Error('Failed to load CV data');
                }
            } catch (error) {
                setError(error);
                setPortfolio({});
            } finally{
                setLoading(false);
            }
        };
        fetchCVData();
    }, [
        currentLang
    ]);
    const generatePDF = async ()=>{
        if (!cvDocumentRef.current) return;
        setIsGeneratingPDF(true);
        try {
            // Dynamically import html2pdf only on client side
            const html2pdf = (await __turbopack_context__.A("[project]/node_modules/html2pdf.js/dist/html2pdf.js [app-ssr] (ecmascript, async loader)")).default;
            const opt = {
                filename: currentLang === 'en' ? 'CV_Olivier_Rouiller_EN.pdf' : 'CV_Olivier_Rouiller.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    useCORS: true,
                    letterRendering: true,
                    scale: 2
                },
                jsPDF: {
                    unit: 'mm',
                    format: 'a4',
                    orientation: 'portrait'
                }
            };
            await html2pdf().set(opt).from(cvDocumentRef.current).save();
        } catch (err) {
            console.error('Error generating PDF:', err);
            alert(currentLang === 'en' ? 'Error generating PDF' : 'Erreur lors de la génération du PDF');
        } finally{
            setIsGeneratingPDF(false);
        }
    };
    const profile = portfolioData.profile || {};
    const cvData = portfolioData.cv || '';
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            position: 'relative'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: generatePDF,
                disabled: isGeneratingPDF || loading,
                style: {
                    position: 'fixed',
                    top: '2rem',
                    right: '2rem',
                    zIndex: 1000,
                    backgroundColor: 'var(--primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '0.75rem 1.5rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: isGeneratingPDF ? 'not-allowed' : 'pointer',
                    opacity: isGeneratingPDF ? 0.7 : 1,
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                },
                onMouseOver: (e)=>{
                    if (!isGeneratingPDF) {
                        e.currentTarget.style.transform = 'translateY(-2px)';
                        e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.2)';
                    }
                },
                onMouseOut: (e)=>{
                    if (!isGeneratingPDF) {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                    }
                },
                children: isGeneratingPDF ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "⏳"
                        }, void 0, false, {
                            fileName: "[project]/app/[lang]/cv/page.jsx",
                            lineNumber: 136,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        currentLang === 'en' ? 'Generating...' : 'Génération...'
                    ]
                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "📄"
                        }, void 0, false, {
                            fileName: "[project]/app/[lang]/cv/page.jsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        currentLang === 'en' ? 'Download PDF' : 'Télécharger PDF'
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/app/[lang]/cv/page.jsx",
                lineNumber: 98,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
                href: `/${currentLang}/about`,
                className: "button outline",
                style: {
                    position: 'fixed',
                    top: '6rem',
                    right: '2rem',
                    zIndex: 1000,
                    textDecoration: 'none',
                    padding: '0.75rem 1.5rem',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    backgroundColor: 'white',
                    border: '2px solid var(--primary)',
                    color: 'var(--primary)',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
                },
                onMouseOver: (e)=>{
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0, 0, 0, 0.15)';
                    e.currentTarget.style.backgroundColor = 'var(--primary)';
                    e.currentTarget.style.color = 'white';
                },
                onMouseOut: (e)=>{
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.1)';
                    e.currentTarget.style.backgroundColor = 'white';
                    e.currentTarget.style.color = 'var(--primary)';
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "←"
                    }, void 0, false, {
                        fileName: "[project]/app/[lang]/cv/page.jsx",
                        lineNumber: 182,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    currentLang === 'en' ? 'Back to portfolio' : 'Retour au portfolio'
                ]
            }, void 0, true, {
                fileName: "[project]/app/[lang]/cv/page.jsx",
                lineNumber: 147,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cvDocumentRef,
                style: {
                    maxWidth: '794px',
                    margin: '0 auto',
                    backgroundColor: 'white',
                    minHeight: '100vh',
                    boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "hero",
                        style: {
                            padding: '1.5rem 1.5rem 0.7rem 1.5rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                maxWidth: '794px',
                                margin: '0 auto',
                                padding: '1.5rem'
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: '1.5rem'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '1.5rem',
                                            flex: 1
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    width: '120px',
                                                    height: '120px',
                                                    borderRadius: '50%',
                                                    overflow: 'hidden',
                                                    flexShrink: 0,
                                                    border: '3px solid white',
                                                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: "/data/profile/IMG-20250419-WA0003 (2).jpg",
                                                    alt: profile?.title || 'Olivier Rouiller',
                                                    style: {
                                                        width: '100%',
                                                        height: '100%',
                                                        objectFit: 'cover'
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[lang]/cv/page.jsx",
                                                    lineNumber: 204,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                                lineNumber: 203,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    flex: 1
                                                },
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        style: {
                                                            fontSize: '1rem',
                                                            fontWeight: 700,
                                                            margin: '0 0 0.25rem 0',
                                                            lineHeight: '1.2'
                                                        },
                                                        children: profile?.title || 'Olivier Rouiller'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[lang]/cv/page.jsx",
                                                        lineNumber: 211,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        style: {
                                                            fontSize: '0.875rem',
                                                            margin: 0,
                                                            color: 'var(--text-secondary)',
                                                            lineHeight: '1.3'
                                                        },
                                                        children: currentLang === 'en' ? 'L3 Psychology Student and Psychotherapist in Training' : 'Étudiant en L3 de Psychologie et Psychopraticien en Formation'
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/[lang]/cv/page.jsx",
                                                        lineNumber: 214,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                                lineNumber: 210,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[lang]/cv/page.jsx",
                                        lineNumber: 202,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        style: {
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: '0.25rem',
                                            textAlign: 'right',
                                            flexShrink: 0
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    justifyContent: 'flex-end'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        fontSize: '0.75rem',
                                                        lineHeight: '1.3'
                                                    },
                                                    children: [
                                                        "14 rue Saint Erhard",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                            fileName: "[project]/app/[lang]/cv/page.jsx",
                                                            lineNumber: 225,
                                                            columnNumber: 40
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        "67100 Strasbourg"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/app/[lang]/cv/page.jsx",
                                                    lineNumber: 224,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                                lineNumber: 223,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    justifyContent: 'flex-end'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        textDecoration: 'none',
                                                        fontSize: '0.75rem'
                                                    },
                                                    children: "06 62 91 32 03"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[lang]/cv/page.jsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                                lineNumber: 228,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    justifyContent: 'flex-end'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "mailto:o.rouiller@gmail.com",
                                                    style: {
                                                        color: 'var(--primary)',
                                                        textDecoration: 'none',
                                                        fontSize: '0.75rem'
                                                    },
                                                    children: "o.rouiller@gmail.com"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[lang]/cv/page.jsx",
                                                    lineNumber: 234,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                                lineNumber: 233,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.5rem',
                                                    justifyContent: 'flex-end'
                                                },
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                                    href: "https://www.olivier-psy.fr/",
                                                    style: {
                                                        color: 'var(--primary)',
                                                        textDecoration: 'none',
                                                        fontSize: '0.75rem'
                                                    },
                                                    children: "Portfolio: olivier-psy.fr"
                                                }, void 0, false, {
                                                    fileName: "[project]/app/[lang]/cv/page.jsx",
                                                    lineNumber: 239,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                                lineNumber: 238,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[lang]/cv/page.jsx",
                                        lineNumber: 222,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                lineNumber: 200,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/app/[lang]/cv/page.jsx",
                            lineNumber: 199,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/[lang]/cv/page.jsx",
                        lineNumber: 198,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            maxWidth: '794px',
                            margin: '0 auto',
                            padding: '0 4rem 4rem 4rem'
                        },
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginTop: '2rem',
                                padding: 0,
                                border: 'none'
                            },
                            children: loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    textAlign: 'center',
                                    padding: '2rem'
                                },
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: currentLang === 'en' ? 'Loading CV...' : 'Chargement du CV...'
                                }, void 0, false, {
                                    fileName: "[project]/app/[lang]/cv/page.jsx",
                                    lineNumber: 253,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                lineNumber: 252,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    padding: '1rem',
                                    margin: '1rem 0',
                                    backgroundColor: '#fef2f2',
                                    border: '1px solid #fecaca',
                                    borderRadius: '8px',
                                    color: '#991b1b'
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: '0 0 0.5rem 0',
                                            fontWeight: 'bold'
                                        },
                                        children: [
                                            "⚠️ ",
                                            currentLang === 'en' ? 'Error loading CV' : 'Erreur lors du chargement du CV'
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/[lang]/cv/page.jsx",
                                        lineNumber: 257,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        style: {
                                            margin: 0,
                                            fontSize: '0.875rem'
                                        },
                                        children: currentLang === 'en' ? 'Unable to load CV content. Please try again later.' : 'Impossible de charger le contenu du CV. Veuillez réessayer plus tard.'
                                    }, void 0, false, {
                                        fileName: "[project]/app/[lang]/cv/page.jsx",
                                        lineNumber: 260,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                lineNumber: 256,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    fontSize: '0.7rem',
                                    lineHeight: '1.4'
                                },
                                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["parseMarkdown"])(cvData)
                            }, void 0, false, {
                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                lineNumber: 267,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/app/[lang]/cv/page.jsx",
                            lineNumber: 250,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/app/[lang]/cv/page.jsx",
                        lineNumber: 249,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/[lang]/cv/page.jsx",
                lineNumber: 187,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/[lang]/cv/page.jsx",
        lineNumber: 96,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = CVPage;
}),
];

//# sourceMappingURL=_c6b260ce._.js.map