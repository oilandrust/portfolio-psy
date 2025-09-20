import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const sourceInterestsDir = 'portfolio/interests';
const sourceExperiencesDir = 'portfolio/experiences';
const sourceReadingsDir = 'portfolio/readings';
const sourceAboutFile = 'portfolio/About.md';
const sourceQuotesFile = 'portfolio/quotes.json';
const sourceFormationsFile = 'portfolio/Formations.md';
const sourceIconsDir = 'portfolio/icons';
const sourceProfileDir = 'portfolio/profile';
const sourceFavicon = 'portfolio/O.svg';

const outputDataDir = 'public/data';
const outputInterestsDir = 'public/data/interests';
const outputReadingsDir = 'public/data/readings';
const outputReadingsCoversDir = 'public/data/readings/covers';
const outputIconsDir = 'public/data/icons';
const outputProfileDir = 'public/data/profile';

// Function to read and parse a markdown file with YAML front matter
function readInterestMarkdown(markdownPath) {
  try {
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    
    // Split content by YAML front matter
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdownContent.match(frontMatterRegex);
    
    if (!match) {
      console.error(`❌ No YAML front matter found in ${markdownPath}`);
      return null;
    }
    
    const yamlContent = match[1];
    const markdownBody = match[2];
    
    // Parse YAML front matter
    const frontMatter = yaml.load(yamlContent);
    
    // Extract subtitle from ## heading
    const subtitleMatch = markdownBody.match(/^##\s+(.+)$/m);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : null;
    
    // Remove the ## heading from content if it exists
    const contentWithoutSubtitle = subtitle 
      ? markdownBody.replace(/^##\s+.*$/m, '').trim()
      : markdownBody.trim();
    
    return {
      ...frontMatter,
      content: contentWithoutSubtitle,
      subtitle: subtitle
    };
  } catch (error) {
    console.error(
      `❌ Error reading markdown file ${markdownPath}:`,
      error.message
    );
    return null;
  }
}

// Function to read and parse an experience Markdown file
function readExperienceMarkdown(experiencePath) {
  try {
    const markdownContent = fs.readFileSync(experiencePath, 'utf8');
    
    // Split content by YAML front matter
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdownContent.match(frontMatterRegex);
    
    if (!match) {
      console.error(`❌ No YAML front matter found in ${experiencePath}`);
      return null;
    }
    
    const yamlContent = match[1];
    const markdownBody = match[2];
    
    // Parse YAML front matter
    const frontMatter = yaml.load(yamlContent);
    
    // Extract title from first # heading
    const titleMatch = markdownBody.match(/^#\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1].trim() : 'Experience';
    
    // Extract subtitle from first ## heading
    const subtitleMatch = markdownBody.match(/^##\s+(.+)$/m);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';
    
    // Extract content after the first ## heading
    let description = markdownBody;
    
    // Remove the first # heading line
    description = description.replace(/^#\s+.*$/m, '');
    
    // Remove the first ## heading line
    description = description.replace(/^##\s+.*$/m, '');
    
    // Clean up extra newlines
    description = description.replace(/^\n+/, '').trim();
    
    return {
      ...frontMatter,
      title: title,
      subtitle: subtitle,
      description: description
    };
  } catch (error) {
    console.error(
      `❌ Error reading experience file ${experiencePath}:`,
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

// Function to read and parse a reading markdown file
function readReadingMarkdown(markdownPath) {
  try {
    const markdownContent = fs.readFileSync(markdownPath, 'utf8');
    
    // Split content by YAML front matter
    const frontMatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = markdownContent.match(frontMatterRegex);
    
    if (!match) {
      console.error(`❌ No YAML front matter found in ${markdownPath}`);
      return null;
    }
    
    const yamlContent = match[1];
    const markdownBody = match[2];
    
    // Parse YAML front matter
    const frontMatter = yaml.load(yamlContent);
    
    // Extract the content after front matter (description/review)
    let description = markdownBody.trim();
    
    // Remove the main heading if it exists
    description = description.replace(/^#\s+.*$/m, '');
    
    // Clean up extra newlines
    description = description.replace(/^\n+/, '').trim();
    
    return {
      ...frontMatter,
      description: description
    };
  } catch (error) {
    console.error(`❌ Error reading reading file ${markdownPath}:`, error.message);
    return null;
  }
}

// Function to read and parse About.md
function readAboutMarkdown() {
  try {
    if (!fs.existsSync(sourceAboutFile)) {
      console.error(`❌ About file not found: ${sourceAboutFile}`);
      return null;
    }
    
    const markdownContent = fs.readFileSync(sourceAboutFile, 'utf8');
    
    // Extract title from first # heading, removing image references
    const titleMatch = markdownContent.match(/^#\s+(.+)$/m);
    let title = titleMatch ? titleMatch[1].trim() : 'Olivier Rouiller';
    // Remove image references like ![[image.jpg]]
    title = title.replace(/!\[\[.*?\]\]/g, '').trim();
    
    // Extract subtitle from first ## heading
    const subtitleMatch = markdownContent.match(/^##\s+(.+)$/m);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : 'Étudiant en L3 de Psychologie';
    
    // Extract content after the first ## heading, removing the # and ## headings
    let about = markdownContent;
    
    // Remove the first # heading line
    about = about.replace(/^#\s+.*$/m, '');
    
    // Remove the first ## heading line
    about = about.replace(/^##\s+.*$/m, '');
    
    // Clean up extra newlines
    about = about.replace(/^\n+/, '').trim();
    
    return {
      title: title,
      subtitle: subtitle,
      about: about
    };
  } catch (error) {
    console.error(`❌ Error reading About.md:`, error.message);
    return null;
  }
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

// Function to read formations markdown file
function readFormationsMarkdown() {
  try {
    if (!fs.existsSync(sourceFormationsFile)) {
      console.log(`⚠️  Formations file not found: ${sourceFormationsFile}, using empty string`);
      return '';
    }
    
    const markdownContent = fs.readFileSync(sourceFormationsFile, 'utf8');
    return markdownContent.trim();
  } catch (error) {
    console.error(`❌ Error reading Formations.md:`, error.message);
    return '';
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
  const profileData = readAboutMarkdown();
  if (!profileData) {
    console.error('❌ Failed to read about data');
    return;
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
        const interestData = readInterestMarkdown(markdownPath);
        
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
            id: interestId++,
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

            const experienceData = readExperienceMarkdown(experiencePath);
            if (experienceData) {
              const experience = {
                id: experienceId++,
                title: experienceData.title,
                subtitle: experienceData.subtitle || '',
                start_date: experienceData.start_date || null,
                end_date: experienceData.end_date || null,
                description: experienceData.description || ''
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
    const formations = readFormationsMarkdown();
    console.log(`  ✅ Loaded formations content`);

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

            const readingData = readReadingMarkdown(readingPath);
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
                description: readingData.description || '',
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
      profile: profileData,
      quotes: quotes,
      interests: interests,
      experiences: experiences,
      formations: formations,
      readings: readings
    };

    // Write portfolio.json
    const outputPath = 'public/data/portfolio.json';
    fs.writeFileSync(outputPath, JSON.stringify(portfolio, null, 2));

    console.log(`\n🎉 Successfully built portfolio with ${interests.length} interests, ${experiences.length} experiences, ${readings.length} readings, ${quotes.length} quotes, and formations!`);
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
