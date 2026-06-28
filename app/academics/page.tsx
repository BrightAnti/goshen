import {
  MdPool,
  MdMusicNote,
  MdDirectionsRun,
  MdSelfImprovement,
  MdMenuBook,
  MdSignLanguage,
  MdBrush,
  MdSmartToy,
} from "react-icons/md";
import Image from "next/image";
import AnimatedSection from "@/components/animations/AnimatedSection";
import StaggerContainer, {
  StaggerItem,
} from "@/components/animations/StaggerContainer";

export const metadata = {
  title: "Academics | Goshen Community School",
  description:
    "Discover the academic excellence at Goshen Community School — where curiosity, creativity, and growth flourish.",
};

export default function AcademicsPage() {
  const extracurricularActivities = [
    { name: "Swimming", icon: MdPool },
    { name: "Cultural Dance", icon: MdMusicNote },
    { name: "Contemporary Dance", icon: MdDirectionsRun },
    { name: "Ballet", icon: MdSelfImprovement },
    { name: "Taekwando", icon: MdDirectionsRun },
    { name: "Reading", icon: MdMenuBook },
    { name: "Sign Language", icon: MdSignLanguage },
    { name: "Art & Craft", icon: MdBrush },
    { name: "Coding & Robotics", icon: MdSmartToy },
  ];

  return (
    <main className="bg-gradient-to-br from-gray-50 to-gray-100 text-gray-800">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[260px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/grad.jpg"
            alt="Academic Excellence at Goshen Community School"
            fill
            priority
            className="object-cover object-center scale-105 blur-[2px]"
          />
        </div>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
        <AnimatedSection
          animation="fadeInUp"
          className="relative z-10 text-center px-4"
        >
          <h1 className="text-5xl md:text-6xl font-extrabold text-yellow-400 drop-shadow-2xl tracking-wide">
            Academics
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mt-3 font-light">
            Inspiring minds. Shaping futures. Excellence in every subject.
          </p>
        </AnimatedSection>
      </section>

      {/* Curriculum */}
      <section className="py-10 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="container-custom max-w-3xl mx-auto">
          <AnimatedSection animation="fadeInUp">
            <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-green-900 mb-2">
              Our Curriculum
            </h2>
            <div className="h-1 w-16 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500 mb-4" />

            <p className="text-gray-700 text-sm md:text-base leading-relaxed mb-5">
              We offer a hybrid curriculum combining GES and Cambridge standards,
              balancing academic rigor with creativity, critical thinking, and
              character development through global standards and local values.
            </p>

            <ul className="space-y-2.5">
              {[
                "GES and Cambridge hybrid curriculum",
                "Hands-on learning and integrated projects",
                "Holistic education with spiritual and moral growth",
                "Focus on critical thinking and real-world application",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-2 h-2 mt-2 bg-yellow-400 rounded-full flex-shrink-0" />
                  <span className="text-gray-800 text-sm md:text-base font-medium leading-snug">
                    {item}
                  </span>
                </li>
              ))}
            </ul>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Grade Levels */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl font-extrabold text-green-900 text-center mb-8">
              Grade Levels
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Pre-School",
                grades: "Creche to Kindergarten",
                desc: "Early childhood education focusing on foundational skills, literacy, numeracy, and social development through play and exploration.",
              },
              {
                title: "Lower Primary",
                grades: "Grades 1–3",
                desc: "Building core literacy, numeracy, and critical thinking skills while fostering a love for learning.",
              },
              {
                title: "Upper Primary",
                grades: "Grades 4–6",
                desc: "Advancing academic excellence and leadership development through deeper subject exploration.",
              },
              {
                title: "Junior High School",
                grades: "Grades 7–9",
                desc: "Preparing students for senior secondary education and beyond through advanced coursework and mentorship.",
              },
            ].map((lvl, i) => (
              <StaggerItem key={i}>
                <div className="p-6 bg-white rounded-2xl shadow-lg border-t-4 border-yellow-500 hover:border-green-700 transition-all duration-300 hover:-translate-y-0.5 h-full">
                  <h3 className="text-xl font-bold text-green-800 mb-2">
                    {lvl.title}
                  </h3>
                  <p className="text-green-700 font-medium text-sm mb-2">
                    {lvl.grades}
                  </p>
                  <p className="text-gray-700 text-sm leading-relaxed">
                    {lvl.desc}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Extra Curricular Activities */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-yellow-50">
        <div className="container-custom max-w-5xl mx-auto">
          <AnimatedSection animation="fadeInUp">
            <h2 className="text-3xl font-extrabold text-green-800 text-center mb-8">
              Extra Curricular Activities
            </h2>
          </AnimatedSection>
          <StaggerContainer className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {extracurricularActivities.map((activity) => {
              const Icon = activity.icon;
              return (
                <StaggerItem key={activity.name}>
                  <div className="bg-white rounded-xl p-4 shadow-md border border-yellow-200 hover:border-green-700 hover:shadow-lg transition-all duration-300 h-full">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-yellow-200 to-yellow-400 text-green-900 rounded-full flex-shrink-0">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-base font-bold text-green-800">
                        {activity.name}
                      </h3>
                    </div>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </div>
      </section>
    </main>
  );
}
