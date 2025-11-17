"use client";

import { ReactNode } from "react";

interface SectionHeaderProps {
  title: string;
  subtitle?: ReactNode;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  title,
  subtitle,
  align = "center",
  className,
}: SectionHeaderProps) {
  return (
    <div className={className}>
      <div className={align === "center" ? "text-center" : "text-left"}>
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">
          {title}
        </h2>
        <div
          className={
            align === "center"
              ? "h-1 w-16 bg-primary mx-auto rounded"
              : "h-1 w-12 bg-primary rounded"
          }
        />
        {subtitle && (
          <div
            className={
              align === "center"
                ? "mt-4 text-gray-600 mx-auto max-w-2xl"
                : "mt-4 text-gray-600 max-w-2xl"
            }
          >
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}






