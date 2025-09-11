# 🚀 GitHub Pages Deployment Guide

This guide will help you deploy your portfolio to GitHub Pages.

## 📋 Prerequisites

- GitHub account
- Git installed locally
- Node.js and npm installed

## 🔧 Setup Steps

### 1. Repository Information

- **Repository**: `portfolio-psy`
- **GitHub URL**: https://github.com/oilandrust/portfolio-psy
- **Live URL**: https://oilandrust.github.io/portfolio-psy

### 2. Repository Setup (Already Done)

The repository is already configured with:
- ✅ Public repository (required for free GitHub Pages)
- ✅ Remote origin set to `https://github.com/oilandrust/portfolio-psy.git`
- ✅ Main branch with all code pushed

### 3. Enable GitHub Pages

1. Go to your repository on GitHub: https://github.com/oilandrust/portfolio-psy
2. Click **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select **GitHub Actions**
5. The workflow is already configured in `.github/workflows/deploy.yml`

### 4. Automatic Deployment

The GitHub Actions workflow will automatically:

- Build your portfolio when you push to main branch
- Deploy to GitHub Pages
- Update your site on every push

## 🌐 Access Your Portfolio

After deployment, your portfolio will be available at:

```
https://oilandrust.github.io/portfolio-psy
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
portfolio-psy/
├── .github/workflows/     # GitHub Actions deployment
├── src/                   # Portfolio source code
├── public/                # Static assets
├── dist/                  # Built files (auto-generated)
├── portfolio/             # Content data (YAML files)
└── package.json           # Build configuration
```

## ⚙️ Configuration Details

### Vite Config

- **Base path**: `/portfolio-psy/` (matches repository name)
- **Build output**: `dist/` folder
- **Assets**: Optimized for production

### GitHub Actions

- **Trigger**: Push to main/master branch
- **Build**: Node.js 18, npm ci
- **Deploy**: Automatic to GitHub Pages
- **Permissions**: Minimal required permissions

## 🚨 Important Notes

### Repository Name

- **Current**: `portfolio-psy` (matches base path in `vite.config.js`)
- **Base path**: `/portfolio-psy/` in `vite.config.js`
- **Homepage**: `https://oilandrust.github.io/portfolio-psy` in `package.json`

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
- ✅ Portfolio accessible at `https://oilandrust.github.io/portfolio-psy`
- ✅ All assets and pages load correctly
- ✅ Responsive design works on mobile/desktop

## 🔗 Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)

---

**Need help?** Check the GitHub Actions tab in your repository for detailed build logs and error messages.
