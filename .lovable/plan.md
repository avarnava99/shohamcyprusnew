

# Add ICS (Institute of Chartered Shipbrokers) Page and Menu Item

## Overview
Create a new page at `/about-us/general-information/ics-branch-cyprus` following the same layout as the existing CSA, MOU, FONASBA, and CYMEPA pages, and add it to the "About Us" header dropdown.

## Changes

### 1. Copy uploaded image
- Copy `user-uploads://ics.webp` to `src/assets/ics-logo.webp`

### 2. New page: `src/pages/IcsBranchCyprus.tsx`
- Mirror the layout of `Cymepa.tsx` (navy hero, back link, content area with sidebar)
- Display the ICS coat of arms logo
- Include the provided text about ICS accreditation and the Institute's role as the only internationally recognised professional body in the maritime arena
- SEO component with appropriate title, description, and canonical path `/about-us/general-information/ics-branch-cyprus`

### 3. Update `src/App.tsx`
- Import `IcsBranchCyprus` component
- Add route `/about-us/general-information/ics-branch-cyprus` before the existing wildcard redirect

### 4. Update `src/components/layout/Header.tsx`
- Add `{ label: "ICS", href: "/about-us/general-information/ics-branch-cyprus" }` to the `children` array of the "About Us" nav item

### 5. Update `public/sitemap.xml`
- Add entry for the new URL

