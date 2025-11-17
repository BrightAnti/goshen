import { createServerClient } from "@/lib/supabase/server";
import { GalleryItem } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Image from "next/image";
import Carousel from "@/components/ui/Carousel";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Explore photos and memories from our school community.",
};

async function getGalleryItems() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("gallery")
    .select("*")
    .order("uploaded_at", { ascending: false });

  return (data as GalleryItem[]) || [];
}

export default async function GalleryPage() {
  const galleryItems = await getGalleryItems();

  // Group by category if categories exist
  const categories = [
    ...new Set(galleryItems.map((item) => item.category || "Uncategorized")),
  ];

  const carouselImages = galleryItems.slice(0, 6).map((item) => ({
    src: item.image_url,
    alt: item.title,
    title: item.title,
    description: item.description || undefined,
  }));

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Gallery</h1>
          <p className="text-xl text-primary-100">
            Capturing moments and memories from our vibrant school community
          </p>
        </div>
      </section>

      {/* Featured Slider */}
      {carouselImages.length > 1 && (
        <section className="py-10">
          <div className="container-custom">
            <Carousel images={carouselImages} height="480px" />
          </div>
        </section>
      )}

      {/* Gallery Grid */}
      <section className="py-16">
        <div className="container-custom">
          {galleryItems.length === 0 ? (
            <Card>
              <p className="text-center text-gray-500 py-8">
                No images in the gallery yet. Check back soon!
              </p>
            </Card>
          ) : (
            categories.map((category) => {
              const categoryItems = galleryItems.filter(
                (item) => (item.category || "Uncategorized") === category
              );

              if (categoryItems.length === 0) return null;

              return (
                <div key={category} className="mb-12">
                  <h2 className="text-2xl font-bold mb-6">{category}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryItems.map((item) => (
                      <Card
                        key={item.id}
                        hover
                        padding="none"
                        className="group cursor-pointer"
                      >
                        <div className="relative h-64 w-full overflow-hidden rounded-lg">
                          <Image
                            src={item.image_url}
                            alt={item.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="absolute bottom-0 left-0 right-0 p-4">
                              <h3 className="text-white font-bold text-lg">
                                {item.title}
                              </h3>
                              {item.description && (
                                <p className="text-white/90 text-sm mt-1">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>
    </div>
  );
}
