"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import Button from "@/components/ui/Button";

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
    "idle" | "success" | "error" | "unconfigured"
  >("idle");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;

    if (!accessKey) {
      setSubmitStatus("unconfigured");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: data.name,
          email: data.email,
          phone: data.phone || "",
          subject: `GCS Contact: ${data.subject}`,
          message: data.message,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Submission failed");
      }

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
    <div className="flex flex-col h-full flex-1">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col flex-1 h-full gap-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            compact
            label="Full Name"
            {...register("name", { required: "Name is required" })}
            error={errors.name?.message}
            required
          />
          <FormInput
            compact
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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            compact
            label="Phone Number"
            type="tel"
            {...register("phone")}
            error={errors.phone?.message}
          />
          <FormInput
            compact
            label="Subject"
            {...register("subject", { required: "Subject is required" })}
            error={errors.subject?.message}
            required
          />
        </div>

        <div className="flex-1 flex flex-col min-h-0">
          <FormTextarea
            compact
            fillHeight
            label="Message"
            rows={4}
            {...register("message", { required: "Message is required" })}
            error={errors.message?.message}
            required
          />
        </div>

        <div className="pt-1 mt-auto">
          <Button
            type="submit"
            variant="primary"
            size="md"
            isLoading={isSubmitting}
          >
            Send Message
          </Button>
        </div>
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
            Oops! Something went wrong. Please try again or email us at{" "}
            <a
              href="mailto:goshencommunityschool@gmail.com"
              className="underline"
            >
              goshencommunityschool@gmail.com
            </a>
            .
          </p>
        </div>
      )}

      {submitStatus === "unconfigured" && (
        <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-amber-900 font-medium text-sm">
            Contact form is not configured yet. Please email us directly at{" "}
            <a
              href="mailto:goshencommunityschool@gmail.com"
              className="underline"
            >
              goshencommunityschool@gmail.com
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
