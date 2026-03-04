

## Cookie Consent Banner (GDPR/Google Compliance)

### What It Does
A bottom banner that blocks Google Analytics and Albacross tracking scripts until the user explicitly accepts cookies. This satisfies Google's consent mode requirements and EU/GDPR regulations.

### How It Works

**1. Move tracking scripts from `index.html` into React control**
- Remove the GA4 and Albacross `<script>` tags from `index.html`
- Instead, load them dynamically in JavaScript only after consent is granted

**2. Create `src/components/CookieConsent.tsx`**
- A fixed bottom banner with "Accept All", "Reject All", and "Manage Preferences" options
- Categories: Essential (always on), Analytics (GA4), Marketing (Albacross)
- Stores consent in `localStorage` as a JSON object
- On accept: dynamically injects GA4 and Albacross scripts + sets `gtag('consent', 'update', ...)` with Google Consent Mode v2
- On reject: scripts never load; sets consent mode to `denied`
- Banner only shows if no prior consent decision exists

**3. Google Consent Mode v2 integration**
- Add a default consent snippet in `index.html` that sets all consent signals to `denied` before any tags fire
- On user acceptance, update consent signals to `granted` -- GA4 respects this natively

**4. Add to `Layout.tsx`**
- Render `<CookieConsent />` alongside the existing `<ChatWidget />`

**5. Privacy Policy link**
- Banner includes a link to `/about-us/privacy-policy` (already exists)

### Files to Modify
- **`index.html`** -- Replace tracking scripts with Google Consent Mode v2 default snippet
- **`src/components/CookieConsent.tsx`** -- New component (banner UI + script injection logic)
- **`src/components/layout/Layout.tsx`** -- Import and render `<CookieConsent />`

