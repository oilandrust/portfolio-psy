import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = join(__dirname, 'public', 'icons');
    // Create directory if it doesn't exist
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Keep original filename
    cb(null, file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Only allow image files
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'), false);
    }
  }
});

// Static file serving moved to end of file to avoid conflicts with API routes

// Check if dist folder exists, if not, serve a simple message
const distPath = join(__dirname, 'dist');
const indexPath = join(distPath, 'index.html');

if (fs.existsSync(indexPath)) {
  app.use(express.static(distPath));
  console.log('✅ Serving built tool from dist folder');
} else {
  console.log('⚠️  dist folder not found. Tool frontend needs to be built or run in dev mode.');
  console.log('💡 Run "npm run build" in the tools folder to build the frontend');
  console.log('💡 Or run "npm run dev:full" to start both frontend and backend');
  
  // Serve a simple message instead of the built app
  app.get('*', (req, res) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Portfolio Project Manager</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 40px; line-height: 1.6; }
            .container { max-width: 600px; margin: 0 auto; }
            .warning { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 5px; margin: 20px 0; }
            .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; margin: 20px 0; }
            code { background: #f8f9fa; padding: 2px 6px; border-radius: 3px; }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>🚀 Portfolio Project Manager</h1>
            
            <div class="warning">
              <strong>⚠️  Frontend not built</strong><br>
              The tool's frontend hasn't been built yet.
            </div>
            
            <h2>🔧 How to fix this:</h2>
            
            <h3>Option 1: Build the frontend</h3>
            <p>In the <code>tools</code> folder, run:</p>
            <pre><code>npm run build</code></pre>
            
            <h3>Option 2: Run in development mode</h3>
            <p>In the <code>tools</code> folder, run:</p>
            <pre><code>npm run dev:full</code></pre>
            <p>This will start both the backend server and the development frontend.</p>
            
            <h3>Option 3: Use the launcher script</h3>
            <p>From the main portfolio directory, run:</p>
            <pre><code>npm run dev:both</code></pre>
            
            <div class="success">
              <strong>✅ API is working!</strong><br>
              The backend server is running and ready to serve projects.
            </div>
            
            <h2>📊 Current Status</h2>
            <ul>
              <li>✅ Backend server: Running on port ${PORT}</li>
              <li>✅ Database: Ready</li>
              <li>✅ API endpoints: Available</li>
              <li>❌ Frontend: Not built</li>
            </ul>
            
            <h2>🔗 API Endpoints</h2>
            <ul>
              <li><code>GET /api/projects</code> - Get all projects</li>
              <li><code>POST /api/projects</code> - Create new project</li>
              <li><code>PUT /api/projects/:id</code> - Update project</li>
              <li><code>DELETE /api/projects/:id</code> - Delete project</li>
            </ul>
          </div>
        </body>
      </html>
    `);
  });
}

// Initialize SQLite database
const db = new Database(join(__dirname, '..', 'projects.db'));

// Migrate existing technologies table if it has timestamp fields
const migrateTechnologiesTable = () => {
  try {
    // Check if the old table structure exists (with timestamp fields)
    const tableInfo = db.prepare("PRAGMA table_info(technologies)").all();
    const hasTimestampFields = tableInfo.some(col => col.name === 'created_at' || col.name === 'updated_at');
    
    if (hasTimestampFields) {
      console.log('🔄 Migrating technologies table to remove timestamp fields...');
      
      // Create new table with updated schema
      db.exec(`
        CREATE TABLE technologies_new (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          name TEXT UNIQUE NOT NULL,
          icon_path TEXT NOT NULL,
          icon_type TEXT NOT NULL
        )
      `);
      
      // Copy data from old table to new table
      db.exec(`
        INSERT INTO technologies_new (id, name, icon_path, icon_type)
        SELECT id, name, icon_path, icon_type FROM technologies
      `);
      
      // Drop old table and rename new one
      db.exec('DROP TABLE technologies');
      db.exec('ALTER TABLE technologies_new RENAME TO technologies');
      
      console.log('✅ Technologies table migration completed');
    }
  } catch (error) {
    console.error('Error during technologies table migration:', error);
  }
};

// Run migration
migrateTechnologiesTable();

// Function to export projects to JSON
const exportProjectsToJson = () => {
  try {
    // Sort by end_date DESC (most recent first), then by created_at DESC as fallback
    const projects = db.prepare(`
      SELECT * FROM projects 
      ORDER BY 
        CASE 
          WHEN end_date IS NOT NULL THEN end_date 
          ELSE created_at 
        END DESC,
        created_at DESC
    `).all();
    
    // Get all technologies for icon mapping
    const technologies = db.prepare('SELECT * FROM technologies').all();
    const techMap = new Map(technologies.map(tech => [tech.name.toLowerCase(), tech]));
    
    const projectsWithTechArray = projects.map(project => {
      const techArray = project.tech ? project.tech.split(',') : [];
      
      // Map each technology to include icon information
      const techWithIcons = techArray.map(techName => {
        const techNameLower = techName.trim().toLowerCase();
        const techData = techMap.get(techNameLower);
        
        if (techData) {
          return {
            name: techName.trim(),
            icon: techData.icon_path,
            iconType: techData.icon_type
          };
        } else {
          return {
            name: techName.trim(),
            icon: null,
            iconType: null
          };
        }
      });
      
      return {
        ...project,
        tech: techWithIcons
      };
    });
    
    const jsonPath = join(__dirname, '..', 'public', 'projects.json');
    fs.writeFileSync(jsonPath, JSON.stringify(projectsWithTechArray, null, 2));
    console.log(`Projects exported to ${jsonPath}`);
  } catch (error) {
    console.error('Error exporting projects to JSON:', error);
  }
};

// Create projects table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS projects (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    description TEXT,
    image TEXT,
    tech TEXT,
    start_date DATE,
    end_date DATE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Create technologies table if it doesn't exist
db.exec(`
  CREATE TABLE IF NOT EXISTS technologies (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT UNIQUE NOT NULL,
    icon_path TEXT NOT NULL,
    icon_type TEXT NOT NULL
  )
`);

// Migrate existing database if needed
try {
  // Check if we need to migrate from the old schema
  const tableInfo = db.prepare("PRAGMA table_info(projects)").all();
  const hasOldSchema = tableInfo.some(col => 
    (col.name === 'description' || col.name === 'image' || col.name === 'tech') && 
    col.notnull === 1
  );
  
  if (hasOldSchema) {
    console.log('🔄 Migrating database schema...');
    
    // Create new table with updated schema
    db.exec(`
      CREATE TABLE projects_new (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        image TEXT,
        tech TEXT,
        start_date DATE,
        end_date DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `);
    
    // Copy data from old table to new table
    db.exec(`
      INSERT INTO projects_new (id, title, description, image, tech, start_date, end_date, created_at, updated_at)
      SELECT id, title, description, image, tech, start_date, end_date, created_at, updated_at FROM projects
    `);
    
    // Drop old table and rename new table
    db.exec('DROP TABLE projects');
    db.exec('ALTER TABLE projects_new RENAME TO projects');
    
    console.log('✅ Database migration completed successfully');
  }
} catch (error) {
  console.log('ℹ️  No migration needed or migration completed already');
}

// Insert initial technologies if table is empty
const techCount = db.prepare('SELECT COUNT(*) as count FROM technologies').get();
if (techCount.count === 0) {
  const insertTech = db.prepare(`
    INSERT INTO technologies (name, icon_path, icon_type) 
    VALUES (?, ?, ?)
  `);
  
  const initialTechnologies = [
    ['bash', '/portfolio/icons/bash.svg', 'svg'],
    ['c#', '/portfolio/icons/c#.svg', 'svg'],
    ['c++', '/portfolio/icons/c++.svg', 'svg'],
    ['c', '/portfolio/icons/c.svg', 'svg'],
    ['dart', '/portfolio/icons/dart.svg', 'svg'],
    ['go', '/portfolio/icons/go.svg', 'svg'],
    ['haskell', '/portfolio/icons/haskell.svg', 'svg'],
    ['java', '/portfolio/icons/java.svg', 'svg'],
    ['javascript', '/portfolio/icons/javascript.svg', 'svg'],
    ['kotlin', '/portfolio/icons/kotlin.svg', 'svg'],
    ['php', '/portfolio/icons/php.png', 'png'],
    ['python', '/portfolio/icons/python.svg', 'svg'],
    ['ruby', '/portfolio/icons/ruby.svg', 'svg'],
    ['rust', '/portfolio/icons/rust.svg', 'svg'],
    ['typescript', '/portfolio/icons/typescript.svg', 'svg']
  ];
  
  initialTechnologies.forEach(tech => insertTech.run(tech));
  console.log('✅ Initial technologies inserted');
}

// Insert initial data if table is empty
const count = db.prepare('SELECT COUNT(*) as count FROM projects').get();
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO projects (title, description, image, tech, start_date, end_date) 
    VALUES (?, ?, ?, ?, ?, ?)
  `);
  
  const initialProjects = [
    [
      'E-Commerce Platform',
      'A full-stack e-commerce application built with React, Node.js, and MongoDB.',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      'React,Node.js,MongoDB,Express',
      '2024-01-15',
      '2024-06-30'
    ],
    [
      'Task Management App',
      'A collaborative task management tool with real-time updates and team features.',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop',
      'React,Firebase,Tailwind CSS',
      '2024-03-01',
      '2024-08-15'
    ],
    [
      'Portfolio Website',
      'A modern, responsive portfolio website showcasing my work and skills.',
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop',
      'React,Vite,Pico CSS',
      '2024-07-01',
      '2024-08-24'
    ]
  ];
  
  initialProjects.forEach(project => insert.run(project));
  
  // Export initial projects to JSON
  exportProjectsToJson();
}

