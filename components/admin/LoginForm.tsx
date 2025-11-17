"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import FormInput from "@/components/ui/FormInput";
import Button from "@/components/ui/Button";

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data: authData, error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      console.log(
        "✅ Login successful!",
        authData.session ? "Session created" : "No session"
      );

      if (authData.session) {
        console.log("✅ Cookies will be set automatically by SSR client");
        console.log("🔄 Redirecting to dashboard...");

        // Use router navigation - SSR client handles cookies
        router.push("/admin");
        router.refresh();
      } else {
        throw new Error("Login succeeded but no session was created");
      }
    } catch (err: any) {
      console.error("❌ Login error:", err);
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <FormInput
          label="Email Address"
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
          required
        />
      </div>

      <div>
        <FormInput
          label="Password"
          type="password"
          {...register("password", { required: "Password is required" })}
          error={errors.password?.message}
          required
        />
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Sign In
      </Button>
    </form>
  );
}
