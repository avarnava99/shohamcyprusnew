

# Add FONASBA Page and Menu Item

## Overview
Create a new page at `/about-us/general-information/fonasba` following the same layout as the CSA and MOU pages, and add it to the "About Us" header dropdown.

## Changes

### 1. Copy uploaded images
- `fonasba-logo-original.webp` to `src/assets/fonasba-logo.webp`
- `medium_fonasba-quality-shoham.webp` to `src/assets/fonasba-quality-standard.webp`

### 2. New page: `src/pages/Fonasba.tsx`
- Mirror the layout of `CyprusShippingAssociation.tsx` (navy hero, back link, two-column content + sidebar)
- Display both FONASBA logos (the knot logo and the quality standard seal)
- Content sections covering the FONASBA Quality Standard and CSA's full membership
- Link to the FONASBA website (fonasba.com)
- SEO component with appropriate metadata

### 3. Update `src/App.tsx`
- Import `Fonasba` component
- Add route `/about-us/general-information/fonasba` before the existing wildcard redirect

### 4. Update `src/components/layout/Header.tsx`
- Add `{ label: "FONASBA", href: "/about-us/general-information/fonasba" }` to the `children` array of the "About Us" nav item

### 5. Update `public/sitemap.xml`
- Add entry for the new URL

