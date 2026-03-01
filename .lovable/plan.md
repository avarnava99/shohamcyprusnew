

# Add "Oil & Gas Casing Joints" Project

## Overview
Add a new project for the 2017 casing joints shipping from Karachi to Limassol, with 3 uploaded images.

## Steps

### 1. Copy 3 uploaded images to project assets
- `user-uploads://casing-joints-2_0.webp` -> `src/assets/projects/casing-joints-1.webp`
- `user-uploads://casing-joints00.webp` -> `src/assets/projects/casing-joints-2.webp`
- `user-uploads://unloading-oil-gas-equipment-pipes.webp` -> `src/assets/projects/casing-joints-3.webp`

### 2. Update `src/data/projects.ts`
- Add 3 image imports at the top
- Add new project entry to the array:

```text
slug: "casing-joints"
title: "Oil & Gas Casing Joints"
subtitle: "Shipping of 160 casing joints (pipes) from Karachi, Pakistan to Limassol, Cyprus"
description: "Shipping of 160 casing joints (pipes) from Karachi, Pakistan to Limassol, Cyprus."
fullDescription:
  - "In November 2017 we chartered a vessel for our client and successfully shipped 160 casing joints (pipes) to Limassol, Cyprus from Karachi, Pakistan in time for a drilling exploration offshore Cyprus."
  - "These casings were used during ENI's drilling exploration in December 2017."
  - "Discharged at DP World terminal West side quay."
year: "2017"
location: "Karachi, Pakistan -> Limassol, Cyprus"
category: "Oil & Gas"
images: [casingJoints1, casingJoints2, casingJoints3]
```

### 3. No other changes needed
The project will automatically appear under the 2017 year group on `/project-cargo` and link to `/project-cargo/casing-joints`.

