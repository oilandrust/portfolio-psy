import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function generateCVPDF() {
  let browser;
  
  try {
    console.log('🚀 Starting Puppeteer...');
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
    
    // Navigate to your CV page
    const cvUrl = 'http://localhost:5173/#/cv';
    
    console.log('🌐 Navigating to CV page...');
    await page.goto(cvUrl, { 
      waitUntil: 'networkidle0',
      timeout: 30000 
    });

    console.log('⏳ Waiting for content to load...');
    // Wait for content to load using Promise-based delay
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
      // Remove fixed buttons and navigation
      const fixedElements = document.querySelectorAll('[style*="position: fixed"]');
      fixedElements.forEach(el => el.remove());
      
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
      const cvContainer = document.querySelector('[style*="box-shadow"]') || 
                         document.querySelector('[style*="shadow"]') ||
                         document.querySelector('div[style*="0 0 20px"]');
      if (cvContainer) {
        cvContainer.style.boxShadow = 'none';
        cvContainer.style.border = 'none';
      }
    });

    // Inject CSS for page margins and remove shadows
    await page.addStyleTag({
      content: `
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
    
    // Generate PDF
    const outputPath = path.join(__dirname, '../CV_Olivier_Rouiller.pdf');
    
    const pdfOptions = {
      path: outputPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.7in',      // 1 inch top margin for new pages
        right: '0',
        bottom: '0',
        left: '0'
      },
      displayHeaderFooter: false,
      preferCSSPageSize: true,  // This allows @page CSS to override margins
      scale: 1.0,
      landscape: false
    };

    await page.pdf(pdfOptions);
    
    console.log(`✅ PDF generated successfully: ${outputPath}`);
    
    // Get file size for confirmation
    const stats = fs.statSync(outputPath);
    const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
    console.log(`📊 File size: ${fileSizeInMB} MB`);
    
  } catch (error) {
    console.error('❌ Error generating PDF:', error);
    
    // Take a screenshot for debugging if possible
    try {
      if (browser) {
        const pages = await browser.pages();
        if (pages.length > 0) {
          const page = pages[0];
          const screenshotPath = path.join(__dirname, '../debug-screenshot.png');
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


// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  generateCVPDF().catch(console.error);
}

export { generateCVPDF };
