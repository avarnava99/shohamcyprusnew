

# Fix "Online Rates" Button Transparency

## Problem
The "Online Rates" button in the Hero section shows a white background instead of being transparent. The `outline` variant applies `bg-background` (white), which overrides the `bg-transparent` class due to CSS specificity.

## Fix

### `src/components/home/Hero.tsx` (line 28)
- Change `bg-transparent` to `!bg-transparent` to ensure it takes priority over the variant's `bg-background`
- Also add `!border-white` and `!text-white` for safety

This is a one-line change on the Button's className.

