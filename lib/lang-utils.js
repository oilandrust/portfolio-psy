/**
 * Language utility functions for Next.js
 */

/**
 * Get language from URL path
 * @param {string} pathname - Current pathname
 * @returns {string} Language code ('fr' or 'en')
 */
export function getLangFromPath(pathname) {
  const match = pathname.match(/^\/(fr|en)/);
  return match ? match[1] : 'fr';
}

/**
 * Get path without language prefix
 * @param {string} pathname - Current pathname
 * @returns {string} Path without language prefix
 */
export function getPathWithoutLang(pathname) {
  return pathname.replace(/^\/(fr|en)/, '') || '/about';
}

/**
 * Build path with language prefix
 * @param {string} lang - Language code
 * @param {string} path - Path without language prefix
 * @returns {string} Full path with language prefix
 */
export function buildLangPath(lang, path) {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `/${lang}${cleanPath}`;
}

