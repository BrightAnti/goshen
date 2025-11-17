"use client";

import { motion } from "framer-motion";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  color?: string;
}

export default function LoadingSpinner({
  size = "md",
  color = "#1eaf49",
}: LoadingSpinnerProps) {
  const sizes = {
    sm: 24,
    md: 40,
    lg: 60,
  };

  const circleSize = sizes[size];

  return (
    <div className="flex items-center justify-center">
      <motion.div
        style={{
          width: circleSize,
          height: circleSize,
          border: `3px solid ${color}20`,
          borderTop: `3px solid ${color}`,
          borderRadius: "50%",
        }}
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
}

// Alternative pulse loading animation
export function LoadingPulse({ color = "#1eaf5f" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center space-x-2">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          style={{
            width: 12,
            height: 12,
            backgroundColor: color,
            borderRadius: "50%",
          }}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      ))}
    </div>
  );
}

// Loading bars animation
export function LoadingBars({ color = "#0abf46" }: { color?: string }) {
  return (
    <div className="flex items-center justify-center space-x-1">
      {[0, 1, 2, 3, 4].map((index) => (
        <motion.div
          key={index}
          style={{
            width: 4,
            backgroundColor: color,
            borderRadius: 2,
          }}
          animate={{
            height: [20, 40, 20],
          }}
          transition={{
            duration: 1,
            repeat: Infinity,
            delay: index * 0.1,
          }}
        />
      ))}
    </div>
  );
}


