

# Add "Unloading UN Vehicles" Project with 6 Photos

## Overview
Add a new project entry for the 2013 unloading of 76 United Nations vehicles at Larnaca port, with 6 uploaded photos (note: images 1 and 1_1 appear identical, so only 6 unique images will be used).

## Changes

### 1. Copy 6 images to `src/assets/projects/`
- `unloading-of-United-Nations-Vehicles-1.webp` -> `un-vehicles-1.webp`
- `unloading-of-United-Nations-Vehicles-2.webp` -> `un-vehicles-2.webp`
- `unloading-of-United-Nations-Vehicles-3.webp` -> `un-vehicles-3.webp`
- `unloading-of-United-Nations-Vehicles-4.webp` -> `un-vehicles-4.webp`
- `unloading-of-United-Nations-Vehicles-5.webp` -> `un-vehicles-5.webp`
- `unloading-of-United-Nations-Vehicles-6.webp` -> `un-vehicles-6.webp`

(The `1_1` upload is a duplicate of `1`, so it will be skipped.)

### 2. Update `src/data/projects.ts`
- Add 6 image imports at the top
- Insert new project entry for year 2013 (alongside the existing Loading Mobile Generators project):
  - **Slug:** `unloading-un-vehicles`
  - **Title:** Unloading UN Vehicles
  - **Subtitle:** Unloading of 76 United Nations vehicles at Larnaca port
  - **Description:** In March 2013, we undertook the unloading of 76 United Nations vehicles at Larnaca port from a general cargo vessel. The unloading required special fabrication of unloading equipment which was fabricated in short notice.
  - **fullDescription:** Split into 2 paragraphs matching the user's text
  - **Year:** 2013
  - **Location:** Larnaca Port
  - **Category:** Breakbulk
  - **Images:** all 6 images

