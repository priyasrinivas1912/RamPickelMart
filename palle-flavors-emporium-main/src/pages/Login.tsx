import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "@/components/AuthLayout";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

const inputClass =
  "h-[52px] rounded-[4px] border-[#f2a51a] bg-white px-4 text-[18px] font-semibold text-black placeholder:text-slate-400 focus-visible:ring-[#d97706]";

const Login = () => {
  const navigate = useNavigate();
  const { signIn, user, loading: authLoading } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!authLoading && user) {
      navigate("/", { replace: true });
    }
  }, [authLoading, user, navigate]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);

    if (error) {
      toast.error(error.message || "Login failed. Please check your email and password.");
      return;
    }

    toast.success("Welcome back!");
    navigate("/", { replace: true });
  };

  return (
    <AuthLayout title="Log In">
      <form onSubmit={handleSubmit} className="mx-auto max-w-[560px] rounded-lg border border-black/5 bg-white px-7 py-14 shadow-md">
        <div className="space-y-8">
          <div className="space-y-3">
            <Label htmlFor="email" className="text-xl font-bold">User Name / Email</Label>
            <Input id="email" type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="enter your user name / Email" required className={inputClass} />
          </div>

          <div className="space-y-3">
            <Label htmlFor="password" className="text-xl font-bold">Password</Label>
            <div className="flex">
              <Input id="password" type={showPassword ? "text" : "password"} value={password} onChange={(event) => setPassword(event.target.value)} placeholder="enter your Password" required className={`${inputClass} rounded-r-none`} />
              <Button type="button" onClick={() => setShowPassword((value) => !value)} className="h-[52px] rounded-l-none rounded-r-[4px] bg-[#df7b00] px-4 text-white hover:bg-[#c96f00]">
                {showPassword ? <Eye className="h-7 w-7" /> : <EyeOff className="h-7 w-7" />}
              </Button>
            </div>
          </div>

          <Link to="/verify-otp" className="block text-lg font-bold underline">
            Forgot Password
          </Link>

          <Button disabled={loading} className="h-[52px] w-full rounded-[4px] bg-[#df7b00] text-xl font-bold text-white hover:bg-[#c96f00]">
            {loading ? "Logging in..." : "Log In"}
          </Button>

          <Link to="/signup" className="block text-lg font-bold underline">
            Not Have Account Sign Up
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};

export default Login;
