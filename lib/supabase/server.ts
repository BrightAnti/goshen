import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerClient = async () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Return a mock client during build if env vars are missing
  if (!supabaseUrl || !supabaseAnonKey) {
    // Create a chainable query builder mock that is also a Promise
    const createQueryBuilder = (): any => {
      const promise = Promise.resolve({ data: [], error: null });
      const builder = Object.assign(promise, {
        select: () => builder,
        order: () => builder,
        eq: () => builder,
        neq: () => builder,
        gt: () => builder,
        gte: () => builder,
        lt: () => builder,
        lte: () => builder,
        like: () => builder,
        ilike: () => builder,
        is: () => builder,
        in: () => builder,
        contains: () => builder,
        range: () => builder,
        limit: () => builder,
        single: () => Promise.resolve({ data: null, error: null }),
        maybeSingle: () => Promise.resolve({ data: null, error: null }),
      });
      return builder;
    };

    return {
      auth: {
        getSession: async () => ({ data: { session: null }, error: null }),
        getUser: async () => ({ data: { user: null }, error: null }),
        signInWithPassword: async () => ({ data: null, error: { message: "Supabase not configured" } }),
        signOut: async () => ({ error: null }),
      },
      from: () => ({
        select: () => createQueryBuilder(),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => createQueryBuilder(),
        delete: () => createQueryBuilder(),
        upsert: () => Promise.resolve({ data: null, error: null }),
      }),
    } as any;
  }

  const cookieStore = await cookies();

  return createClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
        set(name: string, value: string, options: any) {
          try {
            cookieStore.set({
              name,
              value,
              ...options,
              httpOnly: true,
              secure: process.env.NODE_ENV === "production",
              sameSite: "lax",
              path: "/",
            });
          } catch (error) {
            // Server Component - cookies will be set by middleware
          }
        },
        remove(name: string, options: any) {
          try {
            cookieStore.set({
              name,
              value: "",
              ...options,
              maxAge: 0,
            });
          } catch (error) {
            // Server Component - cookies will be removed by middleware
          }
        },
      },
    }
  );
};
