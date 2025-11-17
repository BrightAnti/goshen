import Card from "@/components/ui/Card";
import { Metadata } from "next";
import {
  MdSecurity,
  MdHealthAndSafety,
  MdPeople,
  MdGavel,
} from "react-icons/md";

export const metadata: Metadata = {
  title: "Child Safeguarding",
  description:
    "Our commitment to child safety and wellbeing through comprehensive protection policies and procedures.",
};

export default function SafeguardingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary to-primary-700 text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Child Safeguarding
          </h1>
          <p className="text-xl text-primary-100">
            Your child&apos;s safety and wellbeing is our highest priority
          </p>
        </div>
      </section>

      {/* Commitment Statement */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6">Our Commitment</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              At {process.env.NEXT_PUBLIC_SITE_NAME || "our school"}, child
              protection practices are consistent with the United Nations
              Convention on the Rights of the Child. We maintain strong child
              protection policies and procedures to ensure that our students can
              pursue their education in a safe, secure, and caring environment.
            </p>
          </div>

          {/* Key Areas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary-100 rounded-lg">
                  <MdSecurity size={32} className="text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Campus Security</h3>
                  <p className="text-gray-600">
                    24/7 security personnel, controlled access points, CCTV
                    monitoring, and visitor management systems ensure a secure
                    campus environment.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-accent-100 rounded-lg">
                  <MdHealthAndSafety size={32} className="text-accent-700" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Health & Wellbeing</h3>
                  <p className="text-gray-600">
                    On-site health services, counseling support, and holistic
                    wellbeing programs for every student&apos;s physical and
                    mental health.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-green-100 rounded-lg">
                  <MdPeople size={32} className="text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Trained Staff</h3>
                  <p className="text-gray-600">
                    All staff undergo comprehensive child protection training
                    and background checks. We maintain strict safeguarding
                    protocols.
                  </p>
                </div>
              </div>
            </Card>

            <Card hover>
              <div className="flex items-start gap-4">
                <div className="p-3 bg-purple-100 rounded-lg">
                  <MdGavel size={32} className="text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">Clear Policies</h3>
                  <p className="text-gray-600">
                    Transparent child protection policies, reporting procedures,
                    and accountability measures are in place and regularly
                    reviewed.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card>
              <h2 className="text-3xl font-bold mb-6">
                Our Safeguarding Approach
              </h2>
              <div className="space-y-6 text-gray-700">
                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    Prevention
                  </h3>
                  <p>
                    We create a culture of safety through education, awareness,
                    and clear communication. Students, staff, and parents are
                    all part of our safeguarding community.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    Protection
                  </h3>
                  <p>
                    Robust procedures are in place to identify and respond to
                    any concerns. We work closely with families and relevant
                    authorities to ensure swift, appropriate action.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    Support
                  </h3>
                  <p>
                    Counseling services, peer support programs, and caring
                    pastoral care ensure every child feels safe, valued, and
                    supported throughout their school journey.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-3 text-primary">
                    Partnership
                  </h3>
                  <p>
                    We work in partnership with parents, external agencies, and
                    the wider community to maintain the highest standards of
                    child protection.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-center mb-12">
            Key Safeguarding Principles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="text-center">
              <h3 className="text-xl font-bold mb-3">Every Child Matters</h3>
              <p className="text-gray-600">
                The welfare and safety of every student is paramount in all our
                decisions and actions.
              </p>
            </Card>

            <Card className="text-center">
              <h3 className="text-xl font-bold mb-3">Zero Tolerance</h3>
              <p className="text-gray-600">
                We have zero tolerance for any form of abuse, bullying, or
                behavior that compromises child safety.
              </p>
            </Card>

            <Card className="text-center">
              <h3 className="text-xl font-bold mb-3">
                Everyone&apos;s Responsibility
              </h3>
              <p className="text-gray-600">
                Safeguarding is everyone&apos;s responsibility - staff,
                students, parents, and the wider community.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact for Concerns */}
      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">Have a Concern?</h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            If you have any safeguarding concerns, please contact our designated
            safeguarding officer immediately.
          </p>
          <div className="max-w-md mx-auto bg-white/10 rounded-lg p-6">
            <p className="text-lg mb-2">Safeguarding Officer</p>
            <p className="text-accent font-semibold text-xl mb-4">
              safeguarding@school.com
            </p>
            <p className="text-sm text-primary-100">
              All concerns are treated with utmost confidentiality and urgency
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}












