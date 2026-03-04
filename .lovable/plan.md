

## Add Built-in Analytics to Admin Dashboard

Analytics data is available and confirmed working (117 visitors, 311 pageviews last month). I'll build an analytics section directly into the admin dashboard that fetches this data via an edge function.

### Architecture
1. **New edge function `get-site-analytics`** -- Calls the internal analytics API using the project ID and Lovable API key (already stored as `LOVABLE_API_KEY` secret). Returns visitors, pageviews, bounce rate, session duration, and breakdowns (top pages, sources, devices, countries).

2. **New `AnalyticsDashboard` component** -- Displays:
   - 4 summary cards: Visitors, Pageviews, Bounce Rate, Avg Session Duration
   - A daily visitors/pageviews line chart (using Recharts, already installed)
   - Breakdown panels: Top Pages, Traffic Sources, Devices, Countries
   - Time range selector (7d / 30d / 90d)

3. **Update `AdminDashboard.tsx`** -- Add the analytics section between the Google Analytics link card and Quick Actions.

### Files to Create/Modify
- **`supabase/functions/get-site-analytics/index.ts`** -- Edge function that proxies the analytics API
- **`supabase/config.toml`** -- Add `[functions.get-site-analytics]` with `verify_jwt = false`
- **`src/components/admin/analytics/AnalyticsDashboard.tsx`** -- Main analytics component with cards, chart, and breakdowns
- **`src/hooks/useAnalytics.ts`** -- Hook to fetch analytics data from the edge function
- **`src/pages/admin/AdminDashboard.tsx`** -- Import and render `<AnalyticsDashboard />` above Quick Actions

### Data Flow
```text
AdminDashboard -> useAnalytics hook -> supabase.functions.invoke('get-site-analytics')
  -> Edge Function -> Lovable Analytics API (using LOVABLE_API_KEY)
  -> Returns { visitors, pageviews, bounceRate, sessionDuration, breakdowns }
```

The edge function will validate the admin's JWT before returning data. The hook will support switching between 7/30/90 day ranges.

