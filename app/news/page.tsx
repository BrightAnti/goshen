import PageHero from "@/components/ui/PageHero";

import { createServerClient } from "@/lib/supabase/server";
import { News } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "News",
  description:
    "Stay updated with the latest news and announcements from our school.",
};

async function getAllNews() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (data as News[]) || [];
}

export default async function NewsPage() {
  const news = await getAllNews();

  return (
    <div>
      {/* Hero Section */}
      <PageHero title="News" subtitle="Updates from our community" offset={5} />

      {/* News Grid */}
      <section className="py-16">
        <div className="container-custom">
          {news.length === 0 ? (
            <Card>
              <p className="text-center text-gray-500 py-8">
                No news articles available at the moment. Check back soon!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <Link key={item.id} href={`/news/${item.slug}`}>
                  <Card hover padding="none" className="h-full">
                    {item.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {format(new Date(item.created_at), "MMMM dd, yyyy")}
                      </p>
                      <h2 className="text-xl font-bold mb-3 line-clamp-2">
                        {item.title}
                      </h2>
                      {item.excerpt && (
                        <p className="text-gray-600 line-clamp-3">
                          {item.excerpt}
                        </p>
                      )}
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
