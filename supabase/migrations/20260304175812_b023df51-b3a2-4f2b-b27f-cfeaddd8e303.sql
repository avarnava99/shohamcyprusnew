-- Table to store daily analytics snapshots
CREATE TABLE public.site_analytics_daily (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  visitors integer NOT NULL DEFAULT 0,
  pageviews integer NOT NULL DEFAULT 0,
  bounce_rate numeric(5,2) DEFAULT 0,
  session_duration numeric(10,2) DEFAULT 0,
  pageviews_per_visit numeric(5,2) DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Table to store analytics breakdowns (aggregated)
CREATE TABLE public.site_analytics_breakdowns (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  breakdown_type text NOT NULL,
  name text NOT NULL,
  value integer NOT NULL DEFAULT 0,
  period_start date NOT NULL,
  period_end date NOT NULL,
  created_at timestamptz DEFAULT now(),
  UNIQUE(breakdown_type, name, period_start, period_end)
);

-- RLS
ALTER TABLE public.site_analytics_daily ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_analytics_breakdowns ENABLE ROW LEVEL SECURITY;

-- Only admins can read
CREATE POLICY "Admins can read daily analytics"
  ON public.site_analytics_daily FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can read breakdowns"
  ON public.site_analytics_breakdowns FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Insert current data
INSERT INTO public.site_analytics_daily (date, visitors, pageviews, bounce_rate, session_duration, pageviews_per_visit) VALUES
  ('2026-02-01', 3, 39, 33, 79.74, 13),
  ('2026-02-03', 3, 5, 67, 4.70, 1.67),
  ('2026-02-04', 2, 2, 100, 0, 1),
  ('2026-02-17', 2, 4, 0, 5.74, 2),
  ('2026-02-26', 1, 7, 0, 37.41, 7),
  ('2026-03-02', 2, 14, 50, 24.31, 7),
  ('2026-03-03', 27, 64, 93, 59.57, 2.37),
  ('2026-03-04', 77, 176, 75, 841.10, 2.29);

INSERT INTO public.site_analytics_breakdowns (breakdown_type, name, value, period_start, period_end) VALUES
  ('page', '/', 44, '2026-02-01', '2026-03-04'),
  ('page', '/blog', 23, '2026-02-01', '2026-03-04'),
  ('page', '/port-agency/ports-in-cyprus/limassol-port-schedule', 7, '2026-02-01', '2026-03-04'),
  ('page', '/zim-agency-in-cyprus/track-container-eurogate-limassol-cyprus/', 7, '2026-02-01', '2026-03-04'),
  ('page', '/project-cargo', 6, '2026-02-01', '2026-03-04'),
  ('page', '/services/travel', 5, '2026-02-01', '2026-03-04'),
  ('page', '/about-us', 5, '2026-02-01', '2026-03-04'),
  ('page', '/services/used-containers/', 5, '2026-02-01', '2026-03-04'),
  ('page', '/port-agency/ports-in-cyprus/limassol-port', 5, '2026-02-01', '2026-03-04'),
  ('page', '/services/used-containers', 5, '2026-02-01', '2026-03-04'),
  ('source', 'Direct', 79, '2026-02-01', '2026-03-04'),
  ('source', 'google.com', 34, '2026-02-01', '2026-03-04'),
  ('source', 'bing.com', 2, '2026-02-01', '2026-03-04'),
  ('source', 'yandex.ru', 1, '2026-02-01', '2026-03-04'),
  ('source', 'com.google.android.googlequicksearchbox', 1, '2026-02-01', '2026-03-04'),
  ('device', 'desktop', 96, '2026-02-01', '2026-03-04'),
  ('device', 'mobile', 21, '2026-02-01', '2026-03-04'),
  ('country', 'CY', 37, '2026-02-01', '2026-03-04'),
  ('country', 'CN', 31, '2026-02-01', '2026-03-04'),
  ('country', 'US', 20, '2026-02-01', '2026-03-04'),
  ('country', 'RO', 8, '2026-02-01', '2026-03-04'),
  ('country', 'Unknown', 7, '2026-02-01', '2026-03-04'),
  ('country', 'GR', 3, '2026-02-01', '2026-03-04'),
  ('country', 'MD', 1, '2026-02-01', '2026-03-04'),
  ('country', 'GB', 1, '2026-02-01', '2026-03-04'),
  ('country', 'ES', 1, '2026-02-01', '2026-03-04'),
  ('country', 'DE', 1, '2026-02-01', '2026-03-04');
