module.exports = [
"[project]/components/Tabs.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
;
const Tabs = ({ children, currentLang })=>{
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usePathname"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "tabs-container",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "tabs-header",
                children: tabs.map((tab, index)=>{
                    const label = currentLang === 'fr' ? tab.labelFr : tab.labelEn;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
const __TURBOPACK__default__export__ = Tabs;
}),
"[project]/components/LecturesTab.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
'use client';
;
;
const LecturesTab = ({ readings = [] })=>{
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Lectures"
            }, void 0, false, {
                fileName: "[project]/components/LecturesTab.jsx",
                lineNumber: 24,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            sortedReadings.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "readings-grid",
                style: {
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1rem'
                },
                children: sortedReadings.map((reading, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
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
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Aucune lecture disponible."
            }, void 0, false, {
                fileName: "[project]/components/LecturesTab.jsx",
                lineNumber: 88,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0)),
            sortedReadings.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
const __TURBOPACK__default__export__ = LecturesTab;
}),
"[project]/config/constants.js [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Application constants and configuration
// API and Data Fetching
__turbopack_context__.s([
    "CONTACT_CONFIG",
    ()=>CONTACT_CONFIG,
    "DEV_CONFIG",
    ()=>DEV_CONFIG,
    "ERROR_MESSAGES",
    ()=>ERROR_MESSAGES,
    "FETCH_STRATEGIES",
    ()=>FETCH_STRATEGIES,
    "LOADING_STATES",
    ()=>LOADING_STATES,
    "MEDIA_CONFIG",
    ()=>MEDIA_CONFIG,
    "PROJECT_CONFIG",
    ()=>PROJECT_CONFIG,
    "STYLES",
    ()=>STYLES,
    "UI_CONFIG",
    ()=>UI_CONFIG
]);
const FETCH_STRATEGIES = [
    './data/portfolio.json',
    '/data/portfolio.json',
    'data/portfolio.json'
];
const MEDIA_CONFIG = {
    IMAGE_EXTENSIONS: [
        '.jpg',
        '.jpeg',
        '.png',
        '.gif',
        '.webp',
        '.svg'
    ],
    VIDEO_EXTENSIONS: [
        '.mp4',
        '.webm',
        '.mov',
        '.avi',
        '.mkv'
    ],
    THUMBNAIL_EXTENSIONS: [
        '.jpg',
        '.jpeg',
        '.png',
        '.webp'
    ],
    MAX_IMAGE_SIZE: 5 * 1024 * 1024,
    MAX_VIDEO_SIZE: 100 * 1024 * 1024
};
const UI_CONFIG = {
    BREAKPOINTS: {
        MOBILE: 768,
        TABLET: 1024,
        DESKTOP: 1200
    },
    ANIMATION_DURATION: 200,
    DEBOUNCE_DELAY: 300,
    CAROUSEL_AUTOPLAY_DELAY: 5000
};
const STYLES = {
    COLORS: {
        PRIMARY: '#2563eb',
        PRIMARY_HOVER: '#1d4ed8',
        SUCCESS: '#059669',
        SUCCESS_HOVER: '#047857',
        ERROR: '#e74c3c',
        WARNING: '#f59e0b',
        MUTED: '#6b7280',
        MUTED_BORDER: '#e2e8f0'
    },
    SPACING: {
        XS: '0.25rem',
        SM: '0.5rem',
        MD: '1rem',
        LG: '1.5rem',
        XL: '2rem',
        XXL: '3rem'
    },
    BORDER_RADIUS: {
        SM: '4px',
        MD: '6px',
        LG: '8px',
        XL: '12px'
    },
    SHADOWS: {
        SM: '0 1px 3px rgba(0, 0, 0, 0.1)',
        MD: '0 4px 12px rgba(0, 0, 0, 0.15)',
        LG: '0 8px 24px rgba(0, 0, 0, 0.2)'
    }
};
const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    FETCH_PROJECTS_FAILED: 'Failed to load portfolio. Please try refreshing the page.',
    FETCH_INTERESTS_FAILED: 'Failed to load interests. Please try refreshing the page.',
    MEDIA_LOAD_ERROR: 'Failed to load media. The file may be corrupted or missing.',
    GENERIC_ERROR: 'An unexpected error occurred. Please try again.',
    FALLBACK_MESSAGES: {
        PROJECTS: 'Unable to load projects. Showing fallback content.',
        INTERESTS: 'Unable to load interests. Showing fallback content.',
        MEDIA: 'Media failed to load. Please try again later.',
        COMPONENT: 'This component encountered an error. Please refresh the page.'
    }
};
const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
};
const PROJECT_CONFIG = {
    DEFAULT_IMAGE_LAYOUT: 'grid',
    MAX_PROJECTS_PER_PAGE: 50,
    SORT_ORDER: 'desc',
    DATE_FORMAT: 'YYYY-MM-DD'
};
const CONTACT_CONFIG = {
    EMAIL: 'o.rouiller@gmail.com',
    SUBJECT_PREFIX: 'Portfolio Contact: '
};
const DEV_CONFIG = {
    SHOW_ERROR_DETAILS: typeof process !== 'undefined' && ("TURBOPACK compile-time value", "development") === 'development',
    LOG_LEVEL: typeof process !== 'undefined' && ("TURBOPACK compile-time value", "development") === 'development' ? 'debug' : 'error',
    ENABLE_PERFORMANCE_MONITORING: typeof process !== 'undefined' && ("TURBOPACK compile-time value", "development") === 'development'
};
}),
"[project]/components/Contact.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/constants.js [app-ssr] (ecmascript)");
'use client';
;
;
const Contact = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        id: "contact",
        className: "section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Get In Touch"
            }, void 0, false, {
                fileName: "[project]/components/Contact.jsx",
                lineNumber: 8,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                style: {
                    textAlign: 'center',
                    marginBottom: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLES"].SPACING.XL
                },
                children: "You're welcome to contact me if something sparked your curiosity."
            }, void 0, false, {
                fileName: "[project]/components/Contact.jsx",
                lineNumber: 9,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    textAlign: 'center'
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "outline",
                    onClick: ()=>window.location.href = `mailto:${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["CONTACT_CONFIG"].EMAIL}`,
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
const __TURBOPACK__default__export__ = Contact;
}),
"[project]/components/InterestCard.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/config/constants.js [app-ssr] (ecmascript)");
'use client';
;
;
const InterestCard = ({ interest, onClick })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "interest-card",
        style: {
            border: `1px solid ${__TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLES"].COLORS.MUTED_BORDER}`,
            borderRadius: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLES"].BORDER_RADIUS.LG,
            padding: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLES"].SPACING.LG,
            boxShadow: __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLES"].SHADOWS.SM,
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
                e.target.style.boxShadow = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLES"].SHADOWS.MD;
            }
        },
        onMouseLeave: (e)=>{
            if (e.target === e.currentTarget) {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = __TURBOPACK__imported__module__$5b$project$5d2f$config$2f$constants$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["STYLES"].SHADOWS.SM;
            }
        },
        children: [
            interest.thumbnail && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    flex: 1,
                    minWidth: 0
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
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
                    (interest.subtitle || interest.description) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
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
const __TURBOPACK__default__export__ = InterestCard;
}),
"[project]/components/InterestsGrid.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterestCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InterestCard.jsx [app-ssr] (ecmascript)");
'use client';
;
;
;
const InterestsGrid = ({ interests })=>{
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRouter"])();
    const params = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useParams"])();
    const currentLang = params?.lang || 'fr';
    const handleInterestClick = (interest)=>{
        router.push(`/${currentLang}/interests/${interest.id}`);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "section",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
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
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
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
                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        flex: 1,
                                        display: 'flex',
                                        flexDirection: 'column'
                                    },
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterestCard$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
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
const __TURBOPACK__default__export__ = InterestsGrid;
}),
"[project]/components/InterestsTab.jsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterestsGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/InterestsGrid.jsx [app-ssr] (ecmascript)");
'use client';
;
;
const InterestsTab = ({ interests })=>{
    // Always show the grid - detail pages are separate routes
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$InterestsGrid$2e$jsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"], {
        interests: interests
    }, void 0, false, {
        fileName: "[project]/components/InterestsTab.jsx",
        lineNumber: 7,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
const __TURBOPACK__default__export__ = InterestsTab;
}),
];

//# sourceMappingURL=_1d35b274._.js.map