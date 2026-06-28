"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MdFlag, MdCheckCircle } from "react-icons/md";
import Card from "@/components/ui/Card";

export default function AboutGCSPage() {
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffsetY(window.scrollY * 0.3);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="w-full">
      {/* 🔹 Hero Image with Smooth Parallax */}
      <section className="relative w-full h-[70vh] sm:h-[80vh] overflow-hidden">
        <div
          className="absolute inset-0 will-change-transform"
          style={{
            transform: `translateY(${offsetY * 0.3}px)`,
          }}
        >
          <Image
            src="/images/staff.jpg"
            alt="Goshen Community School Staff"
            fill
            priority
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/40" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center px-4 max-w-4xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block mb-6"
            >
              <span className="px-6 py-2 rounded-full text-sm font-semibold bg-primary/90 text-white backdrop-blur-sm border border-white/20">
                Since 1990
              </span>
            </motion.div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white mb-6 leading-tight">
              About Goshen Community School
            </h1>
            <div className="w-24 h-1 bg-accent-400 mx-auto mb-6 rounded-full" />
            <p className="text-xl sm:text-2xl text-white/95 max-w-2xl mx-auto font-medium">
              Excellence in Education Since 1990
            </p>
          </motion.div>
        </div>
      </section>

      {/* 🔹 Mission & Vision Section */}
      <section className="pt-24 pb-8 bg-gradient-to-b from-cream to-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-6xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Card className="h-full bg-gradient-to-br from-primary-700 via-primary-800 to-primary-900 text-white border-0 shadow-2xl relative overflow-hidden">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent-400/20 rounded-full -ml-12 -mb-12" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm shadow-lg">
                      <MdCheckCircle size={36} className="text-white" />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 uppercase tracking-wide">
                        Our Mission
                      </h3>
                      <div className="w-16 h-1 bg-accent-400 rounded-full mt-2" />
                    </div>
                  </div>
                  <ul className="space-y-5 flex-grow">
                    <li className="flex items-start gap-4">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent-400 shrink-0 shadow-lg"></span>
                      <span className="leading-relaxed text-lg">
                        Provide a conducive environment for teaching and
                        learning, where each child can develop a sense of pride,
                        self-esteem & independence.
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent-400 shrink-0 shadow-lg"></span>
                      <span className="leading-relaxed text-lg">
                        Provide a secure environment where children and staff
                        feel valued and respect each other.
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-2 h-2.5 w-2.5 rounded-full bg-accent-400 shrink-0 shadow-lg"></span>
                      <span className="leading-relaxed text-lg">
                        Forge close links and develop co-operation with parents,
                        staff, and the community.
                      </span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: "easeOut" }}
            >
              <Card className="h-full shadow-2xl border-2 border-primary-100 hover:border-primary-200 transition-all duration-300">
                <div className="flex flex-col h-full">
                  <div className="flex items-start gap-5 mb-6">
                    <div className="shrink-0 inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary-100 to-primary-200 text-primary shadow-md">
                      <MdFlag size={36} />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-2xl sm:text-3xl font-bold mb-2 uppercase tracking-wide text-primary-800">
                        Our Vision
                      </h3>
                      <div className="w-16 h-1 bg-primary rounded-full mt-2" />
                    </div>
                  </div>
                  <ul className="space-y-5 flex-grow">
                    <li className="flex items-start gap-4">
                      <span className="mt-2.5 h-2.5 w-2.5 rounded-full bg-primary shrink-0 shadow-md"></span>
                      <span className="text-gray-700 leading-relaxed text-lg">
                        To become a world-class learning centre committed to
                        academic and moral excellence.
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-2.5 h-2.5 w-2.5 rounded-full bg-primary shrink-0 shadow-md"></span>
                      <span className="text-gray-700 leading-relaxed text-lg">
                        To provide holistic training that develops students
                        spiritually, intellectually, and socially.
                      </span>
                    </li>
                    <li className="flex items-start gap-4">
                      <span className="mt-2.5 h-2.5 w-2.5 rounded-full bg-primary shrink-0 shadow-md"></span>
                      <span className="text-gray-700 leading-relaxed text-lg">
                        To nurture learners who serve God, family, and country
                        with integrity and purpose.
                      </span>
                    </li>
                  </ul>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 🔹 About Narrative Section */}
      <section
        className="bg-white"
        style={{ paddingTop: "2rem", paddingBottom: "3rem" }}
      >
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="max-w-4xl mx-auto"
          >
            <Card className="bg-gradient-to-br from-white via-cream/30 to-white border-2 border-primary-100 shadow-xl">
              <div className="text-center mb-10">
                <h2 className="text-4xl md:text-5xl font-extrabold text-primary-800 mb-4">
                  About Goshen Community School
                </h2>
                <div className="w-24 h-1 bg-primary mx-auto rounded-full" />
              </div>
              <div className="prose prose-lg max-w-none text-gray-700 space-y-6">
                <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                  Goshen Community School (GCS) is a faith-driven learning
                  community that integrates academic excellence with spiritual
                  and moral growth. Established to offer both the Cambridge and
                  GES curricula, we empower students with the skills, values,
                  and confidence to become independent thinkers and
                  compassionate leaders.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                  We are more than just a school — we are a community that
                  fosters collaboration, creativity, and character. At GCS,
                  students are encouraged to explore their potential and embrace
                  lifelong learning in an environment that is safe, supportive,
                  and Christ-centered.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-gray-800">
                  With a strong commitment to excellence, Goshen Community
                  School continues to raise young people who make a meaningful
                  difference in Ghana and beyond.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
