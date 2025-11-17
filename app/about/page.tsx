import PageHero from "@/components/ui/PageHero";

import { Page, Staff } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Image from "next/image";
import { createServerClient } from "@/lib/supabase/server";
import { MdFlag, MdCheckCircle } from "react-icons/md";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about our school mission, vision, history, and leadership team.",
};

async function getPageContent() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", "about")
    .single();

  return (data as Page) || null;
}

async function getStaff() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("staff")
    .select("*")
    .order("order_index", { ascending: true });

  return (data as Staff[]) || [];
}

export default async function AboutPage() {
  const pageContent = await getPageContent();
  const staff = await getStaff();
  const supabase = await createServerClient();
  const { data: gallery } = await supabase
    .from("gallery")
    .select("image_url,title")
    .order("uploaded_at", { ascending: false })
    .limit(8);

  return (
    <div>
      {/* Hero Section */}
      <PageHero
        title="About GCS"
        subtitle="Our mission, values, and story"
        offset={2}
      />

      {/* Story, Vision & Mission - polished styling */}
      <section className="py-20 bg-cream" id="mission">
        <div className="container-custom">
          {/* About Us Intro */}
          <div className="max-w-5xl mx-auto mb-16">
            <div className="text-center mb-6">
              <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-accent-100 text-accent-700">
                Since 1990
              </span>
              <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900">
                About Us
              </h2>
            </div>
            <Card className="bg-white/80 backdrop-blur-sm">
              <p className="text-lg md:text-xl leading-relaxed text-gray-700">
                Established in October 1990, our school stands as a beacon of
                educational excellence rooted in Christian principles. From its
                inception, our school has been dedicated to instilling these
                values in every child, achieving remarkable strides in child
                education.
              </p>
            </Card>
          </div>

          {/* Vision & Mission Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Vision */}
            <Card>
              <div className="flex items-start gap-4">
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary">
                  <MdFlag size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    Our Vision
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    Goshen Community School is to become a world class learning
                    centre providing holistic training to all students to serve
                    God, family and country.
                  </p>
                </div>
              </div>
            </Card>

            {/* Mission */}
            <Card>
              <div className="flex items-start gap-4">
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-100 text-accent-700">
                  <MdCheckCircle size={28} />
                </div>
                <div>
                  <h3 className="text-2xl font-bold mb-3 text-gray-900">
                    Our Mission
                  </h3>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                      <span>
                        Provide a conducive environment for teaching and
                        learning, where each child can develop a sense of pride,
                        self-esteem & independence.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                      <span>
                        Provide a secure environment where children and staff
                        feel valued and respect each other.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 h-2 w-2 rounded-full bg-primary"></span>
                      <span>
                        Forge close links and develop co-operation with parents,
                        staff and the community.
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <Card>
            <h2 className="text-3xl font-bold mb-6 text-center">Our History</h2>
            <div className="prose max-w-none">
              <p>
                {pageContent?.content?.history ||
                  "Founded with a vision to provide quality education, our school has been serving the community for decades. We have grown from a small institution to a comprehensive educational center, always maintaining our commitment to academic excellence and character development."}
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Photo Collage */}
      {gallery && gallery.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Life at Our School
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {gallery.map((g: { image_url: string | null; title: string | null }, idx: number) => (
                <div
                  key={idx}
                  className="relative aspect-[4/3] rounded-lg overflow-hidden"
                >
                  <Image
                    src={g.image_url || ""}
                    alt={g.title || "Gallery"}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Leadership Team */}
      {staff.length > 0 && (
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Our Leadership Team
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {staff.map((member) => (
                <Card
                  key={member.id}
                  hover
                  padding="none"
                  className="text-center"
                >
                  {member.photo ? (
                    <div className="relative h-64 w-full">
                      <Image
                        src={member.photo}
                        alt={member.name}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover rounded-t-lg"
                      />
                    </div>
                  ) : (
                    <div className="h-64 w-full bg-gradient-to-br from-primary to-primary-700 flex items-center justify-center rounded-t-lg">
                      <span className="text-6xl font-bold text-white">
                        {member.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                    <p className="text-primary font-medium mb-2">
                      {member.role}
                    </p>
                    {member.department && (
                      <p className="text-sm text-gray-500 mb-3">
                        {member.department}
                      </p>
                    )}
                    {member.bio && (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {member.bio}
                      </p>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Values - Inspired by Lincoln CS */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Our Core Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-white/10 border-0 text-white hover:bg-white/20">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Don&apos;t just tell me how it&apos;s done. Let me try.
              </h3>
              <p className="text-primary-100 text-lg">
                Learning is about trying things out for yourself, not just being
                told about them. We believe in experiential, hands-on education.
              </p>
            </Card>

            <Card className="bg-white/10 border-0 text-white hover:bg-white/20">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Whatever happens, it&apos;s what you do next that matters.
              </h3>
              <p className="text-primary-100 text-lg">
                We don&apos;t dream of success, we work hard for it. Resilience
                and perseverance are at the heart of growth.
              </p>
            </Card>

            <Card className="bg-white/10 border-0 text-white hover:bg-white/20">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                Be kind. It opens doors and minds.
              </h3>
              <p className="text-primary-100 text-lg">
                Kindness costs nothing but means everything. We nurture
                compassionate global citizens who care for others.
              </p>
            </Card>

            <Card className="bg-white/10 border-0 text-white hover:bg-white/20">
              <h3 className="text-2xl font-bold mb-4 text-accent">
                The more we do together, the more we achieve.
              </h3>
              <p className="text-primary-100 text-lg">
                There is unity in diversity when we share a common purpose.
                Collaboration makes us stronger.
              </p>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
