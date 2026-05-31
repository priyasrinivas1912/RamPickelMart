import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const projectRoot = path.resolve(__dirname, "..");

dotenv.config({
  path: path.join(projectRoot, ".env"),
});
dotenv.config({
  path: path.join(__dirname, ".env"),
  override: true,
});
dotenv.config({
  path: path.join(projectRoot, ".env.local"),
  override: true,
});
dotenv.config({
  path: path.join(__dirname, ".env.local"),
  override: true,
});

const app = express();
app.use(cors());
app.use(express.json());

const PORT = Number(process.env.PORT || 5000);

const hasSupabaseConfig = Boolean(
  process.env.SUPABASE_URL &&
    process.env.SUPABASE_SERVICE_ROLE_KEY &&
    !process.env.SUPABASE_SERVICE_ROLE_KEY.startsWith("PASTE_")
);

const hasEmailConfig = Boolean(
  process.env.EMAIL_USER &&
    process.env.EMAIL_PASS &&
    !process.env.EMAIL_USER.startsWith("PASTE_") &&
    !process.env.EMAIL_PASS.startsWith("PASTE_")
);

const emailPassword = process.env.EMAIL_PASS?.replace(/\s+/g, "");

const supabase = hasSupabaseConfig
  ? createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    )
  : null;

const transporter = hasEmailConfig
  ? nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: emailPassword,
      },
    })
  : null;

function generateCode() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";

  for (let index = 0; index < 6; index += 1) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }

  return code;
}

const normalizeEmail = (email: unknown) =>
  typeof email === "string"
    ? email.trim().toLowerCase()
    : "";

const devOtps = new Map<
  string,
  { code: string; expiresAt: number }
>();

app.get("/test", (_req, res) => {
  res.json({
    success: true,
    message: "OTP server working",
  });
});

app.post("/send-verification", async (req, res) => {
  const email = normalizeEmail(req.body.email);

  if (!email) {
    res.status(400).json({
      success: false,
      message: "Email is required",
    });
    return;
  }

  const code = generateCode();
  const expiresAt = Date.now() + 10 * 60 * 1000;

  if (supabase) {
    const { error } = await supabase
      .from("otp_verifications")
      .insert([
        {
          email,
          otp_code: code,
          mode: "user",
          expires_at: new Date(expiresAt).toISOString(),
        },
      ]);

    if (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
      return;
    }
  } else {
    devOtps.set(email, { code, expiresAt });
  }

  if (!transporter) {
    res.status(500).json({
      success: false,
      message:
        "Email is not configured. Add EMAIL_USER and Gmail App Password in .env.local.",
    });
    return;
  }

  if (transporter) {
    try {
      await transporter.sendMail({
        from: `"Ram Pickel Mart" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your Ram Pickel Mart OTP Code",
        text: `Your Ram Pickel Mart OTP code is ${code}. It is valid for 10 minutes.`,
        html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #2f1b12;">
            <h2 style="color: #8b4513;">Ram Pickel Mart</h2>
            <p>Your OTP code is:</p>
            <p style="font-size: 32px; font-weight: 700; letter-spacing: 6px; color: #d97706;">${code}</p>
            <p>This code is valid for 10 minutes.</p>
            <p>If you did not request this code, you can ignore this email.</p>
          </div>
        `,
      });

      res.json({
        success: true,
        message: "OTP sent to your email.",
      });
      return;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Unable to send OTP email";

      console.error("Unable to send OTP email:", message);
      res.status(500).json({
        success: false,
        message:
          "Unable to send OTP email. Check EMAIL_USER and Gmail App Password.",
      });
      return;
    }
  }
});

app.post("/verify-code", async (req, res) => {
  const email = normalizeEmail(req.body.email);
  const code =
    typeof req.body.code === "string"
      ? req.body.code.trim().toUpperCase()
      : "";

  if (!email || !code) {
    res.status(400).json({
      success: false,
      message: "Email and OTP are required",
    });
    return;
  }

  if (supabase) {
    const { data, error } = await supabase
      .from("otp_verifications")
      .select("id, expires_at")
      .eq("email", email)
      .eq("otp_code", code)
      .eq("mode", "user")
      .eq("used", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    if (new Date(data.expires_at).getTime() < Date.now()) {
      res.status(400).json({
        success: false,
        message: "OTP expired",
      });
      return;
    }

    const { error: updateError } = await supabase
      .from("otp_verifications")
      .update({ used: true })
      .eq("id", data.id);

    if (updateError) {
      res.status(500).json({
        success: false,
        message: updateError.message,
      });
      return;
    }
  } else {
    const savedOtp = devOtps.get(email);

    if (!savedOtp || savedOtp.code !== code) {
      res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
      return;
    }

    if (savedOtp.expiresAt < Date.now()) {
      devOtps.delete(email);
      res.status(400).json({
        success: false,
        message: "OTP expired",
      });
      return;
    }

    devOtps.delete(email);
  }

  res.json({
    success: true,
    message: "OTP verified",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
