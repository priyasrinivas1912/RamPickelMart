import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

import { supabase } from "@/integrations/supabase/client";

import type {
  User,
  Session,
} from "@supabase/supabase-js";

type Profile = {
  user_id: string;
  full_name: string | null;
  phone: string | null;
  address_line1: string | null;
  address_line2: string | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  created_at: string;
  updated_at: string;
};

const configuredApiUrl = import.meta.env.VITE_API_URL;

const API_URL = (
  configuredApiUrl || "http://localhost:5000"
).replace(/\/+$/, "");

const readApiMessage = async (
  response: Response
) => {
  try {
    const data = (await response.json()) as {
      message?: string;
    };

    return data.message;
  } catch {
    return undefined;
  }
};

const fetchWithTimeout = async (
  url: string,
  options: RequestInit,
  timeoutMs = 15000
) => {
  const controller = new AbortController();
  const timeout = window.setTimeout(
    () => controller.abort(),
    timeoutMs
  );

  try {
    return await fetch(url, {
      ...options,
      signal: controller.signal,
    });
  } finally {
    window.clearTimeout(timeout);
  }
};

interface UpdateProfileInput {
  full_name?: string;
  phone?: string;
  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  pincode?: string;
}

interface AuthCtx {
  user: User | null;
  session: Session | null;
  profile: Profile | null;
  loading: boolean;

  signIn: (
    email: string,
    password: string
  ) => Promise<{ error: Error | null }>;

  signUp: (
    email: string,
    password: string,
    fullName?: string
  ) => Promise<{ error: Error | null }>;

  sendOtp: (
    email: string
  ) => Promise<{
    error: Error | null;
    message?: string;
  }>;

  verifyOtp: (
    email: string,
    token: string
  ) => Promise<{ error: Error | null }>;

  registerWithOtp: (
    email: string,
    otp: string,
    password: string,
    fullName?: string,
    userName?: string
  ) => Promise<{ error: Error | null }>;

  updateAccount: (
    password: string,
    fullName?: string
  ) => Promise<{ error: Error | null }>;

  getProfile: () => Promise<{
    data: Profile | null;
    error: Error | null;
  }>;

  updateProfile: (
    payload: UpdateProfileInput
  ) => Promise<{
    data: Profile | null;
    error: Error | null;
  }>;

  signOut: () => Promise<void>;
}

const Ctx = createContext<AuthCtx | null>(null);

export const AuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [user, setUser] =
    useState<User | null>(null);

  const [session, setSession] =
    useState<Session | null>(null);

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [loading, setLoading] =
    useState(true);

  const getProfile = async (): Promise<{
    data: Profile | null;
    error: Error | null;
  }> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return {
        data: null,
        error: new Error(userError.message),
      };
    }

    if (!user) {
      setProfile(null);

      return {
        data: null,
        error: null,
      };
    }

    const { data, error } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    setProfile(data as Profile);

    return {
      data: data as Profile,
      error: null,
    };
  };

  const updateProfile = async (
    payload: UpdateProfileInput
  ): Promise<{
    data: Profile | null;
    error: Error | null;
  }> => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      return {
        data: null,
        error: new Error(userError.message),
      };
    }

    if (!user) {
      return {
        data: null,
        error: new Error(
          "User not authenticated"
        ),
      };
    }

    const { data, error } =
      await supabase
        .from("profiles")
        .update(payload)
        .eq("user_id", user.id)
        .select("*")
        .single();

    if (error) {
      return {
        data: null,
        error: new Error(error.message),
      };
    }

    setProfile(data as Profile);

    return {
      data: data as Profile,
      error: null,
    };
  };

  useEffect(() => {
    const handleSession = async (
      session: Session | null
    ) => {
      setSession(session);

      setUser(session?.user ?? null);

      if (session?.user) {
        await getProfile();
      } else {
        setProfile(null);
      }

      setLoading(false);
    };

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        void handleSession(session);
      }
    );

    supabase.auth
      .getSession()
      .then(({ data: { session } }) => {
        void handleSession(session);
      });

    return () =>
      subscription.unsubscribe();
  }, []);

  const signIn = async (
    email: string,
    password: string
  ) => {
    const { error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (!error) {
      await getProfile();
    }

    return {
      error: error
        ? new Error(error.message)
        : null,
    };
  };

  const signUp = async (
    email: string,
    password: string,
    fullName?: string
  ) => {
    const { error } =
      await supabase.auth.signUp({
        email,
        password,
        options: {
          data: fullName
            ? { full_name: fullName }
            : undefined,
        },
      });

    return {
      error: error
        ? new Error(error.message)
        : null,
    };
  };

  const sendOtp = async (email: string) => {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/send-verification`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      }
    );

    const message = await readApiMessage(response);

    return {
      error: response.ok
        ? null
        : new Error(
            message || "Failed to send OTP"
          ),
      message,
    };
  } catch (error) {
    const message =
      error instanceof DOMException &&
      error.name === "AbortError"
        ? "OTP server timed out. Please try again."
        : "Failed to connect server";

    return {
      error: new Error(message),
    };
  }
};

  const verifyOtp = async (
  email: string,
  token: string
) => {
  try {
    const response = await fetchWithTimeout(
      `${API_URL}/verify-code`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          code: token,
        }),
      }
    );

    const message = await readApiMessage(response);

    return {
      error: response.ok
        ? null
        : new Error(
            message || "OTP verification failed"
          ),
    };
  } catch (error) {
    const message =
      error instanceof DOMException &&
      error.name === "AbortError"
        ? "OTP server timed out. Please try again."
        : "Verification failed";

    return {
      error: new Error(message),
    };
  }
};

  const registerWithOtp = async (
  email: string,
  otp: string,
  password: string,
  fullName?: string,
  userName?: string
) => {
  if (!otp) {
    return {
      error: new Error("OTP verification required"),
    };
  }

  const { error } =
    await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          username: userName,
        },
      },
    });

  return {
    error: error
      ? new Error(error.message)
      : null,
  };
};
  const updateAccount = async (
    password: string,
    fullName?: string
  ) => {
    const { error } =
      await supabase.auth.updateUser({
        password,
        data: fullName
          ? { full_name: fullName }
          : undefined,
      });

    return {
      error: error
        ? new Error(error.message)
        : null,
    };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setProfile(null);
  };

  return (
    <Ctx.Provider
      value={{
        user,
        session,
        profile,
        loading,
        signIn,
        signUp,
        sendOtp,
        verifyOtp,
        registerWithOtp,
        updateAccount,
        getProfile,
        updateProfile,
        signOut,
      }}
    >
      {children}
    </Ctx.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(Ctx);

  if (!ctx) {
    throw new Error(
      "useAuth must be used within AuthProvider"
    );
  }

  return ctx;
};
