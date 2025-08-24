import express from 'express';
import cors from 'cors';
import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

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

// Function to export projects to JSON
const exportProjectsToJson = () => {
  try {
    const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
    const projectsWithTechArray = projects.map(project => ({
      ...project,
      tech: project.tech.split(',')
    }));
    
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
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    tech TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

// Insert initial data if table is empty
const count = db.prepare('SELECT COUNT(*) as count FROM projects').get();
if (count.count === 0) {
  const insert = db.prepare(`
    INSERT INTO projects (title, description, image, tech) 
    VALUES (?, ?, ?, ?)
  `);
  
  const initialProjects = [
    [
      'E-Commerce Platform',
      'A full-stack e-commerce application built with React, Node.js, and MongoDB.',
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=200&fit=crop',
      'React,Node.js,MongoDB,Express'
    ],
    [
      'Task Management App',
      'A collaborative task management tool with real-time updates and team features.',
      'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=200&fit=crop',
      'React,Firebase,Tailwind CSS'
    ],
    [
      'Portfolio Website',
      'A modern, responsive portfolio website showcasing my work and skills.',
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=400&h=200&fit=crop',
      'React,Vite,Pico CSS'
    ]
  ];
  
  initialProjects.forEach(project => insert.run(project));
  
  // Export initial projects to JSON
  exportProjectsToJson();
}

// API Routes

// Get all projects
app.get('/api/projects', (req, res) => {
  try {
    const projects = db.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
    res.json(projects.map(project => ({
      ...project,
      tech: project.tech.split(',')
    })));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project
app.get('/api/projects/:id', (req, res) => {
  try {
    const project = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    if (project) {
      res.json({
        ...project,
        tech: project.tech.split(',')
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
    const { title, description, image, tech } = req.body;
    
    if (!title || !description || !image || !tech) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const techString = Array.isArray(tech) ? tech.join(',') : tech;
    
    const insert = db.prepare(`
      INSERT INTO projects (title, description, image, tech) 
      VALUES (?, ?, ?, ?)
    `);
    
    const result = insert.run(title, description, image, techString);
    
    const newProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(result.lastInsertRowid);
    
    // Export updated projects to JSON
    exportProjectsToJson();
    
    res.status(201).json({
      ...newProject,
      tech: newProject.tech.split(',')
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update project
app.put('/api/projects/:id', (req, res) => {
  try {
    const { title, description, image, tech } = req.body;
    
    if (!title || !description || !image || !tech) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    const techString = Array.isArray(tech) ? tech.join(',') : tech;
    
    const update = db.prepare(`
      UPDATE projects 
      SET title = ?, description = ?, image = ?, tech = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    
    const result = update.run(title, description, image, techString, req.params.id);
    
    if (result.changes === 0) {
      return res.status(404).json({ error: 'Project not found' });
    }
    
    const updatedProject = db.prepare('SELECT * FROM projects WHERE id = ?').get(req.params.id);
    
    // Export updated projects to JSON
    exportProjectsToJson();
    
    res.json({
      ...updatedProject,
      tech: updatedProject.tech.split(',')
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
