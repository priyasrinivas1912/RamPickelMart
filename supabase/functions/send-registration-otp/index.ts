import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.4";
import { corsHeaders } from "../_shared/cors.ts";

type OtpMode = "user" | "admin";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

const generateOtp = () => {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const cryptoValues = new Uint32Array(6);
  crypto.getRandomValues(cryptoValues);
  return Array.from(cryptoValues, (value) => alphabet[value % alphabet.length]).join("");
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { email, mode = "user" } = (await req.json()) as { email?: string; mode?: OtpMode };
    const normalizedEmail = email?.trim().toLowerCase();

    if (!normalizedEmail) return json({ error: "Email is required." }, 400);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    const resendApiKey = Deno.env.get("RESEND_API_KEY")?.trim();
    const fromEmail = Deno.env.get("OTP_FROM_EMAIL")?.trim() || "onboarding@resend.dev";

    if (!supabaseUrl || !serviceRoleKey) return json({ error: "Supabase function secrets are missing." }, 500);
    if (!resendApiKey) return json({ error: "RESEND_API_KEY is missing. Add it in Supabase Edge Function secrets." }, 500);
    if (!resendApiKey.startsWith("re_")) {
      return json({ error: "RESEND_API_KEY is invalid. It must be a Resend API key that starts with re_." }, 500);
    }

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const otpCode = generateOtp();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000).toISOString();

    await supabase
      .from("otp_verifications")
      .update({ used: true })
      .eq("email", normalizedEmail)
      .eq("mode", mode)
      .eq("used", false);

    const { error: insertError } = await supabase.from("otp_verifications").insert({
      email: normalizedEmail,
      otp_code: otpCode,
      mode,
      expires_at: expiresAt,
      used: false,
    });

    if (insertError) return json({ error: insertError.message }, 500);

    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: normalizedEmail,
        subject: "Your OTP Code",
        html: `<p>Your <strong>alphanumeric OTP for Registration</strong> is: <strong>${otpCode}</strong></p>`,
        text: `Your alphanumeric OTP for Registration is: ${otpCode}`,
      }),
    });

    if (!emailResponse.ok) {
      const details = await emailResponse.text();
      return json({ error: `Email sending failed: ${details}` }, 500);
    }

    return json({ ok: true });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected error." }, 500);
  }
});
