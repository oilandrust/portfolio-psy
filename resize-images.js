#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

// Configuration
const INPUT_FOLDER = process.argv[2] || './images';
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.webp', '.tiff', '.bmp'];

/**
 * Resize an image to half its original dimensions
 * @param {string} inputPath - Path to input image
 * @param {string} outputPath - Path to output image (same as input for replacement)
 */
async function resizeImage(inputPath, outputPath) {
  try {
    const metadata = await sharp(inputPath).metadata();
    const newWidth = Math.floor(metadata.width / 2);
    const newHeight = Math.floor(metadata.height / 2);

    console.log(
      `Resizing ${path.basename(inputPath)}: ${metadata.width}x${metadata.height} → ${newWidth}x${newHeight}`
    );

    await sharp(inputPath)
      .resize(newWidth, newHeight, {
        kernel: sharp.kernel.lanczos3,
        fit: 'fill',
      })
      .toFile(outputPath);

    // Replace original with resized version
    fs.unlinkSync(inputPath);
    fs.renameSync(outputPath, inputPath);

    console.log(
      `✅ Successfully resized and replaced: ${path.basename(inputPath)}`
    );
  } catch (error) {
    console.error(
      `❌ Error processing ${path.basename(inputPath)}:`,
      error.message
    );
  }
}

/**
 * Process all images in a folder
 * @param {string} folderPath - Path to folder containing images
 */
async function processFolder(folderPath) {
  try {
    // Check if folder exists
    if (!fs.existsSync(folderPath)) {
      console.error(`❌ Folder "${folderPath}" does not exist`);
      process.exit(1);
    }

    // Get all files in the folder
    const files = fs.readdirSync(folderPath);
    const imageFiles = files.filter(file => {
      const ext = path.extname(file).toLowerCase();
      return SUPPORTED_FORMATS.includes(ext);
    });

    if (imageFiles.length === 0) {
      console.log(`ℹ️  No supported image files found in "${folderPath}"`);
      console.log(`Supported formats: ${SUPPORTED_FORMATS.join(', ')}`);
      return;
    }

    console.log(`📁 Processing ${imageFiles.length} images in "${folderPath}"`);
    console.log(
      `📏 All images will be resized to 50% of their original dimensions`
    );
    console.log('');

    // Process each image
    for (const file of imageFiles) {
      const inputPath = path.join(folderPath, file);
      const tempPath = path.join(folderPath, `temp_${file}`);
      await resizeImage(inputPath, tempPath);
    }

    console.log('');
    console.log(`🎉 Finished processing ${imageFiles.length} images!`);
  } catch (error) {
    console.error('❌ An error occurred:', error.message);
    process.exit(1);
  }
}

/**
 * Show usage information
 */
function showUsage() {
  console.log(`
🖼️  Image Resizer Script

Usage: node resize-images.js [folder_path]

Arguments:
  folder_path    Path to folder containing images (default: ./images)

Examples:
  node resize-images.js                    # Process images in ./images folder
  node resize-images.js ./my-photos        # Process images in ./my-photos folder
  node resize-images.js /path/to/images    # Process images in absolute path

Supported formats: ${SUPPORTED_FORMATS.join(', ')}

⚠️  WARNING: This script will replace original images with resized versions!
   Make sure to backup your images before running this script.
`);
}

// Main execution
async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    showUsage();
    process.exit(0);
  }

  // Check if sharp is available
  try {
    await import('sharp');
  } catch {
    console.error('❌ Sharp library not found. Please install it first:');
    console.error('   npm install sharp');
    process.exit(1);
  }

  // Process the folder
  await processFolder(INPUT_FOLDER);
}

// Run the main function
main().catch(error => {
  console.error('❌ Unexpected error:', error);
  process.exit(1);
});
