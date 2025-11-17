"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import { deleteImage } from "@/lib/utils/uploadImage";
import { GalleryItem } from "@/lib/types/database";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (item: GalleryItem) => {
    if (!confirm("Are you sure you want to delete this image?")) return;

    setDeletingId(item.id);

    try {
      // Delete from storage
      await deleteImage(item.image_url);

      // Delete from database
      const { error } = await supabase
        .from("gallery")
        .delete()
        .eq("id", item.id);

      if (error) throw error;

      toast.success("Image deleted successfully! 🎉");
      router.refresh();
    } catch (error) {
      console.error("Error deleting image:", error);
      toast.error("Failed to delete image. Please try again.");
    } finally {
      setDeletingId(null);
    }
  };

  if (items.length === 0) {
    return (
      <p className="text-center text-gray-500 py-8">
        No images uploaded yet. Upload your first image!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {items.map((item) => (
        <div key={item.id} className="relative group">
          <div className="relative h-40 w-full rounded-lg overflow-hidden">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              sizes="(max-width: 768px) 50vw, 33vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(item)}
                isLoading={deletingId === item.id}
              >
                <MdDelete size={18} />
              </Button>
            </div>
          </div>
          <div className="mt-2">
            <p className="font-medium text-sm truncate">{item.title}</p>
            {item.category && (
              <p className="text-xs text-gray-500">{item.category}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
