import { createServerClient } from "@/lib/supabase/server";
import { Event } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import {
  MdArrowBack,
  MdLocationOn,
  MdAccessTime,
  MdCalendarToday,
} from "react-icons/md";
import { Metadata } from "next";
import { notFound } from "next/navigation";

interface PageProps {
  params: {
    slug: string;
  };
}

async function getEvent(slug: string) {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("events")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  return (data as Event) || null;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const event = await getEvent(params.slug);

  if (!event) {
    return {
      title: "Event Not Found",
    };
  }

  return {
    title: event.title,
    description: event.description.substring(0, 160),
    openGraph: {
      title: event.title,
      description: event.description.substring(0, 160),
      images: event.image ? [event.image] : [],
    },
  };
}

export default async function EventDetailPage({ params }: PageProps) {
  const event = await getEvent(params.slug);

  if (!event) {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="container-custom">
          <Link href="/events">
            <Button
              variant="ghost"
              className="mb-6 bg-white/10 hover:bg-white/20"
            >
              <MdArrowBack className="mr-2" /> Back to Events
            </Button>
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold">{event.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                <Card>
                  {event.image && (
                    <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        sizes="(max-width: 1024px) 100vw, 66vw"
                        className="object-cover"
                      />
                    </div>
                  )}

                  <h2 className="text-2xl font-bold mb-4">About This Event</h2>
                  <div className="prose max-w-none">
                    {event.description.split("\n").map((paragraph, index) => (
                      <p key={index} className="mb-4">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </Card>
              </div>

              {/* Event Details Sidebar */}
              <div className="lg:col-span-1">
                <Card className="sticky top-20">
                  <h3 className="text-xl font-bold mb-4">Event Details</h3>

                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MdCalendarToday
                        className="text-primary mt-1 mr-3 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-600 mb-1">
                          Date
                        </p>
                        <p className="font-semibold">
                          {format(new Date(event.date), "MMMM dd, yyyy")}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MdAccessTime
                        className="text-primary mt-1 mr-3 flex-shrink-0"
                        size={20}
                      />
                      <div>
                        <p className="font-medium text-sm text-gray-600 mb-1">
                          Time
                        </p>
                        <p className="font-semibold">
                          {format(new Date(event.date), "h:mm a")}
                          {event.end_date &&
                            ` - ${format(new Date(event.end_date), "h:mm a")}`}
                        </p>
                      </div>
                    </div>

                    {event.location && (
                      <div className="flex items-start">
                        <MdLocationOn
                          className="text-primary mt-1 mr-3 flex-shrink-0"
                          size={20}
                        />
                        <div>
                          <p className="font-medium text-sm text-gray-600 mb-1">
                            Location
                          </p>
                          <p className="font-semibold">{event.location}</p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <Link href="/contact">
                      <Button variant="primary" fullWidth>
                        Contact for More Info
                      </Button>
                    </Link>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
