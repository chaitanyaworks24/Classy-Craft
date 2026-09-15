# Studio Asset Mapping Reference

This document explains how assets provided by a Studio are mapped into the Master Template website.

## Fallback Override Logic
The platform uses a **Fallback Slot-Replacement Strategy**.
If a studio provides images for a specific room or project, those images occupy the highest-visibility slots (the start of the gallery). 

If the studio provides fewer images than the Master Template, the remaining slots are filled with Master Template images to maintain the visual richness and length of the website. 
If the studio provides *more* images than the template, the gallery expands to accommodate all the studio images.

**Example (Kitchen Project):**
- Master Template has 5 kitchen images: `[T1, T2, T3, T4, T5]`
- Studio provides 2 kitchen images: `[S1, S2]`
- Effective Rendered Gallery: `[S1, S2, T3, T4, T5]`

## Mapping Folders

Place files in `public/assets/studios/<studio-slug>/<folder-name>/`.
Images are sorted alphabetically (e.g. `1.png`, `2.png`), so name them sequentially to control the order.

| Studio Asset Folder | Affects Website Area | Fallback Behavior |
| --- | --- | --- |
| `logo.png` | Site Header & Estimate PDF | Falls back to master logo if absent. |
| `high-quality/` | Homepage Hero Image | Replaces the main landing hero image. |
| **Room Collections** | | |
| `kitchen/` | Portfolio -> Kitchen Gallery | Merges with master Kitchen images. First image becomes the card cover. |
| `living-room/` | Portfolio -> Living Room | Merges with master Living Room images. First image is used on Contact page. |
| `bedroom/` | Portfolio -> Bedroom Gallery | Merges with master Bedroom images. |
| `wardrobes/` | Portfolio -> Wardrobes Gallery | Merges with master Wardrobe images. |
| **Projects** | | |
| `1bhk1/` | Showcase -> 1 BHK Project 1 | First image is the cover. Merges gallery. *Note: Disables before/after images if studio gallery is provided, to prevent mismatched before/after context.* |
| `3bhk1/` | Showcase -> 3 BHK Project 1 | Merges gallery. First image becomes cover. |
| `villa1/` | Showcase -> Villa Project 1 | Merges gallery. First image becomes cover. |
| **Commercial** | | |
| `office/` | Commercial -> Office Gallery | First image becomes card cover. Merges gallery. |
| `restaurant/` | Commercial -> Restaurant Gallery | First image becomes card cover. Merges gallery. |

## Dynamic Theme

A Studio can provide a `theme` object in their `data/studios/<studio-slug>.json` profile to override CSS variables across the entire application, including the PDF generator.

```json
"theme": {
  "ivory": "#f8f9fa",      // Backgrounds, light cards
  "surface": "#ffffff",    // Top layers, dropdowns
  "stone": "#dee2e6",      // Borders, muted elements
  "charcoal": "#212529",   // Primary text, headings, dark buttons
  "ink": "#000000",        // Heaviest contrast elements
  "muted": "#6c757d",      // Subtitles, helper text
  "gold": "#d4af37",       // Accents, primary brand color
  "line": "#e9ecef"        // Thin dividers
}
```
If a theme key is omitted, the application falls back to the Master Template's default CSS variable definition in `globals.css`.
