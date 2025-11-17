import { createServerClient } from "@/lib/supabase/server";
import { Page } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/forms/ContactForm";
import { Metadata } from "next";
import { MdLocationOn, MdPhone, MdEmail, MdAccessTime } from "react-icons/md";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with us for inquiries, admissions, or support.",
};

async function getPageContent() {
  const supabase = await createServerClient();
  const { data } = await supabase
    .from("pages")
    .select("*")
    .eq("slug", "contact")
    .single();

  return (data as Page) || null;
}

const colors = {
  primaryYellow: "#FFD600",
  primaryGreen: "#007A33",
  secondaryBrick: "#8B0000",
  secondaryDarkGrey: "#333333",
  secondaryCream: "#FFF5E1",
};

export default async function ContactPage() {
  const pageContent = await getPageContent();
  const contactInfo = pageContent?.content || {};

  return (
    <div className="bg-white text-gray-800">
      {/* Page Header */}
      <section
        className="py-16 text-white"
        style={{ backgroundColor: colors.primaryGreen }}
      >
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-3">Contact Us</h1>
          <div
            className="h-1 w-20 rounded mb-4"
            style={{ backgroundColor: colors.primaryYellow }}
          />
          <p className="text-lg opacity-90 max-w-2xl">
            We are here to answer your questions and help you get started.
          </p>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <Card className="bg-[#FFF5E1] border border-gray-200">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: colors.secondaryDarkGrey }}
                >
                  Get In Touch
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start">
                    <MdLocationOn
                      className="mt-1 mr-4 flex-shrink-0"
                      size={24}
                      style={{ color: colors.primaryGreen }}
                    />
                    <div>
                      <h3 className="font-semibold mb-1">Address</h3>
                      <p className="text-gray-700 text-sm">
                        {contactInfo.address || "123 School Street, City"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MdPhone
                      className="mt-1 mr-4 flex-shrink-0"
                      size={24}
                      style={{ color: colors.primaryGreen }}
                    />
                    <div>
                      <h3 className="font-semibold mb-1">Phone</h3>
                      <a
                        href={`tel:${contactInfo.phone || "+1234567890"}`}
                        className="text-gray-700 text-sm hover:text-primaryGreen"
                      >
                        {contactInfo.phone || "(123) 456-7890"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MdEmail
                      className="mt-1 mr-4 flex-shrink-0"
                      size={24}
                      style={{ color: colors.primaryGreen }}
                    />
                    <div>
                      <h3 className="font-semibold mb-1">Email</h3>
                      <a
                        href={`mailto:${
                          contactInfo.email || "info@school.com"
                        }`}
                        className="text-gray-700 text-sm hover:text-primaryGreen"
                      >
                        {contactInfo.email || "info@school.com"}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <MdAccessTime
                      className="mt-1 mr-4 flex-shrink-0"
                      size={24}
                      style={{ color: colors.primaryGreen }}
                    />
                    <div>
                      <h3 className="font-semibold mb-1">Office Hours</h3>
                      <p className="text-gray-700 text-sm">
                        {contactInfo.hours ||
                          "Monday - Friday: 8:00 AM - 4:00 PM"}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border border-gray-200">
                <h2
                  className="text-2xl font-bold mb-6"
                  style={{ color: colors.secondaryDarkGrey }}
                >
                  Send us a Message
                </h2>
                <ContactForm />
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <Card padding="none">
            <div className="w-full h-96 bg-gray-200 rounded-lg overflow-hidden">
              <iframe
                src={contactInfo.mapUrl || "YOUR_GOOGLE_MAP_EMBED_URL"}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              />
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
