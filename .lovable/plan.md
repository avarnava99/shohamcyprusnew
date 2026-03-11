

# Add Forward2Me Affiliate Link to Parcel Forwarding Pages

## Overview
Add the Forward2Me affiliate banner to all parcel-related pages, clearly labeled as a recommended third-party partner (not a Shoham service).

## Pages to update
1. `src/pages/services/ParcelForwardingCyprus.tsx` — main parcel page
2. `src/pages/AmazonUK.tsx` — Amazon UK to Cyprus
3. `src/pages/EcommerceGermany.tsx` — Germany to Cyprus
4. `src/pages/EcommerceUSA.tsx` — USA to Cyprus

## Implementation
- Add a styled affiliate banner card on each page with:
  - A "Partner Service" or "Recommended Partner" label/badge
  - The Forward2Me logo (linked with the affiliate URL)
  - Brief text: "Need a UK forwarding address? Forward2Me is a trusted UK-based parcel forwarding service we recommend."
  - Clear visual distinction (e.g. dashed border, "External Service" note) so visitors understand it's not Shoham's own service
- **Placement**: In the sidebar on `ParcelForwardingCyprus.tsx`, and inline on the other pages near the "how it works" or shipping section
- The affiliate link opens in a new tab with `rel="noopener noreferrer sponsored"`

## Files
| Action | File |
|--------|------|
| Modify | `src/pages/services/ParcelForwardingCyprus.tsx` |
| Modify | `src/pages/AmazonUK.tsx` |
| Modify | `src/pages/EcommerceGermany.tsx` |
| Modify | `src/pages/EcommerceUSA.tsx` |

