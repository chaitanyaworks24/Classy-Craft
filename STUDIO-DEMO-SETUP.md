# Studio Demo Setup Guide

This project supports generating dynamic, individualized interior design showcase websites using a single Master Template codebase.

## The Architecture
The platform is built on a "Master Template" strategy:
1. **Master Base:** The core logic, default images, and layout exist in the main repository.
2. **Active Studio Configuration:** Each deployment can be configured to act as a specific Studio (e.g. "Classy Craft", "Studio B").
3. **Asset Isolation:** The build step automatically generates a manifest of studio assets and strips out non-active studio assets to guarantee complete isolation (Studio A cannot access Studio B's assets).

## Adding a New Studio Demo

To create a new studio instance, follow these two steps:

### 1. Create a Studio Profile
Create a new JSON file in `data/studios/` named after the studio slug (e.g., `data/studios/your-studio.json`).

```json
{
  "slug": "your-studio",
  "name": "Your Studio Interiors",
  "googleMapsUrl": "...",
  "googleReviewsUrl": "...",
  "phone": "+91 98765 43210",
  "whatsapp": "919876543210",
  "website": "www.yourstudio.com",
  "address": "123 Your Street",
  "logo": "/assets/studios/your-studio/logo.png",
  "theme": {
    "ivory": "#f8f9fa",
    "charcoal": "#212529",
    "gold": "#d4af37"
  },
  "reviews": [
    {
      "id": "r1",
      "author": "Client Name",
      "rating": 5,
      "text": "Great experience!"
    }
  ]
}
```

### 2. Add Studio Assets
Create a folder in `public/assets/studios/your-studio/`. Add your high-quality images inside this directory organized by category.

**Directory Structure:**
```
public/assets/studios/your-studio/
├── logo.png
├── high-quality/        # Overrides main hero images
├── kitchen/             # Overrides Kitchen room collection images
├── living-room/         # Overrides Living Room collection images
├── 1bhk1/               # Overrides the '1bhk1' project gallery
└── office/              # Overrides commercial office imagery
```
*(For detailed mapping of slots, refer to `STUDIO-ASSET-MAPPING.md`)*

### 3. Deploy
To run or build the app as this studio, provide the `ACTIVE_STUDIO` environment variable.

```bash
# Development
ACTIVE_STUDIO=your-studio npm run dev

# Production Build
ACTIVE_STUDIO=your-studio npm run build
```

## Validation & Isolation

The repository utilizes `predev` and `prebuild` lifecycle scripts in `package.json`:
1. `scripts/validate-studio-demo.mjs`: Checks that `data/studios/<active-studio>.json` exists, verifies the asset folder, and **strips all non-active studio asset folders** from `public/assets/studios/` to prevent asset leakage between demos.
2. `scripts/prepare-studio-demo.mjs`: Scans the active studio's asset folder and creates `data/generated/studio-assets.json`. The Next.js app reads this manifest to determine which fallback template images should be dynamically overridden.
