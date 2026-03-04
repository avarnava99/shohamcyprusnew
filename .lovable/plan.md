

# Restore Marine Insurance Page

## What exists already
- Content for `marine-insurance` is fully defined in `ServicePage.tsx` (lines 116-125)
- The Services page and Footer already link to `/services/marine-insurance`
- The sitemap already includes this URL
- However, `App.tsx` line 138 redirects `/services/marine-insurance` to `/services`, preventing the page from rendering

## Changes

### 1. Update `src/App.tsx`
- Remove line 138: the redirect `<Route path="/services/marine-insurance" element={<Navigate to="/services" replace />} />`
- The generic `<Route path="/services/:slug" element={<ServicePage />} />` route (line 91) will then handle it automatically

That is the only change needed — everything else (content, links, sitemap, breadcrumbs) is already in place.

