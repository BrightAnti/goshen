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

interface NewsFormData {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  published: boolean;
}

export default function NewsForm({ news }: { news?: any }) {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<NewsFormData>({
    defaultValues: news || {
      published: false,
    },
  });

  const title = watch("title");

  // Auto-generate slug from title
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTitle = e.target.value;
    const slug = newTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    setValue("slug", slug);
  };

  const onSubmit = async (data: NewsFormData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      let imageUrl = news?.image || null;

      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const newsData = {
        ...data,
        image: imageUrl,
        updated_at: new Date().toISOString(),
      };

      if (news) {
        const { error } = await supabase
          .from("news")
          .update(newsData)
          .eq("id", news.id);

        if (error) throw error;
      } else {
        const { error } = await supabase.from("news").insert([newsData]);

        if (error) throw error;
      }

      toast.success(
        news
          ? "News article updated successfully! 🎉"
          : "News article published successfully! 🎉"
      );
      router.push("/admin/news");
      router.refresh();
    } catch (err: any) {
      console.error("Error saving news:", err);
      const errorMessage = err.message || "Failed to save news article";
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
          label="Slug"
          {...register("slug", { required: "Slug is required" })}
          error={errors.slug?.message}
          required
        />
      </div>

      <FormTextarea
        label="Content"
        rows={6}
        {...register("content", { required: "Content is required" })}
        error={errors.content?.message}
        required
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ImageUpload
          label="Featured Image"
          onImageSelect={setImageFile}
          currentImage={news?.image}
        />

        <div className="space-y-4">
          <FormTextarea
            label="Excerpt (optional)"
            rows={3}
            {...register("excerpt")}
            error={errors.excerpt?.message}
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
        </div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          variant="primary"
          isLoading={isSubmitting}
        >
          {news ? "Update" : "Create"} Article
        </Button>
        <Button
          type="button"
          variant="ghost"
          onClick={() => router.back()}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}
