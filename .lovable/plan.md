

# Add "Drilling Equipment" Project with 10 Photos

## Overview
Add a new project entry for the 2014 evacuation of drilling and mooring equipment used by Noble Energy in Cyprus's first natural gas exploration, with 10 uploaded photos. The photos span from September 2013 (import) through January 2014 (export).

## Changes

### 1. Copy 10 images to `src/assets/projects/`
Rename uploaded files to follow existing naming convention:
- `drilling-and-mooring-equipment-import-cyprus-1.webp` through `10.webp` -> `drilling-equipment-1.webp` through `drilling-equipment-10.webp`

### 2. Update `src/data/projects.ts`
- Add 10 image imports at the top
- Insert new project entry in the projects array:
  - **Slug:** `drilling-equipment`
  - **Title:** Drilling Equipment
  - **Subtitle:** Evacuation of drilling and mooring equipment for Noble Energy
  - **Description:** In January 2014 we arranged the evacuation of drilling and mooring equipment back to the point of origin. The equipment were used by Noble Energy in the first ever drilling exploration for natural gas offshore Cyprus.
  - **fullDescription:** Split into 3 paragraphs:
    1. "In January 2014 we arranged with the evacuation of drilling and mooring equipment of our customers back to the point of origin."
    2. "The equipment were used by Noble Energy in the first ever drilling exploration for natural gas offshore Cyprus."
    3. "In 2013 the same equipment were also handled by us in the import side and a vessel was chartered to import the equipment from Alexandria to Limassol in the time frame requested."
  - **Year:** 2014
  - **Location:** Limassol Port
  - **Category:** Oil & Gas
  - **Images:** all 10 images

