-- Drop the existing INSERT policy
DROP POLICY IF EXISTS "Anyone can submit contact form with valid data" ON public.contact_submissions;

-- Create updated policy that also allows container_pricing submissions
CREATE POLICY "Anyone can submit contact form with valid data" 
ON public.contact_submissions 
FOR INSERT 
WITH CHECK (
  (name IS NOT NULL) AND 
  (name <> ''::text) AND 
  (email IS NOT NULL) AND 
  (email <> ''::text) AND 
  (message IS NOT NULL) AND 
  (message <> ''::text) AND 
  (submission_type = ANY (ARRAY['contact'::text, 'quote'::text, 'container_pricing'::text]))
);