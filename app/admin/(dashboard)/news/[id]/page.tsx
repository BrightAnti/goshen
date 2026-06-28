import { createServerClient } from "@/lib/supabase/server";
import Card from "@/components/ui/Card";
import NewsForm from "@/components/admin/NewsForm";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { MdArrowBack } from "react-icons/md";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

async function getNews(id: string) {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}

export default async function EditNewsPage({ params }: PageProps) {
  const { id } = await params;
  const news = await getNews(id);

  if (!news) {
    notFound();
  }

  return (
    <div>
      <div className="mb-4">
        <Link href="/admin/news">
          <Button variant="ghost" size="sm" className="mb-3">
            <MdArrowBack className="mr-2" /> Back
          </Button>
        </Link>
        <h1 className="text-2xl font-bold text-gray-900">
          Edit News Article
        </h1>
      </div>

      <Card padding="sm">
        <NewsForm news={news} />
      </Card>
    </div>
  );
}

