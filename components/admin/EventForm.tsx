"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/utils/uploadImage";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import ImageUpload from "@/components/ui/ImageUpload";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";

interface EventFormData {
  title: string;
  slug: string;
  date: string;
  end_date?: string;
  location?: string;
  description: string;
  published: boolean;
}

export default function EventForm({ event }: { event?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<EventFormData>({
    defaultValues: event || {
      published: false,
    },
  });

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setValue("slug", slug);
  };

  const onSubmit = async (data: EventFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = event?.image || null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const eventData = {
        ...data,
        image: imageUrl,
        updated_at: new Date().toISOString(),
      };

      if (event) {
        const { error } = await supabase
          .from("events")
          .update(eventData)
          .eq("id", event.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("events").insert([eventData]);

        if (error) throw error;
      }

      toast.success(
        event
          ? "Event updated successfully! 🎉"
          : "Event created successfully! 🎉"
      );
      router.push("/admin/events");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving event:", err);
      const errorMessage = err.message || "Failed to save event";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormInput
        label="Title"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
        onChange={(e) => {
          register("title").onChange(e);
          handleTitleChange(e);
        }}
        required
      />

      <FormInput
        label="Slug (URL)"
        {...register("slug", { required: "Slug is required" })}
        error={errors.slug?.message}
        helperText="Auto-generated from title, but you can customize it"
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormInput
          label="Start Date & Time"
          type="datetime-local"
          {...register("date", { required: "Date is required" })}
          error={errors.date?.message}
          required
        />

        <FormInput
          label="End Date & Time"
          type="datetime-local"
          {...register("end_date")}
          error={errors.end_date?.message}
        />
      </div>

      <FormInput
        label="Location"
        {...register("location")}
        error={errors.location?.message}
      />

      <FormTextarea
        label="Description"
        rows={8}
        {...register("description", { required: "Description is required" })}
        error={errors.description?.message}
        required
      />

      <ImageUpload
        label="Event Image"
        onImageSelect={setImageFile}
        currentImage={event?.image}
      />

      <div className="flex items-center">
        <input
          type="checkbox"
          id="published"
          {...register("published")}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary"
        />
        <label
          htmlFor="published"
          className="ml-2 text-sm font-medium text-gray-700"
        >
          Publish immediately
        </label>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          isLoading={isSubmitting}
        >
          {event ? "Update" : "Create"} Event
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="lg"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
