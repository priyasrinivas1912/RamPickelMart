import { createClient } from "https://esm.sh/@supabase/supabase-js@2.105.4";
import { corsHeaders } from "../_shared/cors.ts";

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

  try {
    const { email, otp, password, fullName, userName } = (await req.json()) as {
      email?: string;
      otp?: string;
      password?: string;
      fullName?: string;
      userName?: string;
    };
    const normalizedEmail = email?.trim().toLowerCase();
    const normalizedOtp = otp?.trim();

    if (!normalizedEmail || !normalizedOtp || !password) {
      return json({ error: "Email, OTP, and password are required." }, 400);
    }

    if (password.length < 6) return json({ error: "Password must be at least 6 characters." }, 400);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!supabaseUrl || !serviceRoleKey) return json({ error: "Supabase function secrets are missing." }, 500);

    const supabase = createClient(supabaseUrl, serviceRoleKey);
    const { data, error } = await supabase
      .from("otp_verifications")
      .select("id")
      .eq("email", normalizedEmail)
      .eq("otp_code", normalizedOtp)
      .eq("mode", "user")
      .eq("used", false)
      .gt("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1);

    if (error) return json({ error: error.message }, 500);
    if (!data?.length) return json({ error: "Invalid or expired OTP." }, 400);

    const { error: createError } = await supabase.auth.admin.createUser({
      email: normalizedEmail,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        user_name: userName,
      },
    });

    if (createError) return json({ error: createError.message }, 400);

    const { error: updateError } = await supabase.from("otp_verifications").update({ used: true }).eq("id", data[0].id);
    if (updateError) return json({ error: updateError.message }, 500);

    return json({ ok: true });
  } catch (error) {
    return json({ error: error instanceof Error ? error.message : "Unexpected error." }, 500);
  }
});
