# Ram Pickel Mart Project Guide

## Active project folder

Use this folder as the main app:

```bash
c:\dev\palle-flavors-emporium-main
```

The nested `RamPickelMart` folder is an older duplicate/subproject copy. Do not run commands from that folder unless you intentionally want to work on that duplicate.

## Run locally

Frontend:

```bash
npm run dev
```

OTP backend:

```bash
npm run server
```

OTP requires the `otp_verifications` Supabase migration and either Gmail SMTP or Resend email settings in `.env.local`.
