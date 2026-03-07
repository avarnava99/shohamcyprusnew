

## Auto-Publishing Shipping News Pipeline

Build a daily automated pipeline: crawl 4 shipping news sites, rewrite articles with AI, generate featured images, and auto-publish to the blog.

### Architecture

```text
Daily Cron Job (pg_cron)
        │
        ▼
┌─────────────────────┐
│ crawl-shipping-news  │  Edge Function
│                     │
│ 1. Firecrawl scrape │──► 4 news sources
│ 2. Deduplicate      │──► Check blog_posts by source_url
│ 3. AI Rewrite       │──► Lovable AI (Gemini Flash)
│ 4. AI Image Gen     │──► Lovable AI (Gemini Flash Image)
│ 5. Upload image     │──► blog-images bucket
│ 6. Insert post      │──► blog_posts (published=true)
└─────────────────────┘
```

### Database Changes

**Migration**: Add columns to `blog_posts` for source tracking:
- `source_url TEXT` -- original article URL (for deduplication)
- `source_site TEXT` -- e.g. "splash247", "hellenicshippingnews"
- `is_ai_generated BOOLEAN DEFAULT false`

### Edge Function: `crawl-shipping-news`

Single function that:

1. **Crawls** each source using Firecrawl (already connected) to scrape the homepage/news feed
2. **Extracts** article links and titles from the scraped content
3. **Deduplicates** by checking `source_url` in `blog_posts`
4. **Rewrites** each article using Lovable AI (`google/gemini-3-flash-preview`):
   - Fetches the full article via Firecrawl
   - Prompt: rewrite for Shoham's audience, professional maritime tone, 300-500 words, generate excerpt, suggest category
5. **Generates featured image** using Lovable AI (`google/gemini-2.5-flash-image`) with a shipping-themed prompt derived from the title
6. **Uploads** image to `blog-images` bucket
7. **Inserts** into `blog_posts` with `published=true`, `is_ai_generated=true`

Processes max 2-3 articles per run to stay within rate limits and CPU time.

### News Sources Configuration

Hardcoded in the edge function:
- `https://splash247.com` -- main news page
- `https://www.hellenicshippingnews.com` -- latest news
- `https://www.seatrade-maritime.com/news` -- news section
- `https://www.tradewindsnews.com` -- front page

### Scheduling

Set up a `pg_cron` job to invoke the function daily at 6:00 AM UTC.

### Admin Visibility

Add a "News Crawler" section to the admin dashboard showing:
- Link to `/admin/blog` (existing blog management)
- Button to manually trigger a crawl
- Badge showing AI-generated post count

### Files to Create/Modify

1. **Migration** -- add `source_url`, `source_site`, `is_ai_generated` to `blog_posts`
2. **`supabase/functions/crawl-shipping-news/index.ts`** -- main pipeline
3. **`supabase/config.toml`** -- register new function with `verify_jwt = false`
4. **`src/components/admin/AdminLayout.tsx`** -- add Blog/News nav item
5. **`src/pages/admin/BlogManager.tsx`** -- admin page with blog list + manual crawl trigger
6. **`src/App.tsx`** -- add `/admin/blog` route
7. **pg_cron SQL** -- daily schedule (via insert tool, not migration)

### Dependencies

- **Firecrawl** connector (already connected with `FIRECRAWL_API_KEY`)
- **Lovable AI** (`LOVABLE_API_KEY` already available)
- No new secrets needed

