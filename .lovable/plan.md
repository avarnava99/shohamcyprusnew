

# Add "Mud Plant Discharge" Project with 4 Photos

## Overview
Add a new project entry for the 2016 discharging of mud plant equipment for Schlumberger's oil and gas drilling operations offshore Cyprus. The user uploaded 4 photos.

## Changes

### 1. Copy 4 images to `src/assets/projects/`
- `mudplant-equipment-discharge-1.webp` -> `mud-plant-discharge-1.webp`
- `mudplant-equipment-discharge-2.webp` -> `mud-plant-discharge-2.webp`
- `mudplant-equipment-discharge-3.webp` -> `mud-plant-discharge-3.webp`
- `mudplant-equipment-discharge-4.webp` -> `mud-plant-discharge-4.webp`

### 2. Update `src/data/projects.ts`
- Add 4 image imports at the top
- Insert new project entry in the projects array:
  - **Slug:** `mud-plant-discharge`
  - **Title:** Mud Plant Discharge
  - **Subtitle:** Discharging of mud plant equipment and vessel agency
  - **Description:** In 2016, we handled the discharging of mud plant equipment to be used in the oil and gas drilling offshore Cyprus on behalf of our client Schlumberger.
  - **fullDescription:** Split into 2 paragraphs:
    1. "In 2016, we handled the discharging of mud plant equipment to be used in the oil and gas drilling offshore Cyprus on behalf of our client. The equipment belonged to Schlumberger."
    2. "Schlumberger is the world's leading provider of technology for reservoir characterization, drilling, production, and processing to the oil and gas industry."
  - **Year:** 2016
  - **Location:** Limassol Port
  - **Category:** Oil & Gas
  - **Images:** all 4 images

