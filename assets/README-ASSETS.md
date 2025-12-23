# Zigguratss Carousel Assets

This folder should contain the artwork images referenced in `carousel-data.js`.

## Required Images for Carousel

### Slide 1 (Flipping Frames) - 11 images needed:
- `artwork1.jpg` through `artwork11.jpg`

### Slide 2 (Static Cluster) - 4 images needed:
- `artist1.jpg` through `artist4.jpg`

### Slide 3 (Static Cluster) - 3 images needed:
- `limited1.jpg` through `limited3.jpg`

## Image Specifications

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 400x500px (portrait orientation)
- **Quality**: High quality for crisp display in frames
- **File Size**: Optimize for web (under 200KB per image)

## Responsive Images (Optional)

For better performance, you can provide multiple sizes:

```
artwork1-small.jpg (200x250px)
artwork1-medium.jpg (400x500px) 
artwork1-large.jpg (800x1000px)
```

Then update `carousel-data.js` to use srcset:

```javascript
images: [
  {
    src: "./assets/artwork1-medium.jpg",
    srcset: "./assets/artwork1-small.jpg 200w, ./assets/artwork1-medium.jpg 400w, ./assets/artwork1-large.jpg 800w",
    sizes: "(max-width: 768px) 120px, 200px",
    alt: "Artwork description"
  }
]
```

## Fallback Images

If Zigguratss assets are not available, the carousel will use placeholder images from via.placeholder.com as fallbacks.