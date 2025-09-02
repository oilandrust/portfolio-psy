# Image Resizer Script

A Node.js script that automatically resizes all images in a folder to 50% of their original dimensions, replacing the originals with the resized versions.

## ⚠️ Important Warning

**This script will replace your original images with resized versions!** Make sure to backup your images before running this script.

## Features

- 🖼️ **Batch Processing**: Resize all images in a folder at once
- 📏 **50% Reduction**: Automatically halves both width and height
- 🔄 **In-Place Replacement**: Replaces original files with resized versions
- 🎯 **High Quality**: Uses Lanczos3 kernel for best resizing quality
- 📱 **Multiple Formats**: Supports JPG, PNG, WebP, TIFF, and BMP
- 🚀 **Fast Processing**: Built with Sharp for optimal performance

## Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

## Installation

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Or install Sharp globally:**
   ```bash
   npm install -g sharp
   ```

## Usage

### Basic Usage

```bash
# Resize images in the default ./images folder
node resize-images.js

# Resize images in a specific folder
node resize-images.js ./my-photos

# Resize images using absolute path
node resize-images.js /path/to/your/images
```

### Using npm scripts

```bash
# If you have the package.json installed
npm run resize
npm run resize:help
```

### Help

```bash
node resize-images.js --help
node resize-images.js -h
```

## Examples

```bash
# Process images in current directory's images folder
node resize-images.js

# Process images in a subdirectory
node resize-images.js ./project-screenshots

# Process images in an absolute path
node resize-images.js /Users/username/Pictures/portfolio
```

## Supported Image Formats

- `.jpg` / `.jpeg`
- `.png`
- `.webp`
- `.tiff`
- `.bmp`

## How It Works

1. **Scans the specified folder** for supported image files
2. **Reads image metadata** to get original dimensions
3. **Calculates new dimensions** (50% of original)
4. **Resizes each image** using Sharp with Lanczos3 kernel
5. **Replaces the original** with the resized version
6. **Provides progress feedback** in the console

## Output

The script provides detailed feedback:

```
📁 Processing 5 images in "./screenshots"
📏 All images will be resized to 50% of their original dimensions

Resizing screenshot1.png: 1920x1080 → 960x540
✅ Successfully resized and replaced: screenshot1.png
Resizing screenshot2.png: 2560x1440 → 1280x720
✅ Successfully resized and replaced: screenshot2.png
...

🎉 Finished processing 5 images!
```

## Error Handling

- **Missing folder**: Script exits with error message
- **No images found**: Shows supported formats
- **Processing errors**: Continues with other images, logs errors
- **Missing Sharp**: Provides installation instructions

## Safety Features

- **Format validation**: Only processes supported image types
- **Error recovery**: Continues processing even if individual images fail
- **Progress feedback**: Shows what's happening at each step
- **Help system**: Built-in usage instructions

## Troubleshooting

### Sharp not found

```bash
npm install sharp
```

### Permission errors

Make sure you have write permissions to the target folder.

### Memory issues

For very large images, the script processes them one at a time to manage memory usage.

## License

MIT License - feel free to modify and distribute as needed.

## Contributing

Feel free to submit issues or pull requests to improve the script!
