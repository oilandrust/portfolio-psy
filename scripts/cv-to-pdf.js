import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'http://localhost:3000';
const publicDir = path.join(__dirname, '../public');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

async function generateCVPDFForLanguage(lang) {
  let browser;
  
  try {
    console.log(`🚀 Starting Puppeteer for ${lang.toUpperCase()} CV...`);
    browser = await puppeteer.launch({
      headless: 'new',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote'
      ]
    });

    const page = await browser.newPage();
    
    // Set viewport for consistent rendering
    await page.setViewport({ width: 1200, height: 800 });
    
    // Navigate to deployed CV page
    const cvUrl = `${baseUrl}/${lang}/cv/`;
    
    console.log(`🌐 Navigating to ${cvUrl}...`);
    await page.goto(cvUrl, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    console.log('⏳ Waiting for content to load...');
    // Wait for content to load
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Try to wait for CV content
    try {
      await page.waitForSelector('.hero, .cv-section, [data-testid="cv-content"]', { 
        timeout: 10000 
      });
      console.log('✅ CV content found');
    } catch (selectorError) {
      console.log('⚠️ CV selector not found, proceeding anyway...');
    }

    // Add CSS for proper page margins and remove unwanted elements
    await page.evaluate(() => {
      // Remove language switcher
      const languageSwitcher = document.querySelector('.language-switcher');
      if (languageSwitcher) {
        languageSwitcher.remove();
      }
      
      // Remove fixed navigation buttons (Download PDF and Back to portfolio)
      const fixedButtons = document.querySelectorAll('[style*="position: fixed"]');
      fixedButtons.forEach(el => el.remove());
      
      // Also try to find buttons by their text content as fallback
      const allButtons = document.querySelectorAll('button, a.button');
      allButtons.forEach(button => {
        const text = button.textContent || button.innerText || '';
        if (text.includes('PDF') || text.includes('Télécharger') || 
            text.includes('Back') || text.includes('Retour')) {
          // Check if it's fixed positioned
          const style = window.getComputedStyle(button);
          if (style.position === 'fixed') {
            button.remove();
          }
        }
      });
      
      // Remove any hover effects
      const hoverElements = document.querySelectorAll('[onmouseover], [onmouseout]');
      hoverElements.forEach(el => {
        el.removeAttribute('onmouseover');
        el.removeAttribute('onmouseout');
      });
      
      // Remove all box shadows from elements
      const allElements = document.querySelectorAll('*');
      allElements.forEach(el => {
        // Remove any shadow-related classes or attributes
        el.classList.remove('shadow', 'box-shadow', 'drop-shadow');
      });
      
      // Specifically target the CV container
      const cvContainer = document.querySelector('div[style*="box-shadow"]') || 
                         document.querySelector('[style*="shadow"]') ||
                         document.querySelector('div[style*="0 0 20px"]');
      if (cvContainer) {
        cvContainer.style.boxShadow = 'none';
        cvContainer.style.border = 'none';
      }
    });

    // Inject CSS for page margins and hide fixed buttons
    await page.addStyleTag({
      content: `
        /* Hide navigation and language switcher */
        .language-switcher {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* Hide fixed positioned buttons/links in top-right (PDF and Back buttons) */
        button[style*="position: fixed"],
        button[style*="position:fixed"],
        a[style*="position: fixed"],
        a[style*="position:fixed"] {
          display: none !important;
          visibility: hidden !important;
        }
        
        /* Method 1: Using @page rules */
        @page :first {
          margin-top: 0.0in;
        }
        
        @page :not(:first) {
          margin-top: 1.7in;
        }      
      `
    });

    console.log('📄 Generating PDF...');
    
    // Generate PDF with appropriate filename
    const filename = lang === 'en' ? 'CV_Olivier_Rouiller_EN.pdf' : 'CV_Olivier_Rouiller.pdf';
    const outputPath = path.join(publicDir, filename);
    
    const pdfOptions = {
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.7in',
        right: '0',
        bottom: '0',
        left: '0'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true,
      scale: 1.0,
      landscape: false
    };

    await page.pdf(pdfOptions);
    
    console.log(`✅ PDF generated successfully: ${outputPath}`);
    
    // Get file size for confirmation
    const stats = fs.statSync(outputPath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 File size: ${fileSizeInMB} MB`);
    
    return outputPath;
    
  } catch (error) {
    console.error(`❌ Error generating PDF for ${lang}:`, error);
    
    // Take a screenshot for debugging if possible
    try {
      if (browser) {
        const pages = await browser.pages();
        if (pages.length > 0) {
          const page = pages[0];
          const screenshotPath = path.join(__dirname, `../debug-screenshot-${lang}.png`);
          await page.screenshot({ path: screenshotPath, fullPage: true });
          console.log(`🔍 Debug screenshot saved: ${screenshotPath}`);
        }
      }
    } catch (screenshotError) {
      console.log('Could not take screenshot:', screenshotError.message);
    }
    
    throw error;
  } finally {
    if (browser) {
      await browser.close();
    }
  }
}

async function generateCVPDF(lang = 'all') {
  const languages = lang === 'all' ? ['fr', 'en'] : [lang];
  
  for (const language of languages) {
    try {
      await generateCVPDFForLanguage(language);
    } catch (error) {
      console.error(`Failed to generate PDF for ${language}:`, error);
      throw error;
    }
  }
  
  console.log('🎉 All PDFs generated successfully!');
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  const lang = process.argv[2] || 'all';
  generateCVPDF(lang).catch(console.error);
}

export { generateCVPDF };
