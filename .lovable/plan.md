

# Add "Generators for Plant" Project with Photos

## Overview
Add a new project entry for the 2010 generators delivery to Dhekelia Power Station, along with 5 unique uploaded photos (images 5 and 6 appear identical, so one will be skipped).

## Changes

### 1. Copy 5 images to `src/assets/projects/`
- `generators-for-Dhekelia-power-station-1.webp` -> `dhekelia-generators-1.webp`
- `generators-for-Dhekelia-power-station-2.webp` -> `dhekelia-generators-2.webp`
- `generators-for-Dhekelia-power-station-3.webp` -> `dhekelia-generators-3.webp`
- `generators-for-Dhekelia-power-station-4-e1566051548398.webp` -> `dhekelia-generators-4.webp`
- `generators-for-Dhekelia-power-station-6.webp` -> `dhekelia-generators-5.webp`

Image 5 is skipped as it's identical to image 6.

### 2. Update `src/data/projects.ts`
- Add 5 image imports
- Insert new project entry for year 2010 (between the 2009 Chimney Sections and 2012 entries):
  - **Slug:** `generators-for-electricity-plant`
  - **Title:** Generators for Plant
  - **Subtitle:** Stevedoring and logistics handling of 4 heavy generators
  - **Description:** In 2010 we undertook the stevedoring and logistics handling of 4 heavy generators. The units were 2 x 68 tons and 2 x 295 tons generators. The generators were destined for the Dhekelia Electricity Authority Station.
  - **Year:** 2010
  - **Location:** Dhekelia, Cyprus
  - **Category:** Heavy Lift
  - **Images:** all 5 images

