"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function NewsActions({ newsId }: { newsId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this article?")) return;

    const deletePromise = async () => {
      const { error } = await supabase.from("news").delete().eq("id", newsId);

      if (error) throw error;
      router.refresh();
    };

    toast.promise(deletePromise(), {
      pending: "Deleting article...",
      success: "Article deleted successfully! 🎉",
      error: "Failed to delete article. Please try again.",
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/news/${newsId}`}>
        <Button variant="ghost" size="sm">
          <MdEdit size={18} />
        </Button>
      </Link>
      <Button variant="danger" size="sm" onClick={handleDelete}>
        <MdDelete size={18} />
      </Button>
    </div>
  );
}
