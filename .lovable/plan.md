

# Update "Loading Mobile Generators" Project with 9 Photos

## Overview
The project entry already exists in `src/data/projects.ts` (slug: `loading-mobile-generators`) but has no images or subtitle. This plan adds the 9 uploaded photos and enriches the project details.

## Changes

### 1. Copy 9 images to `src/assets/projects/`
- `loading-of-mobile-generators-limassol-port-1.webp` -> `loading-generators-1.webp`
- `loading-of-mobile-generators-limassol-port-2.webp` -> `loading-generators-2.webp`
- `loading-of-mobile-generators-limassol-port-3.webp` -> `loading-generators-3.webp`
- `loading-of-mobile-generators-limassol-port-4.webp` -> `loading-generators-4.webp`
- `loading-of-mobile-generators-limassol-port-5.webp` -> `loading-generators-5.webp`
- `loading-of-mobile-generators-limassol-port-6.webp` -> `loading-generators-6.webp`
- `loading-of-mobile-generators-limassol-port-7.webp` -> `loading-generators-7.webp`
- `loading-of-mobile-generators-limassol-port-8.webp` -> `loading-generators-8.webp`
- `loading-of-mobile-generators-limassol-port-9.webp` -> `loading-generators-9.webp`

### 2. Update `src/data/projects.ts`
- Add 9 image imports at the top
- Update the existing `loading-mobile-generators` project entry to include:
  - **Subtitle:** Loading of mobile generators at Limassol Port
  - **fullDescription:** Split into 2 paragraphs matching the user's text
  - **Images:** all 9 images
  - Keep existing slug, title, year, location, and category unchanged

