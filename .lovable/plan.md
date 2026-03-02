

# Add Change of Ownership Page

## Overview
Replace the current redirect at `/port-agency/change-of-ownership` with a dedicated page featuring the user's custom content and the uploaded vessel image.

## Changes

### 1. Copy uploaded image
- Copy `user-uploads://combi-dock-iii-change-of-vessel-ownership.webp` to `src/assets/combi-dock-iii.webp`

### 2. Create `src/pages/ChangeOfOwnership.tsx`
- Layout matching other port-agency subpages (navy hero with back link, two-column content with sidebar)
- Hero with FileText icon, title "Change of Ownership", subtitle "Vessel Ownership Transfer at Limassol"
- Content: the provided text about Limassol anchorage advantages, available classes (DNV GL, Lloyds, Dromon), diving inspections, repairs, crew regulations, provisions, and the Combi Dock III example
- The uploaded vessel photo displayed with caption
- Sidebar with ContactBox
- SEO component with path `/port-agency/change-of-ownership`

### 3. Update `src/App.tsx`
- Import the new `ChangeOfOwnership` component
- Replace the redirect on line 163 (`/port-agency/change-of-ownership` -> `/port-agency`) with the actual page route

### 4. Update `public/sitemap.xml`
- Add entry for `/port-agency/change-of-ownership`

No header/footer changes needed -- the link already exists in both navigation menus.

