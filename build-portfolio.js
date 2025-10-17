import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const sourceInterestsDir = 'portfolio/Intérêts';
const sourceExperiencesDir = 'portfolio/Experiences';
const sourceReadingsDir = 'portfolio/Lectures';
const sourceAboutFile = 'portfolio/À propos/À propos.md';
const sourceQuotesFile = 'portfolio/quotes.json';
const sourceFormationsFile = 'portfolio/Formations/Formations.md';
const sourceCVFile = 'portfolio/CV.md';
const sourceIconsDir = 'portfolio/icons';
const sourceProfileDir = 'portfolio/profile';
const sourceFavicon = 'portfolio/O.svg';

const outputDataDir = 'public/data';
const outputInterestsDir = 'public/data/interests';
const outputReadingsDir = 'public/data/readings';
const outputReadingsCoversDir = 'public/data/readings/covers';
const outputIconsDir = 'public/data/icons';
const outputProfileDir = 'public/data/profile';

// Unified function to read and parse any markdown file with optional YAML front matter
function readMarkdownFile(markdownPath) {

  try {
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    
    // Split content by YAML front matter
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdownContent.match(frontMatterRegex);
    
    let frontMatter = {};
    let markdownBody = markdownContent;
    
    if (match) {
      // Has YAML front matter
      const yamlContent = match[1];
      markdownBody = match[2];
      
      // Parse YAML front matter
      frontMatter = yaml.load(yamlContent) || {};
    }
    // If no front matter, use the entire content as markdown body
    
    let result = { ...frontMatter };
    
    // Extract title from first # heading
    const titleMatch = markdownBody.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : null;
    
    // Remove image references like ![[image.jpg]]
    const cleanTitle = title ? title.replace(/!\[\[.*?\]\]/g, '').trim() : null;
    
    if (cleanTitle) {
      result.title = cleanTitle;
    }
    
    // Extract subtitle from first ## heading
    const subtitleMatch = markdownBody.match(/^##\s+(.+)$/m);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : null;
    
    if (subtitle) {
      result.subtitle = subtitle;
    }
    
    // Process content - remove extracted headings
    let content = markdownBody;
    
    // Remove the first # heading line if it exists
    content = content.replace(/^#\s+.*$/m, '');
    // Remove the first ## heading line if it exists
    content = content.replace(/^##\s+.*$/m, '');
    
    // Clean up extra newlines
    content = content.replace(/^\n+/, '').trim();
    
    // Set content field
    result.content = content;
    
    return result;
  } catch (error) {
    console.error(
      `❌ Error reading markdown file ${markdownPath}:`,
      error.message
    );
    return null;
  }
}

// Function to scan for interest media (images and videos)
function scanInterestMedia(interestPath) {
  const media = [];
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];

  try {
    const files = fs.readdirSync(interestPath);
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.parse(file).name;
      
      if (imageExtensions.includes(ext)) {
        media.push({
          type: 'image',
          path: `/portfolio-psy/data/interests/${path.basename(interestPath)}/${file}`,
          thumbnail: `/portfolio-psy/data/interests/${path.basename(interestPath)}/${file}`,
          name: baseName,
        });
      } else if (videoExtensions.includes(ext)) {
        // Look for a thumbnail image with similar name
        const thumbnailExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        let thumbnailPath = null;

        // Try to find a matching thumbnail
        for (const thumbExt of thumbnailExtensions) {
          const thumbFile = `${baseName}-thumb${thumbExt}`;
          const thumbPath = path.join(interestPath, thumbFile);
          if (fs.existsSync(thumbPath)) {
            thumbnailPath = `/portfolio-psy/data/interests/${path.basename(interestPath)}/${thumbFile}`;
            break;
          }
        }

        media.push({
          type: 'video',
          path: `/portfolio-psy/data/interests/${path.basename(interestPath)}/${file}`,
          thumbnail: thumbnailPath,
          name: baseName,
        });
      }
    });
    
    // Sort media by name
    media.sort((a, b) => a.name.localeCompare(b.name));
    
  } catch (error) {
    console.error(`❌ Error scanning media in ${interestPath}:`, error.message);
  }

  return media;
}


// Function to read quotes JSON file
function readQuotesJson() {
  try {
    if (!fs.existsSync(sourceQuotesFile)) {
      console.log(`⚠️  Quotes file not found: ${sourceQuotesFile}, using empty array`);
      return [];
    }
    
    const jsonContent = fs.readFileSync(sourceQuotesFile, 'utf8');
    return JSON.parse(jsonContent);
  } catch (error) {
    console.error(`❌ Error reading quotes.json:`, error.message);
    return [];
  }
}


