import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "@/components/AuthLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

const inputClass =
  "h-[52px] rounded-[4px] border-[#f2a51a] bg-white px-4 text-[18px] font-semibold text-black placeholder:text-slate-400 focus-visible:ring-[#d97706]";

function sanitizeOtp(raw: string) {
  return raw.replace(/[^a-zA-Z0-9]/g, "").toUpperCase();
}

const normalizeEmail = (value: string) => value.trim().toLowerCase();

const VerifyOtp = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const search = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const { verifyOtp, sendOtp } = useAuth();

  const emailFromQuery = (search.get("email") ?? "").trim();
  const redirect = search.get("redirect") ?? "/";
  const [email, setEmail] = useState(emailFromQuery);
  const [otp, setOtp] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sending, setSending] = useState(false);
  const normalizedEmail = normalizeEmail(email);

  const handleSend = async () => {
    if (!normalizedEmail) {
      toast.error("Enter your email first.");
      return;
    }

    setSending(true);
    const { error } = await sendOtp(normalizedEmail);
    setSending(false);

    if (error) {
      toast.error(error.message || "Failed to send OTP.");
      return;
    }

    toast.success("OTP sent to your email.");
  };

  const handleVerify = async (event: React.FormEvent) => {
    event.preventDefault();
    const token = sanitizeOtp(otp);

    if (!normalizedEmail || !token) {
      toast.error("Enter email and OTP.");
      return;
    }

    setSubmitting(true);
    const { error } = await verifyOtp(normalizedEmail, token);
    setSubmitting(false);

    if (error) {
      toast.error(error.message || "OTP verification failed.");
      return;
    }

    toast.success("OTP verified successfully.");
    navigate(redirect, { replace: true });
  };

  return (
    <AuthLayout title="OTP Verification">
      <form
        onSubmit={handleVerify}
        className="mx-auto max-w-[560px] rounded-lg border border-black/5 bg-white px-7 py-10 shadow-md"
      >
        <div className="space-y-7">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-xl font-bold">
              Email
            </Label>
            <div className="flex">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="enter your Email ID"
                required
                className={`${inputClass} rounded-r-none`}
              />
              <Button
                type="button"
                onClick={handleSend}
                disabled={sending}
                className="h-[52px] rounded-l-none rounded-r-[4px] bg-[#df7b00] px-5 text-lg font-bold text-white hover:bg-[#c96f00]"
              >
                {sending ? "Sending..." : "Send"}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="otp" className="text-xl font-bold">
              OTP Code
            </Label>
            <Input
              id="otp"
              value={otp}
              onChange={(event) => setOtp(sanitizeOtp(event.target.value))}
              placeholder="enter OTP from email"
              autoComplete="one-time-code"
              maxLength={6}
              required
              className={`${inputClass} tracking-widest`}
            />
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="h-[52px] w-full rounded-[4px] bg-[#df7b00] text-xl font-bold text-white hover:bg-[#c96f00]"
          >
            {submitting ? "Verifying..." : "Verify"}
          </Button>

          <div className="flex items-center justify-between text-lg font-bold">
            <Link to="/login" className="underline">
              Back To Login
            </Link>

            <button
              type="button"
              onClick={handleSend}
              disabled={sending}
              className="text-[#df7b00] underline disabled:opacity-60"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyOtp;
