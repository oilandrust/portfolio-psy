(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/Tabs.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const Tabs = ({ children, currentLang })=>{
    _s();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const tabs = [
        {
            id: 'about',
            labelFr: 'À propos',
            labelEn: 'About',
            path: `/${currentLang}/about`
        },
        {
            id: 'interests',
            labelFr: 'Intérêts',
            labelEn: 'Interests',
            path: `/${currentLang}/interests`
        },
        {
            id: 'formations',
            labelFr: 'Formations',
            labelEn: 'Education',
            path: `/${currentLang}/formations`
        },
        {
            id: 'experience',
            labelFr: 'Expérience',
            labelEn: 'Experience',
            path: `/${currentLang}/experience`
        },
        {
            id: 'lectures',
            labelFr: 'Lectures',
            labelEn: 'Readings',
            path: `/${currentLang}/lectures`
        },
        {
            id: 'contact',
            labelFr: 'Contact',
            labelEn: 'Contact',
            path: `/${currentLang}/contact`
        }
    ];
    // Determine active tab based on current path
    let activeTabIndex = 0;
    if (pathname?.startsWith(`/${currentLang}/interests`)) {
        activeTabIndex = tabs.findIndex((tab)=>tab.id === 'interests');
    } else if (pathname?.startsWith(`/${currentLang}/lectures`)) {
        activeTabIndex = tabs.findIndex((tab)=>tab.id === 'lectures');
    } else if (pathname?.startsWith(`/${currentLang}/formations`)) {
        activeTabIndex = tabs.findIndex((tab)=>tab.id === 'formations');
    } else if (pathname?.startsWith(`/${currentLang}/experience`)) {
        activeTabIndex = tabs.findIndex((tab)=>tab.id === 'experience');
    } else if (pathname?.startsWith(`/${currentLang}/contact`)) {
        activeTabIndex = tabs.findIndex((tab)=>tab.id === 'contact');
    } else {
        // Default to about tab
        activeTabIndex = tabs.findIndex((tab)=>tab.id === 'about');
    }
    const currentTab = activeTabIndex >= 0 ? activeTabIndex : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tabs-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tabs-header",
                children: tabs.map((tab, index)=>{
                    const label = currentLang === 'fr' ? tab.labelFr : tab.labelEn;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: tab.path,
                        className: `tab-button ${currentTab === index ? 'active' : ''}`,
                        children: label
                    }, tab.id, false, {
                        fileName: "[project]/components/Tabs.jsx",
                        lineNumber: 43,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/components/Tabs.jsx",
                lineNumber: 39,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tab-content",
                children: children[currentTab]
            }, void 0, false, {
                fileName: "[project]/components/Tabs.jsx",
                lineNumber: 53,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Tabs.jsx",
        lineNumber: 38,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Tabs, "xbyQPtUVMO7MNj7WjJlpdWqRcTo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"]
    ];
});
_c = Tabs;
const __TURBOPACK__default__export__ = Tabs;
var _c;
__turbopack_context__.k.register(_c, "Tabs");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/LecturesTab.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
const LecturesTab = ({ readings = [] })=>{
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const currentLang = params?.lang || 'fr';
    // Sort readings by ID (ascending order)
    const sortedReadings = [
        ...readings
    ].sort((a, b)=>{
        const idA = a.id || 0;
        const idB = b.id || 0;
        return idA - idB;
    });
    const handleReadingClick = (reading)=>{
        router.push(`/${currentLang}/lectures/${reading.id}`);
    };
    // Always show the grid - detail pages are separate routes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Lectures"
            }, void 0, false, {
                fileName: "[project]/components/LecturesTab.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            sortedReadings.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "readings-grid",
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1rem'
                },
                children: sortedReadings.map((reading, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "reading-item",
                        style: {
                            border: '1px solid #e2e8f0',
                            borderRadius: '8px',
                            padding: '1rem',
                            textAlign: 'center',
                            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                            cursor: 'pointer'
                        },
                        onClick: ()=>handleReadingClick(reading),
                        onMouseEnter: (e)=>{
                            if (e.target === e.currentTarget) {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
                            }
                        },
                        onMouseLeave: (e)=>{
                            if (e.target === e.currentTarget) {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = 'none';
                            }
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                src: reading.thumbnail || '/data/readings/placeholder.jpg',
                                alt: reading.title,
                                style: {
                                    height: '200px',
                                    objectFit: 'contain',
                                    borderRadius: '4px',
                                    marginBottom: '0.75rem',
                                    backgroundColor: '#f8f9fa'
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/LecturesTab.jsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                style: {
                                    margin: '0 0 0.5rem 0',
                                    fontSize: '0.9rem',
                                    lineHeight: '1.3'
                                },
                                children: reading.title
                            }, void 0, false, {
                                fileName: "[project]/components/LecturesTab.jsx",
                                lineNumber: 69,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: '0',
                                    fontSize: '0.8rem',
                                    color: '#666',
                                    fontStyle: 'italic'
                                },
                                children: reading.author
                            }, void 0, false, {
                                fileName: "[project]/components/LecturesTab.jsx",
                                lineNumber: 76,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, index, true, {
                        fileName: "[project]/components/LecturesTab.jsx",
                        lineNumber: 33,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0)))
            }, void 0, false, {
                fileName: "[project]/components/LecturesTab.jsx",
                lineNumber: 26,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Aucune lecture disponible."
            }, void 0, false, {
                fileName: "[project]/components/LecturesTab.jsx",
                lineNumber: 88,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            sortedReadings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    marginTop: '2rem',
                    fontSize: '0.8rem',
                    color: '#888',
                    textAlign: 'center',
                    fontStyle: 'italic'
                },
                children: "Toutes les couvertures © leurs éditeurs respectifs, utilisées à des fins de citation et de critique"
            }, void 0, false, {
                fileName: "[project]/components/LecturesTab.jsx",
                lineNumber: 93,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/LecturesTab.jsx",
        lineNumber: 23,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LecturesTab, "6tjUaGqXbeKCUQo6mHB9P8cv1X0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LecturesTab;
const __TURBOPACK__default__export__ = LecturesTab;
var _c;
__turbopack_context__.k.register(_c, "LecturesTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Contact.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/constants.js [app-client] (ecmascript)");
'use client';
;
;
const Contact = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "contact",
        className: "section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Get In Touch"
            }, void 0, false, {
                fileName: "[project]/components/Contact.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    textAlign: 'center',
                    marginBottom: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].SPACING.XL
                },
                children: "You're welcome to contact me if something sparked your curiosity."
            }, void 0, false, {
                fileName: "[project]/components/Contact.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "outline",
                    onClick: ()=>window.location.href = `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CONTACT_CONFIG"].EMAIL}`,
                    children: "Send an email"
                }, void 0, false, {
                    fileName: "[project]/components/Contact.jsx",
                    lineNumber: 14,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/Contact.jsx",
                lineNumber: 13,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Contact.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Contact;
const __TURBOPACK__default__export__ = Contact;
var _c;
__turbopack_context__.k.register(_c, "Contact");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
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
"[project]/components/InterestDetail.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/markdown.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const InterestDetail = ({ interests, currentLang })=>{
    _s();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const id = params?.id;
    const interest = interests.find((int)=>int.id.toString() === id);
    if (!interest) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "section",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                    onClick: (e)=>{
                        e.preventDefault();
                        router.push(`/${currentLang}/interests`);
                    },
                    href: `/${currentLang}/interests`,
                    style: {
                        display: 'inline-block',
                        marginBottom: '1rem',
                        color: '#6b7280',
                        fontSize: '0.9rem',
                        textDecoration: 'none',
                        cursor: 'pointer',
                        transition: 'color 0.2s ease'
                    },
                    onMouseEnter: (e)=>{
                        e.target.style.color = '#374151';
                    },
                    onMouseLeave: (e)=>{
                        e.target.style.color = '#6b7280';
                    },
                    children: "← Retour aux intérêts"
                }, void 0, false, {
                    fileName: "[project]/components/InterestDetail.jsx",
                    lineNumber: 16,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    children: "Intérêt non trouvé"
                }, void 0, false, {
                    fileName: "[project]/components/InterestDetail.jsx",
                    lineNumber: 40,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0)),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                    children: "L'intérêt demandé n'existe pas."
                }, void 0, false, {
                    fileName: "[project]/components/InterestDetail.jsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            ]
        }, void 0, true, {
            fileName: "[project]/components/InterestDetail.jsx",
            lineNumber: 15,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                onClick: (e)=>{
                    e.preventDefault();
                    router.push(`/${currentLang}/interests`);
                },
                href: "/interests",
                style: {
                    display: 'inline-block',
                    marginBottom: '1.5rem',
                    color: '#6b7280',
                    fontSize: '0.9rem',
                    textDecoration: 'none',
                    cursor: 'pointer',
                    transition: 'color 0.2s ease'
                },
                onMouseEnter: (e)=>{
                    e.target.style.color = '#374151';
                },
                onMouseLeave: (e)=>{
                    e.target.style.color = '#6b7280';
                },
                children: "← Retour aux intérêts"
            }, void 0, false, {
                fileName: "[project]/components/InterestDetail.jsx",
                lineNumber: 48,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                },
                children: [
                    interest.thumbnail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                        src: interest.thumbnail,
                        alt: interest.title,
                        style: {
                            height: '150px',
                            objectFit: 'contain',
                            borderRadius: '8px',
                            flexShrink: 0
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/InterestDetail.jsx",
                        lineNumber: 80,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                style: {
                                    margin: '0 0 0.5rem 0',
                                    color: '#000000',
                                    fontSize: '2rem'
                                },
                                children: interest.title
                            }, void 0, false, {
                                fileName: "[project]/components/InterestDetail.jsx",
                                lineNumber: 93,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            interest.subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                style: {
                                    margin: 0,
                                    fontSize: '1.1rem',
                                    color: 'var(--muted-color)',
                                    fontStyle: 'italic'
                                },
                                children: interest.subtitle
                            }, void 0, false, {
                                fileName: "[project]/components/InterestDetail.jsx",
                                lineNumber: 102,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/InterestDetail.jsx",
                        lineNumber: 92,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/InterestDetail.jsx",
                lineNumber: 73,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    fontSize: '1rem',
                    lineHeight: '1.6',
                    color: '#374151'
                },
                children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$markdown$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["parseMarkdown"])(interest.description)
            }, void 0, false, {
                fileName: "[project]/components/InterestDetail.jsx",
                lineNumber: 114,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/InterestDetail.jsx",
        lineNumber: 47,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(InterestDetail, "6tjUaGqXbeKCUQo6mHB9P8cv1X0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = InterestDetail;
const __TURBOPACK__default__export__ = InterestDetail;
var _c;
__turbopack_context__.k.register(_c, "InterestDetail");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InterestCard.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/constants.js [app-client] (ecmascript)");
'use client';
;
;
const InterestCard = ({ interest, onClick })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "interest-card",
        style: {
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].COLORS.MUTED_BORDER}`,
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].BORDER_RADIUS.LG,
            padding: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].SPACING.LG,
            boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].SHADOWS.SM,
            background: 'var(--card-background-color, white)',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            textAlign: 'left',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-radius 0.3s ease',
            cursor: 'pointer',
            minHeight: '80px',
            gap: '1rem'
        },
        onClick: onClick,
        onMouseEnter: (e)=>{
            if (e.target === e.currentTarget) {
                e.target.style.transform = 'translateY(-2px)';
                e.target.style.boxShadow = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].SHADOWS.MD;
            }
        },
        onMouseLeave: (e)=>{
            if (e.target === e.currentTarget) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["STYLES"].SHADOWS.SM;
            }
        },
        children: [
            interest.thumbnail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: interest.thumbnail,
                alt: interest.title,
                style: {
                    height: '150px',
                    objectFit: 'contain',
                    borderRadius: '8px',
                    flexShrink: 0
                }
            }, void 0, false, {
                fileName: "[project]/components/InterestCard.jsx",
                lineNumber: 39,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        style: {
                            margin: '0 0 0.25rem 0',
                            color: '#000000',
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            lineHeight: '1.3',
                            textShadow: 'none',
                            boxShadow: 'none'
                        },
                        children: interest.title
                    }, void 0, false, {
                        fileName: "[project]/components/InterestCard.jsx",
                        lineNumber: 52,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    (interest.subtitle || interest.description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        style: {
                            margin: '0',
                            fontSize: '0.85rem',
                            color: 'var(--muted-color)',
                            lineHeight: '1.4',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            textShadow: 'none',
                            boxShadow: 'none'
                        },
                        children: interest.subtitle || interest.description
                    }, void 0, false, {
                        fileName: "[project]/components/InterestCard.jsx",
                        lineNumber: 67,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/InterestCard.jsx",
                lineNumber: 51,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/InterestCard.jsx",
        lineNumber: 7,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = InterestCard;
const __TURBOPACK__default__export__ = InterestCard;
var _c;
__turbopack_context__.k.register(_c, "InterestCard");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InterestsGrid.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterestCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InterestCard.jsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const InterestsGrid = ({ interests })=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"])();
    const currentLang = params?.lang || 'fr';
    const handleInterestClick = (interest)=>{
        router.push(`/${currentLang}/interests/${interest.id}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                style: {
                    marginBottom: '2rem',
                    color: '#000000',
                    fontSize: '2rem'
                },
                children: "Intérêts"
            }, void 0, false, {
                fileName: "[project]/components/InterestsGrid.jsx",
                lineNumber: 17,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "interests-grid",
                style: {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    maxWidth: '1200px',
                    margin: '0 auto'
                },
                children: Array.from({
                    length: Math.ceil(interests.length / 2)
                }, (_, rowIndex)=>{
                    const rowInterests = interests.slice(rowIndex * 2, (rowIndex + 1) * 2);
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "interests-row",
                            style: {
                                display: 'flex',
                                gap: '1rem',
                                alignItems: 'flex-start'
                            },
                            children: [
                                0,
                                1
                            ].map((colIndex)=>{
                                const interestIndex = rowIndex * 2 + colIndex;
                                const interest = interests[interestIndex];
                                if (!interest) return null;
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterestCard$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        interest: interest,
                                        onClick: ()=>handleInterestClick(interest)
                                    }, void 0, false, {
                                        fileName: "[project]/components/InterestsGrid.jsx",
                                        lineNumber: 63,
                                        columnNumber: 23
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, interest.id, false, {
                                    fileName: "[project]/components/InterestsGrid.jsx",
                                    lineNumber: 55,
                                    columnNumber: 21
                                }, ("TURBOPACK compile-time value", void 0));
                            })
                        }, void 0, false, {
                            fileName: "[project]/components/InterestsGrid.jsx",
                            lineNumber: 40,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, rowIndex, false, {
                        fileName: "[project]/components/InterestsGrid.jsx",
                        lineNumber: 39,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0));
                })
            }, void 0, false, {
                fileName: "[project]/components/InterestsGrid.jsx",
                lineNumber: 25,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/InterestsGrid.jsx",
        lineNumber: 16,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(InterestsGrid, "zlIVCKA/c11SjAYLIHTl7aZK4mg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useParams"]
    ];
});
_c = InterestsGrid;
const __TURBOPACK__default__export__ = InterestsGrid;
var _c;
__turbopack_context__.k.register(_c, "InterestsGrid");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/InterestsTab.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterestsGrid$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InterestsGrid.jsx [app-client] (ecmascript)");
'use client';
;
;
const InterestsTab = ({ interests })=>{
    // Always show the grid - detail pages are separate routes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterestsGrid$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
        interests: interests
    }, void 0, false, {
        fileName: "[project]/components/InterestsTab.jsx",
        lineNumber: 7,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_c = InterestsTab;
const __TURBOPACK__default__export__ = InterestsTab;
var _c;
__turbopack_context__.k.register(_c, "InterestsTab");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_1135afb3._.js.map