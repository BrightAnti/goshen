import { createServerClient } from "@/lib/supabase/server";
import { GalleryItem } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import GalleryUploadForm from "@/components/admin/GalleryUploadForm";
import GalleryGrid from "@/components/admin/GalleryGrid";

async function getGalleryItems() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("uploaded_at", { ascending: false });

  return (data as GalleryItem[]) || [];
}

export default async function AdminGalleryPage() {
  const galleryItems = await getGalleryItems();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Gallery Management</h1>
        <p className="text-gray-600 mt-2">Upload and manage gallery images</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-1">
          <Card>
            <h2 className="text-xl font-bold mb-4">Upload Image</h2>
            <GalleryUploadForm />
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card>
            <h2 className="text-xl font-bold mb-4">
              Gallery Items ({galleryItems.length})
            </h2>
            <GalleryGrid items={galleryItems} />
          </Card>
        </div>
      </div>
    </div>
  );
}
