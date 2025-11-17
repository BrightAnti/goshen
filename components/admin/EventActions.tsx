"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { MdEdit, MdDelete } from "react-icons/md";
import { toast } from "react-toastify";

export default function EventActions({ eventId }: { eventId: string }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    const deletePromise = async () => {
      const { error } = await supabase
        .from("events")
        .delete()
        .eq("id", eventId);

      if (error) throw error;
      router.refresh();
    };

    toast.promise(deletePromise(), {
      pending: "Deleting event...",
      success: "Event deleted successfully! 🎉",
      error: "Failed to delete event. Please try again.",
    });
  };

  return (
    <div className="flex justify-end gap-2">
      <Link href={`/admin/events/${eventId}`}>
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
