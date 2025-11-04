(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/utils/markdown.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "parseMarkdown",
    ()=>parseMarkdown
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            display: 'flex',
            justifyContent: 'center',
            margin: '1rem 0'
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("iframe", {
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
                    parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
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
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    children: match[6]
                }, `bold-${elementIndex}-${match.index}`, false, {
                    fileName: "[project]/utils/markdown.jsx",
                    lineNumber: 114,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)));
            } else if (match[0].startsWith('*') && match[0].endsWith('*') && match[0].length > 2 && !match[0].startsWith('**')) {
                // It's italic text *text* (but not **bold**)
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                    children: match[7]
                }, `italic-${elementIndex}-${match.index}`, false, {
                    fileName: "[project]/utils/markdown.jsx",
                    lineNumber: 121,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)));
            } else if (match[0].startsWith('_') && match[0].endsWith('_') && match[0].length > 2) {
                // It's italic text _text_
                parts.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
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
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
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
            currentListItems.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
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
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
            elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
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
                const hasDiv = Array.isArray(processedContent) && processedContent.some((part)=>/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isValidElement(part) && part.type === 'div');
                if (hasDiv && Array.isArray(processedContent)) {
                    // Split content: text parts go in <p>, div parts go as separate elements
                    let currentTextParts = [];
                    processedContent.forEach((part, partIndex)=>{
                        if (/*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].isValidElement(part) && part.type === 'div') {
                            // Flush any accumulated text into a paragraph
                            if (currentTextParts.length > 0) {
                                elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                        elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
                    elements.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/[lang]/cv/page.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/markdown.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
;
const CVPage = ()=>{
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const currentLang = params?.lang || 'fr';
    const [portfolioData, setPortfolio] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isGeneratingPDF, setIsGeneratingPDF] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const cvDocumentRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "CVPage.useEffect": ()=>{
            const fetchCVData = {
                "CVPage.useEffect.fetchCVData": async ()=>{
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
                }
            }["CVPage.useEffect.fetchCVData"];
            fetchCVData();
        }
    }["CVPage.useEffect"], [
        currentLang
    ]);
    const generatePDF = async ()=>{
        if (!cvDocumentRef.current) return;
        setIsGeneratingPDF(true);
        try {
            // Dynamically import html2pdf only on client side
            const html2pdf = (await __turbopack_context__.A("[project]/node_modules/html2pdf.js/dist/html2pdf.js [app-client] (ecmascript, async loader)")).default;
            const opt = {
                margin: [
                    10,
                    10,
                    10,
                    10
                ],
                filename: currentLang === 'en' ? 'CV_Olivier_Rouiller_EN.pdf' : 'CV_Olivier_Rouiller.pdf',
                image: {
                    type: 'jpeg',
                    quality: 0.98
                },
                html2canvas: {
                    scale: 2,
                    useCORS: true
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
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: '2rem',
                textAlign: 'center'
            },
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: currentLang === 'en' ? 'Loading CV...' : 'Chargement du CV...'
            }, void 0, false, {
                fileName: "[project]/app/[lang]/cv/page.jsx",
                lineNumber: 99,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/app/[lang]/cv/page.jsx",
            lineNumber: 98,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    if (error) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: {
                padding: '2rem',
                textAlign: 'center'
            },
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: currentLang === 'en' ? 'Error loading CV' : 'Erreur lors du chargement du CV'
                }, void 0, false, {
                    fileName: "[project]/app/[lang]/cv/page.jsx",
                    lineNumber: 107,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    href: `/${currentLang}/about`,
                    style: {
                        marginTop: '1rem',
                        display: 'inline-block'
                    },
                    children: currentLang === 'en' ? 'Back to portfolio' : 'Retour au portfolio'
                }, void 0, false, {
                    fileName: "[project]/app/[lang]/cv/page.jsx",
                    lineNumber: 108,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/app/[lang]/cv/page.jsx",
            lineNumber: 106,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    const cvData = portfolioData.cv || '';
    const profile = portfolioData.profile || {};
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            padding: '2rem',
            maxWidth: '800px',
            margin: '0 auto'
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    marginBottom: '2rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: `/${currentLang}/about`,
                        style: {
                            color: '#6b7280',
                            textDecoration: 'none'
                        },
                        children: [
                            "← ",
                            currentLang === 'en' ? 'Back to portfolio' : 'Retour au portfolio'
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[lang]/cv/page.jsx",
                        lineNumber: 121,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: generatePDF,
                        disabled: isGeneratingPDF,
                        className: "button primary",
                        children: isGeneratingPDF ? currentLang === 'en' ? 'Generating...' : 'Génération...' : currentLang === 'en' ? 'Download PDF' : 'Télécharger PDF'
                    }, void 0, false, {
                        fileName: "[project]/app/[lang]/cv/page.jsx",
                        lineNumber: 124,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/[lang]/cv/page.jsx",
                lineNumber: 120,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                ref: cvDocumentRef,
                style: {
                    backgroundColor: 'white',
                    padding: '2rem',
                    color: '#000',
                    fontFamily: 'Arial, sans-serif'
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            textAlign: 'center',
                            marginBottom: '2rem'
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: "/data/profile/IMG-20250419-WA0003 (2).jpg",
                                alt: profile?.title || 'Olivier Rouiller',
                                style: {
                                    width: '150px',
                                    height: '150px',
                                    borderRadius: '50%',
                                    objectFit: 'cover',
                                    marginBottom: '1rem'
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    margin: '0.5rem 0',
                                    fontSize: '2rem'
                                },
                                children: profile?.title || 'Olivier Rouiller'
                            }, void 0, false, {
                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: '0.5rem 0',
                                    fontSize: '1.1rem',
                                    color: '#666'
                                },
                                children: currentLang === 'en' ? 'L3 Psychology Student and Psychotherapist in Training' : 'Étudiant en L3 de Psychologie et Psychopraticien en Formation'
                            }, void 0, false, {
                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                lineNumber: 158,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: '0.5rem 0',
                                    fontSize: '0.9rem'
                                },
                                children: currentLang === 'en' ? `Website: https://www.olivier-psy.fr/` : `Site web : https://www.olivier-psy.fr/`
                            }, void 0, false, {
                                fileName: "[project]/app/[lang]/cv/page.jsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/[lang]/cv/page.jsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            lineHeight: '1.6',
                            fontSize: '0.95rem'
                        },
                        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMarkdown"])(cvData)
                    }, void 0, false, {
                        fileName: "[project]/app/[lang]/cv/page.jsx",
                        lineNumber: 170,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/app/[lang]/cv/page.jsx",
                lineNumber: 136,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/app/[lang]/cv/page.jsx",
        lineNumber: 119,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(CVPage, "uCG5BX/fvDrlEuphTgzp9j0ATHc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = CVPage;
const __TURBOPACK__default__export__ = CVPage;
var _c;
__turbopack_context__.k.register(_c, "CVPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_3ba54639._.js.map