// API Routes

// Get all technologies
app.get('/api/technologies', (req, res) => {
  try {
    const technologies = db.prepare('SELECT * FROM technologies ORDER BY name').all();
    res.json(technologies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new technology
app.post('/api/technologies', (req, res) => {
  try {
    const { name, icon_path, icon_type } = req.body;
    
    if (!name || !icon_path || !icon_type) {
      return res.status(400).json({ error: 'Name, icon_path, and icon_type are required' });
    }
    
    const result = db.prepare('INSERT INTO technologies (name, icon_path, icon_type) VALUES (?, ?, ?)').run(name, icon_path, icon_type);
    
    res.status(201).json({ 
      id: result.lastInsertRowid, 
      name, 
      icon_path, 
      icon_type,
      created_at: new Date().toISOString()
    });
  } catch (error) {
    if (error.message.includes('UNIQUE constraint failed')) {
      res.status(409).json({ error: 'Technology with this name already exists' });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

// Upload icon files and create/update technologies
app.post('/api/upload-icons', upload.array('icons', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ error: 'No files uploaded' });
    }

    const results = [];
    
    for (const file of req.files) {
      try {
        // Extract technology name from filename (remove extension)
        const name = file.originalname.replace(/\.[^/.]+$/, '');
        const icon_path = `/portfolio/icons/${file.originalname}`;
        const icon_type = file.originalname.split('.').pop().toLowerCase();
        
        // Check if technology already exists
        const existing = db.prepare('SELECT * FROM technologies WHERE name = ?').get(name);
        
        if (existing) {
          // Update existing technology
          db.prepare('UPDATE technologies SET icon_path = ?, icon_type = ? WHERE name = ?')
            .run(icon_path, icon_type, name);
          
          results.push({
            name,
            icon_path,
            icon_type,
            action: 'updated',
            message: `Technology "${name}" updated with new icon`
          });
        } else {
          // Create new technology
          const result = db.prepare('INSERT INTO technologies (name, icon_path, icon_type) VALUES (?, ?, ?)').run(name, icon_path, icon_type);
          
          results.push({
            id: result.lastInsertRowid,
            name,
            icon_path,
            icon_type,
            action: 'created',
            message: `Technology "${name}" created with icon`
          });
        }
      } catch (fileError) {
        results.push({
          name: file.originalname,
          error: fileError.message
        });
      }
    }
    
    // Export updated projects to JSON
    exportProjectsToJson();
    
    res.json({
      message: `Processed ${req.files.length} files`,
      results
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
 });

// Get all projects
app.get('/api/projects', (req, res) => {
  try {
    // Sort by end_date DESC (most recent first), then by created_at DESC as fallback
    const projects = db.prepare(`
      SELECT * FROM projects 
      ORDER BY 
        CASE 
          WHEN end_date IS NOT NULL THEN end_date 
          ELSE created_at 
        END DESC,
        created_at DESC
    `).all();
    
    // Get all technologies for icon mapping
    const technologies = db.prepare('SELECT * FROM technologies').all();
    const techMap = new Map(technologies.map(tech => [tech.name.toLowerCase(), tech]));
    
    const projectsWithTechIcons = projects.map(project => {
      const techArray = project.tech ? project.tech.split(',') : [];
      
      // Map each technology to include icon information
      const techWithIcons = techArray.map(techName => {
        const techNameLower = techName.trim().toLowerCase();
        const techData = techMap.get(techNameLower);
        
        if (techData) {
          return {
            name: techName.trim(),
            icon: techData.icon_path,
            iconType: techData.icon_type
          };
        } else {
          return {
            name: techName.trim(),
            icon: null,
            iconType: null
          };
        }
      });
      
      return {
        ...project,
        tech: techWithIcons
      };
    });
    
    res.json(projectsWithTechIcons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  try {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (project) {
      // Get all technologies for icon mapping
      const technologies = db.prepare('SELECT * FROM technologies').all();
      const techMap = new Map(technologies.map(tech => [tech.name.toLowerCase(), tech]));
      
      const techArray = project.tech ? project.tech.split(',') : [];
      
      // Map each technology to include icon information
      const techWithIcons = techArray.map(techName => {
        const techNameLower = techName.trim().toLowerCase();
        const techData = techMap.get(techNameLower);
        
        if (techData) {
          return {
            name: techName.trim(),
            icon: techData.icon_path,
            iconType: techData.icon_type
          };
        } else {
          return {
            name: techName.trim(),
            icon: null,
            iconType: null
          };
        }
      });
      
      res.json({
        ...project,
        tech: techWithIcons
      });
    } else {
      res.status(404).json({ error: 'Project not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new project
app.post('/api/projects', (req, res) => {
  try {
    const { title, description, image, tech, start_date, end_date } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    // Handle tech input - can be array of strings or array of objects with name property
    let techString;
    if (Array.isArray(tech)) {
      if (tech.length > 0 && typeof tech[0] === 'object' && tech[0].name) {
        // Extract names from tech objects
        techString = tech.map(t => t.name).join(',');
      } else {
        // Direct array of strings
        techString = tech.join(',');
      }
    } else {
      techString = tech || '';
    }
    
    const insert = db.prepare(`
      INSERT INTO projects (title, description, image, tech, start_date, end_date) 
      VALUES (?, ?, ?, ?, ?, ?)
    `);
    
    const result = insert.run(title, description, image, techString, start_date || null, end_date || null);
    
    const newProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
    
    // Export updated projects to JSON
    exportProjectsToJson();
    
    res.status(201).json({
      ...newProject,
      tech: newProject.tech ? newProject.tech.split(',') : []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
app.put('/api/projects/:id', (req, res) => {
  try {
    const { title, description, image, tech, start_date, end_date } = req.body;
    
    if (!title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    // Handle tech input - can be array of strings or array of objects with name property
    let techString;
    if (Array.isArray(tech)) {
      if (tech.length > 0 && typeof tech[0] === 'object' && tech[0].name) {
        // Extract names from tech objects
        techString = tech.map(t => t.name).join(',');
      } else {
        // Direct array of strings
        techString = tech.join(',');
      }
    } else {
      techString = tech || '';
    }
    
    const update = db.prepare(`
      UPDATE projects 
      SET title = ?, description = ?, image = ?, tech = ?, start_date = ?, end_date = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = update.run(title, description, image, techString, start_date || null, end_date || null, req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const updatedProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    
    // Export updated projects to JSON
    exportProjectsToJson();
    
    res.json({
      ...updatedProject,
      tech: updatedProject.tech ? updatedProject.tech.split(',') : []
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete project
app.delete('/api/projects/:id', (req, res) => {
  try {
    const deleteStmt = db.prepare('DELETE FROM projects WHERE id = ?');
    const result = deleteStmt.run(req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    // Export updated projects to JSON
    exportProjectsToJson();
    
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Serve static files from public folder (after all API routes to avoid conflicts)
app.use('/public', express.static(join(__dirname, 'public')));

app.listen(PORT, () => {
  console.log(`Project Manager Server running on http://localhost:${PORT}`);
  console.log(`Project management tool available at http://localhost:${PORT}`);
  console.log(`Projects will be exported to public/projects.json`);
  
  if (!fs.existsSync(indexPath)) {
    console.log(`\n⚠️  Frontend not built. To build it, run:`);
    console.log(`   cd tools && npm run build`);
    console.log(`\n💡 Or run the full development mode:`);
    console.log(`   npm run dev:full`);
  }
});
