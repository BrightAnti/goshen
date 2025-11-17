import { createServerClient } from "@/lib/supabase/server";
import { Event } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Link from "next/link";
import { format } from "date-fns";
import EventActions from "@/components/admin/EventActions";

async function getAllEvents() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .order("date", { ascending: false });

  return (data as Event[]) || [];
}

export default async function AdminEventsPage() {
  const events = await getAllEvents();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Events Management
          </h1>
          <p className="text-gray-600 mt-2">
            Manage school events and activities
          </p>
        </div>
        <Link href="/admin/events/new">
          <Button variant="primary">Create New Event</Button>
        </Link>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold">Title</th>
                <th className="text-left py-3 px-4 font-semibold">Date</th>
                <th className="text-left py-3 px-4 font-semibold">Status</th>
                <th className="text-right py-3 px-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    No events yet. Create your first one!
                  </td>
                </tr>
              ) : (
                events.map((event) => (
                  <tr
                    key={event.id}
                    className="border-b border-gray-100 hover:bg-gray-50"
                  >
                    <td className="py-3 px-4">{event.title}</td>
                    <td className="py-3 px-4">
                      {format(new Date(event.date), "MMM dd, yyyy")}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          event.published
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {event.published ? "Published" : "Draft"}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      <EventActions eventId={event.id} />
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
