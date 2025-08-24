# Portfolio Project Management Tool

This is an internal tool for managing portfolio projects. It provides a simple interface to add, edit, and delete projects that will automatically appear on your portfolio.

## 🎯 **How It Works**

The tool now works in a **static export workflow**:

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

## 📁 **File Structure**

```
portfolio/
├── tools/                    # Project management tool
│   ├── server.js            # Backend server (optional)
│   ├── export-projects.js   # Standalone export script
│   ├── package.json         # Tool dependencies
│   └── src/                 # Tool React components
├── public/
│   └── projects.json        # Static projects data (auto-generated)
├── src/                     # Main portfolio (production)
└── projects.db              # Database (auto-generated)
```

## 🔧 **Workflow Options**

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

## 📋 **Features**

- **Static Export**: Portfolio reads from local JSON file
- **No Dependencies**: Portfolio works without running tool
- **Auto-Export**: Changes automatically update projects.json
- **Standalone Export**: Quick export without running full tool
- **SQLite Database**: Persistent storage for your projects

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

## 🔒 **Benefits of Static Export**

1. **Portfolio Independence**: No server required to view portfolio
2. **Production Ready**: Can deploy portfolio without tool
3. **Fast Loading**: Static JSON loads instantly
4. **Version Control**: Track project changes in Git
5. **Simple Deployment**: Just upload portfolio files

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

## 📚 **API Endpoints (Optional)**

The tool still provides a full API if you want to use it:

- `GET /api/projects` - Get all projects
- `POST /api/projects` - Create new project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

## 🎉 **Key Advantages**

1. **Static Portfolio**: No backend required for portfolio
2. **Fast Performance**: Projects load from local JSON
3. **Easy Deployment**: Upload portfolio files anywhere
4. **Version Control**: Track project changes in Git
5. **Flexible Workflow**: Use tool when needed, export when done

---

**Note**: The portfolio now works completely independently. You only need the tool running when actively managing projects. For production, just deploy your portfolio files - no server needed!
