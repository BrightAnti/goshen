import Card from "@/components/ui/Card";
import Image from "next/image";
import { Metadata } from "next";
import {
  MdDirectionsBus,
  MdHome,
  MdRestaurant,
  MdCheckCircle,
  MdSecurity,
  MdLocalDining,
  MdAccessTime,
  MdPhone,
  MdEmail,
} from "react-icons/md";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Discover our comprehensive services including bus transportation, boarding facilities, and canteen services.",
};

export default function ServicesPage() {
  const services = [
    {
      id: "bus",
      title: "Bus Service",
      icon: MdDirectionsBus,
      iconColor: "bg-blue-100 text-blue-600",
      image: "/images/excursiongca.jpg",
      description:
        "Safe and reliable transportation service for students to and from school.",
      features: [
        "Regular routes covering major areas",
        "Experienced and licensed drivers",
        "Well-maintained fleet of buses",
        "GPS tracking for parents' peace of mind",
        "Trained bus monitors for student safety",
        "Flexible pickup and drop-off options",
      ],
      highlight: "Ensuring safe and timely transportation for all students",
    },
    {
      id: "boarding",
      title: "Boarding Service",
      icon: MdHome,
      iconColor: "bg-green-100 text-green-600",
      image: "/images/friends.jpg",
      description:
        "A home away from home with comfortable accommodations and caring supervision.",
      features: [
        "Safe and secure residential facilities",
        "24/7 supervision by trained staff",
        "Nutritious meals included",
        "Study hours and academic support",
        "Recreational activities and sports",
        "Regular communication with parents",
      ],
      highlight:
        "Providing a nurturing environment for academic and personal growth",
    },
    {
      id: "canteen",
      title: "Canteen Service",
      icon: MdRestaurant,
      iconColor: "bg-orange-100 text-orange-600",
      image: "/images/happydelight.jpg",
      description:
        "Healthy, nutritious, and delicious meals prepared fresh daily for our students.",
      features: [
        "Fresh meals prepared daily on-site",
        "Balanced and nutritious menu",
        "Variety of options to suit all preferences",
        "Hygienic food preparation standards",
        "Affordable pricing for all students",
        "Special dietary requirements accommodated",
      ],
      highlight: "Nourishing young minds with healthy, tasty meals",
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-gray-200 min-h-[60vh] md:min-h-[70vh]">
        <div className="absolute inset-0">
          <Image
            src="/images/staff.jpg"
            alt="Our Services"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/30" />
        <div className="container-custom py-16 md:py-24 relative z-10 min-h-[60vh] md:min-h-[70vh] flex items-center">
          <div className="max-w-3xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-3">
              Our Services
            </h1>
            <div className="h-1 w-16 bg-white/80 rounded mb-3" />
            <p className="text-white/90 text-lg md:text-xl">
              Comprehensive support services for students and families
            </p>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-20 bg-cream">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold bg-accent-100 text-accent-700 mb-4">
              Student Support
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-gray-900 mb-6">
              Enhancing Your Child&apos;s School Experience
            </h2>
            <p className="text-lg md:text-xl leading-relaxed text-gray-700">
              At Goshen Community School, we go beyond academics to provide
              comprehensive support services that ensure your child&apos;s
              comfort, safety, and well-being. Our dedicated team works
              tirelessly to create an environment where students can thrive.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card
                  key={service.id}
                  hover
                  padding="none"
                  className="h-full flex flex-col overflow-hidden group"
                >
                  {/* Service Image */}
                  <div className="relative w-full h-64 overflow-hidden">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl mb-3 bg-white/20 backdrop-blur-sm">
                          <div
                            className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${service.iconColor}`}
                          >
                            <Icon size={24} />
                          </div>
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">
                          {service.title}
                        </h3>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-grow">
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {service.description}
                    </p>

                    {/* Features List */}
                    <div className="flex-grow">
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3">
                            <MdCheckCircle
                              className="mt-0.5 shrink-0 text-green-600"
                              size={20}
                            />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Highlight */}
                    <div className="pt-6 border-t border-gray-200">
                      <p className="text-sm font-medium text-primary italic">
                        {service.highlight}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Additional Information Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Safety & Security */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary-100 text-primary">
                  <MdSecurity size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Safety & Security
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    All our services prioritize the safety and security of our
                    students. From bus transportation to boarding facilities, we
                    maintain the highest standards of safety protocols and
                    supervision.
                  </p>
                </div>
              </div>

              {/* Quality Assurance */}
              <div className="flex items-start gap-4">
                <div className="shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl bg-accent-100 text-accent-700">
                  <MdLocalDining size={28} />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    Quality Assurance
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    We regularly review and improve our services based on
                    feedback from students, parents, and staff. Your
                    satisfaction and your child&apos;s well-being are our top
                    priorities.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
