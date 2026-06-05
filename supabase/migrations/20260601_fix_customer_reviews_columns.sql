-- Drop existing table with policies
DROP TABLE IF EXISTS public.customer_reviews
CASCADE;

-- Create fresh customer_reviews table
CREATE TABLE public.customer_reviews
(
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    reviewer_name TEXT NOT NULL,
    review_text TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.customer_reviews ENABLE ROW LEVEL SECURITY;

-- Create read policy
CREATE POLICY "Anyone can read customer reviews"
ON public.customer_reviews
FOR
SELECT
    USING (true);

-- Create insert policy
CREATE POLICY "Anyone can submit customer reviews"
ON public.customer_reviews
FOR
INSERT
WITH CHECK (
  length(
trim(reviewer_name)
) BETWEEN 1 AND 80
  AND length
(trim
(review_text)) BETWEEN 1 AND 1000
);

-- Grant permissions
GRANT SELECT, INSERT ON public.customer_reviews TO anon;
GRANT SELECT, INSERT ON public.customer_reviews TO authenticated;


