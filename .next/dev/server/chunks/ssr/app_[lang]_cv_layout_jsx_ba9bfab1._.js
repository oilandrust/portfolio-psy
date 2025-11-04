module.exports = [
"[project]/app/[lang]/cv/layout.jsx [app-rsc] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>CVLayout,
    "generateMetadata",
    ()=>generateMetadata,
    "generateStaticParams",
    ()=>generateStaticParams
]);
async function generateStaticParams() {
    return [
        {
            lang: 'fr'
        },
        {
            lang: 'en'
        }
    ];
}
async function generateMetadata({ params }) {
    const { lang } = await params;
    if (lang === 'fr') {
        return {
            title: 'CV - Olivier Rouiller',
            description: 'CV complet d\'Olivier Rouiller, étudiant en L3 de psychologie et psychopraticien en formation',
            canonical: 'https://www.olivier-psy.fr/fr/cv',
            openGraph: {
                title: 'CV - Olivier Rouiller',
                description: 'CV complet - Olivier Rouiller',
                locale: 'fr_FR',
                url: 'https://www.olivier-psy.fr/fr/cv'
            }
        };
    }
    return {
        title: 'CV - Olivier Rouiller'
    };
}
function CVLayout({ children }) {
    return children;
}
}),
];

//# sourceMappingURL=app_%5Blang%5D_cv_layout_jsx_ba9bfab1._.js.map