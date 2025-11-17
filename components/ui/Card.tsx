"use client";

import classNames from "classnames";
import { ReactNode } from "react";
import { motion } from "framer-motion";

interface CardProps {
  children: ReactNode;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
  hover?: boolean;
}

export default function Card({
  children,
  className,
  padding = "md",
  hover = false,
}: CardProps) {
  const paddingClasses = {
    none: "p-0",
    sm: "p-4",
    md: "p-6",
    lg: "p-8",
  };

  return (
    <motion.div
      whileHover={
        hover
          ? {
              y: -8,
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : undefined
      }
      className={classNames(
        "bg-white rounded-xl border border-gray-200 shadow-sm",
        paddingClasses[padding],
        {
          "hover:shadow-md hover:border-primary transition-all duration-300":
            hover,
        },
        className
      )}
    >
      {children}
    </motion.div>
  );
}
