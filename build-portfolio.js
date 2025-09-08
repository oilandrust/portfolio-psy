import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const sourceProjectsDir = 'portfolio/projects';
const sourceProfileFile = 'portfolio/profile.yml';
const sourceIconsDir = 'portfolio/icons';
const sourceProfileDir = 'portfolio/profile';
const sourceFavicon = 'portfolio/O.svg';

const outputDataDir = 'public/data';
const outputProjectsDir = 'public/data/projects';
const outputIconsDir = 'public/data/icons';
const outputProfileDir = 'public/data/profile';

// Function to read and parse a project.yml file
function readProjectYaml(projectPath) {
  try {
    const yamlContent = fs.readFileSync(
      path.join(projectPath, 'project.yml'),
      'utf8'
    );
    return yaml.load(yamlContent);
  } catch (error) {
    console.error(
      `❌ Error reading project.yml in ${projectPath}:`,
      error.message
    );
    return null;
  }
}

// Function to scan for project media (images and videos)
function scanProjectMedia(projectPath) {
  const media = [];
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  const videoExtensions = ['.mp4', '.webm', '.mov', '.avi', '.mkv'];

  try {
    const files = fs.readdirSync(projectPath);
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      const baseName = path.parse(file).name;
      
      if (imageExtensions.includes(ext)) {
        media.push({
          type: 'image',
          path: `/portfolio/data/projects/${path.basename(projectPath)}/${file}`,
          thumbnail: `/portfolio/data/projects/${path.basename(projectPath)}/${file}`,
          name: baseName,
        });
      } else if (videoExtensions.includes(ext)) {
        // Look for a thumbnail image with similar name
        const thumbnailExtensions = ['.jpg', '.jpeg', '.png', '.webp'];
        let thumbnailPath = null;

        // Try to find a matching thumbnail
        for (const thumbExt of thumbnailExtensions) {
          const thumbFile = `${baseName}-thumb${thumbExt}`;
          const thumbPath = path.join(projectPath, thumbFile);
          if (fs.existsSync(thumbPath)) {
            thumbnailPath = `/portfolio/data/projects/${path.basename(projectPath)}/${thumbFile}`;
            break;
          }
        }

        media.push({
          type: 'video',
          path: `/portfolio/data/projects/${path.basename(projectPath)}/${file}`,
          thumbnail: thumbnailPath,
          name: baseName,
        });
      }
    });
    
    // Sort media by name
    media.sort((a, b) => a.name.localeCompare(b.name));
    
  } catch (error) {
    console.error(`❌ Error scanning media in ${projectPath}:`, error.message);
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
    let iconPath = `/portfolio/data/icons/${techName.toLowerCase()}.svg`;
    let iconExists = fs.existsSync(
      path.join('public', iconPath.replace('/portfolio/data/', 'data/'))
    );

    if (!iconExists) {
      // Try PNG if SVG doesn't exist
      iconPath = `/portfolio/data/icons/${techName.toLowerCase()}.png`;
      iconExists = fs.existsSync(
        path.join('public', iconPath.replace('/portfolio/data/', 'data/'))
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

  // Read projects data
  console.log('🔍 Scanning for projects...');
  if (!fs.existsSync(sourceProjectsDir)) {
    console.error(`❌ Projects directory not found: ${sourceProjectsDir}`);
    return;
  }

  const projects = [];
  let projectId = 1;

  try {
    const projectFolders = fs.readdirSync(sourceProjectsDir);

    projectFolders.forEach(folder => {
      const projectPath = path.join(sourceProjectsDir, folder);
      const stats = fs.statSync(projectPath);

      if (stats.isDirectory()) {
        console.log(`📁 Processing project: ${folder}`);

        const projectData = readProjectYaml(projectPath);
        if (projectData) {
          // Copy project media to output directory (excluding .yml files)
          const outputProjectPath = path.join(outputProjectsDir, folder);
          if (!fs.existsSync(outputProjectPath)) {
            fs.mkdirSync(outputProjectPath, { recursive: true });
          }
          
          // Copy all files except .yml files
          const projectFiles = fs.readdirSync(projectPath);
          projectFiles.forEach(file => {
            if (!file.endsWith('.yml')) {
              const srcFile = path.join(projectPath, file);
              const destFile = path.join(outputProjectPath, file);
              fs.copyFileSync(srcFile, destFile);
            }
          });

          // Scan for media (images and videos) in the project folder
          const projectMedia = scanProjectMedia(projectPath);

          // Build the project object
          const project = {
            id: projectId++,
            title: projectData.title,
            subtitle: projectData.subtitle || null,
            description: projectData.description || '',
            start_date: projectData.start_date || '',
            end_date: projectData.end_date || '',
            tech: processTechString(projectData.tech),
            media: projectMedia,
            image_layout: projectData.image_layout || 'grid', // Default to grid
            github_url: projectData.github_url || null,
            live_url: projectData.live_url || null,
          };

          projects.push(project);
          console.log(`  ✅ Added: ${projectData.title}`);

          if (projectMedia.length > 0) {
            const imageCount = projectMedia.filter(m => m.type === 'image').length;
            const videoCount = projectMedia.filter(m => m.type === 'video').length;
            const mediaSummary = [];
            if (imageCount > 0) mediaSummary.push(`${imageCount} images`);
            if (videoCount > 0) mediaSummary.push(`${videoCount} videos`);
            console.log(`  📷🎥 Found ${mediaSummary.join(', ')}`);
          }
        }
      }
    });

    // Sort projects by end_date (most recent first)
    projects.sort((a, b) => {
      if (!a.end_date && !b.end_date) return 0;
      if (!a.end_date) return 1;
      if (!b.end_date) return -1;
      return new Date(b.end_date) - new Date(a.end_date);
    });

    // Build portfolio object
    const portfolio = {
      profile: profileData,
      projects: projects
    };

    // Write portfolio.json
    const outputPath = 'public/data/portfolio.json';
    fs.writeFileSync(outputPath, JSON.stringify(portfolio, null, 2));

    console.log(`\n🎉 Successfully built portfolio with ${projects.length} projects!`);
    console.log(`📄 Output: ${outputPath}`);
    console.log(`📁 Data copied to: public/data/`);

    // Display summary
    projects.forEach(project => {
      const imageCount = project.media.filter(m => m.type === 'image').length;
      const videoCount = project.media.filter(m => m.type === 'video').length;
      const mediaSummary = [];
      if (imageCount > 0) mediaSummary.push(`${imageCount} images`);
      if (videoCount > 0) mediaSummary.push(`${videoCount} videos`);
      const mediaText =
        mediaSummary.length > 0 ? `(${mediaSummary.join(', ')})` : '(no media)';
      console.log(`  • ${project.title} ${mediaText}`);
    });
  } catch (error) {
    console.error('❌ Error building portfolio.json:', error.message);
  }
}

// Run the build
buildPortfolioJson();
