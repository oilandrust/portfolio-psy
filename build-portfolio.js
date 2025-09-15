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
const sourceIconsDir = 'portfolio/icons';
const sourceProfileDir = 'portfolio/profile';
const sourceFavicon = 'portfolio/O.svg';

const outputDataDir = 'public/data';
const outputInterestsDir = 'public/data/interests';
const outputIconsDir = 'public/data/icons';
const outputProfileDir = 'public/data/profile';

// Function to read and parse an interest.yml file
function readInterestYaml(interestPath) {
  try {
    const yamlContent = fs.readFileSync(
      path.join(interestPath, 'interest.yml'),
      'utf8'
    );
    return yaml.load(yamlContent);
  } catch (error) {
    console.error(
      `❌ Error reading interest.yml in ${interestPath}:`,
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
    const interestFolders = fs.readdirSync(sourceInterestsDir);

    interestFolders.forEach(folder => {
      const interestPath = path.join(sourceInterestsDir, folder);
      const stats = fs.statSync(interestPath);

      if (stats.isDirectory()) {
        console.log(`📁 Processing interest: ${folder}`);

        const interestData = readInterestYaml(interestPath);
        if (interestData) {
          // Copy interest media to output directory (excluding .yml files)
          const outputInterestPath = path.join(outputInterestsDir, folder);
          if (!fs.existsSync(outputInterestPath)) {
            fs.mkdirSync(outputInterestPath, { recursive: true });
          }
          
          // Copy all files except .yml files
          const interestFiles = fs.readdirSync(interestPath);
          interestFiles.forEach(file => {
            if (!file.endsWith('.yml')) {
              const srcFile = path.join(interestPath, file);
              const destFile = path.join(outputInterestPath, file);
              fs.copyFileSync(srcFile, destFile);
            }
          });

          // Scan for media (images and videos) in the interest folder
          const interestMedia = scanInterestMedia(interestPath);

          // Build the interest object
          const interest = {
            id: interestId++,
            title: interestData.title,
            description: interestData.description || '',
            media: interestMedia,
          };

          interests.push(interest);
          console.log(`  ✅ Added: ${interestData.title}`);

          if (interestMedia.length > 0) {
            const imageCount = interestMedia.filter(m => m.type === 'image').length;
            const videoCount = interestMedia.filter(m => m.type === 'video').length;
            const mediaSummary = [];
            if (imageCount > 0) mediaSummary.push(`${imageCount} images`);
            if (videoCount > 0) mediaSummary.push(`${videoCount} videos`);
            console.log(`  📷🎥 Found ${mediaSummary.join(', ')}`);
          }
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

    // Build portfolio object
    const portfolio = {
      profile: profileData,
      interests: interests,
      experiences: experiences
    };

    // Write portfolio.json
    const outputPath = 'public/data/portfolio.json';
    fs.writeFileSync(outputPath, JSON.stringify(portfolio, null, 2));

    console.log(`\n🎉 Successfully built portfolio with ${interests.length} interests and ${experiences.length} experiences!`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`📁 Data copied to: public/data/`);

    // Display summary
    console.log('\n📚 Interests:');
    interests.forEach(interest => {
      const imageCount = interest.media.filter(m => m.type === 'image').length;
      const videoCount = interest.media.filter(m => m.type === 'video').length;
      const mediaSummary = [];
      if (imageCount > 0) mediaSummary.push(`${imageCount} images`);
      if (videoCount > 0) mediaSummary.push(`${videoCount} videos`);
      const mediaText =
        mediaSummary.length > 0 ? `(${mediaSummary.join(', ')})` : '(no media)';
      console.log(`  • ${interest.title} ${mediaText}`);
    });

    console.log('\n💼 Experiences:');
    experiences.forEach(experience => {
      const dateRange = experience.end_date 
        ? `${experience.start_date} - ${experience.end_date}`
        : experience.start_date || 'Date non spécifiée';
      console.log(`  • ${experience.title} (${dateRange})`);
    });
  } catch (error) {
    console.error('❌ Error building portfolio.json:', error.message);
  }
}

// Run the build
buildPortfolioJson();
