import { createServerClient } from "@/lib/supabase/server";
import { Event } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Metadata } from "next";
import { MdLocationOn } from "react-icons/md";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Events",
  description: "Discover upcoming events and activities at our school.",
};

async function getUpcomingEvents() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .gte("date", new Date().toISOString())
    .order("date", { ascending: true });

  return (data as Event[]) || [];
}

async function getPastEvents() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("published", true)
    .lt("date", new Date().toISOString())
    .order("date", { ascending: false })
    .limit(6);

  return (data as Event[]) || [];
}

export default async function EventsPage() {
  const upcomingEvents = await getUpcomingEvents();
  const pastEvents = await getPastEvents();

  return (
    <div>
      {/* Hero Section */}
      <PageHero title="Events" subtitle="What’s happening at GCS" offset={6} />

      {/* Upcoming Events */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>

          {upcomingEvents.length === 0 ? (
            <Card>
              <p className="text-center text-gray-500 py-8">
                No upcoming events scheduled at the moment. Check back soon!
              </p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {upcomingEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`}>
                  <Card hover padding="none" className="h-full">
                    {event.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-start gap-4 mb-4">
                        <div className="bg-accent text-gray-900 rounded-lg p-3 text-center min-w-[60px]">
                          <div className="text-2xl font-bold">
                            {format(new Date(event.date), "dd")}
                          </div>
                          <div className="text-sm">
                            {format(new Date(event.date), "MMM")}
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-2 line-clamp-2">
                            {event.title}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {format(new Date(event.date), "h:mm a")}
                          </p>
                        </div>
                      </div>

                      {event.location && (
                        <div className="flex items-center text-sm text-gray-600 mb-3">
                          <MdLocationOn className="mr-1 flex-shrink-0" />
                          {event.location}
                        </div>
                      )}

                      <p className="text-gray-600 text-sm line-clamp-3">
                        {event.description}
                      </p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8">Past Events</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {pastEvents.map((event) => (
                <Link key={event.id} href={`/events/${event.slug}`}>
                  <Card hover padding="none" className="h-full opacity-90">
                    {event.image && (
                      <div className="relative h-48 w-full">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover rounded-t-lg"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <p className="text-sm text-gray-500 mb-2">
                        {format(new Date(event.date), "MMMM dd, yyyy")}
                      </p>
                      <h3 className="text-xl font-bold mb-2 line-clamp-2">
                        {event.title}
                      </h3>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
