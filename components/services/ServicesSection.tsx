"use client";

import Image from "next/image";
import { Clock, Shield } from "lucide-react";
import { useEffect, useState } from "react";

export interface Service {
  name: string;
  image: string;
  description: string;
  duration: string;
  reviews?: string;
  popular?: boolean;
}

interface ServicesSectionProps {
  services: Service[];
}

export default function ServicesSection({ services }: ServicesSectionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Prevent hydration mismatch by not rendering animations until client-side
  if (!mounted) {
    return (
      <section id="services" className="py-12 lg:py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className="group relative w-full max-w-xs rounded-2xl overflow-hidden 
                shadow-lg hover:shadow-2xl transition-all duration-500 
                hover:-translate-y-2 cursor-pointer bg-[#020617]"
              >
                <div className="relative h-[280px] sm:h-[320px] lg:h-[350px]">
                  <div className="absolute inset-0 bg-gray-800 animate-pulse" />
                  <div className="absolute bottom-0 w-full p-4 text-white">
                    <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                      {service.name}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="services" className="py-12 lg:py-20 bg-[#0F172A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative w-full max-w-xs rounded-2xl overflow-hidden 
              shadow-lg hover:shadow-2xl transition-all duration-500 
              hover:-translate-y-2 cursor-pointer bg-[#020617]"
            >
              {/* Image Section */}
              <div className="relative h-[280px] sm:h-[320px] lg:h-[350px]">
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="eager"
                  priority={index < 3} // Add priority for first few images
                  onError={(e) => {
                    // Handle image loading errors
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />

                {/* VERIFIED BADGE */}
                <div
                  className="absolute top-3 right-3 z-10 flex items-center gap-1 
                  bg-black/60 backdrop-blur-md px-2 py-1 rounded-md text-green-400 text-[10px] shadow-md"
                >
                  <Shield className="h-3 w-3" />
                  Verified
                </div>

                {/* CONTENT */}
                <div className="absolute bottom-0 w-full p-4 text-white">
                  {/* Duration */}
                  <div className="flex items-center gap-3 text-xs text-gray-300 mb-1">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {service.duration}
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-semibold leading-tight">
                    {service.name}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-300 mt-1 line-clamp-2">
                    {service.description}
                  </p>

                  {/* Buttons */}
                  <div className="flex items-center justify-between mt-4 gap-2">
                    <AnimatedButton variant="blue">
                      View
                    </AnimatedButton>
                    <AnimatedButton variant="purple">
                      Book
                    </AnimatedButton>
                  </div>
                </div>
              </div>

              {/* Optional Popular Tag */}
              {service.popular && (
                <div
                  className="absolute left-3 top-3 z-10 bg-yellow-400 text-black 
                  text-[10px] px-2 py-1 rounded-md font-semibold shadow-md"
                >
                  Popular
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Separate component for animated button to handle animation only on client
function AnimatedButton({ 
  children, 
  variant 
}: { 
  children: string; 
  variant: 'blue' | 'purple';
}) {
  const [shouldAnimate, setShouldAnimate] = useState(false);
  
  useEffect(() => {
    // Enable animation only after hydration
    const timeoutId = setTimeout(() => setShouldAnimate(true), 0);
    return () => clearTimeout(timeoutId);
  }, []);

  const gradientColor = variant === 'blue' 
    ? 'rgba(59,130,246,0.8)' 
    : 'rgba(168,85,247,0.9)';

  if (!shouldAnimate) {
    // Static version during SSR
    return (
      <button className="relative w-full rounded-lg overflow-hidden group">
        <span className="relative block w-full text-center px-4 py-2 rounded-lg 
          bg-[#020617] text-white text-xs sm:text-sm font-medium">
          {children}
        </span>
      </button>
    );
  }

  return (
    <button className="relative w-full p-[1px] rounded-lg overflow-hidden group">
      {/* Animated Border - Only rendered on client */}
      <span
        className="absolute inset-0 bg-[conic-gradient(from_0deg,transparent,var(--gradient-color),transparent)] 
        animate-spin-slow"
        style={{ '--gradient-color': gradientColor } as React.CSSProperties}
      />
      
      {/* Inner Content */}
      <span
        className="relative block w-full text-center px-4 py-2 rounded-lg 
        bg-[#020617] text-white text-xs sm:text-sm font-medium 
        group-hover:bg-[#020617]/90 transition"
      >
        {children}
      </span>
    </button>
  );
}