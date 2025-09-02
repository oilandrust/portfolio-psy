# Adding Videos to This Project

To add videos to this project:

1. **Place your video file** in this folder (e.g., `demo.mp4`)
2. **Create a thumbnail** image (e.g., `video-thumbnail.jpg`) - optional but recommended
3. **Update the project configuration** in `public/projects.json` to include the videos array

## Example Video Configuration

```json
"videos": [
  {
    "path": "/portfolio/projects/hakomi-practice-timer/demo.mp4",
    "thumbnail": "/portfolio/projects/hakomi-practice-timer/video-thumbnail.jpg"
  }
]
```

## Video Requirements

- **Format**: MP4 (H.264) recommended
- **Size**: Under 50MB for optimal performance
- **Resolution**: 720p or 1080p
- **Duration**: 30 seconds to 2 minutes

## Current Status

This project is configured to show videos but no video files have been added yet. Once you add a video file and update the configuration, it will appear with a play button overlay in the project card and be playable in the carousel.
