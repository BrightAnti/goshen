"use client";

import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";
import { MdArrowForward, MdSchool, MdPeople, MdStar } from "react-icons/md";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Carousel from "@/components/ui/Carousel";
import { supabase } from "@/lib/supabase/client";
import SectionHeader from "@/components/ui/SectionHeader";

const staticGalleryImages = [
  { src: "/images/ship.jpg", alt: "Campus 1" },
  { src: "/images/friendsladies.jpg", alt: "Campus 2" },
  { src: "/images/xmas.jpg", alt: "Campus 3" },
  { src: "/images/trampoline.jpg", alt: "Campus 4" },
  { src: "/images/grad.jpg", alt: "Campus 5" },
  { src: "/images/happydelight.jpg", alt: "Campus 6" },
  { src: "/images/navygsc.jpg", alt: "Campus 7" },
  { src: "/images/friends.jpg", alt: "Campus 8" },
];

const localHeroImages = [
  { src: "/images/ladiesgca.jpg", alt: "Hero 1" },
  { src: "/images/science.jpg", alt: "Hero 2" },
  { src: "/images/smiles.jpg", alt: "Hero 3" },
];

export default function Home() {
  const [heroImages, setHeroImages] = useState<any[]>([]);
  const [stripImages, setStripImages] = useState<any[]>([]);

  useEffect(() => {
    const fetchStripImages = async () => {
      try {
        const { data } = await supabase
          .from("gallery")
          .select("image_url,title")
          .order("uploaded_at", { ascending: false })
          .range(6, 23);
        const images = (data || [])
          .filter((g: any) => !!g.image_url)
          .map((g: any) => ({ src: g.image_url, alt: g.title || "Gallery" }));
        setStripImages(images);
      } catch (e) {
        console.error(e);
      }
    };
    fetchStripImages();
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 radial-fade">
        {localHeroImages.length > 0 && (
          <div className="absolute inset-0">
            <Carousel
              images={localHeroImages}
              autoPlay={true}
              showControls={false}
              showIndicators={true}
              height="100%"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20" />
        <div className="container-custom py-24 md:py-36 relative z-10">
          <div className="max-w-3xl bg-white/10 backdrop-blur-[2px] border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold mb-4 text-white"
            >
              Welcome to {process.env.NEXT_PUBLIC_SITE_NAME || "Our School"}
            </motion.h1>
            <div className="h-1 w-24 bg-white/70 rounded mb-6" />
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl mb-8 text-white/90"
            >
              Empowering minds, shaping futures, and building leaders of
              tomorrow
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="flex flex-row gap-4 flex-wrap"
            >
              <Link href="/admissions">
                <Button size="lg" variant="primary">
                  Apply Now
                </Button>
              </Link>
              <Link href="/about/about-gcs">
                <Button size="lg" variant="secondary">
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Image Mosaic - Life at GCS */}
      {stripImages.length > 8 && (
        <section className="py-16 bg-white">
          <div className="container-custom">
            <SectionHeader title="Life at GCS" />
            <div className="mt-8 grid grid-cols-2 md:grid-cols-6 gap-4">
              {stripImages.slice(6, 18).map((img, idx) => (
                <div
                  key={`mosaic-${idx}`}
                  className={`relative rounded-lg overflow-hidden ${
                    idx % 6 === 0 || idx % 6 === 1
                      ? "md:col-span-3 aspect-[16/9]"
                      : idx % 6 === 2 || idx % 6 === 3
                      ? "md:col-span-2 aspect-square"
                      : "md:col-span-2 aspect-[4/3]"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Statistics Section */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container-custom">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: "1990", label: "Established" },
              { value: "350+", label: "Students" },
              { value: "40+", label: "Teachers" },
              { value: "100%", label: "BECE Pass Rate" },
            ].map((stat, index) => (
              <StaggerItem key={index}>
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    delay: index * 0.1,
                  }}
                >
                  <div className="text-5xl md:text-6xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
      {/* Static Campus Gallery */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <SectionHeader title="Campus Highlights" />
          <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
            {staticGalleryImages.map((img, idx) => (
              <div
                key={idx}
                className="relative rounded-lg overflow-hidden aspect-square"
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <AnimatedSection animation="fadeIn">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <SectionHeader title="What Parents Say" />
            <StaggerContainer className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  quote:
                    "GCS nurtures both the heart and mind. Our child is thriving.",
                  name: "Ama K.",
                  role: "Parent, Junior High School",
                },
                {
                  quote:
                    "The teachers are exceptional and the community is welcoming.",
                  name: "Kwesi M.",
                  role: "Parent, Infant School",
                },
                {
                  quote: "A balanced focus on academics, arts, and leadership.",
                  name: "Naana A.",
                  role: "Parent, Primary School",
                },
              ].map((t, i) => (
                <StaggerItem key={i}>
                  <Card hover>
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold">
                        {t.name.split(" ")[0][0]}
                      </div>
                      <div>
                        <p className="text-gray-700">“{t.quote}”</p>
                        <div className="mt-3 text-sm text-gray-500 font-medium">
                          {t.name} • {t.role}
                        </div>
                      </div>
                    </div>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
        </section>
      </AnimatedSection>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <SectionHeader title="Why Choose Us" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: <MdSchool size={32} />,
                title: "Quality Education",
                description:
                  "Comprehensive curriculum designed to nurture academic excellence.",
              },
              {
                icon: <MdPeople size={32} />,
                title: "Expert Faculty",
                description:
                  "Dedicated teachers committed to student success and growth.",
              },
              {
                icon: <MdStar size={32} />,
                title: "Holistic Development",
                description:
                  "Focus on academics, sports, arts, and character building.",
              },
            ].map((feature, idx) => (
              <StaggerItem key={idx}>
                <Card hover>
                  <div className="text-center p-6 rounded-lg bg-white shadow hover:shadow-lg transition-shadow">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                      className="inline-flex items-center justify-center w-16 h-16 bg-primary text-white rounded-full mb-4 shadow"
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-xl font-bold mb-2 text-gray-900">
                      {feature.title}
                    </h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Belonging & Diversity */}
      <AnimatedSection animation="fadeIn">
        <section className="py-16 bg-gray-50 text-gray-800 relative">
          <div className="container-custom relative">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection animation="fadeInUp">
                <SectionHeader title="A Community of Learning, Growth & Belonging" />
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.2}>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                  At our school, every child is seen, valued, and supported. We
                  provide a strong academic foundation, a caring environment,
                  and opportunities that help students grow in confidence,
                  character, and curiosity.
                </p>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Campus Moments */}
      {stripImages.length > 0 && (
        <section className="py-16 bg-white border-t border-gray-100">
          <div className="container-custom">
            <SectionHeader title="Campus Moments" />
            <div className="hidden md:block mt-8">
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {stripImages.slice(0, 18).map((img, idx) => (
                  <div
                    key={idx}
                    className="relative aspect-video rounded-lg overflow-hidden"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 16vw"
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="md:hidden">
              <Carousel
                images={stripImages.map((i) => ({ src: i.src, alt: i.alt }))}
                autoPlay
                showControls
                showIndicators
                height="220px"
              />
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
    </div>
  );
}
