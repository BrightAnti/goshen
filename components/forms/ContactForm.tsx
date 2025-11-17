"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import Button from "@/components/ui/Button";
import { supabase } from "@/lib/supabase/client";

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Save to database
      const { error } = await supabase
        .from("contact_submissions")
        .insert([data]);

      if (error) throw error;

      // Optionally send email via API route
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      setSubmitStatus("success");
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Full Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
            required
          />
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormInput
            label="Phone Number"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <FormInput
            label="Subject"
            {...register("subject", { required: "Subject is required" })}
            error={errors.subject?.message}
            required
          />
        </div>

        <FormTextarea
          label="Message"
          rows={6}
          {...register("message", { required: "Message is required" })}
          error={errors.message?.message}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          isLoading={isSubmitting}
        >
          Send Message
        </Button>
      </form>

      {submitStatus === "success" && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-800 font-medium">
            Thank you! Your message has been sent successfully. We&apos;ll get
            back to you soon.
          </p>
        </div>
      )}

      {submitStatus === "error" && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 font-medium">
            Oops! Something went wrong. Please try again or contact us directly.
          </p>
        </div>
      )}
    </div>
  );
}
