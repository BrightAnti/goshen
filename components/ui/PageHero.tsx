"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { motion } from "framer-motion";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  offset?: number; // offset into gallery to vary images per page
}

export default function PageHero({
  title,
  subtitle,
  offset = 0,
}: PageHeroProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const { data } = await supabase
          .from("gallery")
          .select("image_url")
          .order("uploaded_at", { ascending: false })
          .range(offset, offset);
        const url = data && data[0]?.image_url ? data[0].image_url : null;
        setImageUrl(url);
      } catch (e) {
        setImageUrl(null);
      }
    };
    fetchImage();
  }, [offset]);

  return (
    <section className="relative overflow-hidden border-b border-gray-200">
      {imageUrl && (
        <div className="absolute inset-0">
          {/* Background image */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>
      )}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/20" />
      <div className="container-custom py-16 md:py-24 relative z-10">
        <div className="max-w-3xl bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 md:p-8 shadow-lg">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-5xl font-bold text-white mb-3"
          >
            {title}
          </motion.h1>
          <div className="h-1 w-16 bg-white/80 rounded mb-3" />
          {subtitle && (
            <p className="text-white/90 text-lg md:text-xl">{subtitle}</p>
          )}
        </div>
      </div>
    </section>
  );
}






