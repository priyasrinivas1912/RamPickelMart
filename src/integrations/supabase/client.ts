import { createClient } from "@supabase/supabase-js";
import type { Database } from "./types";

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const missingConfigError = {
  message:
    "Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY to .env.local.",
};

const createDisabledQuery = () => {
  const response = Promise.resolve({
    data: null,
    error: missingConfigError,
  });

  const query = {
    select: () => query,
    insert: () => query,
    update: () => query,
    eq: () => query,
    order: () => query,
    limit: () => query,
    single: () => response,
    then: response.then.bind(response),
    catch: response.catch.bind(response),
    finally: response.finally.bind(response),
  };

  return query;
};

const createDisabledSupabaseClient = () => {
  console.warn(missingConfigError.message);

  return {
    auth: {
      getUser: async () => ({
        data: { user: null },
        error: null,
      }),
      getSession: async () => ({
        data: { session: null },
        error: null,
      }),
      onAuthStateChange: () => ({
        data: {
          subscription: {
            unsubscribe: () => undefined,
          },
        },
      }),
      signInWithPassword: async () => ({
        data: { user: null, session: null },
        error: missingConfigError,
      }),
      signUp: async () => ({
        data: { user: null, session: null },
        error: missingConfigError,
      }),
      updateUser: async () => ({
        data: { user: null },
        error: missingConfigError,
      }),
      signOut: async () => ({
        error: null,
      }),
    },
    from: () => createDisabledQuery(),
  } as unknown as ReturnType<typeof createClient<Database>>;
};

export const isSupabaseConfigured = Boolean(
  SUPABASE_URL && SUPABASE_PUBLISHABLE_KEY
);

export const supabase = isSupabaseConfigured
  ? createClient<Database>(
      SUPABASE_URL,
      SUPABASE_PUBLISHABLE_KEY,
      {
        auth: {
          storage: localStorage,
          persistSession: true,
          autoRefreshToken: true,
        },
      }
    )
  : createDisabledSupabaseClient();
