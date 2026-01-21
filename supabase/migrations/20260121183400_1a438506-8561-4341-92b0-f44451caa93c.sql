-- Create container_orders table for detailed container inquiries
CREATE TABLE public.container_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  
  -- Contact info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  company TEXT,
  
  -- Container selection
  container_type TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  
  -- Delivery address (manual entry)
  street_address TEXT NOT NULL,
  address_line_2 TEXT,
  city TEXT NOT NULL,
  state_region TEXT,
  postal_code TEXT NOT NULL,
  country TEXT NOT NULL DEFAULT 'Cyprus',
  
  -- Map location (from Mapbox picker)
  latitude DOUBLE PRECISION,
  longitude DOUBLE PRECISION,
  location_address TEXT,
  
  -- Additional options
  crane_unloading BOOLEAN NOT NULL DEFAULT false,
  comments TEXT,
  
  -- Admin tracking
  status TEXT NOT NULL DEFAULT 'new'
);

-- Enable Row Level Security
ALTER TABLE public.container_orders ENABLE ROW LEVEL SECURITY;

-- Anyone can submit a container order (public form)
CREATE POLICY "Anyone can submit container orders"
ON public.container_orders
FOR INSERT
WITH CHECK (
  name IS NOT NULL AND name <> '' AND
  email IS NOT NULL AND email <> '' AND
  phone IS NOT NULL AND phone <> '' AND
  container_type IS NOT NULL AND container_type <> '' AND
  street_address IS NOT NULL AND street_address <> '' AND
  city IS NOT NULL AND city <> '' AND
  postal_code IS NOT NULL AND postal_code <> ''
);

-- Admins can view all container orders
CREATE POLICY "Admins can view container orders"
ON public.container_orders
FOR SELECT
USING (public.has_role(auth.uid(), 'admin'));

-- Admins can update container orders (status changes)
CREATE POLICY "Admins can update container orders"
ON public.container_orders
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));