import { createServerClient } from "@/lib/supabase/server";
import { News, Event } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { format } from "date-fns";
import NewsActions from "@/components/admin/NewsActions";
import EventActions from "@/components/admin/EventActions";
import NewsEventsTabs from "@/components/admin/NewsEventsTabs";

async function getAllNews() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("news")
    .select("*")
    .order("created_at", { ascending: false });

  return (data as News[]) || [];
}

async function getAllEvents() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  return (data as Event[]) || [];
}

export default async function NewsEventsPage() {
  const news = await getAllNews();
  const events = await getAllEvents();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">News & Events</h1>
          <p className="text-gray-600 mt-2">
            Manage news articles and school events
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/news/new">
            <Button variant="primary">Create News</Button>
          </Link>
          <Link href="/admin/events/new">
            <Button variant="secondary">Create Event</Button>
          </Link>
        </div>
      </div>

      <NewsEventsTabs
        news={news}
        events={events}
      />
    </div>
  );
}
