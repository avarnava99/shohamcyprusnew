
DROP POLICY "Service role can manage vessel schedule" ON public.limassol_vessel_schedule;

CREATE POLICY "Admins can manage vessel schedule"
  ON public.limassol_vessel_schedule FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
