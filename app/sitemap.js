import { getPortfolioData } from '../lib/portfolio';

export const dynamic = 'force-static';

export default function sitemap() {
  const baseUrl = 'https://www.olivier-psy.fr';
  const languages = ['fr', 'en'];
  const currentDate = new Date().toISOString();
  
  const portfolio = getPortfolioData();
  
  // Main pages (without dynamic params)
  const mainPages = [
    { path: 'about', priority: 0.9 },
    { path: 'interests', priority: 0.8 },
    { path: 'lectures', priority: 0.8 },
    { path: 'formations', priority: 0.8 },
    { path: 'experience', priority: 0.8 },
    { path: 'contact', priority: 0.7 },
    { path: 'cv', priority: 0.7 },
  ];
  
  const urls = [];
  
  // Add homepage redirects (these redirect to /about)
  languages.forEach(lang => {
    urls.push({
      url: `${baseUrl}/${lang}/`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 1.0,
    });
  });
  
  // Add main pages for each language
  languages.forEach(lang => {
    mainPages.forEach(page => {
      urls.push({
        url: `${baseUrl}/${lang}/${page.path}/`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: page.priority,
      });
    });
  });
  
  // Add interest detail pages
  languages.forEach(lang => {
    const interests = portfolio[lang]?.interests || [];
    interests.forEach(interest => {
      urls.push({
        url: `${baseUrl}/${lang}/interests/${interest.id}/`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });
  
  // Add reading detail pages
  languages.forEach(lang => {
    const readings = portfolio[lang]?.readings || [];
    readings.forEach(reading => {
      urls.push({
        url: `${baseUrl}/${lang}/lectures/${reading.id}/`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.6,
      });
    });
  });
  
  return urls;
}

