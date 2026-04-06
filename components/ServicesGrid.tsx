"use client";


import {
  Zap,
  Snowflake,
  Paintbrush,
  Sprout,
  Star,
  Users,
} from "lucide-react";

import SimpleDecryptedText from "./MinimalDecrypting";
import ServicesSection from "./services/ServicesSection";

  const services = [
    {
      name: "Cooler Repair",
      image: "/cooler.png",
      description: "AC & Cooler maintenance",
      duration: "1-2 hrs",
      reviews: "11,234",
      popular: true,
    },
    {
      name: "Laptop Repair",
      image: "/laptop.png",
      description: "Computer & laptop fixes",
      duration: "1-2 hrs",
      reviews: "11,234",
      popular: true,
    },
    {
      name: "Car Mechanic",
      image: "/car.jpg",
      description: "Auto repair services",
      duration: "1-2 hrs",
      reviews: "11,234",
      popular: true,
    },
    {
      name: "Plumbing Services",
      image: "/plumber.png",
      description:
        "Expert plumber for leaks, installations, and drain cleaning",
      duration: "1-2 hrs",
      reviews: "11,234",
      popular: true,
    },
    {
      name: "Electrician Services",
      image: "/electrician.png",
      description: "Licensed electrician for wiring and electrical repairs",
      duration: "1-2 hrs",
      reviews: "9,876",
      popular: true,
    },
    {
      name: "AC Service & Repair",
      image: "/ac.png",
      description: "Complete AC maintenance, repair, and installation services",
      duration: "1-2 hrs",
      reviews: "7,845",
      popular: true,
    },
  ];


const popularServices = [
  { icon: Zap, name: "Electrician" },
  { icon: Snowflake, name: "AC Repair" },
  { icon: Paintbrush, name: "Painter" },
  { icon: Sprout, name: "Gardener" },
];

export function ServicesGrid() {
  return (
    <section id="services" className="pt-20 bg-[#0B1220] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        {/* POPULAR SERVICES - With Premium Glow Effect */}
        <h3 className="text-3xl font-semibold mb-8">
          <SimpleDecryptedText
            text="Our Services"
            triggerOnHover={true}
            speed={10}
            className="text-blue-500"
            encryptedClassName="text-white"
          />
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {popularServices.map((item, index) => {
            // Professional glowing color palette
            const glowStyles = [
              "hover:border-emerald-400/70 hover:shadow-emerald-500/40",
              "hover:border-violet-400/70 hover:shadow-violet-500/40",
              "hover:border-amber-400/70 hover:shadow-amber-500/40",
              "hover:border-rose-400/70 hover:shadow-rose-500/40",
            ];

            const glowClass = glowStyles[index % glowStyles.length];

            return (
              <div
                key={index}
                className={`
                  group relative bg-[#0F172A] border border-white/10 
                  aspect-square rounded-3xl flex flex-col items-center justify-center 
                  overflow-hidden transition-all duration-500 hover:-translate-y-3
                  ${glowClass}
                `}
              >
                {/* Subtle glow overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon Container */}
                <div className="relative z-10 w-20 h-20 flex items-center justify-center mb-6 rounded-2xl bg-white/5 group-hover:bg-white/10 transition-all duration-300">
                  <item.icon
                    size={38}
                    className="text-white group-hover:scale-110 transition-transform"
                  />
                </div>

                {/* Service Name */}
                <span className="relative z-10 text-lg font-semibold text-white tracking-wide">
                  {item.name}
                </span>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 h-0.5 w-8 bg-white/30 group-hover:w-12 group-hover:bg-white/70 transition-all duration-300" />
              </div>
            );
          })}
        </div>

        {/* Trust Signals */}
        <div className="flex flex-wrap gap-x-16 gap-y-8 mb-16 justify-center">
          <div className="flex items-center gap-3">
            <Star className="text-yellow-400" size={28} />
            <div>
              <div className="text-3xl font-semibold">4.8</div>
              <div className="text-xs text-slate-400 tracking-widest">
                AVERAGE RATING
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="text-white" size={28} />
            <div>
              <div className="text-3xl font-semibold">4.2M+</div>
              <div className="text-xs text-slate-400 tracking-widest">
                HAPPY CUSTOMERS
              </div>
            </div>
          </div>
        </div>

        {/* Main Header */}
        <div className="text-center max-w-[640px] mx-auto mb-20">
          <h2 className="mb-4 text-4xl sm:text-5xl font-semibold tracking-[-0.02em]">
            Services you can trust
          </h2>
          <p className="text-slate-300 leading-relaxed text-lg">
            Choose verified professionals with clear pricing and guaranteed
            quality.
          </p>
        </div>

        {/* Services Grid */}
        <div className="bg-[#0B1220] text-center mb-12 sm:mb-16">
         <ServicesSection services={services}/>

        </div>
      </div>
    </section>
  );
}
