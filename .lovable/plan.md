

# Add YoungShip Cyprus Page and Menu Item

## Overview
Create a new page at `/about-us/general-information/youngship-cyprus` following the same layout as the existing affiliation pages, and add it to the "About Us" header dropdown.

## Changes

### 1. New page: `src/pages/YoungShipCyprus.tsx`
- Mirror the layout of `Cymepa.tsx` (navy hero, back link, content area with sidebar)
- No logo image (none was uploaded) -- use text-based header only
- Content sections: membership statement, and the three objectives as a bulleted list
- SEO component with title, description, and canonical path

### 2. Update `src/App.tsx`
- Import `YoungShipCyprus` component
- Add route `/about-us/general-information/youngship-cyprus` before the existing wildcard redirect for `/about-us/general-information/*`

### 3. Update `src/components/layout/Header.tsx`
- Add `{ label: "YoungShip", href: "/about-us/general-information/youngship-cyprus" }` to the `children` array of the "About Us" nav item

### 4. Update `public/sitemap.xml`
- Add entry for the new URL with yearly changefreq and 0.5 priority

