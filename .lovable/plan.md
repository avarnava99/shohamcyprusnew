

# Add "Mud Plant Export" Project with 10 Photos

## Overview
Add a new project entry for the June 2014 chartering and export of 350 tons of mud plant equipment belonging to Schlumberger, with 10 uploaded photos.

## Changes

### 1. Copy 10 images to `src/assets/projects/`
- `schulmberger-mud-plant-export-from-cyprus-1.webp` -> `mobile-plant-1.webp`
- `schulmberger-mud-plant-export-from-cyprus-2.webp` -> `mobile-plant-2.webp`
- `schulmberger-mud-plant-export-from-cyprus-3.webp` -> `mobile-plant-3.webp`
- `schulmberger-mud-plant-export-from-cyprus-4.webp` -> `mobile-plant-4.webp`
- `schulmberger-mud-plant-export-from-cyprus-5.webp` -> `mobile-plant-5.webp`
- `schulmberger-mud-plant-export-from-cyprus-6.webp` -> `mobile-plant-6.webp`
- `schulmberger-mud-plant-export-from-cyprus-7.webp` -> `mobile-plant-7.webp`
- `schulmberger-mud-plant-export-from-cyprus-8.webp` -> `mobile-plant-8.webp`
- `schulmberger-mud-plant-export-from-cyprus-9.webp` -> `mobile-plant-9.webp` (note: files already exist as mobile-plant-1 through 8, so these will be new additions)

**Note:** The project already has files named `mobile-plant-1.webp` through `mobile-plant-8.webp` in the assets folder. To avoid conflicts, the images will be named `mud-plant-1.webp` through `mud-plant-10.webp` instead.

### 2. Update `src/data/projects.ts`
- Add 10 image imports at the top
- Insert new project entry in the projects array:
  - **Slug:** `mud-plant-export`
  - **Title:** Mud Plant Export
  - **Subtitle:** Chartering and export of 350 tons of mud plant equipment
  - **Description:** In June 2014, our company chartered a vessel for our client and evacuated from Cyprus 350 tons of mud plant equipment which belonged to Schlumberger.
  - **fullDescription:** Split into 2 paragraphs:
    1. "In June 2014, our company chartered a vessel for our client and evacuated from Cyprus 350 tons of mud plant equipment which belonged to Schlumberger."
    2. "The scope of work was to arrange chartering the vessel, arrange the stowage plan, load safely the cargo and secure the cargo in the vessel."
  - **Year:** 2014
  - **Location:** Limassol Port
  - **Category:** Chartering
  - **Images:** all 10 images

