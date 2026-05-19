import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const inputClass =
  "h-[52px] rounded-[4px] border-[#f2a51a] bg-white px-4 text-[18px] font-semibold text-black placeholder:text-slate-400 focus-visible:ring-[#d97706]";

const Signup = () => {
  const navigate = useNavigate();
  const { sendOtp, verifyOtp, registerWithOtp, user, loading: authLoading } = useAuth();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendingOtp, setSendingOtp] = useState(false);
  const [verifyingOtp, setVerifyingOtp] = useState(false);

  const fullName = `${firstName} ${lastName}`.trim() || userName;

  const handleSendOtp = async () => {
    if (!email) {
      toast.error("Enter your email first.");
      return;
    }

    setSendingOtp(true);
    const { error } = await sendOtp(email);
    setSendingOtp(false);

    if (error) {
      toast.error(error.message || "Failed to send OTP. Please try again.");
      return;
    }

    toast.success("OTP sent to your email.");
  };

  const handleVerifyOtp = async () => {
    if (!email || !otp) {
      toast.error("Enter email and OTP.");
      return;
    }

    setVerifyingOtp(true);
    const { error } = await verifyOtp(email, otp);
    setVerifyingOtp(false);

    if (error) {
      toast.error(error.message || "OTP verification failed.");
      return;
    }

    setEmailVerified(true);
    toast.success("Email verified. Set your password now.");
  };

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!emailVerified) {
      toast.error("Please verify your email OTP first.");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Password and confirm password must match.");
      return;
    }

    setLoading(true);
    const { error } = await registerWithOtp(email, otp, password, fullName, userName);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Could not create your account. Please try again.");
      return;
    }

    toast.success("Registration completed.");
    navigate("/");
  };

  return (
    <AuthLayout title="Register">
      <form onSubmit={handleSubmit} className="mx-auto max-w-[560px] rounded-lg border border-black/5 bg-white px-7 py-8 shadow-md">
        <div className="space-y-7">
          <div className="space-y-3">
            <Label htmlFor="firstName" className="text-xl font-bold">First Name</Label>
            <Input id="firstName" value={firstName} onChange={(event) => setFirstName(event.target.value)} placeholder="enter your first name" required className={inputClass} />
          </div>

          <div className="space-y-3">
            <Label htmlFor="lastName" className="text-xl font-bold">Last Name</Label>
            <Input id="lastName" value={lastName} onChange={(event) => setLastName(event.target.value)} placeholder="enter your last name" required className={inputClass} />
          </div>

          <div className="space-y-3">
            <Label htmlFor="email" className="text-xl font-bold">Email</Label>
            <div className="flex">
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(event) => {
                  setEmail(event.target.value);
                  setEmailVerified(false);
                }}
                placeholder="enter your Email ID"
                required
                disabled={emailVerified}
                className={`${inputClass} rounded-r-none`}
              />
              <Button
                type="button"
                onClick={handleSendOtp}
                disabled={sendingOtp || emailVerified}
                className="h-[52px] rounded-l-none rounded-r-[4px] bg-[#df7b00] px-5 text-lg font-bold text-white hover:bg-[#c96f00]"
              >
                {emailVerified ? <ShieldCheck className="h-5 w-5" /> : sendingOtp ? "sending" : "verify"}
              </Button>
            </div>
          </div>

          {!emailVerified && (
            <div className="space-y-3">
              <Label htmlFor="otp" className="text-xl font-bold">OTP</Label>
              <div className="flex">
                <Input id="otp" value={otp} onChange={(event) => setOtp(event.target.value)} placeholder="enter your OTP" autoComplete="one-time-code" className={`${inputClass} rounded-r-none tracking-widest`} />
                <Button type="button" onClick={handleVerifyOtp} disabled={verifyingOtp} className="h-[52px] rounded-l-none rounded-r-[4px] bg-[#df7b00] px-5 text-lg font-bold text-white hover:bg-[#c96f00]">
                  {verifyingOtp ? "checking" : "OK"}
                </Button>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Label htmlFor="userName" className="text-xl font-bold">User Name</Label>
            <Input id="userName" value={userName} onChange={(event) => setUserName(event.target.value)} placeholder="enter your user name" required className={inputClass} />
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="text-xl font-bold">Password</Label>
            <div className="flex">
              <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="enter your Password" required minLength={6} className={`${inputClass} rounded-r-none`} />
              <Button type="button" onClick={() => setShowPassword((value) => !value)} className="h-[52px] rounded-l-none rounded-r-[4px] bg-[#df7b00] px-4 text-white hover:bg-[#c96f00]">
                {showPassword ? <Eye className="h-7 w-7" /> : <EyeOff className="h-7 w-7" />}
              </Button>
            </div>
          </div>

          <div className="space-y-3">
            <Label htmlFor="confirmPassword" className="text-xl font-bold">Confirm Password</Label>
            <Input id="confirmPassword" type={showPassword ? "text" : "password"} value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} placeholder="enter your Confirm Password" required minLength={6} className={inputClass} />
          </div>

          <Button disabled={loading || !emailVerified} className="h-[52px] w-full rounded-[4px] bg-[#df7b00] text-xl font-bold text-white hover:bg-[#c96f00]">
            {loading ? "Creating..." : "Sign Up"}
          </Button>

          <Link to="/login" className="block text-lg font-bold underline">
            Already Have Account Login
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Signup;
