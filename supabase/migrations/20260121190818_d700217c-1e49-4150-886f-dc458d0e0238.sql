-- Create table for duty calculator leads
CREATE TABLE public.duty_calculator_leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  product_description TEXT NOT NULL,
  product_value DECIMAL(12,2) NOT NULL,
  shipping_cost DECIMAL(12,2) DEFAULT 0,
  insurance_cost DECIMAL(12,2) DEFAULT 0,
  country_of_origin TEXT NOT NULL,
  -- Calculation results stored for reference
  cif_value DECIMAL(12,2),
  estimated_duty_rate DECIMAL(5,2),
  estimated_duty DECIMAL(12,2),
  vat_amount DECIMAL(12,2),
  total_cost DECIMAL(12,2),
  hs_code_estimate TEXT,
  product_category TEXT,
  -- Lead management
  status TEXT DEFAULT 'new' NOT NULL,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Enable RLS
ALTER TABLE public.duty_calculator_leads ENABLE ROW LEVEL SECURITY;

-- Allow anyone to submit duty calculator leads
CREATE POLICY "Anyone can submit duty calculator leads" ON public.duty_calculator_leads
  FOR INSERT WITH CHECK (
    name IS NOT NULL AND name <> '' AND 
    email IS NOT NULL AND email <> '' AND
    product_description IS NOT NULL AND product_description <> ''
  );

-- Admins can view all leads
CREATE POLICY "Admins can view duty calculator leads" ON public.duty_calculator_leads
  FOR SELECT USING (has_role(auth.uid(), 'admin'));

-- Admins can update leads
CREATE POLICY "Admins can update duty calculator leads" ON public.duty_calculator_leads
  FOR UPDATE USING (has_role(auth.uid(), 'admin'));