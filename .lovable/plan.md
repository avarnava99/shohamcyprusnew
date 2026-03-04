

## Add Ahrefs Analytics to Cookie Consent

Simple addition: add Ahrefs as an analytics tracking script, loaded dynamically alongside GA4 when the user accepts the "Analytics" cookie category.

### Changes

**`src/components/CookieConsent.tsx`**
- Add `loadAhrefs()` function that dynamically injects `<script src="https://analytics.ahrefs.com/analytics.js" data-key="zmhjHwtMhVC/sv3Mi4QmPg" async>` (guarded by element ID check like the others)
- Call `loadAhrefs()` inside `updateConsent()` when `consent.analytics` is true

**`src/components/CookiePreferencesModal.tsx`**
- Update the Analytics label to mention Ahrefs: `"Analytics (Google Analytics, Ahrefs)"`

No other files need changes -- Ahrefs falls under the existing "Analytics" consent category.

