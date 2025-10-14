import sharp from 'sharp';
import { fileURLToPath } from 'url';
import path from 'path';

/**
 * Crops an image to a square using its smallest dimension (centered crop).
 * The cropped image overwrites the original file.
 * 
 * Usage: node scripts/crop-square.js <image-path>
 */

async function cropToSquare(imagePath) {
  try {
    // Get image metadata
    const metadata = await sharp(imagePath).metadata();
    const { width, height } = metadata;
    
    console.log(`Original dimensions: ${width}x${height}`);
    
    // Determine the size of the square (smallest dimension)
    const size = Math.min(width, height);
    
    // Calculate centered crop coordinates
    const left = Math.floor((width - size) / 2);
    const top = Math.floor((height - size) / 2);
    
    console.log(`Cropping to ${size}x${size} square (offset: left=${left}, top=${top})`);
    
    // Crop the image and save it to a temporary buffer
    const buffer = await sharp(imagePath)
      .extract({
        left: left,
        top: top,
        width: size,
        height: size
      })
      .toBuffer();
    
    // Write the cropped image back to the original file
    await sharp(buffer).toFile(imagePath);
    
    console.log(`✓ Successfully cropped ${imagePath} to ${size}x${size}`);
  } catch (error) {
    console.error(`Error cropping image: ${error.message}`);
    process.exit(1);
  }
}

// Main execution
const imagePath = process.argv[2];

if (!imagePath) {
  console.error('Usage: node scripts/crop-square.js <image-path>');
  process.exit(1);
}

// Resolve to absolute path if relative
const absolutePath = path.resolve(imagePath);

cropToSquare(absolutePath);

