

# Fix All GSC Broken URLs & Missing Redirects

## Problem
The GSC data shows ~370 indexed URLs. Many high-traffic URLs currently hit 404 or "Section Not Found" pages because they lack redirects. The #2 most-clicked URL on the entire site (31 clicks/week, 835 impressions) is completely broken.

## Critical Fix: Broken #2 Page
`/zim-agency-in-cyprus/track-container-eurogate-limassol-cyprus/` gets 31 clicks and 835 impressions weekly but shows "Section Not Found" because the slug `track-container-eurogate-limassol-cyprus` is not in the `sectionsData` map in `ZimSectionPage.tsx`. This needs a redirect to `/services/container-tracking`.

## Changes: `src/App.tsx` -- Add ~25 missing redirects

All new redirects grouped by priority:

**High traffic (clicks + high impressions):**
- `/zim-agency-in-cyprus/track-container-eurogate-limassol-cyprus` → `/services/container-tracking` (31 clicks)
- `/direct-container-service-from-uk-and-europe-to-limassol-port-zim` → `/zim-agency-in-cyprus` (2 clicks, 25 imp)
- `/shipping-rates-from-germany-to-cyprus` → `/ecommerce-purchases-from-germany` (1 click, 109 imp)
- `/list-of-vessels-calling-limassol` → `/port-agency/ports-in-cyprus/limassol-port` (1 click, 20 imp)
- `/pallet-load-calculator` → `/quote` (1 click, 13 imp)
- `/ship-a-parcel-to-cyprus` → `/services/parcel-forwarding` (1 click, 7 imp)
- `/flight-schedule-larnaca-to-athens` → `/travel-agency` (1 click)

**Sub-path catches (impressions, currently 404):**
- `/services/car-shipping-from-uk-to-cyprus/*` → `/services/car-shipping-from-uk-to-cyprus` (covers `import-tesla-car-to-cyprus`, `location-points-for-car-collection`)
- `/services/customs-clearing/transfer-of-normal-residence-from-a-country-outside-the-european-union-to-cyprus` → `/services/customs-clearing`

**Medium impressions (0 clicks but indexed):**
- `/ecommerce-shopify-cyprus-store` → `/services` (90 imp)
- `/shipping-rates-for-pallets-to-cyprus` → `/quote` (36 imp)
- `/40-foot-container-dimensions` → `/container-types` (7 imp)
- `/20-foot-container-dimensions` → `/container-types` (3 imp)
- `/airline-representation` → `/travel-agency` (5 imp)
- `/container-equipment` → `/container-types` (1 imp)
- `/warehousing` → `/services` (1 imp)
- `/car-rates` → `/services/car-shipping-from-uk-to-cyprus` (1 imp)
- `/searates` → `/quote` (1 imp)
- `/location` → `/contact-us` (2 imp)
- `/moni-anchorage` → `/port-agency/ports-in-cyprus/limassol-port` (4 imp)
- `/limassol-anchorage` → `/port-agency/ports-in-cyprus/limassol-port` (3 imp)
- `/sea-freight-import-to-cyprus` → `/services/sea-freight` (2 imp)
- `/sea-freight-exports-from-cyprus` → `/services/sea-freight` (1 imp)
- `/container-shipping-from-cyprus` → `/services/sea-freight` (7 imp)
- `/car-export-from-cyprus` → `/services/car-shipping-from-uk-to-cyprus` (1 imp)
- `/exporting-from-cyprus` → `/services` (5 imp)
- `/login` (without trailing slash) -- already works via `/login` route

### Files to modify
1. `src/App.tsx` -- add ~25 redirect routes before the `*` catch-all

