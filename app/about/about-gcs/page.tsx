"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

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
      <section className="relative w-full h-[65vh] sm:h-[75vh] overflow-hidden">
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
          <div className="absolute inset-0 bg-black/10" />
        </div>
        a{" "}
      </section>

      {/* 🔹 Motto Section (Overlapping Effect) */}
      <section className="relative bg-green-800 text-white text-center py-16 -mt-24 sm:-mt-32 rounded-t-3xl shadow-xl z-10">
        <h2 className="text-2xl sm:text-3xl font-bold tracking-wide mb-4 uppercase">
          Our Motto
        </h2>
        <p className="text-3xl sm:text-4xl font-bold italic">
          “The Fruitful Vine”
        </p>
      </section>

      {/* 🔹 Mission & Vision Section */}
      <section className="grid md:grid-cols-2">
        {/* Left Block - Mission */}
        <div className="bg-gray-800 text-white py-16 px-8 sm:px-12 text-center flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl font-bold uppercase mb-4 tracking-wide">
            Our Mission
          </h3>
          <ul className="list-disc list-inside space-y-3 text-left max-w-md mx-auto">
            <li>
              Provide a conducive environment for teaching and learning, where
              each child can develop a sense of pride, self-esteem &
              independence.
            </li>
            <li>
              Provide a secure environment where children and staff feel valued
              and respect each other.
            </li>
            <li>
              Forge close links and develop co-operation with parents, staff,
              and the community.
            </li>
          </ul>
        </div>

        {/* Right Block - Vision */}
        <div className="bg-white text-gray-800 py-16 px-8 sm:px-12 text-center flex flex-col justify-center">
          <h3 className="text-2xl sm:text-3xl font-bold uppercase mb-4 tracking-wide text-green-800">
            Our Vision
          </h3>
          <div className="text-base sm:text-lg leading-relaxed max-w-md mx-auto">
            <ul className="list-disc list-inside space-y-3 text-left">
              <li>
                To become a world-class learning centre committed to academic
                and moral excellence.
              </li>
              <li>
                To provide holistic training that develops students spiritually,
                intellectually, and socially.
              </li>
              <li>
                To nurture learners who serve God, family, and country with
                integrity and purpose.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 🔹 About Narrative Section */}
      <section className="max-w-5xl mx-auto px-6 py-20 text-gray-700">
        <h2 className="text-3xl font-bold text-green-800 mb-6">
          About Goshen Community School
        </h2>
        <p className="mb-4">
          Goshen Community School (GCS) is a faith-driven learning community
          that integrates academic excellence with spiritual and moral growth.
          Established to offer both the Cambridge and GES curricula, we empower
          students with the skills, values, and confidence to become independent
          thinkers and compassionate leaders.
        </p>
        <p className="mb-4">
          We are more than just a school — we are a community that fosters
          collaboration, creativity, and character. At GCS, students are
          encouraged to explore their potential and embrace lifelong learning in
          an environment that is safe, supportive, and Christ-centered.
        </p>
        <p>
          With a strong commitment to excellence, Goshen Community School
          continues to raise young people who make a meaningful difference in
          Ghana and beyond.
        </p>
      </section>
    </main>
  );
}


