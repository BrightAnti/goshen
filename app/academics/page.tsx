import PageHero from "@/components/ui/PageHero";
import {
  MdScience,
  MdCalculate,
  MdLanguage,
  MdBrush,
  MdSports,
  MdMusicNote,
} from "react-icons/md";
import Image from "next/image";

export const metadata = {
  title: "Academics | Goshen Community School",
  description:
    "Discover the academic excellence at Goshen Community School — where curiosity, creativity, and growth flourish.",
};

export default function AcademicsPage() {
  const departments = [
    {
      name: "Sciences",
      icon: "science",
      description:
        "Hands-on exploration of Biology, Chemistry, and Physics — nurturing curiosity and innovation.",
    },
    {
      name: "Mathematics",
      icon: "calculate",
      description:
        "Developing analytical thinkers through logical reasoning, data, and problem-solving challenges.",
    },
    {
      name: "Languages",
      icon: "language",
      description:
        "Building global communicators fluent in English, literature, and additional world languages.",
    },
    {
      name: "Music",
      icon: "music",
      description:
        "Exploring rhythm, melody, harmony, and performance through vocal and instrumental training.",
    },
    {
      name: "Arts & Humanities",
      icon: "brush",
      description:
        "Encouraging creativity, critical thinking, and empathy through visual arts, drama, history, and social sciences.",
    },
    {
      name: "Physical Education",
      icon: "sports",
      description:
        "Instilling discipline, teamwork, and wellness through organized sports and activities.",
    },
  ];

  const getIcon = (iconName: string) => {
    const icons: Record<string, any> = {
      science: MdScience,
      calculate: MdCalculate,
      language: MdLanguage,
      brush: MdBrush,
      sports: MdSports,
      music: MdMusicNote,
    };
    const Icon = icons[iconName];
    return <Icon size={42} className="drop-shadow-sm" />;
  };

  return (
    <main className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* ⭐ HERO */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/grad.jpg"
            alt="Academic Excellence at Goshen Community School"
            fill
            priority
            className="object-cover object-center scale-105 blur-[2px]"
          />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />

        {/* Text Content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-6xl md:text-7xl font-extrabold text-yellow-400 drop-shadow-2xl tracking-wide">
            Academics
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 max-w-2xl mx-auto mt-4 font-light">
            Inspiring minds. Shaping futures. Excellence in every subject.
          </p>
        </div>
      </section>

      {/* 📘 CURRICULUM */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom max-w-4xl mx-auto flex flex-col items-center text-center gap-6">
          {/* Heading */}
          <h2 className="text-4xl md:text-5xl font-extrabold text-green-900 mb-2 tracking-tight drop-shadow-sm">
            Our Curriculum
          </h2>

          {/* Accent Line */}
          <div className="h-2 w-28 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 shadow-md mb-4" />

          {/* Main Text */}
          <p className="text-gray-900 md:text-lg text-base leading-relaxed font-light max-w-3xl">
            Our curriculum balances academic rigor with creativity, nurturing
            curiosity, critical thinking, and character development. Students
            are empowered to thrive in a rapidly changing world through global
            standards and local relevance.
          </p>

          {/* Bullet Points */}
          <ul className="space-y-3 max-w-2xl">
            {[
              "Hands-on learning across sciences, arts, and technology",
              "Integrated projects to foster creativity and collaboration",
              "Global and local perspectives to prepare future leaders",
              "Focus on critical thinking, problem-solving, and innovation",
            ].map((item, i) => (
              <li key={i} className="flex items-center justify-center gap-3">
                <span className="w-4 h-4 bg-yellow-400 rounded-full flex-shrink-0 shadow-md" />
                <span className="text-gray-800 font-medium">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 🧭 DEPARTMENTS */}
      <section className="py-20 bg-white/60 backdrop-blur">
        <div className="container-custom">
          <h2 className="text-3xl font-extrabold text-green-800 text-center mb-12">
            Academic Departments
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept, index) => {
              const IconElement = getIcon(dept.icon);
              return (
                <div
                  key={index}
                  className="group rounded-2xl shadow-lg p-8 bg-white border border-gray-200 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="flex flex-col items-center space-y-6">
                    <div className="flex items-center justify-center w-24 h-24 bg-gradient-to-br from-yellow-200 to-yellow-400 text-green-900 rounded-full group-hover:scale-110 transition duration-300 shadow-inner">
                      {IconElement}
                    </div>
                    <h3 className="text-2xl font-semibold text-green-800 tracking-wide">
                      {dept.name}
                    </h3>
                    <p className="text-gray-600 text-center leading-relaxed">
                      {dept.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 🎓 GRADE LEVELS */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-extrabold text-green-900 text-center mb-12">
            Grade Levels
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            {[
              {
                title: "Early Childhood",
                grades: "Creche to Kindergarten",
                desc: "Foundational literacy, numeracy, and social skills developed through curiosity and play.",
              },
              {
                title: "Primary School",
                grades: "Grades 1–6",
                desc: "Exploring deeper subjects, critical thinking, and leadership development.",
              },
              {
                title: "High School",
                grades: "Grades 7–9",
                desc: "Preparing for senior secondary and life beyond through advanced coursework and mentorship.",
              },
            ].map((lvl, i) => (
              <div
                key={i}
                className="p-10 bg-white rounded-3xl shadow-xl border-t-8 border-yellow-500 hover:border-green-700 transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-2xl font-bold text-green-800 mb-3">
                  {lvl.title}
                </h3>
                <p className="text-green-700 font-medium mb-4">{lvl.grades}</p>
                <p className="text-gray-700">{lvl.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌠 SPECIAL PROGRAMS */}
      <section className="py-16 bg-gradient-to-br from-white to-yellow-50">
        <div className="container-custom max-w-6xl mx-auto">
          <h2 className="text-3xl font-extrabold text-green-800 text-center mb-12">
            Special Programs
          </h2>
          <div className="grid gap-8 md:grid-cols-2">
            {[
              {
                title: "STEM Innovation",
                desc: "Engaging hands-on projects that foster creativity in Science, Technology, and Engineering.",
              },
              {
                title: "Arts Integration",
                desc: "Developing imagination and expression through visual arts, drama, and music.",
              },
              {
                title: "Character & Leadership",
                desc: "Empowering learners through mentorship and values-based development.",
              },
              {
                title: "Student Support",
                desc: "Counseling, tutoring, and guidance to help every child reach their potential.",
              },
            ].map((prog, i) => (
              <div
                key={i}
                className="bg-white rounded-3xl p-10 shadow-lg border border-yellow-200 hover:border-green-700 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
              >
                <h3 className="text-xl font-bold mb-3 text-green-800">
                  {prog.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">{prog.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
