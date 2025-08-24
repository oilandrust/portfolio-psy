# Portfolio Project Management Tool

This is an internal tool for managing portfolio projects. It provides a simple interface to add, edit, and delete projects that will automatically appear on your portfolio.

## 🎯 **New Static Workflow**

The project management tool now works in a **static export workflow**:

1. **Use the tool** to manage projects (add/edit/delete)
2. **Projects are automatically exported** to `public/projects.json`
3. **Portfolio reads from the static JSON file** - no server required!
4. **Portfolio is completely independent** and can run without the tool

## 🚀 **Getting Started**

### **Option 1: Quick Export (Recommended)**

1. **Export projects to JSON**:
   ```bash
   cd tools
   npm install          # Only needed first time
   npm run export       # Creates/updates projects.json
   ```

2. **Run your portfolio**:
   ```bash
   # In the main portfolio directory
   npm run dev
   ```

### **Option 2: Full Tool Usage**

1. **Start the project manager**:
   ```bash
   cd tools
   npm install          # Only needed first time
   npm run dev:full    # Runs both backend + frontend
   ```

2. **Manage projects** at `http://localhost:3001`

3. **Projects are automatically exported** to `public/projects.json`

4. **Run portfolio separately**:
   ```bash
   # In the main portfolio directory
   npm run dev
   ```

## 🔧 **How It Works**

- **Separate Applications**: The tool and portfolio are completely independent
- **Static Export**: Tool exports projects to `public/projects.json`
- **No Dependencies**: Portfolio works without running tool
- **Auto-Export**: Changes automatically update the JSON file
- **Fast Performance**: Projects load from local static file

## 📁 **File Structure**

```
portfolio/
├── tools/                    # Project management tool (separate app)
│   ├── server.js            # Backend server (optional)
│   ├── export-projects.js   # Standalone export script
│   ├── package.json         # Tool dependencies
│   ├── vite.config.js       # Tool build config
│   ├── index.html           # Tool HTML root
│   ├── src/                 # Tool React components
│   └── README.md            # Tool documentation
├── public/
│   └── projects.json        # Static projects data (auto-generated)
├── src/                     # Main portfolio (production)
├── package.json             # Main portfolio dependencies
└── projects.db              # Shared database (auto-generated)
```

## 📋 **Features**

- **Static Export**: Portfolio reads from local JSON file
- **No Dependencies**: Portfolio works without running tool
- **Auto-Export**: Changes automatically update projects.json
- **Standalone Export**: Quick export without running full tool
- **SQLite Database**: Persistent storage for your projects
- **Separate Builds**: Tool and portfolio have independent build processes

## 🎨 **Usage**

### **Managing Projects**
1. Access the tool at `http://localhost:3001`
2. Add, edit, or delete projects using the interface
3. All changes automatically export to `public/projects.json`
4. Portfolio immediately shows updated projects

### **Quick Export**
```bash
cd tools
npm run export
```
This creates/updates `public/projects.json` with current database content.

### **Adding New Projects**
- Click "+ Add New Project"
- Fill in title, description, image URL, and technologies
- Technologies should be comma-separated (e.g., "React, Node.js, MongoDB")
- Projects are automatically exported to JSON

## 🔒 **Security & Production**

- **Development Only**: This tool is designed for local development
- **No Authentication**: Admin panel is accessible to anyone who knows the URL
- **Production Builds**: Tool is never included in portfolio production builds
- **Static Portfolio**: Portfolio works without any backend
- **Easy Deployment**: Just upload portfolio files - no server needed

## 🛠 **Customization**

### **Adding New Fields**
1. Update database schema in `tools/server.js`
2. Modify `tools/src/components/ProjectAdmin.jsx`
3. Update API endpoints and form handling
4. Export script will automatically include new fields

### **Styling**
- Tool uses Pico CSS for consistent appearance
- Customize inline styles in components
- Add custom CSS as needed

## 🚨 **Troubleshooting**

### **Export Issues**
- Run `npm run export` to manually export projects
- Check database file permissions
- Ensure public directory exists

### **Portfolio Not Loading Projects**
- Verify `public/projects.json` exists
- Check file permissions
- Run export script: `cd tools && npm run export`

### **Database Issues**
- Delete `projects.db` and run export script
- Database will be recreated with sample data

### **Port Conflicts**
- Tool backend: Port 3001
- Tool frontend: Port 5174
- Main portfolio: Port 5173

## 📚 **Documentation**

- **Tool Documentation**: See `tools/README.md` for detailed tool usage
- **Main Portfolio**: Standard React/Vite application
- **API Reference**: RESTful endpoints documented in tool README

## 🎉 **Benefits of New Structure**

1. **Portfolio Independence**: No server required to view portfolio
2. **Fast Performance**: Projects load from local JSON
3. **Easy Deployment**: Upload portfolio files anywhere
4. **Version Control**: Track project changes in Git
5. **Flexible Workflow**: Use tool when needed, export when done
6. **Production Ready**: Deploy portfolio without any backend
7. **Clean Separation**: Tool and portfolio are completely independent

## 🔄 **Workflow Options**

### **Simple Workflow (Recommended)**
```bash
# 1. Export projects when needed
cd tools && npm run export

# 2. Run portfolio (no tool needed)
npm run dev
```

### **Full Tool Workflow**
```bash
# 1. Start tool (exports automatically)
cd tools && npm run dev:full

# 2. Run portfolio in another terminal
npm run dev
```

---

**Note**: The portfolio now works completely independently! You only need the tool running when actively managing projects. For production, just deploy your portfolio files - no server needed. The `projects.json` file is automatically generated and updated whenever you make changes in the tool.
