"use client";

import Carousel from "@/components/ui/Carousel";
import HeroWithBackground from "@/components/ui/HeroWithBackground";
import ImageGalleryCarousel from "@/components/ui/ImageGalleryCarousel";
import Button from "@/components/ui/Button";
import Link from "next/link";
import AnimatedSection from "@/components/animations/AnimatedSection";

export default function CarouselDemo() {
  // Sample images using Unsplash placeholder service
  const heroImages = [
    {
      src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80",
      alt: "Campus View",
      title: "Welcome to Our School",
      description: "Excellence in education since 1968",
    },
    {
      src: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1920&q=80",
      alt: "Students Learning",
      title: "Inspiring Young Minds",
      description: "Building tomorrow's leaders today",
    },
    {
      src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?w=1920&q=80",
      alt: "School Library",
      title: "World-Class Facilities",
      description: "State-of-the-art learning environments",
    },
  ];

  const galleryImages = [
    {
      src: "https://images.unsplash.com/photo-1562774053-701939374585?w=800&q=80",
      alt: "Campus Building",
      title: "Main Campus Building",
    },
    {
      src: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&q=80",
      alt: "Study Area",
      title: "Modern Study Spaces",
    },
    {
      src: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=800&q=80",
      alt: "Classroom",
      title: "Interactive Classrooms",
    },
    {
      src: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800&q=80",
      alt: "Science Lab",
      title: "Science Laboratory",
    },
    {
      src: "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=800&q=80",
      alt: "Sports Field",
      title: "Sports Complex",
    },
    {
      src: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&q=80",
      alt: "Library",
      title: "Library & Resources",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Carousel Demo */}
      <section>
        <Carousel
          images={heroImages}
          autoPlay={true}
          interval={4000}
          showControls={true}
          showIndicators={true}
          height="600px"
        />
      </section>

      {/* Info Section */}
      <AnimatedSection animation="fadeInUp">
        <section className="py-16 bg-gray-50">
          <div className="container-custom text-center">
            <h1 className="text-4xl font-bold mb-4">
              Carousel & Background Images Demo
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Scroll down to see all three carousel components in action. This
              page demonstrates auto-rotating carousels, hero backgrounds, and
              image galleries.
            </p>
            <Link href="/">
              <Button variant="primary">Back to Home</Button>
            </Link>
          </div>
        </section>
      </AnimatedSection>

      {/* Hero with Background Demo */}
      <AnimatedSection animation="fadeIn">
        <section>
          <HeroWithBackground
            backgroundImage="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1920&q=80"
            title="Hero with Background"
            subtitle="Single image hero section with overlay and animated content"
            overlay={true}
            overlayOpacity={0.6}
            height="500px"
          >
            <div className="flex gap-4">
              <Button size="lg" variant="accent">
                Primary Action
              </Button>
              <Button size="lg" variant="secondary">
                Secondary Action
              </Button>
            </div>
          </HeroWithBackground>
        </section>
      </AnimatedSection>

      {/* Image Gallery Carousel Demo */}
      <AnimatedSection animation="fadeInUp">
        <section className="py-16 bg-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-4">
              Image Gallery Carousel
            </h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Click any image to view it in fullscreen lightbox mode. Hover to
              see zoom effects.
            </p>
            <ImageGalleryCarousel images={galleryImages} columns={3} />
          </div>
        </section>
      </AnimatedSection>

      {/* Usage Instructions */}
      <AnimatedSection animation="fadeInUp">
        <section className="py-16 bg-gradient-to-br from-primary to-primary-800 text-white">
          <div className="container-custom">
            <h2 className="text-3xl font-bold text-center mb-8">
              How to Use These Components
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">1. Carousel</h3>
                <p className="text-white/80">
                  Perfect for hero sections with multiple images. Auto-plays and
                  shows navigation controls and indicators.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">
                  2. Hero with Background
                </h3>
                <p className="text-white/80">
                  Single hero image with overlay, animated content, and floating
                  elements. Great for landing pages.
                </p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-xl font-bold mb-3">3. Image Gallery</h3>
                <p className="text-white/80">
                  Responsive grid with lightbox functionality. Perfect for
                  showcasing campus photos and facilities.
                </p>
              </div>
            </div>
            <div className="text-center mt-12">
              <Link href="/carousel-usage-guide.md" target="_blank">
                <Button size="lg" variant="accent">
                  View Full Documentation
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection animation="scaleIn">
        <section className="py-16 bg-accent text-gray-900">
          <div className="container-custom text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Implement?</h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Check the CAROUSEL_USAGE_GUIDE.md file for code examples and
              implementation instructions.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/">
                <Button size="lg" variant="primary">
                  Go to Homepage
                </Button>
              </Link>
              <Link href="/gallery">
                <Button size="lg" variant="secondary">
                  View School Gallery
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  );
}











