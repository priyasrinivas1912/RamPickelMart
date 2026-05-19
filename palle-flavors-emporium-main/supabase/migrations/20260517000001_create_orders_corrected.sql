-- Create orders table

CREATE TABLE
IF NOT EXISTS public.orders
(
  id uuid PRIMARY KEY DEFAULT gen_random_uuid
(),
  user_id uuid NOT NULL REFERENCES auth.users
(id) ON
DELETE CASCADE,
  total_amount numeric NOT NULL,
  currency text
NOT NULL DEFAULT 'INR',
  status text NOT NULL,
  payment_provider text NOT NULL,
  items jsonb NOT NULL DEFAULT '[]'::jsonb,
  shipping_address jsonb NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now
()
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

DROP POLICY
IF EXISTS "Users can view own orders" ON public.orders;
CREATE POLICY "Users can view own orders"
  ON public.orders
  FOR
SELECT
  USING (auth.uid() = user_id);

DROP POLICY
IF EXISTS "Users can insert own orders" ON public.orders;
CREATE POLICY "Users can insert own orders"
  ON public.orders
  FOR
INSERT
  WITH CHECK (auth.uid() =
user_id);

DROP POLICY
IF EXISTS "Users can update own orders" ON public.orders;
CREATE POLICY "Users can update own orders"
  ON public.orders
  FOR
UPDATE
  USING (auth.uid()
= user_id)
  WITH CHECK
(auth.uid
() = user_id);



