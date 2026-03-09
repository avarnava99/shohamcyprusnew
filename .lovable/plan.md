

# SEO Content Optimization for Dropped Keywords

## Problem
Three keywords lost rankings or dropped out entirely:
1. **"freight forwarder"** (CY) -- dropped OUT, URL was `shoham.com.cy` (generic)
2. **"car shipping from uk"** (CY) -- dropped OUT, URL was `/services/car-shipping-from-uk-to-cyprus` which redirects to itself (loop bug)
3. **"air freight"** (CY) -- dropped from pos 2 to 3, URL is `/services/air-freight-cyprus` which redirects to `/services/air-freight` (page titled "Air Cargo" instead of "Air Freight")

## Changes

### 1. Create dedicated rich content pages (3 new page files)

Instead of thin bullet-point service pages, create standalone SEO-optimized pages with 800+ words, proper heading structure, FAQ sections, and JSON-LD structured data.

**`src/pages/services/FreightForwarderCyprus.tsx`**
- H1: "Freight Forwarder in Cyprus"
- Rich content: 60+ years experience, import/export procedures, door-to-door, LCL/FCL, documentation
- FAQ section (5-6 questions targeting long-tail keywords)
- Service JSON-LD structured data
- Meta description targeting "freight forwarder cyprus"

**`src/pages/services/CarShippingUK.tsx`**
- H1: "Car Shipping from UK to Cyprus"
- Rich content: RoRo vs container, transit times, costs, insurance, customs duty process, step-by-step guide
- FAQ section targeting "how to ship car from uk to cyprus", "car shipping cost uk to cyprus"
- Link to the Duty Calculator
- Service JSON-LD structured data

**`src/pages/services/AirFreightCyprus.tsx`**
- H1: "Air Freight Cyprus" (fix the title mismatch from "Air Cargo")
- Rich content: express services, worldwide network, door-to-airport, customs clearance, perishables, dangerous goods
- FAQ section
- Service JSON-LD structured data

### 2. Fix routes in `src/App.tsx`

- Remove the self-redirect loop on line 144 (`/services/car-shipping-from-uk-to-cyprus/*` redirecting to itself)
- Add direct routes for the 3 new pages at their SEO-canonical URLs:
  - `/services/freight-forwarding` -- point to new `FreightForwarderCyprus` component (replaces generic ServicePage)
  - `/services/car-shipping-from-uk-to-cyprus` -- point to new `CarShippingUK` component
  - `/services/air-freight-cyprus` -- point to new `AirFreightCyprus` (remove redirect to `/services/air-freight`)
  - `/services/air-freight` -- redirect to `/services/air-freight-cyprus` (reverse the current redirect)
- Keep `/services/car-shipping` in ServicePage for the generic version
- Update `/services/freight-forwarder-cyprus` redirect to point to `/services/freight-forwarding`

### 3. Update `src/components/SEO.tsx`

- Add a `serviceJsonLd` helper for Service schema markup (similar to existing `blogPostJsonLd`)

### 4. Update internal links

- In `src/pages/Services.tsx`: update Air Freight link text and href
- In `src/components/home/MainServices.tsx`: no changes needed (doesn't link to these pages)

### Files to create
1. `src/pages/services/FreightForwarderCyprus.tsx`
2. `src/pages/services/CarShippingUK.tsx`
3. `src/pages/services/AirFreightCyprus.tsx`

### Files to modify
1. `src/App.tsx` -- fix routes and redirect loop
2. `src/components/SEO.tsx` -- add `serviceJsonLd` helper
3. `src/pages/Services.tsx` -- update air freight link

