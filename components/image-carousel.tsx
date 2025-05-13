"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button"; // Assuming this path is correct
import { CarouselFallback } from "./carousel-fallback"; // Assuming this path is correct

interface CarouselImage {
  src: string;
  alt: string;
}

interface ImageCarouselProps {
  images: CarouselImage[];
  autoSlideInterval?: number;
  className?: string;
  aspectRatio?: string; // e.g., "1/1" for square, "16/9" for video
}

export function ImageCarousel({
  images,
  autoSlideInterval = 5000,
  className = "",
  aspectRatio = "1/1", // Changed default to "1/1" for square, or you can pass it when using
}: ImageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  }, [images.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  }, [images.length]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setImagesLoaded(true);
    }, 1000); // Consider if this delay is always needed
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isHovering || !imagesLoaded || images.length <= 1) return; // Don't slide if not hovering, not loaded, or only one image
    const interval = setInterval(() => {
      nextSlide();
    }, autoSlideInterval);
    return () => clearInterval(interval);
  }, [nextSlide, autoSlideInterval, isHovering, imagesLoaded, images.length]);

  // Function to determine Tailwind CSS class based on aspectRatio prop
  const getAspectRatioClass = (ratio: string): string => {
    if (ratio === "1/1") return "aspect-square";
    if (ratio === "16/9") return "aspect-video";
    // For arbitrary aspect ratios like "4/3", Tailwind uses aspect-[4/3]
    // Ensure the prop format is "width/height" e.g. "4/3"
    if (ratio && ratio.includes("/")) {
      // Basic validation for "number/number" format
      const parts = ratio.split("/");
      if (
        parts.length === 2 &&
        !isNaN(Number(parts[0])) &&
        !isNaN(Number(parts[1])) &&
        Number(parts[1]) !== 0
      ) {
        return `aspect-[${ratio}]`;
      }
    }
    return "aspect-square"; // Fallback to square if format is unexpected or for safety
  };

  const currentAspectRatioClass = getAspectRatioClass(aspectRatio);

  if (!images || images.length === 0) return null;
  if (!imagesLoaded) return <CarouselFallback aspectRatio={aspectRatio} />;

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ${className} ${currentAspectRatioClass}`} // Use dynamic aspect ratio class
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Image container - no explicit aspect ratio here, it fills the parent */}
      <div>
        {images.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentIndex
                ? "opacity-100"
                : "opacity-0 pointer-events-none"
            }`}
          >
            <Image
              src={image.src || "/placeholder.svg"} // Provide a valid placeholder
              alt={image.alt}
              fill
              style={{ borderRadius: "20px" }} // Consider if this should be on the outer div or if it's needed with overflow-hidden
              className="object-cover" // This is fine, as the parent container will now have the correct aspect ratio
              priority={index === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Optional: Add sizes for performance
            />
          </div>
        ))}
      </div>

      {/* Navigation arrows - only show if more than one image */}
      {images.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/70 text-gray-800 opacity-70 hover:opacity-100 transition-opacity"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-2 top-1/2 z-10 h-10 w-10 -translate-y-1/2 rounded-full bg-white/70 text-gray-800 opacity-70 hover:opacity-100 transition-opacity"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}

      {/* Indicators - only show if more than one image */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 space-x-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                index === currentIndex ? "w-6 bg-white" : "bg-white/50"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Optional: Gradient overlay, if you want it */}
      {/* <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent pointer-events-none"></div> */}
    </div>
  );
}
