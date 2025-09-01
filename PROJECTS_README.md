# Portfolio Projects Management

This portfolio now uses a YAML-based system for managing projects instead of a database. Each project has its own folder with a `project.yml` file and associated images.

## 📁 Project Structure

```
public/projects/
├── portfolio-timeline-website/
│   ├── project.yml
│   └── [project images]
├── hakomi-practice-timer/
│   ├── project.yml
│   └── [project images]
└── game-development-in-rust---study-around-snakebird/
    ├── project.yml
    └── [project images]
```

## 📝 Project YAML Format

Each `project.yml` file contains:

```yaml
title: Project Title
subtitle: Optional project subtitle  # Optional - can be omitted
description: Project description
start_date: '2025-08-16'
end_date: '2025-08-24'
tech: React, Vite, Pico  # Comma-separated technology names
```

**Note**: The `tech` field is now a simple comma-separated string. The build script automatically:
- Splits the string into individual technology names
- Looks for matching icons in `/portfolio/icons/`
- Creates the proper object format for the JSON output
- Sets `icon: null` if no icon is found
- Scans the project folder for images and auto-populates the `images` array

## 🛠️ Scripts

### Extract Projects from JSON
```bash
node extract-projects.js
```
- Reads `public/projects.json`
- Creates individual project folders
- Converts each project to YAML format
- Copies associated images to project folders

### Build JSON from YAML
```bash
node build-projects.js
```
- Scans `public/projects/` directory
- Reads all `project.yml` files
- Scans for images in each project folder
- Generates `public/projects.json`
- Sorts projects by end_date (most recent first)

## 📋 Workflow

1. **To add a new project:**
   - Create a new folder in `public/projects/` (use hyphens instead of spaces)
   - Add a `project.yml` file with project details
   - Place project images in the folder
   - Run `node build-projects.js` to update the JSON

2. **To edit an existing project:**
   - Modify the `project.yml` file
   - Add/remove images from the project folder
   - Run `node build-projects.js` to update the JSON

3. **To remove a project:**
   - Delete the project folder
   - Run `node build-projects.js` to update the JSON

## 🖼️ Image Management

- Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- Images are automatically detected and added to the project's `images` array
- Image paths are automatically generated as `/portfolio/projects/[project-name]/[filename]`

## 🔄 Automation

You can add these scripts to your `package.json`:

```json
{
  "scripts": {
    "extract-projects": "node extract-projects.js",
    "build-projects": "node build-projects.js"
  }
}
```

Then run:
```bash
npm run extract-projects  # Extract from JSON
npm run build-projects    # Build JSON from YAML
```

## 📝 Notes

- Project folders use lowercase with hyphens (e.g., `portfolio-timeline-website`)
- The `build-projects.js` script automatically assigns IDs and timestamps
- Projects are automatically sorted by end_date (most recent first)
- All database-specific fields are removed when converting to YAML
