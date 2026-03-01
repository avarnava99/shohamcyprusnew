

# Add "Silos Shipping" Project

## Overview
Add a new project entry for Silos Shipping (2017) with the 5 uploaded images to the project cargo portfolio.

## Steps

### 1. Copy 5 uploaded images to project assets
- `shipment-of-silos-to-Limassol-e1566050785446.webp` -> `src/assets/projects/silos-shipping-1.webp`
- `shipment-of-silos-to-Limassol-2.webp` -> `src/assets/projects/silos-shipping-2.webp`
- `shipment-of-silos-to-Limassol-3.webp` -> `src/assets/projects/silos-shipping-3.webp`
- `shipment-of-silos-to-Limassol-4.webp` -> `src/assets/projects/silos-shipping-4.webp`
- `shipment-of-silos-to-Limassol-5.webp` -> `src/assets/projects/silos-shipping-5.webp`

### 2. Update `src/data/projects.ts`
- Add 5 image imports
- Add new project entry:

```text
slug: "silos-shipping"
title: "Silos Shipping"
subtitle: "Shipment of out of gauge Silos from Netherlands to Cyprus"
description: "Shipment of out of gauge Silos from Netherlands to Cyprus."
fullDescription:
  - "In 2017 we organised a shipment of three out of gauge silos from Netherlands to door delivery to our client in Cyprus."
  - "The shipment was effected on a RO/RO vessel."
  - "The scope of work was to collect the silos from Netherlands, transport to the port of loading, load on a RO/RO vessel and ship to Limassol."
  - "The cargo was cleared and delivered to the final destination in Cyprus."
year: "2017"
location: "Netherlands -> Limassol, Cyprus"
category: "Breakbulk"
images: [silosShipping1..5]
```

### 3. No other changes needed
The project will automatically appear under 2017 on `/project-cargo` and link to `/project-cargo/silos-shipping`.

