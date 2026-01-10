-- Drop the overly permissive policy
DROP POLICY IF EXISTS "Anyone can submit contact form" ON public.contact_submissions;

-- Create a more specific policy that validates required fields are present
CREATE POLICY "Anyone can submit contact form with valid data"
ON public.contact_submissions FOR INSERT
TO anon, authenticated
WITH CHECK (
    name IS NOT NULL AND 
    name <> '' AND 
    email IS NOT NULL AND 
    email <> '' AND
    message IS NOT NULL AND 
    message <> '' AND
    submission_type IN ('contact', 'quote')
);