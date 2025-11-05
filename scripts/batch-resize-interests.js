import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { resizeImage } from './resize-image.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ROOT = path.join(__dirname, '..');

const EN_MEDIA_DIR = path.join(ROOT, 'portfolio', 'en', 'Interests', 'media');
const FR_MEDIA_DIR = path.join(ROOT, 'portfolio', 'fr', 'Intérêts', 'media');

const EN_MD_DIR = path.join(ROOT, 'portfolio', 'en', 'Interests');
const FR_MD_DIR = path.join(ROOT, 'portfolio', 'fr', 'Intérêts');

const ALLOWED_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp']);

function withSuffix(filePath, suffix) {
  const ext = path.extname(filePath);
  const base = path.basename(filePath, ext);
  const dir = path.dirname(filePath);
  return path.join(dir, `${base}${suffix}${ext}`);
}

function listImages(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => ALLOWED_EXTS.has(path.extname(f).toLowerCase()))
    .map((f) => path.join(dir, f));
}

function listMarkdown(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.toLowerCase().endsWith('.md'))
    .map((f) => path.join(dir, f));
}

async function processLanguage(mediaDir, mdDir) {
  const images = listImages(mediaDir);
  if (images.length === 0) {
    console.log(`No images found in ${mediaDir}`);
    return;
  }

  console.log(`Found ${images.length} images in ${mediaDir}`);

  const suffix = '_300x300';
  const resizedMap = new Map();

  for (const imgPath of images) {
    const outputPath = withSuffix(imgPath, suffix);
    try {
      await resizeImage(imgPath, 300, outputPath);
      resizedMap.set(path.basename(imgPath), path.basename(outputPath));
    } catch (err) {
      console.error(`Failed to resize ${imgPath}:`, err.message || err);
      throw err;
    }
  }

  // Update markdown files
  const mdFiles = listMarkdown(mdDir);
  for (const mdFile of mdFiles) {
    let content = fs.readFileSync(mdFile, 'utf8');
    let updated = content;

    for (const [origName, newName] of resizedMap.entries()) {
      // Replace typical markdown paths like (media/original.png) with (media/original_300x300.png)
      const escaped = origName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const re = new RegExp(`\(\s*media/${escaped}\s*\)`, 'g');
      updated = updated.replace(re, `(media/${newName})`);
    }

    if (updated !== content) {
      fs.writeFileSync(mdFile, updated, 'utf8');
      console.log(`Updated references in ${mdFile}`);
    }
  }
}

async function main() {
  await processLanguage(EN_MEDIA_DIR, EN_MD_DIR);
  await processLanguage(FR_MEDIA_DIR, FR_MD_DIR);
  console.log('All interest images processed and markdown updated.');
}

if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}


