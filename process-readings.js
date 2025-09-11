import fs from 'fs';
import path from 'path';
import { createWorker } from 'tesseract.js';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const readingsDir = 'portfolio/readings';
const outputFile = 'public/data/readings.json';

// Function to extract title and author from OCR text
function extractBookInfo(text) {
  // Clean up the text
  const cleanText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Common patterns for book titles and authors
  // This is a simplified approach - you might need to adjust based on the actual text patterns
  const lines = text.split('\n').filter(line => line.trim().length > 0);
  
  let title = '';
  let author = '';
  
  // Look for common patterns
  // Usually the first significant line is the title
  // And the second significant line is often the author
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Skip very short lines or common words
    if (line.length < 3 || 
        ['by', 'par', 'de', 'the', 'le', 'la', 'les', 'un', 'une', 'des'].includes(line.toLowerCase())) {
      continue;
    }
    
    if (!title && line.length > 5) {
      title = line;
    } else if (!author && line.length > 5 && line !== title) {
      author = line;
      break;
    }
  }
  
  // If we couldn't extract properly, use the first two significant lines
  if (!title && lines.length > 0) {
    title = lines[0].trim();
  }
  if (!author && lines.length > 1) {
    author = lines[1].trim();
  }
  
  return { title, author };
}

// Function to process a single image
async function processImage(imagePath) {
  console.log(`Processing: ${imagePath}`);
  
  try {
    const worker = await createWorker('eng+fra'); // English and French
    const { data: { text } } = await worker.recognize(imagePath);
    await worker.terminate();
    
    const bookInfo = extractBookInfo(text);
    
    return {
      filename: path.basename(imagePath),
      path: `/portfolio-psy/data/readings/${path.basename(imagePath)}`,
      title: bookInfo.title || 'Unknown Title',
      author: bookInfo.author || 'Unknown Author',
      rawText: text.substring(0, 200) + '...' // First 200 chars for debugging
    };
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
    return {
      filename: path.basename(imagePath),
      path: `/portfolio-psy/data/readings/${path.basename(imagePath)}`,
      title: 'Unknown Title',
      author: 'Unknown Author',
      error: error.message
    };
  }
}

// Main function to process all readings
async function processReadings() {
  console.log('🔍 Processing readings images...');
  
  if (!fs.existsSync(readingsDir)) {
    console.error(`❌ Readings directory not found: ${readingsDir}`);
    return;
  }
  
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const files = fs.readdirSync(readingsDir);
  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase();
    return imageExtensions.includes(ext);
  });
  
  console.log(`📚 Found ${imageFiles.length} reading images`);
  
  const readings = [];
  
  // Process images in batches to avoid overwhelming the system
  const batchSize = 3;
  for (let i = 0; i < imageFiles.length; i += batchSize) {
    const batch = imageFiles.slice(i, i + batchSize);
    const batchPromises = batch.map(file => 
      processImage(path.join(readingsDir, file))
    );
    
    const batchResults = await Promise.all(batchPromises);
    readings.push(...batchResults);
    
    console.log(`✅ Processed batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(imageFiles.length/batchSize)}`);
  }
  
  // Create output directory if it doesn't exist
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }
  
  // Write the readings.json file
  fs.writeFileSync(outputFile, JSON.stringify(readings, null, 2));
  
  console.log(`\n🎉 Successfully processed ${readings.length} readings!`);
  console.log(`📄 Output: ${outputFile}`);
  
  // Display summary
  readings.forEach((reading, index) => {
    console.log(`  ${index + 1}. ${reading.title} - ${reading.author}`);
  });
}

// Run the processing
processReadings().catch(console.error);
