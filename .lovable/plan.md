
## Add Google Analytics 4 to Website

### Current State
- Albacross B2B tracking is already integrated
- Custom analytics dashboard exists (pulls from edge function)
- No Google Analytics (GA4) is currently configured

### What Google Analytics provides
- Detailed audience insights and behavior tracking
- Conversion tracking and goal measurement
- Real-time reporting and audience segmentation
- Integration with Google Search Console and Google Ads

### Implementation Approach
Add Google Analytics 4 measurement ID to `index.html` using the standard GA4 script tag pattern. This provides:
1. Out-of-the-box page view tracking
2. Automatic event tracking
3. User behavior analytics
4. No impact on existing Albacross tracking (both run independently)

### Files to Modify
**`index.html`** (after Albacross scripts):
- Add GA4 script tags with measurement ID (GA-XXXXXXXXX format)
- Includes both the gtag inline script and async tag script

### Next Steps After Implementation
- User provides their GA4 measurement ID or creates a new property
- Verify tracking is active in Google Analytics real-time report
- Optionally customize events or cross-domain tracking
