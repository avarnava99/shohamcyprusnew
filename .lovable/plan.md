

# Smart 404: Auto-Redirect Legacy Blog URLs

## What's Already Done
All 40 blog posts from the WordPress XML are already in the database with content and featured images. No new blog posts need to be created.

## What's Needed
Old WordPress blog URLs live at the root (e.g., `/zim-vessel-operation-with-3-gantry-cranes/`), but the new site expects `/blog/zim-vessel-operation-with-3-gantry-cranes`. Visitors from Google hitting old URLs will get a 404.

## Solution

### 1. Update `src/pages/NotFound.tsx` with Smart 404 Logic

When a user hits a 404:
1. Extract the last path segment as a potential blog slug
2. Query the `blog_posts` table for a matching published post
3. If found, auto-redirect to `/blog/{slug}`
4. If not found, show the existing 404 page with suggestions

This handles all 40 existing posts AND any future posts automatically.

### 2. Add missing redirect in `src/App.tsx`

Add redirect for the current broken URL:
- `/port-agency/ports-in-cyprus/limassol-port-schedule` --> `/port-agency/ports-in-cyprus/limassol-port`

## Technical Details

### `src/pages/NotFound.tsx` changes:
- Import `useNavigate` from react-router-dom and `supabase` client
- Add `useState` for loading state
- Add `useEffect` that extracts the slug from `location.pathname`, queries `blog_posts` for a match, and calls `navigate("/blog/" + slug, { replace: true })` if found
- Show a brief "Checking..." state while the query runs
- Fall through to the existing 404 UI if no match

### `src/App.tsx` changes:
- Add one `<Route>` for the limassol-port-schedule redirect before the catch-all

