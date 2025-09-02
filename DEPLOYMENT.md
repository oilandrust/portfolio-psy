# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed locally
- Node.js and npm installed

## 🔧 Setup Steps

### 1. Create GitHub Repository

1. Go to [GitHub](https://github.com) and sign in
2. Click the "+" icon and select "New repository"
3. Name it `portfolio` (or your preferred name)
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have one)
6. Click "Create repository"

### 2. Add Remote Origin

```bash
# Replace YOUR_USERNAME with your actual GitHub username
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Verify remote was added
git remote -v
```

### 3. Push to GitHub

```bash
# Push your code to GitHub
git push -u origin master

# Or if you're using 'main' branch:
git push -u origin main
```

### 4. Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. Click **Configure** button

### 5. Configure GitHub Pages

The GitHub Actions workflow will automatically:

- Build your portfolio when you push to main/master
- Deploy to GitHub Pages
- Update your site on every push

## 🌐 Access Your Portfolio

After deployment, your portfolio will be available at:

```
https://YOUR_USERNAME.github.io/portfolio
```

## 🔄 Deployment Workflow

### Automatic Deployment

- **Every push** to main/master branch triggers deployment
- **GitHub Actions** automatically builds and deploys
- **No manual steps** required after initial setup

### Manual Deployment (Optional)

```bash
# Build and deploy manually
npm run deploy
```

## 📁 Repository Structure for GitHub Pages

```
portfolio/
├── .github/workflows/     # GitHub Actions deployment
├── src/                   # Portfolio source code
├── public/                # Static assets
├── dist/                  # Built files (auto-generated)
├── tools/                 # Project management tool (not deployed)
└── package.json           # Build configuration
```

## ⚙️ Configuration Details

### Vite Config

- **Base path**: `/portfolio/` (matches repository name)
- **Build output**: `dist/` folder
- **Assets**: Optimized for production

### GitHub Actions

- **Trigger**: Push to main/master branch
- **Build**: Node.js 18, npm ci
- **Deploy**: Automatic to GitHub Pages
- **Permissions**: Minimal required permissions

## 🚨 Important Notes

### Repository Name

- **Must match** the base path in `vite.config.js`
- If you change repository name, update `base: '/new-name/'`
- Update `homepage` in `package.json`

### Branch Names

- **Default branch** must be `main` or `master`
- Update workflow file if using different branch names

### Public Repository

- **GitHub Pages** requires public repository for free accounts
- **Private repositories** require GitHub Pro or higher

## 🔍 Troubleshooting

### Build Failures

1. Check GitHub Actions tab for error logs
2. Verify all dependencies are in `package.json`
3. Ensure Node.js version compatibility

### 404 Errors

1. Verify base path in `vite.config.js`
2. Check repository name matches base path
3. Ensure GitHub Pages is enabled

### Assets Not Loading

1. Check build output in `dist/` folder
2. Verify asset paths are relative
3. Check browser console for errors

## 📱 Local Testing

Before pushing to GitHub:

```bash
# Build locally
npm run build

# Preview build
npm run preview

# Check dist/ folder contents
ls -la dist/
```

## 🎉 Success Indicators

- ✅ GitHub Actions workflow completes successfully
- ✅ Portfolio accessible at `https://username.github.io/portfolio`
- ✅ All assets and pages load correctly
- ✅ Responsive design works on mobile/desktop

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)

---

**Need help?** Check the GitHub Actions tab in your repository for detailed build logs and error messages.
