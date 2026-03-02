

# Fix Duplicate Images in Main Services Grid

## Problem
Two pairs of service cards share the same image:
- **Port Agency** and **Project Cargo** both use `port-agency.jpg`
- **Freight Forwarding** and **Customs Clearing** both use `service-freight.jpg`

## Solution
Use existing assets that are already in the project but not being used on this component:

1. **Project Cargo**: Switch from `port-agency.jpg` to one of the project cargo photos (e.g., `src/assets/projects/vassilikos-power-1.jpg` -- a dramatic heavy-lift photo that represents project cargo well)
2. **Customs Clearing**: Switch from `service-freight.jpg` to `src/assets/service-customs.jpg` (already exists and is purpose-made for customs)

## Technical Changes

**File: `src/components/home/MainServices.tsx`**
- Add import for `service-customs.jpg` and a project cargo image
- Update the `services` array entries for "Project Cargo" and "Customs Clearing" to reference the new images

No new assets need to be created or downloaded -- everything needed is already in the project.
