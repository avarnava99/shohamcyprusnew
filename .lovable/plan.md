

# SEO Optimization: 3 High-Impact Changes

Based on the GSC query data, three actions will recover the most lost traffic.

---

## 1. Fix Used Containers meta (45 impressions, 0 clicks at pos 3.4)

**File:** `src/pages/UsedContainers.tsx`

Update the SEO component:
- Title: `"Shipping Containers for Sale in Cyprus | New & Used"` (targets "shipping container cyprus")
- Description: `"Buy new and used shipping containers in Cyprus. 20ft and 40ft containers available for sale, storage, and conversion. Competitive prices with island-wide delivery."`

This targets the exact query "shipping container cyprus" that's getting 45 impressions at position 3.4 with 0 clicks -- a better title/description should convert impressions to clicks.

---

## 2. Optimize Amazon UK page for "amazon cyprus" cluster (404 impressions at pos 10.9)

**File:** `src/pages/AmazonUK.tsx`

- Update SEO title to: `"Amazon Cyprus Delivery | Shop Amazon UK & Ship to Cyprus"`
- Update meta description to: `"Does Amazon deliver to Cyprus? Shop from Amazon UK and get your purchases shipped to Cyprus with our door-to-door parcel forwarding service. Fast delivery, customs handled."`
- Update H1 to: `"Amazon Cyprus Delivery — Shop & Ship from Amazon UK"`
- Add FAQ section at bottom targeting exact GSC queries:
  - "Does Amazon deliver to Cyprus?"
  - "How to order from Amazon UK to Cyprus?"
  - "How long does Amazon UK delivery to Cyprus take?"
  - "Is there Amazon Prime in Cyprus?"
- Add `faqJsonLd` structured data for the FAQ section

This targets: "amazon cyprus" (404 imp), "amazon cyprus delivery" (35 imp), "does amazon deliver to cyprus" (11 imp), "amazon uk to cyprus" (7 imp).

---

## 3. Create dedicated Parcel Forwarding SEO page

**File:** `src/pages/services/ParcelForwardingCyprus.tsx` (new)

Currently `/services/parcel-forwarding` uses the generic `ServicePage` with a thin bullet-point list. Create a rich content page targeting the parcel cluster:
- "send parcel to cyprus" (30 imp, pos 52)
- "parcel to cyprus" (18 imp, pos 59)
- "parcel delivery to cyprus" (10 imp)
- "cheap parcel to cyprus" (8 imp)
- "send package to cyprus" (11 imp)

Content: H1 "Send a Parcel to Cyprus", step-by-step guide, pricing factors, FAQ section, service JSON-LD.

**File:** `src/App.tsx` -- Add route for new page, keeping existing `/services/parcel-forwarding` path.

---

## Files

| Action | File |
|--------|------|
| Modify | `src/pages/UsedContainers.tsx` (meta title + description only) |
| Modify | `src/pages/AmazonUK.tsx` (title, H1, description, add FAQ section + JSON-LD) |
| Create | `src/pages/services/ParcelForwardingCyprus.tsx` |
| Modify | `src/App.tsx` (add route for parcel page) |

