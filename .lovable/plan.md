

# Equalize Logo Sizes on Exness Page

## Change
In `src/pages/ExnessPartnership.tsx`, update the Shoham logo height classes to match the Exness logo sizing, so both logos appear the same size in the hero section.

## Technical Detail
- Line 93: Change Shoham logo from `h-14 md:h-20` to `h-10 md:h-16` (matching Exness logo)
- This gives both logos identical height constraints so they appear balanced side by side

