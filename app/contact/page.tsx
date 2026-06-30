import { createServerClient } from "@/lib/supabase/server";
import { Page } from "@/lib/types/database";
import Card from "@/components/ui/Card";
import ContactForm from "@/components/forms/ContactForm";
import SectionHeader from "@/components/ui/SectionHeader";
import AnimatedSection from "@/components/animations/AnimatedSection";
import { Metadata } from "next";
import type { ReactNode } from "react";
import {
  MdLocationOn,
  MdPhone,
  MdEmail,
  MdAccessTime,
} from "react-icons/md";

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
  secondaryDarkGrey: "#333333",
};

const defaultMapUrl =
  "https://www.google.com/maps?q=Tse+Addo,+Behind+Fair,+La,+Accra,+Ghana&output=embed";

const contactDefaults = {
  email: "goshencommunityschool@gmail.com",
  phones: ["+233 (0)55 775 2668", "+233 (0)24 487 0873"],
  phoneHrefs: ["tel:+233557752668", "tel:+233244870873"],
  hours: [
    { days: "Monday – Thursday", time: "8:00am – 3:00pm" },
    { days: "Friday", time: "8:00am – 2:00pm" },
  ],
};

function ContactDetail({
  icon,
  title,
  children,
}: {
  icon: ReactNode;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="flex gap-4">
      <div
        className="w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0"
        style={{ backgroundColor: `${colors.primaryGreen}15` }}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <h3
          className="text-sm font-semibold uppercase tracking-wide mb-1.5"
          style={{ color: colors.primaryGreen }}
        >
          {title}
        </h3>
        <div className="text-gray-700 text-sm leading-relaxed">{children}</div>
      </div>
    </div>
  );
}

export default async function ContactPage() {
  const pageContent = await getPageContent();
  const contactInfo = pageContent?.content || {};

  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section
        className="relative overflow-hidden border-b border-gray-200"
        style={{
          backgroundImage: "url('/images/happydelight.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="container-custom py-16 md:py-20 relative z-10">
          <AnimatedSection animation="fadeInUp">
            <div className="max-w-3xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Contact Us
            </h1>
            <div
              className="h-1 w-16 rounded mb-3"
              style={{ backgroundColor: colors.primaryYellow }}
            />
            <p className="text-white/90 text-lg md:text-xl">
              We&apos;re here to answer your questions and help you get started.
            </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Info & Form */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-stretch">
            {/* Contact Details */}
            <AnimatedSection
              animation="slideInLeft"
              className="lg:col-span-2 flex"
            >
              <Card padding="lg" className="shadow-md h-full w-full">
                <h2
                  className="text-xl font-bold mb-1"
                  style={{ color: colors.secondaryDarkGrey }}
                >
                  Get In Touch
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Reach out for admissions, general enquiries, or school visits.
                </p>

                <div className="space-y-6">
                  <ContactDetail
                    icon={
                      <MdLocationOn
                        size={22}
                        style={{ color: colors.primaryGreen }}
                      />
                    }
                    title="Address"
                  >
                    {contactInfo.address ? (
                      <p className="whitespace-pre-line">{contactInfo.address}</p>
                    ) : (
                      <>
                        <p className="font-medium text-gray-800">
                          Tse Addo, Behind Fair, La
                        </p>
                        <p className="text-gray-600">
                          Near the Goil filling station
                        </p>
                        <p className="mt-2 text-gray-600">
                          P. O. Box CT1026, Cantonments, Accra
                        </p>
                      </>
                    )}
                  </ContactDetail>

                  <ContactDetail
                    icon={
                      <MdPhone size={22} style={{ color: colors.primaryGreen }} />
                    }
                    title="Phone"
                  >
                    {contactInfo.phone ? (
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="block hover:underline"
                        style={{ color: colors.primaryGreen }}
                      >
                        {contactInfo.phone}
                      </a>
                    ) : (
                      <div className="space-y-1.5">
                        {contactDefaults.phones.map((phone, i) => (
                          <a
                            key={phone}
                            href={contactDefaults.phoneHrefs[i]}
                            className="block hover:underline"
                            style={{ color: colors.primaryGreen }}
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    )}
                  </ContactDetail>

                  <ContactDetail
                    icon={
                      <MdEmail size={22} style={{ color: colors.primaryGreen }} />
                    }
                    title="Email"
                  >
                    <a
                      href={`mailto:${contactInfo.email || contactDefaults.email}`}
                      className="break-all hover:underline"
                      style={{ color: colors.primaryGreen }}
                    >
                      {contactInfo.email || contactDefaults.email}
                    </a>
                  </ContactDetail>

                  <ContactDetail
                    icon={
                      <MdAccessTime
                        size={22}
                        style={{ color: colors.primaryGreen }}
                      />
                    }
                    title="School Hours"
                  >
                    {contactInfo.hours ? (
                      <p className="whitespace-pre-line">{contactInfo.hours}</p>
                    ) : (
                      <div className="space-y-1">
                        {contactDefaults.hours.map((slot) => (
                          <div
                            key={slot.days}
                            className="flex justify-between gap-3"
                          >
                            <span className="text-gray-600">{slot.days}</span>
                            <span className="font-medium text-gray-800">
                              {slot.time}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </ContactDetail>
                </div>
              </Card>
            </AnimatedSection>

            {/* Contact Form */}
            <AnimatedSection
              animation="slideInRight"
              className="lg:col-span-3 flex"
            >
              <Card
                padding="lg"
                className="shadow-md h-full w-full flex flex-col"
              >
                <h2
                  className="text-xl font-bold mb-1"
                  style={{ color: colors.secondaryDarkGrey }}
                >
                  Send Us a Message
                </h2>
                <p className="text-sm text-gray-500 mb-6">
                  Fill in the form below and our team will respond as soon as
                  possible.
                </p>
                <div className="flex-1 flex flex-col min-h-0">
                  <ContactForm />
                </div>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container-custom">
          <AnimatedSection animation="fadeInUp">
            <SectionHeader
            title="Find Us"
            subtitle={
              <p className="text-sm">
                Visit our campus at Tse Addo, Behind Fair, La — near the Goil
                filling station.
              </p>
            }
            className="mb-8"
          />
          <div className="rounded-xl overflow-hidden shadow-md border border-gray-200">
            <iframe
              src={contactInfo.mapUrl || defaultMapUrl}
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Goshen Community School location"
            />
          </div>
          </AnimatedSection>
        </div>
      </section>
    </div>
  );
}
