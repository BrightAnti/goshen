import { createServerClient } from "@/lib/supabase/server";
import { News } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { format } from "date-fns";
import NewsActions from "@/components/admin/NewsActions";

async function getAllNews() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as News[]) || [];
}

export default async function AdminNewsPage() {
  const news = await getAllNews();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News Management</h1>
          <p className="text-gray-600 mt-2">
            Manage news articles and announcements
          </p>
        </div>
        <Link href="/admin/news/new">
          <Button variant="primary">Create New Article</Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Title</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-right py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {news.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No news articles yet. Create your first one!
                  </td>
                </tr>
              ) : (
                news.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{item.title}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          item.published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {item.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {format(new Date(item.created_at), "MMM dd, yyyy")}
                    </td>
                    <td className="py-3 px-4">
                      <NewsActions newsId={item.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
