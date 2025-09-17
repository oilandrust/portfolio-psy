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
const sourceProfileFile = 'portfolio/profile.yml';
const sourceQuotesFile = 'portfolio/quotes.json';
const sourceIconsDir = 'portfolio/icons';
const sourceProfileDir = 'portfolio/profile';
const sourceFavicon = 'portfolio/O.svg';

const outputDataDir = 'public/data';
const outputInterestsDir = 'public/data/interests';
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
    
    return {
      ...frontMatter,
      content: markdownBody.trim()
    };
  } catch (error) {
    console.error(
      `❌ Error reading markdown file ${markdownPath}:`,
      error.message
    );
    return null;
  }
}

// Function to read and parse an experience YAML file
function readExperienceYaml(experiencePath) {
  try {
    const yamlContent = fs.readFileSync(experiencePath, 'utf8');
    return yaml.load(yamlContent);
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

// Function to process tech string and find icons
function processTechString(techString) {
  if (!techString || typeof techString !== 'string') {
    return [];
  }

  const techNames = techString
    .split(',')
    .map(t => t.trim())
    .filter(t => t);
  const techArray = [];

  techNames.forEach(techName => {
    // Look for icon in the icons directory (try SVG first, then PNG)
    let iconPath = `/portfolio-psy/data/icons/${techName.toLowerCase()}.svg`;
    let iconExists = fs.existsSync(
      path.join('public', iconPath.replace('/portfolio-psy/data/', 'data/'))
    );

    if (!iconExists) {
      // Try PNG if SVG doesn't exist
      iconPath = `/portfolio-psy/data/icons/${techName.toLowerCase()}.png`;
      iconExists = fs.existsSync(
        path.join('public', iconPath.replace('/portfolio-psy/data/', 'data/'))
      );
    }

    techArray.push({
      name: techName,
      icon: iconExists ? iconPath : null,
    });
  });

  return techArray;
}

// Function to read and parse profile.yml
function readProfileYaml() {
  try {
    if (!fs.existsSync(sourceProfileFile)) {
      console.error(`❌ Profile file not found: ${sourceProfileFile}`);
      return null;
    }
    
    const yamlContent = fs.readFileSync(sourceProfileFile, 'utf8');
    return yaml.load(yamlContent);
  } catch (error) {
    console.error(`❌ Error reading profile.yml:`, error.message);
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
  console.log('  ✅ Icons, profile images, and favicon copied');

  // Read profile data
  console.log('📄 Reading profile data...');
  const profileData = readProfileYaml();
  if (!profileData) {
    console.error('❌ Failed to read profile data');
    return;
  }
  console.log(`  ✅ Profile loaded: ${profileData.title}`);

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
          if (file.endsWith('.yml')) {
            const experiencePath = path.join(sourceExperiencesDir, file);
            console.log(`📁 Processing experience: ${file}`);
            
            const experienceData = readExperienceYaml(experiencePath);
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

    // Build portfolio object
    const portfolio = {
      profile: profileData,
      quotes: quotes,
      interests: interests,
      experiences: experiences
    };

    // Write portfolio.json
    const outputPath = 'public/data/portfolio.json';
    fs.writeFileSync(outputPath, JSON.stringify(portfolio, null, 2));

    console.log(`\n🎉 Successfully built portfolio with ${interests.length} interests, ${experiences.length} experiences, and ${quotes.length} quotes!`);
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
