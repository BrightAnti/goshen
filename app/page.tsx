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

const pastStudentTestimonials = [
  {
    quote:
      "I am happy to use the knowledge Goshen has given me to help in my success in the future",
    name: "Joshua Amoah",
    role: "Class of 2025",
    image: "/images/students/stu1.jpeg",
  },
  {
    quote:
      "On my first day it was welcoming and nice and I met a lot of fun and kind people. The teachers were kind. I love Goshen very much and I will never forget how much Goshen has impacted me.",
    name: "Emmanuella Puli",
    role: "Class of 2025",
    image: "/images/students/stu2.jpeg",
  },
  {
    quote:
      "One of my best memories was playing football with my seniors, with the whole school watching. The energy, the pressure, the moment it's something I'll never forget.",
    name: "Amir Fattal",
    role: "Class of 2026",
    image: "/images/students/stu3.jpeg",
  },
];

function StudentPhoto({ name, image }: { name: string; image: string }) {
  const [imageError, setImageError] = useState(false);

  if (imageError) {
    return (
      <div className="w-20 h-20 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-xl flex-shrink-0">
        {name.split(" ")[0][0]}
      </div>
    );
  }

  return (
    <div className="relative w-20 h-20 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-primary/20 shadow-md">
      <Image
        src={image}
        alt={name}
        fill
        sizes="80px"
        className="object-cover"
        onError={() => setImageError(true)}
      />
    </div>
  );
}

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
              className="text-4xl md:text-6xl font-bold mb-3 text-white"
            >
              Welcome to{" "}
              {process.env.NEXT_PUBLIC_SITE_NAME || "Goshen Community School"}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
              className="text-base md:text-xl font-semibold tracking-wide text-[#FFD600] mb-4"
            >
              CAMBRIDGE & GES Hybrid Curriculum
            </motion.p>
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
              className="flex flex-row gap-2 sm:gap-4"
            >
              <Link href="/admissions" className="flex-shrink-0">
                <Button size="lg" variant="primary">
                  Apply Now
                </Button>
              </Link>
              <Link href="/about/about-gcs" className="flex-shrink-0">
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

      <section className="py-10 bg-primary/5 border-y border-gray-200 relative overflow-hidden">
        <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-primary/5 to-transparent z-10"></div>
        <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-primary/5 to-transparent z-10"></div>

        <div className="container-custom">
          <div className="flex gap-16 whitespace-nowrap animate-marquee">
            {[
              "You belong",
              "You learn",
              "You grow",
              "You shine",
              "Goshen — The fruitful vine",
            ].map((text, idx) => (
              <span
                key={idx}
                className="text-xl md:text-2xl font-semibold text-primary tracking-wide"
              >
                {text}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Static Campus Gallery */}
      <section className="py-12 bg-white">
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

      <AnimatedSection animation="fadeIn">
        <section className="py-12 bg-white">
          <div className="container-custom">
            <SectionHeader title="What Past Students Say" />
            <StaggerContainer className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
              {pastStudentTestimonials.map((t, i) => (
                <StaggerItem key={i}>
                  <Card hover className="h-full">
                    <div className="flex items-start gap-4">
                      <StudentPhoto name={t.name} image={t.image} />
                      <div className="min-w-0 flex-1">
                        <p className="text-gray-700 leading-relaxed">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                        <div className="mt-3 text-sm text-gray-500 font-medium">
                          {t.name} &bull; {t.role}
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
          <SectionHeader title="Why Choose Us ?" />
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            {[
              {
                icon: <MdSchool size={32} />,
                title: "Holistic Education",
                description:
                  "Delivering a balanced, high-quality education that prepares students for lifelong success.",
              },
              {
                icon: <MdPeople size={32} />,
                title: "Character Development",
                description:
                  "Nurturing confident, responsible, and compassionate individuals with strong values.",
              },
              {
                icon: <MdStar size={32} />,
                title: "Critical Thinking & Problem Solving",
                description:
                  "Empowering students to think independently, solve problems, and embrace challenges with confidence.",
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
        <section className="py-10 bg-gray-50 text-gray-800 relative">
          <div className="container-custom relative">
            <div className="max-w-4xl mx-auto text-center">
              <AnimatedSection animation="fadeInUp">
                <SectionHeader title="A Community of Learning, Growth & Belonging" />
              </AnimatedSection>

              <AnimatedSection animation="fadeInUp" delay={0.2}>
                <p className="text-lg md:text-xl text-gray-600 leading-relaxed mt-4">
                  A Christ-centred learning community committed to nurturing
                  academic excellence, strong character, and lifelong learners.
                  We equip every child with the confidence, values, and skills
                  to thrive and make a positive impact in the world.
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
