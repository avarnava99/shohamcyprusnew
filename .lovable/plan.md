

# Add Photos and Details to Vassilikos Desalination Plant Project

## Overview
The "Vassilikos Desalination Plant" project already exists in the data but lacks images and a full description. This plan adds the 10 uploaded photos and enriches the project details.

## Changes

### 1. Copy 10 images to `src/assets/projects/`
- `Vassilikos-Cyprus-desalination-project-logistics-1.webp` -> `vassilikos-desal-1.webp`
- `Vassilikos-Cyprus-desalination-project-logistics-2.webp` -> `vassilikos-desal-2.webp`
- `Vassilikos-Cyprus-desalination-project-logistics-3.webp` -> `vassilikos-desal-3.webp`
- `Vassilikos-Cyprus-desalination-project-logistics-4_1.jpg` -> `vassilikos-desal-4.jpg`
- `Vassilikos-Cyprus-desalination-project-logistics-5.webp` -> `vassilikos-desal-5.webp`
- `Vassilikos-Cyprus-desalination-project-logistics-6_1.jpg` -> `vassilikos-desal-6.jpg`
- `Vassilikos-Cyprus-desalination-project-logistics-7-e1566028447495.webp` -> `vassilikos-desal-7.webp`
- `Vassilikos-Cyprus-desalination-project-logistics-8.webp` -> `vassilikos-desal-8.webp`
- `Vassilikos-Cyprus-desalination-project-logistics-9.webp` -> `vassilikos-desal-9.webp`
- `Vassilikos-Cyprus-desalination-project-logistics-10_1.jpg` -> `vassilikos-desal-10.jpg`

### 2. Update `src/data/projects.ts`
- Add 10 image imports
- Update the existing `vassilikos-desalination-plant` project entry to include:
  - **Subtitle:** Unloading and installing 13 desalination tanks
  - **fullDescription:** Split into 2 paragraphs: the assignment details and the transport route
  - **Images:** all 10 images
  - Keep existing slug, title, year, location, and category unchanged

