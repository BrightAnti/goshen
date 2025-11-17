"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ReactNode } from "react";

interface HeroWithBackgroundProps {
  backgroundImage: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
  overlay?: boolean;
  overlayOpacity?: number;
  height?: string;
  parallax?: boolean;
}

export default function HeroWithBackground({
  backgroundImage,
  title,
  subtitle,
  children,
  overlay = true,
  overlayOpacity = 0.5,
  height = "600px",
  parallax = true,
}: HeroWithBackgroundProps) {
  return (
    <div className="relative overflow-hidden" style={{ height }}>
      {/* Background Image */}
      <motion.div
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <Image
          src={backgroundImage}
          alt={title}
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
      </motion.div>

      {/* Overlay */}
      {overlay && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/60 to-primary-900/80"
          style={{ opacity: overlayOpacity }}
        />
      )}

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -top-1/2 -left-1/2 w-full h-full bg-white/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent/10 rounded-full blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-4xl"
          >
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6"
            >
              {title}
            </motion.h1>
            {subtitle && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="text-xl md:text-2xl lg:text-3xl text-white/90 mb-8"
              >
                {subtitle}
              </motion.p>
            )}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              {children}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-white rounded-full"
          />
        </div>
      </motion.div>
    </div>
  );
}








