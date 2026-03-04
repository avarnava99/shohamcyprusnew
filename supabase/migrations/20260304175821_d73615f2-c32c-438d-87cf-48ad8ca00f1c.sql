-- Drop overly permissive policies
DROP POLICY IF EXISTS "Service can manage daily analytics" ON public.site_analytics_daily;
DROP POLICY IF EXISTS "Service can manage breakdowns" ON public.site_analytics_breakdowns;

-- Replace with admin-only insert/update/delete policies
CREATE POLICY "Admins can manage daily analytics"
  ON public.site_analytics_daily FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage breakdowns"
  ON public.site_analytics_breakdowns FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));
