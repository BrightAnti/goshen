"use client";

import Image from "next/image";

export default function DirectorMessagePage() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16 bg-white">
      {/* Header Section */}
      <div className="mb-12">
        <p className="text-green-700 font-semibold tracking-widest uppercase">
          A Message From
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mt-2">
          Our Director
        </h1>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
        {/* Text Section */}
        <div className="text-gray-700 leading-relaxed space-y-5 text-lg">
          <p>
            Welcome to{" "}
            <span className="font-semibold text-gray-900">
              Goshen Community School
            </span>
            . At Goshen, we encourage our students to strive for academic
            excellence, love God, and discover their purpose. Through our{" "}
            <span className="font-medium text-green-700">
              Cambridge–GES hybrid curriculum
            </span>{" "}
            and a caring environment filled with exciting activities, we nurture
            confident learners who think deeply, act responsibly, and lead with
            integrity.
          </p>

          <p>
            Since our founding, Goshen Community School has remained committed
            to developing well-rounded students who excel both academically and
            personally. We believe that true education builds character,
            compassion, and curiosity — qualities that help our learners make a
            positive difference in their communities and beyond.
          </p>

          <p>
            Whether you are a parent looking for the right foundation for your
            child, a student eager to explore your potential, or a visitor who
            shares our passion for learning, you are warmly welcome to Goshen.
            Come and experience what makes our school a place where learning is
            purposeful, character is built, and futures are bright.
          </p>

          <div className="pt-6">
            <p className="font-semibold text-gray-900">
              Mrs. Dorothy Ohui Akwa
            </p>
            <p className="text-gray-500 text-sm">
              Director, Goshen Community School
            </p>
          </div>
        </div>

        {/* Image Section */}
        <div className="relative w-full h-[550px] md:h-[650px] rounded-2xl overflow-hidden shadow-md order-first md:order-none">
          <Image
            src="/images/direc.jpg"
            alt="Director of Goshen Community School"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover object-top"
            priority
          />
        </div>
      </div>
    </main>
  );
}
