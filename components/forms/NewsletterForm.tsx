"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { supabase } from "@/lib/supabase/client";

interface NewsletterFormData {
  email: string;
}

export default function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewsletterFormData>();

  const onSubmit = async (data: NewsletterFormData) => {
    try {
      // You can store newsletter subscriptions in a table
      // For now, just show success
      setStatus("success");
      reset();

      // Optional: Store in a newsletter_subscribers table
      // await supabase.from('newsletter_subscribers').insert([data])

      setTimeout(() => setStatus("idle"), 3000);
    } catch (error) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Your email address"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
          className="px-4 py-2 rounded-lg text-gray-900 focus:ring-2 focus:ring-accent focus:outline-none"
        />
        <button
          type="submit"
          className="bg-accent text-gray-900 px-6 py-2 rounded-lg font-semibold hover:bg-accent-600 transition-colors"
        >
          Subscribe
        </button>
      </form>

      {status === "success" && (
        <p className="mt-2 text-sm text-green-400">
          ✓ Subscribed successfully!
        </p>
      )}

      {status === "error" && (
        <p className="mt-2 text-sm text-red-400">
          Failed to subscribe. Try again.
        </p>
      )}

      {errors.email && (
        <p className="mt-2 text-sm text-red-400">Please enter a valid email</p>
      )}
    </div>
  );
}












