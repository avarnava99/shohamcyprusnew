
CREATE POLICY "Users can view own contact submissions"
  ON public.contact_submissions FOR SELECT
  USING (auth.jwt()->>'email' = email);

CREATE POLICY "Users can view own container orders"
  ON public.container_orders FOR SELECT
  USING (auth.jwt()->>'email' = email);
