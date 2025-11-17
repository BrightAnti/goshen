import Card from "@/components/ui/Card";
import { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Belonging at Our School",
  description:
    "Every student, family, and staff member has a place in our diverse and inclusive community.",
};

export default function BelongingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Belonging at Our School
          </h1>
          <p className="text-xl text-primary-100">
            A diverse learning community where everyone belongs
          </p>
        </div>
      </section>

      {/* Main Statement */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed mb-6">
                  Our school is a diverse learning community of students, their
                  families, support staff, faculty, and school leaders. We
                  embrace our differences with respect, care, and appreciation.
                  We recognize that the strength of our community lies in the
                  unique journey each individual takes to find a sense of
                  belonging at our school.
                </p>
                <p className="text-lg text-gray-700 leading-relaxed">
                  It is our collective responsibility to help each other foster
                  an environment where this journey is supported and encouraged.
                  Every day, all community members will treat each other fairly
                  and ensure that everyone belongs, is safe, welcomed, and
                  supported.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Core Values for Belonging
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card hover>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Respect for All
              </h3>
              <p className="text-gray-700">
                We honor and celebrate the diverse backgrounds, cultures,
                abilities, and perspectives that each person brings to our
                community.
              </p>
            </Card>

            <Card hover>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Inclusive Environment
              </h3>
              <p className="text-gray-700">
                Our curriculum, activities, and daily practices reflect our
                commitment to creating spaces where all students feel valued and
                included.
              </p>
            </Card>

            <Card hover>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Voice & Agency
              </h3>
              <p className="text-gray-700">
                Every student has the right to be heard and to participate fully
                in their educational journey and school community.
              </p>
            </Card>

            <Card hover>
              <h3 className="text-xl font-bold mb-3 text-primary">
                Continuous Growth
              </h3>
              <p className="text-gray-700">
                We are committed to ongoing learning and improvement in our
                practices to better serve our diverse community.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Diversity Stats */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Diverse Community
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-5xl font-bold text-accent mb-2">60+</div>
              <div className="text-xl text-primary-100">
                Nationalities Represented
              </div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">45+</div>
              <div className="text-xl text-primary-100">Languages Spoken</div>
            </div>
            <div>
              <div className="text-5xl font-bold text-accent mb-2">100%</div>
              <div className="text-xl text-primary-100">Valued & Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            How We Foster Belonging
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card>
              <h3 className="text-xl font-bold mb-3">Cultural Celebrations</h3>
              <p className="text-gray-700">
                We celebrate diverse cultural events, festivals, and traditions
                throughout the year, allowing students to share their heritage
                and learn about others.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3">Anti-Bullying Programs</h3>
              <p className="text-gray-700">
                Comprehensive anti-bullying initiatives, peer support systems,
                and clear reporting mechanisms ensure a safe environment for
                all.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3">
                Student Voice Initiatives
              </h3>
              <p className="text-gray-700">
                Student councils, feedback forums, and collaborative
                decision-making processes give students a voice in shaping their
                school experience.
              </p>
            </Card>

            <Card>
              <h3 className="text-xl font-bold mb-3">Support Services</h3>
              <p className="text-gray-700">
                Counseling, learning support, English language support, and
                special educational needs services ensure every student receives
                the help they need to thrive.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Quote/Statement */}
      <section className="py-16 bg-accent">
        <div className="container-custom text-center">
          <div className="max-w-3xl mx-auto">
            <p className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              &quot;There is unity in diversity when we share a common
              purpose.&quot;
            </p>
            <p className="text-lg text-gray-700">
              Every day, we work together to ensure that everyone belongs, is
              safe, welcomed, and supported.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}












