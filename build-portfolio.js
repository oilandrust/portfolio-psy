import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Helper function to get paths for a language
function getPathsForLanguage(lang) {
  const langDir = lang === 'en' ? 'portfolio/en' : 'portfolio/fr';
  const interestsSubfolder = lang === 'en' ? 'Interests' : 'Intérêts';
  const experienceSubfolder = lang === 'en' ? 'Experience' : 'Expérience';
  const aboutSubfolder = lang === 'en' ? 'About' : 'À propos';
  const aboutFile = lang === 'en' ? 'About.md' : 'À propos.md';
  
  return {
    interestsDir: `${langDir}/${interestsSubfolder}`,
    experiencesDir: `${langDir}/${experienceSubfolder}`,
    readingsDir: `${langDir}/Lectures`,
    aboutFile: `${langDir}/${aboutSubfolder}/${aboutFile}`,
    mainAboutFile: `${langDir}/About.md`,
    quotesFile: `${langDir}/quotes.json`,
    formationsFile: `${langDir}/Formations/Formations.md`,
    cvFile: `${langDir}/CV.md`
  };
}
const sourceIconsDir = 'portfolio/icons';
const sourceProfileDir = 'portfolio/profile';
const sourceFavicon = 'portfolio/O.svg';

const outputDataDir = 'public/data';
const outputInterestsDir = 'public/data/interests';
function slugify(value) {
  return value
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function createUniqueSlug(preferredValue, fallbackValue, usedSlugs, prefix = 'item') {
  const baseValue = preferredValue || fallbackValue || `${prefix}`;
  let candidate = slugify(baseValue);

  if (!candidate) {
    candidate = `${prefix}`;
  }

  let uniqueCandidate = candidate;
  let counter = 2;

  while (usedSlugs.has(uniqueCandidate)) {
    uniqueCandidate = `${candidate}-${counter++}`;
  }

  usedSlugs.add(uniqueCandidate);
  return uniqueCandidate;
}

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
    
    
    let content = markdownBody;
    
    // Remove HTML comments (<!--- --->)
    content = content.replace(/<!---[\s\S]*?--->/g, '');
    
    // Remove Obsidian comments (%% text %%)
    content = content.replace(/%%[\s\S]*?%%/g, '');
    
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
          path: `/data/interests/${path.basename(interestPath)}/${file}`,
          thumbnail: `/data/interests/${path.basename(interestPath)}/${file}`,
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
            thumbnailPath = `/data/interests/${path.basename(interestPath)}/${thumbFile}`;
            break;
          }
        }

        media.push({
          type: 'video',
          path: `/data/interests/${path.basename(interestPath)}/${file}`,
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
function readQuotesJson(quotesFile) {
  try {
    if (!fs.existsSync(quotesFile)) {
      console.log(`⚠️  Quotes file not found: ${quotesFile}, using empty array`);
      return [];
    }
    
    const jsonContent = fs.readFileSync(quotesFile, 'utf8');
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

// Function to build portfolio for a specific language
function buildPortfolioForLanguage(lang, paths) {
  console.log(`\n🔍 Building ${lang.toUpperCase()} portfolio...`);

  // Read about data
  console.log('📄 Reading about data...');
  if (!fs.existsSync(paths.aboutFile)) {
    console.error(`❌ About file not found: ${paths.aboutFile}`);
    return null;
  }
  
  const profileInfoData = readMarkdownFile(paths.mainAboutFile);
  
  if (!profileInfoData) {
    console.error('❌ Failed to read about data');
    return null;
  }
  
  // Set default values if not found
  if (!profileInfoData.title) {
    profileInfoData.title = 'Olivier Rouiller';
  }
  if (!profileInfoData.subtitle) {
    profileInfoData.subtitle = lang === 'en' ? 'L3 Psychology Student' : 'Étudiant en L3 de Psychologie';
  }
  console.log(`  ✅ About loaded: ${profileInfoData.title}`);

  const profileData = readMarkdownFile(paths.aboutFile);
  if (!profileData) {
    console.error('❌ Failed to read about data');
    return null;
  }

  // Read interests data
  console.log('🔍 Scanning for interests...');
  if (!fs.existsSync(paths.interestsDir)) {
    console.error(`❌ Interests directory not found: ${paths.interestsDir}`);
    return null;
  }

  const interests = [];
  let interestId = 1;
  const usedInterestSlugs = new Set();

  try {
    const interestFiles = fs.readdirSync(paths.interestsDir);

    interestFiles.forEach(file => {
      if (file.endsWith('.md')) {
        console.log(`📄 Processing interest: ${file}`);

        const markdownPath = path.join(paths.interestsDir, file);
        const interestData = readMarkdownFile(markdownPath);
        
        // Skip if published is explicitly false (handle both string and boolean)
        if (interestData && (interestData.published === "false" || interestData.published === false)) {
          console.log(`  ⏭️  Skipped (published: false): ${file}`);
          return;
        }
        
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
            const thumbnailSrc = path.join(paths.interestsDir, interestData.thumbnail);
            if (fs.existsSync(thumbnailSrc)) {
              const thumbnailDest = path.join(outputInterestPath, path.basename(interestData.thumbnail));
              fs.copyFileSync(thumbnailSrc, thumbnailDest);
              thumbnailPath = `/data/interests/${interestName}/${path.basename(interestData.thumbnail)}`;
              console.log(`  📸 Copied thumbnail: ${interestData.thumbnail}`);
            } else {
              console.warn(`  ⚠️  Thumbnail not found: ${interestData.thumbnail}`);
            }
          }

          // Build the interest object
          const resolvedId = interestData.id || interestId++;
          const interestTitle = interestData.title || interestName;
          const interestSlug = createUniqueSlug(interestData.slug, interestTitle, usedInterestSlugs, 'interest');

          const interest = {
            id: resolvedId,
            slug: interestSlug,
            title: interestTitle,
            subtitle: interestData.subtitle || null,
            description: interestData.content || '',
            thumbnail: thumbnailPath,
          };

          interests.push(interest);
          console.log(`  ✅ Added: ${interestName} (slug: ${interestSlug})`);
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

    if (fs.existsSync(paths.experiencesDir)) {
      try {
        const experienceFiles = fs.readdirSync(paths.experiencesDir);
        
        experienceFiles.forEach(file => {
          if (file.endsWith('.md')) {
            const experiencePath = path.join(paths.experiencesDir, file);
            console.log(`📄 Processing experience: ${file}`);

            const experienceData = readMarkdownFile(experiencePath);
            
            // Skip if published is explicitly false (handle both string and boolean)
            if (experienceData && (experienceData.published === "false" || experienceData.published === false)) {
              console.log(`  ⏭️  Skipped (published: false): ${file}`);
              return;
            }
            
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
    const quotes = readQuotesJson(paths.quotesFile);
    console.log(`  ✅ Loaded ${quotes.length} quotes`);

    // Read formations data
    console.log('🎓 Reading formations data...');
    let formations = '';
    if (fs.existsSync(paths.formationsFile)) {
      const formationsData = readMarkdownFile(paths.formationsFile);
      formations = formationsData ? formationsData.content : '';
    } else {
      console.log(`⚠️  Formations file not found: ${paths.formationsFile}, using empty string`);
    }
    console.log(`  ✅ Loaded formations content`);

    // Read CV data
    console.log('📄 Reading CV data...');
    let cv = '';
    if (fs.existsSync(paths.cvFile)) {
      const cvData = readMarkdownFile(paths.cvFile);
      cv = cvData ? cvData.content : '';
    } else {
      console.log(`⚠️  CV file not found: ${paths.cvFile}, using empty string`);
    }
    console.log(`  ✅ Loaded CV content`);

    // Read readings data
    console.log('📚 Reading readings data...');
    const readings = [];
    const usedReadingSlugs = new Set();
    
    if (fs.existsSync(paths.readingsDir)) {
      try {
        const readingFiles = fs.readdirSync(paths.readingsDir);
        
        readingFiles.forEach(file => {
          if (file.endsWith('.md')) {
            const readingPath = path.join(paths.readingsDir, file);
            console.log(`📄 Processing reading: ${file}`);

            const readingData = readMarkdownFile(readingPath);
            
            // Skip if published is explicitly false (handle both string and boolean)
            if (readingData && (readingData.published === "false" || readingData.published === false)) {
              console.log(`  ⏭️  Skipped (published: false): ${file}`);
              return;
            }
            
            if (readingData) {
              // Handle thumbnail image
              let thumbnailPath = null;
              if (readingData.thumbnail) {
                const thumbnailSrcPath = path.join(paths.readingsDir, readingData.thumbnail);
                const thumbnailDestPath = path.join(outputReadingsCoversDir, path.basename(readingData.thumbnail));
                
                if (fs.existsSync(thumbnailSrcPath)) {
                  fs.copyFileSync(thumbnailSrcPath, thumbnailDestPath);
                  thumbnailPath = `/data/readings/covers/${path.basename(readingData.thumbnail)}`;
                  console.log(`  📸 Copied thumbnail: ${readingData.thumbnail}`);
                } else {
                  console.warn(`  ⚠️  Thumbnail not found: ${readingData.thumbnail}`);
                }
              }

              const readingTitle = readingData.title || path.basename(file, '.md');
              const readingId = readingData.id || 0;
              const readingSlug = createUniqueSlug(
                readingData.slug,
                readingTitle,
                usedReadingSlugs,
                'lecture'
              );

              const reading = {
                id: readingId,
                slug: readingSlug,
                title: readingTitle,
                author: readingData.author || '',
                description: readingData.content || '',
                thumbnail: thumbnailPath,
                // Add any other fields from front matter (excluding thumbnail and slug to avoid override)
                ...Object.fromEntries(
                  Object.entries(readingData).filter(
                    ([key]) => key !== 'thumbnail' && key !== 'slug'
                  )
                )
              };

              reading.slug = readingSlug;

              readings.push(reading);
              console.log(`  ✅ Added: ${reading.title} (slug: ${readingSlug})`);
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
        ...profileInfoData,
        about: profileData.content
      },
      quotes: quotes,
      interests: interests,
      experiences: experiences,
      formations: formations,
      cv: cv,
      readings: readings
    };

    console.log(`\n🎉 Successfully built ${lang} portfolio with ${interests.length} interests, ${experiences.length} experiences, ${readings.length} readings, ${quotes.length} quotes, formations, and CV!`);

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
    
    return portfolio;
  } catch (error) {
    console.error('❌ Error building portfolio.json:', error.message);
    return null;
  }
}

// Main function to build portfolio.json
function buildPortfolioJson() {
  console.log('🔍 Building bilingual portfolio...');

  // Create output directories
  console.log('📁 Creating output directories...');
  if (!fs.existsSync(outputDataDir)) {
    fs.mkdirSync(outputDataDir, { recursive: true });
  }

  // Copy static assets (shared between languages)
  console.log('📋 Copying static assets...');
  copyDirectory(sourceIconsDir, outputIconsDir);
  copyDirectory(sourceProfileDir, outputProfileDir);
  copyFile(sourceFavicon, 'public/O.svg');
  
  // Create readings covers directory
  if (!fs.existsSync(outputReadingsCoversDir)) {
    fs.mkdirSync(outputReadingsCoversDir, { recursive: true });
  }
  
  console.log('  ✅ Icons, profile images, and favicon copied');

  // Build French portfolio
  const frPaths = getPathsForLanguage('fr');
  const frPortfolio = buildPortfolioForLanguage('fr', frPaths);

  // Build English portfolio
  const enPaths = getPathsForLanguage('en');
  const enPortfolio = buildPortfolioForLanguage('en', enPaths);

  // Combine both languages into one portfolio object
  if (frPortfolio && enPortfolio) {
    const portfolio = {
      fr: frPortfolio,
      en: enPortfolio
    };

    // Write combined portfolio.json
    const outputPath = 'public/data/portfolio.json';
    fs.writeFileSync(outputPath, JSON.stringify(portfolio, null, 2));
    console.log(`\n🎉 Successfully created bilingual portfolio!`);
    console.log(`📄 Output: ${outputPath}`);
  } else {
    console.error('❌ Failed to build portfolio');
  }
}

// Run the build
buildPortfolioJson();
