

## Why the Analytics Dashboard Shows No Data

The admin analytics dashboard calls a backend function (`get-analytics`) that tries to fetch data from `https://api.lovable.dev/v1/projects/.../analytics` -- but this API endpoint returns **404 Not Found**. That's why all metrics show zero.

Your published site **does** have real visitor data (I verified: 117 visitors, 311 pageviews in February alone, with 77 visitors today). The data exists, but the backend function can't reach it because the API URL it uses doesn't work.

### Root Cause
The edge function `get-analytics` was built assuming a Lovable analytics API at `api.lovable.dev` that doesn't exist as a public endpoint.

### Recommended Fix

Since you now have **Google Analytics (G-RWD1S131V7)** integrated, which provides far more detailed data (audience segments, conversion tracking, real-time reports, Search Console integration), the best approach is:

1. **Remove the broken Visitor Analytics section** from the admin dashboard (the cards, chart, and breakdown panels that all show zeros)
2. **Replace it with a link/card** pointing to your Google Analytics dashboard for real analytics
3. Keep the Quick Actions section (Contact Submissions, Container Orders, etc.) which works correctly

This avoids maintaining a redundant, broken analytics system when GA4 already provides superior data.

### Files to Change
- **`src/pages/admin/AdminDashboard.tsx`** -- Remove the `<AnalyticsDashboard />` component, replace with a simple card linking to Google Analytics
- **`src/components/admin/analytics/AnalyticsDashboard.tsx`** -- Can be removed (along with AnalyticsCard, AnalyticsBreakdown, AnalyticsChart)
- **`src/hooks/useAnalytics.ts`** -- Can be removed
- **`supabase/functions/get-analytics/index.ts`** -- Can be deleted