// Function to copy directory recursively
function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source directory not found: ${src}`);
    return;
  }
  
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const items = fs.readdirSync(src);
  items.forEach(item => {
    const srcPath = path.join(src, item);
    const destPath = path.join(dest, item);
    const stat = fs.statSync(srcPath);
    
    if (stat.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

// Function to copy file
function copyFile(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`⚠️  Source file not found: ${src}`);
    return;
  }
  
  const destDir = path.dirname(dest);
  if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir, { recursive: true });
  }
  
  fs.copyFileSync(src, dest);
}

// Main function to build portfolio.json
function buildPortfolioJson() {
  console.log('🔍 Building portfolio...');

  // Create output directories
  console.log('📁 Creating output directories...');
  if (!fs.existsSync(outputDataDir)) {
    fs.mkdirSync(outputDataDir, { recursive: true });
  }

  // Copy static assets
  console.log('📋 Copying static assets...');
  copyDirectory(sourceIconsDir, outputIconsDir);
  copyDirectory(sourceProfileDir, outputProfileDir);
  copyFile(sourceFavicon, 'public/O.svg');
  
  // Create readings covers directory
  if (!fs.existsSync(outputReadingsCoversDir)) {
    fs.mkdirSync(outputReadingsCoversDir, { recursive: true });
  }
  
  console.log('  ✅ Icons, profile images, and favicon copied');

  // Read about data
  console.log('📄 Reading about data...');
  if (!fs.existsSync(sourceAboutFile)) {
    console.error(`❌ About file not found: ${sourceAboutFile}`);
    return;
  }
  
  const profileData = readMarkdownFile(sourceAboutFile);
  
  if (!profileData) {
    console.error('❌ Failed to read about data');
    return;
  }
  
  // Set default values if not found
  if (!profileData.title) {
    profileData.title = 'Olivier Rouiller';
  }
  if (!profileData.subtitle) {
    profileData.subtitle = 'Étudiant en L3 de Psychologie';
  }
  console.log(`  ✅ About loaded: ${profileData.title}`);

  // Read interests data
  console.log('🔍 Scanning for interests...');
  if (!fs.existsSync(sourceInterestsDir)) {
    console.error(`❌ Interests directory not found: ${sourceInterestsDir}`);
    return;
  }

  const interests = [];
  let interestId = 1;

  try {
    const interestFiles = fs.readdirSync(sourceInterestsDir);

    interestFiles.forEach(file => {
      if (file.endsWith('.md')) {
        console.log(`📄 Processing interest: ${file}`);

        const markdownPath = path.join(sourceInterestsDir, file);
        const interestData = readMarkdownFile(markdownPath);
        
        if (interestData) {
          // Create output directory for this interest
          const interestName = path.basename(file, '.md');
          const outputInterestPath = path.join(outputInterestsDir, interestName);
          if (!fs.existsSync(outputInterestPath)) {
            fs.mkdirSync(outputInterestPath, { recursive: true });
          }

          // Copy thumbnail if specified
          let thumbnailPath = null;
          if (interestData.thumbnail) {
            const thumbnailSrc = path.join(sourceInterestsDir, interestData.thumbnail);
            if (fs.existsSync(thumbnailSrc)) {
              const thumbnailDest = path.join(outputInterestPath, path.basename(interestData.thumbnail));
              fs.copyFileSync(thumbnailSrc, thumbnailDest);
              thumbnailPath = `/portfolio-psy/data/interests/${interestName}/${path.basename(interestData.thumbnail)}`;
              console.log(`  📸 Copied thumbnail: ${interestData.thumbnail}`);
            } else {
              console.warn(`  ⚠️  Thumbnail not found: ${interestData.thumbnail}`);
            }
          }

          // Build the interest object
          const interest = {
            id: interestData.id || interestId++,
            title: interestName, // Use filename as title
            subtitle: interestData.subtitle || null,
            description: interestData.content || '',
            thumbnail: thumbnailPath,
          };

          interests.push(interest);
          console.log(`  ✅ Added: ${interestName}`);
        }
      }
    });

    // Sort interests by ID
    interests.sort((a, b) => (a.id || 0) - (b.id || 0));
    console.log(`  ✅ Sorted ${interests.length} interests by ID`);

    // Read experiences data
    console.log('🔍 Scanning for experiences...');
    const experiences = [];
    let experienceId = 1;

    if (fs.existsSync(sourceExperiencesDir)) {
      try {
        const experienceFiles = fs.readdirSync(sourceExperiencesDir);
        
        experienceFiles.forEach(file => {
          if (file.endsWith('.md')) {
            const experiencePath = path.join(sourceExperiencesDir, file);
            console.log(`📄 Processing experience: ${file}`);

            const experienceData = readMarkdownFile(experiencePath);
            if (experienceData) {
              const experience = {
                id: experienceId++,
                title: experienceData.title,
                subtitle: experienceData.subtitle || '',
                start_date: experienceData.start_date || null,
                end_date: experienceData.end_date || null,
                description: experienceData.content || ''
              };

              experiences.push(experience);
              console.log(`  ✅ Added: ${experienceData.title}`);
            }
          }
        });
      } catch (error) {
        console.error('❌ Error processing experiences:', error.message);
      }
    } else {
      console.log('⚠️  Experiences directory not found, skipping...');
    }

    // Read quotes data
    console.log('📖 Reading quotes data...');
    const quotes = readQuotesJson();
    console.log(`  ✅ Loaded ${quotes.length} quotes`);

    // Read formations data
    console.log('🎓 Reading formations data...');
    let formations = '';
    if (fs.existsSync(sourceFormationsFile)) {
      const formationsData = readMarkdownFile(sourceFormationsFile);
      formations = formationsData ? formationsData.content : '';
    } else {
      console.log(`⚠️  Formations file not found: ${sourceFormationsFile}, using empty string`);
    }
    console.log(`  ✅ Loaded formations content`);

    // Read CV data
    console.log('📄 Reading CV data...');
    let cv = '';
    if (fs.existsSync(sourceCVFile)) {
      const cvData = readMarkdownFile(sourceCVFile);
      cv = cvData ? cvData.content : '';
    } else {
      console.log(`⚠️  CV file not found: ${sourceCVFile}, using empty string`);
    }
    console.log(`  ✅ Loaded CV content`);

    // Read readings data
    console.log('📚 Reading readings data...');
    const readings = [];
    
    if (fs.existsSync(sourceReadingsDir)) {
      try {
        const readingFiles = fs.readdirSync(sourceReadingsDir);
        
        readingFiles.forEach(file => {
          if (file.endsWith('.md')) {
            const readingPath = path.join(sourceReadingsDir, file);
            console.log(`📄 Processing reading: ${file}`);

            const readingData = readMarkdownFile(readingPath);
            if (readingData) {
              // Handle cover image
              let coverPath = null;
              if (readingData.cover) {
                const coverSrcPath = path.join(sourceReadingsDir, 'covers', readingData.cover);
                const coverDestPath = path.join(outputReadingsCoversDir, readingData.cover);
                
                if (fs.existsSync(coverSrcPath)) {
                  fs.copyFileSync(coverSrcPath, coverDestPath);
                  coverPath = `/portfolio-psy/data/readings/covers/${readingData.cover}`;
                  console.log(`  📸 Copied cover: ${readingData.cover}`);
                } else {
                  console.warn(`  ⚠️  Cover not found: ${readingData.cover}`);
                }
              }

              const reading = {
                id: readingData.id || 0,
                title: readingData.title || path.basename(file, '.md'),
                author: readingData.author || '',
                description: readingData.content || '',
                cover: coverPath,
                // Add any other fields from front matter (excluding cover to avoid override)
                ...Object.fromEntries(
                  Object.entries(readingData).filter(([key]) => key !== 'cover')
                )
              };

              readings.push(reading);
              console.log(`  ✅ Added: ${reading.title}`);
            }
          }
        });
        
        // Sort readings by ID
        readings.sort((a, b) => (a.id || 0) - (b.id || 0));
        console.log(`  ✅ Loaded ${readings.length} readings`);
        
      } catch (error) {
        console.error('❌ Error processing readings:', error.message);
      }
    } else {
      console.log('⚠️  Readings directory not found, skipping...');
    }

    // Build portfolio object
    const portfolio = {
      profile: {
        ...profileData,
        about: profileData.content
      },
      quotes: quotes,
      interests: interests,
      experiences: experiences,
      formations: formations,
      cv: cv,
      readings: readings
    };

    // Write portfolio.json
    const outputPath = 'public/data/portfolio.json';
    fs.writeFileSync(outputPath, JSON.stringify(portfolio, null, 2));

    console.log(`\n🎉 Successfully built portfolio with ${interests.length} interests, ${experiences.length} experiences, ${readings.length} readings, ${quotes.length} quotes, formations, and CV!`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`📁 Data copied to: public/data/`);

    // Display summary
    console.log('\n📚 Interests:');
    interests.forEach(interest => {
      const thumbnailText = interest.thumbnail ? '(with thumbnail)' : '(no thumbnail)';
      console.log(`  • ${interest.title} ${thumbnailText}`);
    });

    console.log('\n💼 Experiences:');
    experiences.forEach(experience => {
      const dateRange = experience.end_date 
        ? `${experience.start_date} - ${experience.end_date}`
        : experience.start_date || 'Date non spécifiée';
      console.log(`  • ${experience.title} (${dateRange})`);
    });

    console.log('\n📖 Readings:');
    readings.forEach(reading => {
      console.log(`  • ${reading.title} by ${reading.author} (ID: ${reading.id})`);
    });

    console.log('\n💬 Quotes:');
    quotes.forEach(quote => {
      console.log(`  • "${quote.text}" - ${quote.author}`);
    });
  } catch (error) {
    console.error('❌ Error building portfolio.json:', error.message);
  }
}

// Run the build
buildPortfolioJson();
