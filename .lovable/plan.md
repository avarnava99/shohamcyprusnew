

# Exness Partnership Page

## Overview
Create a clean, professional landing page at `/exness` that presents Shoham's services tailored for Exness. No sales fluff -- just a clear, well-structured overview of what we handle for them.

## Page Structure

### Hero Section
- Navy background, both logos side by side with "x" between them
- Headline: **"Logistics Services for Exness Cyprus"**
- One-liner: "From employee relocations to event logistics -- one team, one point of contact."

### Services Grid -- "What We Handle"
Six cards with Lucide icons, each with a short title + 3-4 bullet points:

1. **Employee Relocations** -- Customs clearance for transfer of residence, duty-free vehicle imports, personal effects shipping, paperwork handled end to end
2. **Packing & Removals** -- Professional packing for staff moving in or out, international door-to-door moves, temporary storage
3. **IT & Equipment Shipping** -- Networking gear, servers, office hardware, express and economy options, worldwide coverage
4. **Corporate Travel** -- Business travel bookings, group arrangements for events, airport transfers
5. **Event Logistics** -- Equipment transport for corporate events, exhibition stand shipping, on-site coordination
6. **Parcel Forwarding** -- Regular forwarding from UK/EU/US, office supply shipments, tracked delivery

### Bottom Section -- "Why Work With Us"
Simple 3-column stat/fact row: "Since 1946" | "Licensed Customs Broker" | "Island-wide Delivery"

### CTA
"Get in touch" button linking to `/contact-us`

## Technical Details

### Files:
1. **Copy** uploaded Exness logo to `src/assets/exness-logo.webp`
2. **Create** `src/pages/ExnessPartnership.tsx` -- Uses existing Layout component, follows the same design patterns as Services page (card grid, icon-based cards, navy hero banner)
3. **Update** `src/App.tsx` -- Add route `/exness` before the catch-all

### Design:
- Follows existing design system (navy hero, card grid, Lucide icons)
- Professional and understated -- no "partner of choice" language
- Responsive grid matching other pages
- Both logos displayed at appropriate sizing in the hero

