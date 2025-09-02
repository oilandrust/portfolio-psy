# Video Feature for Portfolio Projects

This portfolio now supports videos in addition to images for project showcases. Videos will appear with a play overlay button and can be played in the carousel.

## How to Add Videos to Projects

### 1. Automatic Video Detection

**No configuration needed!** The build script automatically scans for video files in your project folders and adds them to the projects.json file.

Simply place your video files in the project folder and run `npm run build-projects` or `npm run build`.

### 2. Manual Configuration (Optional)

If you want to customize video settings, you can manually edit the generated `public/projects.json` file:

```json
{
  "id": 2,
  "title": "Your Project",
  "videos": [
    {
      "path": "/portfolio/projects/your-project/demo.mp4",
      "thumbnail": "/portfolio/projects/your-project/video-thumbnail.jpg"
    }
  ]
}
```

### 3. File Structure

Place your video files in the appropriate project folder:

```
public/projects/your-project/
├── demo.mp4                    # Your video file
├── demo-thumb.jpg              # Optional custom thumbnail (filename-thumb.ext)
├── project.yml                 # Project configuration
└── other-files...
```

**Note**: The build script automatically looks for thumbnail images with the pattern `filename-thumb.ext` (e.g., `demo-thumb.jpg` for `demo.mp4`).

### 4. Supported Video Formats

- **MP4** (recommended for web compatibility)
- **WebM** (good for web, smaller file sizes)
- **MOV** (may have compatibility issues)

### 5. Video Requirements

- **File Size**: Keep videos under 50MB for optimal performance
- **Resolution**: 720p or 1080p recommended
- **Duration**: Short demos (30 seconds to 2 minutes) work best
- **Codec**: H.264 for MP4 files

## Features

### Video Thumbnails
- Videos display with a play button overlay
- Hover effects show the play button more prominently
- Video indicator (▶) in the top-right corner

### Video Player
- Custom video controls with play/pause button
- Progress bar with click-to-seek functionality
- Time display showing current position and duration
- Close button to return to project view

### Carousel Integration
- Videos integrate seamlessly with existing image carousels
- Navigation arrows work for both images and videos
- Media counter shows current position in the carousel

## Automatic Scanning

The build script (`build-projects.js`) automatically:

- **Scans for images** with extensions: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`, `.svg`
- **Scans for videos** with extensions: `.mp4`, `.webm`, `.mov`, `.avi`, `.mkv`
- **Looks for custom thumbnails** using the pattern `filename-thumb.ext`
- **Generates proper paths** for all media files
- **Updates projects.json** with the latest media information

## Backward Compatibility

Existing projects with only `images` will continue to work unchanged. The system automatically merges images and videos into a unified media array.

## Example Project

See the "Game Development in Rust" project for an example of automatic video detection. The build script automatically found the `CatSnake.mov` file and added it to the project configuration.

## Build Process

To update your projects with new videos:

1. **Place video files** in the appropriate project folder
2. **Run the build script**: `npm run build-projects` or `npm run build`
3. **Check the output** - the script will show detected images and videos
4. **Deploy** - the updated projects.json will include your new videos

## Tips for Best Results

1. **Create custom thumbnails** using the `filename-thumb.ext` pattern for better visual appeal
2. **Optimize video files** for web delivery
3. **Keep videos short** - users prefer quick demos
4. **Use descriptive filenames** for easier management
5. **Test on different devices** to ensure compatibility

## Troubleshooting

- **Video not playing**: Check file format and browser compatibility
- **Large file sizes**: Consider compressing videos or using WebM format
- **Thumbnail not showing**: Ensure the thumbnail path is correct
- **Carousel navigation issues**: Verify all media items have valid paths
