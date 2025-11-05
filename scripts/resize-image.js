import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function printUsage() {
  console.log('Usage: node scripts/resize-image.js <inputPath> <maxSize> <outputPath>');
  console.log('  <inputPath>  Path to the source image');
  console.log('  <maxSize>    Max width/height in pixels (integer)');
  console.log('  <outputPath> Path to write the resized image');
}

async function ensureDirectoryForFile(filePath) {
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function resizeImage(inputPath, maxSize, outputPath) {
  const max = Number(maxSize);
  if (!Number.isFinite(max) || max <= 0) {
    throw new Error(`Invalid max size: ${maxSize}`);
  }

  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const image = sharp(inputPath);
  const metadata = await image.metadata();

  // Use sharp's fit: 'inside' which preserves aspect ratio and ensures
  // the output fits within width<=max and height<=max without enlarging.
  await ensureDirectoryForFile(outputPath);

  const start = Date.now();
  await image
    .resize({
      width: max,
      height: max,
      fit: 'inside',
      withoutEnlargement: true,
    })
    .toFile(outputPath);
  const ms = Date.now() - start;

  console.log('✅ Resize complete');
  console.log(`  Input : ${inputPath}`);
  console.log(`  Output: ${outputPath}`);
  console.log(`  Source dimensions: ${metadata.width}x${metadata.height}`);
  console.log(`  Max side: ${max}px`);
  console.log(`  Time: ${ms} ms`);
}

// Entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  const [, , inputPathArg, maxSizeArg, outputPathArg] = process.argv;
  if (!inputPathArg || !maxSizeArg || !outputPathArg) {
    printUsage();
    process.exit(1);
  }

  const inputPath = path.isAbsolute(inputPathArg)
    ? inputPathArg
    : path.join(process.cwd(), inputPathArg);
  const outputPath = path.isAbsolute(outputPathArg)
    ? outputPathArg
    : path.join(process.cwd(), outputPathArg);

  resizeImage(inputPath, maxSizeArg, outputPath)
    .catch((err) => {
      console.error('❌ Failed to resize image:', err.message || err);
      process.exit(1);
    });
}

export { resizeImage };


