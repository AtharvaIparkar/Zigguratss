# Zigguratss - Cartier-Style Navigation

A luxury art gallery website with animated mega-menus inspired by Cartier's elegant design language.

## Features

- **Cartier-Style Design**: Elegant serif typography, thin uppercase navigation, animated red underlines
- **Animated Mega Menus**: Smooth slide+fade animations for Artwork and Artist menus
- **Artwork Mega Menu**: Left category list, three filter columns (Category, Style, Medium), featured thumbnail
- **Artist Mega Menu**: Left categories, middle artist groups (Emerging, Featured, Bestseller, Famous, Master), right profile list with golden name badges
- **Mobile Responsive**: Touch-optimized with hamburger menu and X animation
- **Click & Stay**: Mega menus stay open when clicked, close on hover away or outside click
- **Accessibility**: Full keyboard navigation, focus management, screen reader support

## Quick Start

1. Open `index.html` in your browser
2. **Desktop**: Hover or click "Artwork"/"Artists" to see mega menus
3. **Mobile**: Tap hamburger menu, then tap "Artwork"/"Artists"
4. Use Tab/Enter/Space for keyboard navigation
5. Press Escape to close menus

## Editing Content

### Menu Data Location
All navigation content is integrated in `scripts.js` at the top. Edit the `data` object to update:

- **Artwork Categories**: `data.artwork.categories`
- **Artwork Filters**: `data.artwork.filters` (Category, Style, Medium)
- **Featured Artwork**: `data.artwork.featured.title` and `featured.image`
- **Artist Categories**: `data.artists.categories`
- **Artist Groups**: `data.artists.groups` (Emerging, Featured, etc.)
- **Artist Profiles**: `data.artists.profiles` (for right column with golden badges)
- **Page Content**: `data.pages` (for routing)

### Example: Adding New Artist Group
```javascript
// In scripts.js, add to data.artists.groups:
"Rising Stars": [
  "New Artist 1", "New Artist 2", "New Artist 3"
]
```

### Example: Adding New Filter Category
```javascript
// In scripts.js, add to data.artwork.filters:
"Price Range": ["Under $1K", "$1K-$5K", "$5K-$10K", "Above $10K"]
```

## File Structure

```
Zigguratss/
├── index.html          # Clean HTML structure
├── styles.css          # Minimal Cartier-style CSS (380 lines)
├── scripts.js          # All functionality + data (140 lines)
└── README.md          # This file
```

## Navigation Behavior

### Desktop
- **Hover**: Opens mega menu, closes when mouse leaves
- **Click**: Opens mega menu and keeps it open
- **Outside Click**: Closes mega menu
- **Escape Key**: Closes all menus

### Mobile
- **Hamburger Menu**: Animates to X when open
- **Touch**: Tap to toggle mega menus open/close
- **Full Screen**: Mega menus take full mobile screen
- **Grid Layout**: Categories and filters in mobile-optimized grids

## Browser Support

- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Touch devices with proper 44px touch targets

## Customization

### Colors
Edit in `styles.css`:
- Primary red: `#c41e3a` (Cartier red)
- Gold badges: `linear-gradient(135deg, #d4af37, #ffd700)`
- Text colors: `#333`, `#666`

### Animations
Modify transition timings:
- Mega menu: `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Underline: `0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)`
- Search expand: `0.4s ease`

### Layout
Responsive breakpoints:
- Desktop: `1200px` max-width
- Mobile: `768px` breakpoint
- Small mobile: `480px` breakpoint
- Navigation height: `80px` (desktop), `70px` (mobile)
