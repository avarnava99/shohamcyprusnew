

# Add "Door to Door Delivery from Italy to Cyprus of Out of Gauge Tank Units" Project

## Overview
Add a new project entry for the 2019 Italy-to-Cyprus tank units delivery with the 4 uploaded images.

## Steps

### 1. Copy 4 uploaded images to project assets
- `user-uploads://20190822_153843.jpg` -> `src/assets/projects/italy-tanks-1.jpg`
- `user-uploads://20190822_161853.jpg` -> `src/assets/projects/italy-tanks-2.jpg`
- `user-uploads://20190822_165830.jpg` -> `src/assets/projects/italy-tanks-3.jpg`
- `user-uploads://20190822_161803.jpg` -> `src/assets/projects/italy-tanks-4.jpg`

### 2. Update `src/data/projects.ts`
- Add 4 image imports
- Add new project entry:

```text
slug: "door-to-door-delivery-from-italy-to-cyprus-of-out-of-gauge-tank-units"
title: "Door to Door Delivery from Italy to Cyprus of Out of Gauge Tank Units"
subtitle: "Transportation of tanks from ex-works Italy to door delivery Larnaca, Cyprus"
description: "Transportation of tanks from ex-works Italy to door delivery Larnaca, Cyprus for a development in the electricity authority station."
fullDescription:
  - "Transportation of tanks from ex-works Italy to door delivery Larnaca, Cyprus for a development in the electricity authority station."
year: "2019"
location: "Italy -> Larnaca, Cyprus"
category: "Breakbulk"
images: [italyTanks1, italyTanks2, italyTanks3, italyTanks4]
```

### 3. No other changes needed
The project will automatically appear under the 2019 year group on `/project-cargo` and link to `/project-cargo/door-to-door-delivery-from-italy-to-cyprus-of-out-of-gauge-tank-units`.

