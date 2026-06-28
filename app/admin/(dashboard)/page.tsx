import { createServerClient } from "@/lib/supabase/server";
import Card from "@/components/ui/Card";
import { MdArticle, MdEvent, MdCheckCircle, MdSchedule } from "react-icons/md";
import Link from "next/link";

async function getDashboardStats() {
  const supabase = await createServerClient();

  const [
    newsCount,
    newsPublishedCount,
    newsDraftCount,
    eventsCount,
    eventsPublishedCount,
    eventsDraftCount,
  ] = await Promise.all([
    supabase.from("news").select("id", { count: "exact", head: true }),
    supabase
      .from("news")
      .select("id", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("news")
      .select("id", { count: "exact", head: true })
      .eq("published", false),
    supabase.from("events").select("id", { count: "exact", head: true }),
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("published", true),
    supabase
      .from("events")
      .select("id", { count: "exact", head: true })
      .eq("published", false),
  ]);

  return {
    news: {
      total: newsCount.count || 0,
      published: newsPublishedCount.count || 0,
      drafts: newsDraftCount.count || 0,
    },
    events: {
      total: eventsCount.count || 0,
      published: eventsPublishedCount.count || 0,
      drafts: eventsDraftCount.count || 0,
    },
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">News & Events Dashboard</h1>
        <p className="text-gray-600 mt-1 text-sm">
          Manage news articles and school events
        </p>
      </div>

      {/* Combined Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card hover>
          <div className="flex items-center">
            <div className="p-2 bg-primary-100 rounded-lg">
              <MdArticle size={24} className="text-primary" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-600">News</p>
              <p className="text-xl font-bold">{stats.news.total}</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="p-2 bg-accent-100 rounded-lg">
              <MdEvent size={24} className="text-accent-700" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-600">Events</p>
              <p className="text-xl font-bold">{stats.events.total}</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <MdCheckCircle size={24} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-600">Published</p>
              <p className="text-xl font-bold">{stats.news.published + stats.events.published}</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <MdSchedule size={24} className="text-yellow-600" />
            </div>
            <div className="ml-3">
              <p className="text-xs text-gray-600">Drafts</p>
              <p className="text-xl font-bold">{stats.news.drafts + stats.events.drafts}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Link
          href="/admin/news/new"
          className="block p-4 bg-primary/5 hover:bg-primary/10 border border-primary/20 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <MdArticle size={24} className="text-primary" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Create News Article</h3>
              <p className="text-xs text-gray-600">Share school news</p>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/events/new"
          className="block p-4 bg-accent/5 hover:bg-accent/10 border border-accent/20 rounded-lg transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-accent/10 rounded-lg">
              <MdEvent size={24} className="text-accent-700" />
            </div>
            <div>
              <h3 className="font-semibold text-accent-700">Create Event</h3>
              <p className="text-xs text-gray-600">Add school event</p>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
