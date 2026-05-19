import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User, Session } from "@supabase/supabase-js";

interface AuthCtx {
  user: User | null;
  session: Session | null;
  loading: boolean;

  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, fullName?: string) => Promise<{ error: Error | null }>;
  updatePassword: (password: string, fullName?: string) => Promise<{ error: Error | null }>;
  registerWithOtp: (
    email: string,
    otp: string,
    password: string,
    fullName?: string,
    userName?: string
  ) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;

  sendOtp: (
    email: string,
    mode?: "user" | "admin"
  ) => Promise<{ error: Error | null }>;
  verifyOtp: (email: string, token: string, mode?: "user" | "admin") => Promise<{ error: Error | null }>;
}

const Ctx = createContext<AuthCtx | null>(null);

const getFunctionError = async (error: unknown) => {
  if (!error) return null;

  const context = (error as { context?: unknown }).context;

  if (context instanceof Response) {
    try {
      const body = await context.json();
      if (typeof body?.error === "string") return new Error(body.error);
      if (typeof body?.message === "string") return new Error(body.message);
    } catch {
      // Fall back to the SDK error message below.
    }
  }

  return new Error(error instanceof Error ? error.message : "Unexpected Edge Function error.");
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, fullName?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: fullName ? { full_name: fullName } : undefined,
      },
    });
    return { error };
  };

  const updatePassword = async (password: string, fullName?: string) => {
    const { error } = await supabase.auth.updateUser({
      password,
      data: fullName ? { full_name: fullName } : undefined,
    });
    return { error };
  };

  const sendOtp = async (email: string, mode: "user" | "admin" = "user") => {
    const { error } = await supabase.functions.invoke("send-registration-otp", {
      body: { email, mode },
    });

    return { error: await getFunctionError(error) };
  };

  const verifyOtp = async (email: string, token: string, mode: "user" | "admin" = "user") => {
    const { error } = await supabase.functions.invoke("verify-registration-otp", {
      body: { email, otp: token.trim(), mode },
    });

    return { error: await getFunctionError(error) };
  };

  const registerWithOtp = async (
    email: string,
    otp: string,
    password: string,
    fullName?: string,
    userName?: string
  ) => {
    const { error } = await supabase.functions.invoke("complete-registration", {
      body: { email, otp: otp.trim(), password, fullName, userName },
    });

    if (error) return { error: await getFunctionError(error) };

    return signIn(email, password);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <Ctx.Provider
      value={{ user, session, loading, signIn, signUp, updatePassword, registerWithOtp, signOut, sendOtp, verifyOtp }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
