import fs from 'fs';
import path from 'path';

/**
 * Load portfolio data from JSON file at build time
 * @returns {Object} Portfolio data with fr and en properties
 */
export function getPortfolioData() {
  const dataPath = path.join(process.cwd(), 'public/data/portfolio.json');
  
  if (!fs.existsSync(dataPath)) {
    console.warn(`Portfolio data not found at ${dataPath}`);
    return { fr: {}, en: {} };
  }
  
  const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  return data;
}

