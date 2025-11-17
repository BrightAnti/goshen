"use client";

import { motion, useInView, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterAnimationProps {
  value: number;
  suffix?: string;
  className?: string;
  duration?: number;
}

export default function CounterAnimation({
  value,
  suffix = "",
  className = "",
  duration = 2,
}: CounterAnimationProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
      if (ref.current) {
        const displayValue =
          typeof value === "string" ? value : Math.round(latest);
        (ref.current as HTMLElement).textContent = `${displayValue}${suffix}`;
      }
    });

    return () => unsubscribe();
  }, [springValue, suffix, value]);

  return (
    <motion.span
      ref={ref}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
      transition={{
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      0{suffix}
    </motion.span>
  );
}











