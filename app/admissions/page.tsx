import PageHero from "@/components/ui/PageHero";
import { createServerClient } from "@/lib/supabase/server";
import { Page } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import { Metadata } from "next";
import { MdCheckCircle } from "react-icons/md";
import AdmissionsFAQ from "@/components/AdmissionsFAQ";

export const metadata: Metadata = {
  title: "Admissions",
  description: "Learn about our admission process, requirements, and fees.",
};

async function getPageContent() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", "admissions")
    .single();

  return (data as Page) || null;
}

// School colors
const colors = {
  primaryYellow: "#FFD600",
  primaryGreen: "#007A33",
  secondaryBrick: "#8B0000",
  secondaryDarkGrey: "#333333",
  secondaryCream: "#FFF5E1",
};

export default async function AdmissionsPage() {
  const pageContent = await getPageContent();

  const admissionSteps = [
    {
      step: 1,
      title: "Submit Application",
      description:
        "Complete and submit the application form with required documents.",
    },
    {
      step: 2,
      title: "Entrance Assessment",
      description:
        "Participate in our entrance assessment to evaluate academic readiness.",
    },
    {
      step: 3,
      title: "Parent Interview",
      description:
        "Meet with our admission team to discuss your child's educational journey.",
    },
    {
      step: 4,
      title: "Admission Decision",
      description:
        "Receive admission decision and complete enrollment process.",
    },
  ];

  // Ensure FAQs are always an array
  let faqs: Array<{ question: string; answer: string }> = [];

  if (pageContent?.content?.faqs && Array.isArray(pageContent.content.faqs)) {
    faqs = pageContent.content.faqs;
  } else if (
    pageContent?.content?.faqs &&
    typeof pageContent.content.faqs === "object"
  ) {
    // Handle case where FAQs might be an object instead of array
    faqs = Object.values(pageContent.content.faqs);
  }

  // Use fallback FAQs if none exist
  if (faqs.length === 0) {
    faqs = [
      {
        question: "What is the admission deadline?",
        answer:
          "Admissions are open year-round, but we recommend applying early as spaces are limited.",
      },
      {
        question: "What documents are required?",
        answer:
          "Birth certificate, previous academic records, health records, passport-sized photos, and parent identification.",
      },
      {
        question: "Is there an entrance exam?",
        answer:
          "Yes, students are required to take an age-appropriate entrance assessment.",
      },
    ];
  }

  return (
    <div className="bg-white text-gray-800">
      <div
        className="relative"
        style={{
          backgroundImage: "url('/images/yellow.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>

        <PageHero
          title="Admissions"
          subtitle="Join our vibrant community"
          offset={4}
        />
      </div>

      {/* Admission Process */}
      <section className="py-16">
        <div className="container-custom">
          <h2
            className="text-3xl font-bold mb-12 text-center"
            style={{ color: colors.primaryGreen }}
          >
            Admission Process
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {admissionSteps.map((item) => (
              <Card key={item.step} hover padding="md" className="text-center">
                <div className="flex flex-col items-center">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl mb-4 shadow-md"
                    style={{
                      backgroundColor: colors.primaryYellow,
                      color: colors.primaryGreen,
                    }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="text-xl font-semibold mb-2"
                    style={{ color: colors.secondaryDarkGrey }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <AdmissionsFAQ faqs={faqs} colors={colors} />
    </div>
  );
}
