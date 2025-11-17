"use client";

import { useState } from "react";
import Card from "@/components/ui/Card";
import { MdAdd, MdRemove } from "react-icons/md";

interface FAQItem {
  question: string;
  answer: string;
}

interface AdmissionsFAQProps {
  faqs: FAQItem[];
  colors: {
    primaryYellow: string;
    primaryGreen: string;
    secondaryDarkGrey: string;
    secondaryCream: string;
  };
}

interface FAQItemProps {
  question: string;
  answer: string;
  colors: {
    primaryYellow: string;
    primaryGreen: string;
    secondaryDarkGrey: string;
    secondaryCream: string;
  };
}

function FAQItem({ question, answer, colors }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="rounded-xl border border-gray-200 bg-white shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md p-6"
      onClick={() => setOpen(!open)}
    >
      <div className="flex justify-between items-center">
        <h3
          style={{ color: colors.primaryGreen }}
          className="font-semibold text-lg md:text-xl pr-4"
        >
          {question}
        </h3>

        {open ? (
          <MdRemove
            style={{ color: colors.primaryYellow }}
            size={24}
            className="flex-shrink-0"
          />
        ) : (
          <MdAdd
            style={{ color: colors.primaryYellow }}
            size={24}
            className="flex-shrink-0"
          />
        )}
      </div>

      {open && (
        <div
          className="mt-4 pt-4 border-t border-gray-300 rounded-lg p-4"
          style={{
            backgroundColor: "white",
            color: colors.secondaryDarkGrey,
          }}
        >
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function AdmissionsFAQ({ faqs, colors }: AdmissionsFAQProps) {
  // Filter out invalid FAQs
  const validFaqs =
    faqs?.filter((faq) => faq && faq.question && faq.answer) || [];

  // Don't render if no valid FAQs
  if (validFaqs.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-white">
      <div className="container-custom max-w-6xl mx-auto">
        <h2
          className="text-2xl md:text-3xl font-bold mb-6 text-center"
          style={{ color: colors.primaryGreen }}
        >
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {validFaqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              colors={colors}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
