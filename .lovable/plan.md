
## Add Albacross Tracking to Website

### What needs to be done
Add Albacross B2B company tracking and analytics by injecting two scripts:
1. Set the Albacross tracking ID: `window._nQc="89658243"`
2. Load the Albacross tracker script: `https://serve.albacross.com/track.js`

### Implementation approach
Add both scripts to `index.html` in the `<head>` section. This is the cleanest approach because:
- Albacross tracking should load as early as possible (before React renders)
- It needs global access (`window._nQc`)
- Head-based tracking is standard for third-party analytics

### Changes required
**`index.html`** (lines 10-11):
- Add a `<script>` tag to set `window._nQc="89658243"` 
- Add an async `<script>` tag to load `https://serve.albacross.com/track.js`
- Both should go in the `<head>` section after the favicon line

This enables Albacross tracking across the entire site without any React code changes.
