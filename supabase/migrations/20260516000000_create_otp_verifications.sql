-- Custom alphanumeric OTP storage for /verify-otp
CREATE TABLE otp_verifications
(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  mode TEXT NOT NULL CHECK (mode IN ('user','admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  expires_at TIMESTAMPTZ NOT NULL,
  used BOOLEAN NOT NULL DEFAULT FALSE
);
