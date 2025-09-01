import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Projects directory
const projectsDir = 'public/projects';

// Function to read and parse a project.yml file
function readProjectYaml(projectPath) {
  try {
    const yamlContent = fs.readFileSync(path.join(projectPath, 'project.yml'), 'utf8');
    return yaml.load(yamlContent);
  } catch (error) {
    console.error(`❌ Error reading project.yml in ${projectPath}:`, error.message);
    return null;
  }
}

// Function to scan for project images
function scanProjectImages(projectPath) {
  const images = [];
  const allowedExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
  
  try {
    const files = fs.readdirSync(projectPath);
    files.forEach(file => {
      const ext = path.extname(file).toLowerCase();
      if (allowedExtensions.includes(ext)) {
        images.push({
          path: `/portfolio/projects/${path.basename(projectPath)}/${file}`,
          thumbnail: `/portfolio/projects/${path.basename(projectPath)}/${file}`
        });
      }
    });
  } catch (error) {
    console.error(`❌ Error scanning images in ${projectPath}:`, error.message);
  }
  
  return images;
}

// Function to process tech string and find icons
function processTechString(techString) {
  if (!techString || typeof techString !== 'string') {
    return [];
  }
  
  const techNames = techString.split(',').map(t => t.trim()).filter(t => t);
  const techArray = [];
  
  techNames.forEach(techName => {
    // Look for icon in the icons directory
    const iconPath = `/portfolio/icons/${techName.toLowerCase()}.svg`;
    const iconExists = fs.existsSync(path.join('public', iconPath.replace('/portfolio/', '')));
    
    techArray.push({
      name: techName,
      icon: iconExists ? iconPath : null
    });
  });
  
  return techArray;
}

// Main function to build projects.json
function buildProjectsJson() {
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
          // Scan for images in the project folder
          const projectImages = scanProjectImages(projectPath);
          
          // Build the project object
          const project = {
            id: projectId++,
            title: projectData.title,
            subtitle: projectData.subtitle || null,
            description: projectData.description || '',
            start_date: projectData.start_date || '',
            end_date: projectData.end_date || '',
            tech: processTechString(projectData.tech),
            images: projectImages,
            image_layout: projectData.image_layout || 'grid', // Default to grid
            github_url: projectData.github_url || null,
            live_url: projectData.live_url || null
          };
          
          projects.push(project);
          console.log(`  ✅ Added: ${projectData.title}`);
          
          if (projectImages.length > 0) {
            console.log(`  📷 Found ${projectImages.length} images`);
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
    
    // Write projects.json
    const outputPath = 'public/projects.json';
    fs.writeFileSync(outputPath, JSON.stringify(projects, null, 2));
    
    console.log(`\n🎉 Successfully built ${projects.length} projects!`);
    console.log(`📄 Output: ${outputPath}`);
    
    // Display summary
    projects.forEach(project => {
      console.log(`  • ${project.title} (${project.images.length} images)`);
    });
    
  } catch (error) {
    console.error('❌ Error building projects.json:', error.message);
  }
}

// Run the build
buildProjectsJson();
