import { createServerClient } from "@/lib/supabase/server";
import { News } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { MdArrowBack } from "react-icons/md";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getNews(slug: string) {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  return (data as News) || null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const news = await getNews(params.slug);

  if (!news) {
    return {
      title: "News Not Found",
    };
  }

  return {
    title: news.title,
    description: news.excerpt || news.content.substring(0, 160),
    openGraph: {
      title: news.title,
      description: news.excerpt || news.content.substring(0, 160),
      images: news.image ? [news.image] : [],
    },
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  const news = await getNews(params.slug);

  if (!news) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="container-custom">
          <Link href="/news">
            <Button
              variant="ghost"
              className="mb-6 bg-white/10 hover:bg-white/20"
            >
              <MdArrowBack className="mr-2" /> Back to News
            </Button>
          </Link>
          <p className="text-primary-100 mb-2">
            {format(new Date(news.created_at), "MMMM dd, yyyy")}
          </p>
          <h1 className="text-4xl md:text-5xl font-bold">{news.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card>
              {news.image && (
                <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                  <Image
                    src={news.image}
                    alt={news.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 66vw"
                    className="object-cover"
                  />
                </div>
              )}

              <div className="prose max-w-none">
                {news.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
