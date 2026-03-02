

# Add Cyprus Shipping Association Page

## What will be built
A new page at `/about-us/general-information/cyprus-shipping-association` showcasing Shoham's membership in the CSA, using the original WordPress URL to preserve SEO.

## Changes

### 1. Copy uploaded images to project
- `CSA-wheel.webp` to `src/assets/csa-wheel.webp`
- `cyprus-shipping-association.webp` to `src/assets/cyprus-shipping-association.webp`

### 2. New page: `src/pages/CyprusShippingAssociation.tsx`
- Follow the same layout pattern as `About.tsx` (navy hero banner, content area with sidebar)
- Display both CSA logos prominently
- Include the provided content about CSA membership, standards, and history
- SEO component with title, description, canonical, and path
- Back link to About Us

### 3. Update `src/App.tsx`
- Add route: `/about-us/general-information/cyprus-shipping-association`
- Remove or adjust the existing wildcard redirect `/about-us/general-information/*` so it doesn't shadow the new page (the specific route must come before the wildcard)

### 4. Update `src/pages/About.tsx`
- Add a mention/link in the "Professional Affiliations" section pointing to the CSA page

### 5. Update `public/sitemap.xml`
- Add entry for the new URL

## Technical Details

The existing wildcard redirect `<Route path="/about-us/general-information/*" element={<Navigate to="/about-us" replace />} />` currently catches all `/about-us/general-information/` paths. The new specific route must be placed **before** that wildcard in App.tsx so React Router matches it first.

