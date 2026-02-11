
-- Create berth_schedule table
CREATE TABLE public.berth_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  day TEXT,
  vessel_name TEXT NOT NULL,
  voyage_no TEXT,
  movement TEXT,
  quay TEXT,
  pilot_time TEXT,
  all_fast TEXT,
  tug1 TEXT,
  tug2 TEXT,
  agent TEXT,
  loa TEXT,
  comments TEXT,
  period_start TIMESTAMPTZ,
  period_end TIMESTAMPTZ,
  received_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.berth_schedule ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Anyone can view berth schedule"
ON public.berth_schedule
FOR SELECT
USING (true);

-- Service role write access (edge function uses service role)
CREATE POLICY "Service role can manage berth schedule"
ON public.berth_schedule
FOR ALL
USING (true)
WITH CHECK (true);
