

# Advanced Blog Search & SEO

Enhance the blog listing page with search, category filtering, and add a related posts widget to individual blog posts.

## Changes

### 1. `src/pages/Blog.tsx` -- Search + Category Filter

- Add a search bar (text input with Search icon) that filters posts client-side by title and excerpt
- Add a row of category filter badges fetched from `blog_categories` table; clicking one filters posts; "All" resets
- Support URL query params (`?category=shipping-news&q=vessel`) for shareable filtered views
- Add pagination (12 posts per page) since post count will grow with the crawler

### 2. `src/pages/BlogPost.tsx` -- Related Posts Widget

- After the article content, add a "Related Articles" section
- Query 3 posts from the same `category_id`, excluding current post, ordered by `published_at` desc
- If fewer than 3 in same category, fill with latest posts from any category
- Display as horizontal cards with thumbnail, title, date

### 3. `src/pages/BlogPost.tsx` -- SEO Enhancements

- Add prev/next navigation links at bottom of post (query adjacent posts by published_at)
- Add `<link rel="canonical">` is already handled by SEO component -- no change needed

### No database changes needed

All filtering is done client-side or with existing Supabase queries on existing columns (`category_id`, `title`, `excerpt`, `published_at`). The `blog_categories` table already has `name` and `slug`.

### Files to modify
1. **`src/pages/Blog.tsx`** -- add search input, category filter bar, pagination
2. **`src/pages/BlogPost.tsx`** -- add related posts section and prev/next navigation

