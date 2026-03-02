

# Add "MOU with Customs" Page and Menu Item

## Overview
Create a new page at `/about-us/general-information/mou-with-customs` following the exact same pattern as the existing CSA page, and add it to the header dropdown under "About Us".

## Changes

### 1. Copy uploaded image
- Copy `user-uploads://CUSTOMS-CYPRUS-MOU-WITH-AGENTS.webp` to `src/assets/customs-cyprus-mou.webp`

### 2. New page: `src/pages/MouWithCustoms.tsx`
- Mirror the layout of `CyprusShippingAssociation.tsx` (navy hero, back link, content + sidebar)
- Display the uploaded Cyprus coat of arms image
- Include the MOU text about the agreement between CSA and Cyprus Customs for prevention of illegal substance trade
- SEO component with appropriate title, description, and canonical path

### 3. Update `src/App.tsx`
- Import `MouWithCustoms` component
- Add route `/about-us/general-information/mou-with-customs` before the existing wildcard redirect

### 4. Update `src/components/layout/Header.tsx`
- Add `{ label: "MOU with Customs", href: "/about-us/general-information/mou-with-customs" }` to the `children` array of the "About Us" nav item

### 5. Update `public/sitemap.xml`
- Add entry for the new URL

