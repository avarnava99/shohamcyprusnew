

# Add "Mobile Crane Shipping" Project

## Overview
Add a new project entry for Mobile Crane Shipping (2016) with the 6 uploaded images, a detail page with gallery, and proper slug matching the original WordPress URL.

## Steps

### 1. Copy uploaded images to project assets
Copy all 6 images to `src/assets/projects/`:
- `shipping-of-mobile-crane-and-equipment-1.webp` through `shipping-of-mobile-crane-and-equipment-6.webp`

### 2. Update `src/data/projects.ts`
- Add 6 new image imports at the top of the file
- Add a new project entry in the `projects` array with year "2016", placed near the other 2016 projects:

```text
slug: "mobile-crane-shipping"
title: "Mobile Crane Shipping"
subtitle: "Chartering of vessel for shipping Mobile Crane and Containers for an oil & gas project"
description: "Chartering of vessel for shipping Mobile Crane and Containers for an oil & gas project"
fullDescription: [
  "In 2016, we chartered a vessel on behalf of our client Medserv to ship their Mobile Crane
   and other equipment to Sines, Portugal for an oil & gas project."
]
year: "2016"
location: "Limassol → Sines, Portugal"
category: "Chartering"
images: [all 6 images]
```

### 3. No other file changes needed
The Projects listing page and ProjectDetailPage already handle rendering based on the data array -- the new project will automatically appear under the 2016 year group and link to `/project-cargo/mobile-crane-shipping`.

