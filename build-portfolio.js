import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories
const projectsDir = 'public/projects';
const profileFile = 'public/profile.yml';

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
          path: `/portfolio/projects/${path.basename(projectPath)}/${file}`,
          thumbnail: `/portfolio/projects/${path.basename(projectPath)}/${file}`,
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
            thumbnailPath = `/portfolio/projects/${path.basename(projectPath)}/${thumbFile}`;
            break;
          }
        }

        media.push({
          type: 'video',
          path: `/portfolio/projects/${path.basename(projectPath)}/${file}`,
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
    let iconPath = `/portfolio/icons/${techName.toLowerCase()}.svg`;
    let iconExists = fs.existsSync(
      path.join('public', iconPath.replace('/portfolio/', ''))
    );

    if (!iconExists) {
      // Try PNG if SVG doesn't exist
      iconPath = `/portfolio/icons/${techName.toLowerCase()}.png`;
      iconExists = fs.existsSync(
        path.join('public', iconPath.replace('/portfolio/', ''))
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
    if (!fs.existsSync(profileFile)) {
      console.error(`❌ Profile file not found: ${profileFile}`);
      return null;
    }
    
    const yamlContent = fs.readFileSync(profileFile, 'utf8');
    return yaml.load(yamlContent);
  } catch (error) {
    console.error(`❌ Error reading profile.yml:`, error.message);
    return null;
  }
}

// Main function to build portfolio.json
function buildPortfolioJson() {
  console.log('🔍 Building portfolio...');

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
  if (!fs.existsSync(projectsDir)) {
    console.error(`❌ Projects directory not found: ${projectsDir}`);
    return;
  }

  const projects = [];
  let projectId = 1;

  try {
    const projectFolders = fs.readdirSync(projectsDir);

    projectFolders.forEach(folder => {
      const projectPath = path.join(projectsDir, folder);
      const stats = fs.statSync(projectPath);

      if (stats.isDirectory()) {
        console.log(`📁 Processing project: ${folder}`);

        const projectData = readProjectYaml(projectPath);
        if (projectData) {
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
    const outputPath = 'public/portfolio.json';
    fs.writeFileSync(outputPath, JSON.stringify(portfolio, null, 2));

    console.log(`\n🎉 Successfully built portfolio with ${projects.length} projects!`);
    console.log(`📄 Output: ${outputPath}`);

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
