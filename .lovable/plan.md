

# Add CYMEPA Page and Menu Item

## Overview
Create a new page at `/about-us/general-information/cymepa` following the same layout as the existing CSA, MOU, and FONASBA pages, and add it to the "About Us" header dropdown.

## Changes

### 1. Copy uploaded image
- Copy `user-uploads://cymepa-logo.webp` to `src/assets/cymepa-logo.webp`

### 2. New page: `src/pages/Cymepa.tsx`
- Mirror the layout of `Fonasba.tsx` (navy hero, back link, content area with sidebar)
- Display the CYMEPA logo
- Include the provided text about CYMEPA membership, marine environment protection, and public awareness campaigns
- SEO component with appropriate title, description, and canonical path

### 3. Update `src/App.tsx`
- Import `Cymepa` component
- Add route `/about-us/general-information/cymepa` before the existing wildcard redirect

### 4. Update `src/components/layout/Header.tsx`
- Add `{ label: "CYMEPA", href: "/about-us/general-information/cymepa" }` to the `children` array of the "About Us" nav item

### 5. Update `public/sitemap.xml`
- Add entry for the new URL

