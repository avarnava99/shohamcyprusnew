
DROP POLICY "Service role can manage berth schedule" ON public.berth_schedule;

CREATE POLICY "Admins can manage berth schedule"
  ON public.berth_schedule FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
