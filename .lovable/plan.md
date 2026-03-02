

# Fix YouTube Icon Overlapping in Footer

## Problem
The five social media icons in the footer's "Follow Us" section overflow the available column width, causing the YouTube icon to overlap with adjacent content.

## Solution
Change the social icons container from `flex gap-3` to `flex flex-wrap gap-3` so that icons wrap to a second row on narrow columns instead of overflowing.

## Technical Detail
- **File**: `src/components/layout/Footer.tsx`, line 78
- Change: `<div className="flex gap-3">` to `<div className="flex flex-wrap gap-3">`

