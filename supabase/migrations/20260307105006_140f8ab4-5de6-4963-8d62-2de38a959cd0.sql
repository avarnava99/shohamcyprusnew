ALTER TABLE public.blog_posts 
  ADD COLUMN IF NOT EXISTS source_url TEXT,
  ADD COLUMN IF NOT EXISTS source_site TEXT,
  ADD COLUMN IF NOT EXISTS is_ai_generated BOOLEAN DEFAULT false;

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_source_url_unique ON public.blog_posts (source_url) WHERE source_url IS NOT NULL;