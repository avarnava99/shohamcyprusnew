

# Redirect Plan: Preserve SEO Traffic from WordPress URLs

## The Problem

Your Google Search Console data shows **2,161 clicks over 3 months** going to your WordPress URLs. When you switch to the new site, many of these URLs will return 404 errors because the URL structure has changed. This means lost traffic and lost Google rankings.

## Top URLs at Risk (by clicks)

| Old WordPress URL | Clicks | New Site Equivalent |
|---|---|---|
| `/car-import-duty-calculation/` | 139 | `/services/customs-clearing/duty-calculator-for-cyprus` |
| `/port-agency/ports-in-cyprus/limassol-port/limassol-port-eurogate-schedule/` | 116 | Eurogate schedule page |
| `/about-us/contact-us/` | 32 | `/contact-us` |
| `/car-registration/` | 33 | Customs clearing page |
| `/about-us/contact-us/careers/` | 25 | `/contact-us` |
| `/tag/car-duty-calculator/` | 22 | `/services/customs-clearing/duty-calculator-for-cyprus` |
| `/services/car-shipping-from-uk-to-cyprus/` | 19 | `/services/car-shipping-from-uk-to-cyprus` |
| `/travel-agency/` (with trailing slash variations) | 15 | `/travel-agency` |
| `/tag/amazon-cyprus/` | 14 | `/online-purchases-shipped-to-cyprus-from-amazon-uk` |
| `/services/parcel-forwarding/` | 14 | `/services/parcel-forwarding` |
| `/services/air-freight-cyprus/` | 10 | `/services/air-freight` |
| `/home-2/` | 9 | `/` |
| `/opl-limassol-services-...` | 9 | `/port-agency` |
| `/tracking/` + `/container-tracking-platform/` | 10 | `/services/container-tracking` |
| `/drydock-service/` | 6 | `/port-agency` |
| `/why-ispm-15-certification-matters.../` | 2 clicks, **1,397 impressions** | `/blog` |

Plus hundreds of `/tag/*`, `/category/*`, `/product-tag/*`, `/product-category/*`, `/news/*` pages with significant impressions.

## The Solution

Add **301 redirects** (permanent redirects) using React Router's `Navigate` component in `App.tsx`. This tells Google "this page has permanently moved here" and transfers the SEO value.

### Implementation Steps

**1. Add specific redirect routes in `App.tsx`** for the highest-traffic old URLs:

```text
/car-import-duty-calculation       -->  /services/customs-clearing/duty-calculator-for-cyprus
/car-registration                  -->  /services/customs-clearing
/about-us/contact-us               -->  /contact-us
/about-us/contact-us/careers       -->  /contact-us
/home-2                            -->  /
/tracking                          -->  /services/container-tracking
/container-tracking-platform       -->  /services/container-tracking
/drydock-service                   -->  /port-agency
/services/air-freight-cyprus       -->  /services/air-freight
/services/travel-agency            -->  /travel-agency
/services/marine-logistics         -->  /port-agency
/services/marine-insurance         -->  /services
/services/cross-shipments-and-dropshipping  -->  /services
/services/freight-forwarder-cyprus  -->  /services/freight-forwarding
/services/sea-freight-cyprus       -->  /services/sea-freight
/services/car-shipping-from-uk-to-cyprus/*  -->  /services/car-shipping-from-uk-to-cyprus
/services/find-online-shipping-rates-cyprus -->  /quote
/services/ship-parcel-to-cyprus    -->  /services/parcel-forwarding
/services/customs-clearing/transfer-of-normal-residence...  -->  /services/customs-clearing
/services/parcel-forwarding/online-purchases-from-uk  -->  /online-purchases-shipped-to-cyprus-from-amazon-uk
/services/parcel-forwarding/e-commerce-purchases-from-germany-amazon-de  -->  /ecommerce-purchases-from-germany
/services/parcel-forwarding/online-purchases-shipped-from-usa-to-cyprus  -->  /ecommerce-purchases-from-usa
/services/container-tracking-for-multiple-shipping-lines  -->  /services/container-tracking
/port-agency/ports-in-cyprus/limassol-port/*  -->  /port-agency/ports-in-cyprus/limassol-port
/port-agency/ports-in-cyprus/limassol-port-cruise-terminal  -->  /port-agency/ports-in-cyprus/limassol-port
/port-agency/ports-in-cyprus/limassol-port-anchorage  -->  /port-agency/ports-in-cyprus/limassol-port
/port-agency/ports-in-cyprus/dhekelia-oil-terminal  -->  /port-agency/ports-in-cyprus/vassiliko-oil-terminal
/port-agency/ports-in-cyprus/larnaca-oil-terminal  -->  /port-agency/ports-in-cyprus/larnaca-port
/port-agency/ports-in-cyprus/raf-akrotiri-oil-terminal  -->  /port-agency/ports-in-cyprus
/port-agency/yacht-agency/*        -->  /port-agency
/port-agency/vessel-repairs        -->  /port-agency
/port-agency/change-of-ownership   -->  /port-agency
/port-agency/owners-protecting-agency  -->  /port-agency
/about-us/general-information/*    -->  /about-us
/zim-agency-in-cyprus/zim-sailing-schedules/*  -->  /zim-agency-in-cyprus/zim-sailing-schedules
/zim-agency-in-cyprus/track-your-cargo  -->  /services/container-tracking
```

**2. Add wildcard catch-all redirects** for WordPress pattern URLs:

```text
/tag/*              -->  /blog
/category/*         -->  /blog
/product-tag/*      -->  /services
/product-category/* -->  /services
/news/*             -->  /blog
/shop/*             -->  /services/used-containers
```

**3. Specific blog post redirects** for high-impression articles:

```text
/why-ispm-15-certification-matters-for-your-cargo  -->  /blog
/moving-to-cyprus-reliefs-for-transferring-your-normal-residence  -->  /services/customs-clearing
/what-is-an-eur1-certificate  -->  /services/customs-clearing
/opl-limassol-services-*  -->  /port-agency
```

**4. Improve the NotFound page** to suggest relevant pages instead of a dead end, in case any old URL slips through.

### Technical Details

- All redirects will use `<Navigate to="..." replace />` from `react-router-dom`
- These are client-side redirects (since this is a SPA). They work for users clicking links and for Google's crawler
- The redirects will be added as `<Route>` elements before the catch-all `*` route
- Approximately 50-60 redirect routes will be added to `App.tsx`, organized in a clean redirects section

### Files to Change

- **`src/App.tsx`** -- Add all redirect routes
- **`src/pages/NotFound.tsx`** -- Improve with suggested links to popular pages

