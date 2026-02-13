"use client";

import { Plus, Check } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: string;
  imageUrl: string;
  popular?: boolean;
}

const services: Service[] = [
  {
    id: "1",
    name: "Home Cleaning",
    description: "Professional deep cleaning for your entire home",
    price: 120,
    duration: "3–4 hours",
    imageUrl: "https://images.unsplash.com/photo-1581578949510-fa7315c4c350",
    popular: true,
  },
  {
    id: "2",
    name: "Plumbing Service",
    description: "Expert plumbing repairs and installations",
    price: 90,
    duration: "1–2 hours",
    imageUrl: "https://images.unsplash.com/photo-1542632867-261e4be41c7c",
  },
  {
    id: "3",
    name: "Electrical Work",
    description: "Licensed electricians for all electrical needs",
    price: 100,
    duration: "1–3 hours",
    imageUrl: "https://images.unsplash.com/photo-1467733238130-bb6846885316",
    popular: true,
  },
  {
    id: "4",
    name: "Interior Painting",
    description: "Transform your space with professional painting",
    price: 250,
    duration: "1–2 days",
    imageUrl: "https://images.unsplash.com/photo-1688372199140-cade7ae820fe",
  },
  {
    id: "5",
    name: "Landscaping",
    description: "Beautiful outdoor spaces designed by experts",
    price: 180,
    duration: "4–6 hours",
    imageUrl: "https://images.unsplash.com/photo-1747659629851-a92bd71149f6",
  },
  {
    id: "6",
    name: "Carpentry",
    description: "Custom woodwork and furniture repairs",
    price: 110,
    duration: "2–4 hours",
    imageUrl: "https://images.unsplash.com/photo-1667771510023-7a321ceaf981",
  },
];

export function ServicesGrid() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const router = useRouter();

  const toggleService = (id: string) => {
    setSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const total = services
    .filter((s) => selectedServices.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <section id="services" className="py-32 bg-[#0B1220] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">

        {/* HEADER */}
        <div className="text-center max-w-[640px] mx-auto mb-20">
          <h2 className="mb-4 text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
            Services you can trust
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Choose verified professionals with clear pricing and guaranteed quality.
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {services.map((service) => {
            const isSelected = selectedServices.includes(service.id);

            return (
              <div
                key={service.id}
                className="group bg-[#0F172A] rounded-xl overflow-hidden border border-white/10 hover:border-white/20 transition-all"
              >
                {/* IMAGE */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.imageUrl}
                    alt={service.name}
                    fill
                    className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
                  />
                  {service.popular && (
                    <span className="absolute top-4 right-4 bg-indigo-500 text-white text-xs px-3 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">
                    {service.name}
                  </h3>

                  <p className="text-sm text-slate-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>

                  <div className="flex justify-between items-center mb-5 text-sm text-slate-400">
                    <span>{service.duration}</span>
                    <span className="text-xl font-semibold text-white">
                      ${service.price}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleService(service.id)}
                    className={`w-full h-11 rounded-lg flex items-center justify-center gap-2 font-medium transition-all ${
                      isSelected
                        ? "bg-emerald-500 text-white"
                        : "border border-white/20 text-white hover:bg-white/10"
                    }`}
                  >
                    {isSelected ? (
                      <>
                        <Check size={18} /> Added
                      </>
                    ) : (
                      <>
                        <Plus size={18} /> Add Service
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOOKING BAR */}
        {selectedServices.length > 0 && (
          <div className="sticky bottom-6 z-40 bg-[#0F172A] border border-white/20 rounded-xl p-6 shadow-2xl">
            <div className="flex flex-col sm:flex-row justify-between gap-4 items-center">
              <div>
                <p className="text-sm text-slate-400">
                  {selectedServices.length} service selected
                </p>
                <p className="text-2xl font-semibold">
                  Total: ${total}
                </p>
              </div>

              <button
                onClick={() => router.push("/booking")}
                className="h-14 px-8 bg-indigo-500 text-white rounded-lg hover:bg-indigo-400 transition-colors"
              >
                Continue to Booking
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
