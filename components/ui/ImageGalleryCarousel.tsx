"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { MdClose } from "react-icons/md";

interface GalleryImage {
  src: string;
  alt: string;
  title?: string;
}

interface ImageGalleryCarouselProps {
  images: GalleryImage[];
  columns?: 2 | 3 | 4;
}

export default function ImageGalleryCarousel({
  images,
  columns = 3,
}: ImageGalleryCarouselProps) {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const gridCols = {
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-2 md:grid-cols-3 lg:grid-cols-4",
  };

  return (
    <>
      <div className={`grid ${gridCols[columns]} gap-4`}>
        {images.map((image, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setSelectedImage(index)}
            className="relative aspect-video cursor-pointer overflow-hidden rounded-lg group"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover transition-transform duration-300 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileHover={{ opacity: 1, scale: 1 }}
                className="text-white text-center p-4"
              >
                {image.title && (
                  <p className="font-semibold text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {image.title}
                  </p>
                )}
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full backdrop-blur-sm transition-colors z-10"
            >
              <MdClose size={32} />
            </motion.button>

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-7xl max-h-[90vh] w-full h-full"
            >
              <Image
                src={images[selectedImage].src}
                alt={images[selectedImage].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
              {images[selectedImage].title && (
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                  <p className="text-white text-xl font-semibold text-center">
                    {images[selectedImage].title}
                  </p>
                </div>
              )}
            </motion.div>

            {/* Navigation */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedImage(index);
                  }}
                  className={`h-2 rounded-full transition-all ${
                    index === selectedImage
                      ? "bg-white w-8"
                      : "bg-white/50 w-2 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}








