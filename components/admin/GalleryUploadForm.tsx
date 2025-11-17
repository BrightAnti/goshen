"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { uploadImage } from "@/lib/utils/uploadImage";
import FormInput from "@/components/ui/FormInput";
import ImageUpload from "@/components/ui/ImageUpload";
import Button from "@/components/ui/Button";
import { toast } from "react-toastify";

interface GalleryFormData {
  title: string;
  description?: string;
  category?: string;
}

export default function GalleryUploadForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<GalleryFormData>();

  const onSubmit = async (data: GalleryFormData) => {
    if (!imageFile) {
      setError("Please select an image to upload");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      const imageUrl = await uploadImage(imageFile);

      const { error } = await supabase.from("gallery").insert([
        {
          ...data,
          image_url: imageUrl,
        },
      ]);

      if (error) throw error;

      reset();
      toast.success("Image uploaded successfully! 🎉");
      setImageFile(null);
      router.refresh();
    } catch (err: any) {
      console.error("Error uploading image:", err);
      const errorMessage = err.message || "Failed to upload image";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <FormInput
        label="Title"
        {...register("title", { required: "Title is required" })}
        error={errors.title?.message}
        required
      />

      <FormInput
        label="Description"
        {...register("description")}
        error={errors.description?.message}
      />

      <FormInput
        label="Category"
        {...register("category")}
        error={errors.category?.message}
        helperText="e.g., Sports, Events, Campus Life"
      />

      <ImageUpload label="Image" onImageSelect={setImageFile} />

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isSubmitting}
      >
        Upload Image
      </Button>
    </form>
  );
}
