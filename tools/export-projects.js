import Database from 'better-sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Function to export projects to JSON
const exportProjectsToJson = () => {
  try {
    // Initialize SQLite database
    const db = new Database(join(__dirname, '..', 'projects.db'));
    
    // Check if projects table exists
    const tableExists = db.prepare(`
      SELECT name FROM sqlite_master 
      WHERE type='table' AND name='projects'
    `).get();
    
    if (!tableExists) {
      console.log('Projects table does not exist. Creating with sample data...');
      
              // Create projects table
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
      
      // Insert sample data
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
      console.log('Sample projects created.');
    }
    
    // Get all projects sorted by end_date DESC (most recent first), then by created_at DESC as fallback
    const projects = db.prepare(`
      SELECT * FROM projects 
      ORDER BY 
        CASE 
          WHEN end_date IS NOT NULL THEN end_date 
          ELSE created_at 
        END DESC,
        created_at DESC
    `).all();
    const projectsWithTechArray = projects.map(project => ({
      ...project,
      tech: project.tech ? project.tech.split(',') : []
    }));
    
    // Ensure public directory exists
    const publicDir = join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    
    // Write to projects.json
    const jsonPath = join(publicDir, 'projects.json');
    fs.writeFileSync(jsonPath, JSON.stringify(projectsWithTechArray, null, 2));
    
    console.log(`✅ Projects exported to ${jsonPath}`);
    console.log(`📊 Total projects: ${projects.length}`);
    
    // Close database connection
    db.close();
    
  } catch (error) {
    console.error('❌ Error exporting projects to JSON:', error);
    process.exit(1);
  }
};

// Run the export
exportProjectsToJson();
