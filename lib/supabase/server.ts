import { createServerClient as createClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export const createServerClient = async () => {
  const cookieStore = await cookies();

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
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
