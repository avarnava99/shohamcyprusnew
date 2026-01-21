-- Create table for Limassol vessel schedule
CREATE TABLE public.limassol_vessel_schedule (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  vessel_name TEXT NOT NULL,
  callsign TEXT,
  voyage_no TEXT,
  vessel_no TEXT,
  arrival_date DATE,
  arrival_time TIME,
  etd_date DATE,
  etd_time TIME,
  berth TEXT,
  operation TEXT,
  delivery_start TIMESTAMP WITH TIME ZONE,
  status TEXT,
  agent TEXT,
  scraped_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.limassol_vessel_schedule ENABLE ROW LEVEL SECURITY;

-- Create policy for public read access (anyone can view the schedule)
CREATE POLICY "Anyone can view vessel schedule" 
ON public.limassol_vessel_schedule 
FOR SELECT 
USING (true);

-- Create policy for service role to manage data (edge function uses service role)
CREATE POLICY "Service role can manage vessel schedule" 
ON public.limassol_vessel_schedule 
FOR ALL
USING (true)
WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_limassol_vessel_schedule_arrival ON public.limassol_vessel_schedule(arrival_date, arrival_time);
CREATE INDEX idx_limassol_vessel_schedule_scraped ON public.limassol_vessel_schedule(scraped_at);