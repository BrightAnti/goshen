import PageHero from "@/components/ui/PageHero";
import { createServerClient } from "@/lib/supabase/server";
import { Page } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import Link from "next/link";
import { Metadata } from "next";
import { MdCheckCircle, MdDownload, MdDescription } from "react-icons/md";
import AdmissionsFAQ from "@/components/AdmissionsFAQ";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

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
      title: "Assessment Test",
      description:
        "Participate in our entrance assessment free of charge. Available for Kindergarten to Junior High.",
    },
    {
      step: 3,
      title: "Parent - School Interaction",
      description:
        "Meet the head of school & teacher to discuss your child's educational journey.",
    },
    {
      step: 4,
      title: "Admission Decision",
      description:
        "Complete admissions process by paying fees, purchasing books, and finalizing enrollment.",
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
          subtitle="Join our vibrant school community"
          offset={4}
        />
      </div>

      {/* Introduction Section */}
      <section className="py-10 bg-white">
        <div className="container-custom max-w-4xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp">
            <h2
              className="text-3xl md:text-4xl font-extrabold mb-4 tracking-tight"
              style={{ color: colors.primaryGreen }}
            >
              Goshen Community School Admissions
            </h2>
            <div
              className="w-20 h-1 mx-auto mb-6 rounded-full"
              style={{ backgroundColor: colors.primaryYellow }}
            ></div>
            <p className="text-xl md:text-2xl text-gray-700 font-medium">
              Find your home with us.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Download Admission Form Section */}
      <section className="py-10 bg-gradient-to-br from-gray-50 to-cream/50">
        <div className="container-custom max-w-4xl mx-auto">
          <AnimatedSection animation="scaleIn">
            <div
              className="shadow-xl border-2 rounded-xl bg-white"
              style={{ borderColor: colors.primaryGreen + "20" }}
            >
            <div className="flex flex-col md:flex-row items-center gap-6 p-6">
              <div className="flex-shrink-0">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: colors.primaryYellow }}
                >
                  <MdDescription
                    size={40}
                    style={{ color: colors.primaryGreen }}
                  />
                </div>
              </div>
              <div className="flex-grow text-center md:text-left">
                <h3
                  className="text-2xl md:text-3xl font-bold mb-2 tracking-tight"
                  style={{ color: colors.primaryGreen }}
                >
                  Download Admission Form
                </h3>
                <p className="text-gray-700 text-lg mb-4">
                  Get started by downloading our admission application form.
                  Complete it and submit it along with the required documents.
                </p>
              </div>
              <div className="flex-shrink-0">
                <a
                  href="/documents/admission-form.pdf"
                  download
                  className="inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
                  style={{
                    backgroundColor: colors.primaryGreen,
                  }}
                >
                  <MdDownload size={24} />
                  <span>Download PDF</span>
                </a>
              </div>
            </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Admission Process */}
      <section className="py-10 bg-gradient-to-b from-white to-gray-50">
        <div className="container-custom">
          <AnimatedSection animation="fadeInUp">
            <div className="text-center mb-10">
              <h2
                className="text-3xl md:text-4xl font-extrabold mb-3 tracking-tight"
                style={{ color: colors.primaryGreen }}
              >
                Admission Process
              </h2>
              <div
                className="w-20 h-1 mx-auto rounded-full"
                style={{ backgroundColor: colors.primaryYellow }}
              ></div>
            </div>
          </AnimatedSection>
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {admissionSteps.map((item) => (
              <StaggerItem key={item.step}>
                <Card
                  hover
                  padding="lg"
                  className="text-center h-full shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                <div className="flex flex-col items-center h-full">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center font-bold text-2xl mb-5 shadow-lg"
                    style={{
                      backgroundColor: colors.primaryYellow,
                      color: colors.primaryGreen,
                    }}
                  >
                    {item.step}
                  </div>
                  <h3
                    className="text-xl font-bold mb-3"
                    style={{ color: colors.primaryGreen }}
                  >
                    {item.title}
                  </h3>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      {/* Inquire Section */}
      <section className="py-10 bg-gradient-to-br from-cream via-white to-cream/30">
        <div className="container-custom max-w-3xl mx-auto text-center">
          <AnimatedSection animation="fadeInUp">
            <h3
              className="text-2xl md:text-3xl font-bold mb-4 tracking-tight"
              style={{ color: colors.primaryGreen }}
            >
              Interested in learning more?
            </h3>
            <p className="text-gray-700 mb-8 text-lg leading-relaxed">
              Contact us to learn more about our admission process, schedule a
              school visit, or speak with our admissions team.
            </p>
            <Link
              href="/contact"
              className="inline-block px-10 py-4 rounded-lg font-bold text-white transition-all duration-300 hover:shadow-xl hover:scale-105 transform"
              style={{
                backgroundColor: colors.primaryGreen,
              }}
            >
              Enquire
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQs Section */}
      <AdmissionsFAQ faqs={faqs} colors={colors} />
    </div>
  );
}
