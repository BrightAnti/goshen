import { createServerClient } from "@/lib/supabase/server";
import Card from "@/components/ui/Card";
import { MdArticle, MdEvent, MdPhotoLibrary, MdEmail } from "react-icons/md";

async function getDashboardStats() {
  const supabase = await createServerClient();

  const [newsCount, eventsCount, galleryCount, contactCount] =
    await Promise.all([
      supabase.from("news").select("id", { count: "exact", head: true }),
      supabase.from("events").select("id", { count: "exact", head: true }),
      supabase.from("gallery").select("id", { count: "exact", head: true }),
      supabase
        .from("contact_submissions")
        .select("id", { count: "exact", head: true }),
    ]);

  return {
    news: newsCount.count || 0,
    events: eventsCount.count || 0,
    gallery: galleryCount.count || 0,
    contacts: contactCount.count || 0,
  };
}

export default async function AdminDashboard() {
  const stats = await getDashboardStats();

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome to your admin dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card hover>
          <div className="flex items-center">
            <div className="p-3 bg-primary-100 rounded-lg">
              <MdArticle size={32} className="text-primary" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total News</p>
              <p className="text-2xl font-bold">{stats.news}</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="p-3 bg-accent-100 rounded-lg">
              <MdEvent size={32} className="text-accent-700" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Total Events</p>
              <p className="text-2xl font-bold">{stats.events}</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="p-3 bg-green-100 rounded-lg">
              <MdPhotoLibrary size={32} className="text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Gallery Items</p>
              <p className="text-2xl font-bold">{stats.gallery}</p>
            </div>
          </div>
        </Card>

        <Card hover>
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 rounded-lg">
              <MdEmail size={32} className="text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm text-gray-600">Contact Forms</p>
              <p className="text-2xl font-bold">{stats.contacts}</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-bold mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <a
              href="/admin/news/new"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h3 className="font-semibold">Create News Article</h3>
              <p className="text-sm text-gray-600">Add a new news post</p>
            </a>
            <a
              href="/admin/events/new"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h3 className="font-semibold">Create Event</h3>
              <p className="text-sm text-gray-600">Add a new event</p>
            </a>
            <a
              href="/admin/gallery"
              className="block p-4 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <h3 className="font-semibold">Upload Images</h3>
              <p className="text-sm text-gray-600">Add photos to gallery</p>
            </a>
          </div>
        </Card>

        <Card>
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <p className="text-gray-600">Activity tracking coming soon...</p>
        </Card>
      </div>
    </div>
  );
}
