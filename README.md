# Portfolio Website - Olivier Rouiller

A professional portfolio website built with Next.js, featuring bilingual content (French/English) and static export for GitHub Pages.

## 🚀 Tech Stack

- **Next.js** 16.0.1 - React framework with static export
- **React** 19.2.0 - Latest React with modern features
- **Pico CSS** 2.1.1 - Minimal CSS framework for semantic HTML
- **Markdown** - Content management with YAML front matter

## ✨ Features

- 🌍 Bilingual support (French/English)
- 📱 Mobile-first responsive design
- 📄 Dynamic CV page with PDF generation
- 📚 Interests and readings sections
- 💼 Experience and formations showcase
- 🎨 Clean, modern design with Pico CSS
- 📊 Static site generation for GitHub Pages

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository

```bash
git clone <your-repo-url>
cd portfolio-psy
```

2. Install dependencies

```bash
npm install
```

3. Build portfolio data

```bash
npm run build-portfolio
```

4. Start development server

```bash
npm run dev
```

5. Open your browser and navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
```

This will:
1. Build the portfolio data from markdown files
2. Generate static Next.js pages
3. Output to the `out/` directory

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
portfolio-psy/
├── app/                  # Next.js app directory
│   ├── [lang]/          # Language-specific routes
│   │   ├── about/       # About page
│   │   ├── cv/          # CV page
│   │   ├── experience/  # Experience page
│   │   ├── interests/   # Interests pages
│   │   └── lectures/    # Readings/lectures pages
│   └── layout.jsx       # Root layout
├── components/          # React components
├── lib/                 # Utility functions
├── portfolio/           # Source markdown content
│   ├── en/             # English content
│   └── fr/             # French content
├── public/             # Static assets
│   ├── data/           # Generated portfolio data
│   └── O.svg           # Favicon
├── scripts/            # Build and utility scripts
└── build-portfolio.js  # Main build script
```

## 📝 Content Management

Content is managed through markdown files in the `portfolio/` directory:
- Each language has its own subdirectory (`en/`, `fr/`)
- Markdown files support YAML front matter for metadata
- Images and media are stored alongside markdown files

## 🚀 Deployment

This project is configured for static export and can be deployed to:

- **GitHub Pages** (current setup)
  ```bash
  npm run deploy
  ```

- Vercel
- Netlify
- Any static hosting service

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
