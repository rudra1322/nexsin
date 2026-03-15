"use client";

import {
  Plus,
  Check,
  Search,
  Zap,
  Snowflake,
  Paintbrush,
  Sprout,
  Star,
  Users
} from "lucide-react";
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

const popularServices = [
  { icon: Zap, name: "Electrician" },
  { icon: Snowflake, name: "AC Repair" },
  { icon: Paintbrush, name: "Painter" },
  { icon: Sprout, name: "Gardener" },
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
    <section id="services" className="pt-20 bg-[#0B1220] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8">
        
        {/* POPULAR SERVICES */}
        <h3 className="text-2xl font-semibold mt-12">
            Popular services
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-16 mb-12 items-center">

          {/* LEFT - SERVICES */}
          <div className="grid grid-cols-2 gap-6">

            {popularServices.map((item, i) => (
              <div
                key={i}
                className="bg-[#0F172A] border border-white/10 aspect-square rounded-xl flex flex-col items-center justify-center hover:border-white/20 hover:-translate-y-1 transition"
              >
                <item.icon size={26} className="mb-2" />
                <span className="text-sm text-slate-300">{item.name}</span>
              </div>
            ))}

          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 grid-rows-2 gap-6">
            <div className="bg-[#0F172A] h-[260px] rounded-xl border border-white/10" />
            <div className="bg-[#0F172A] rounded-xl border border-white/10 row-span-2" />
            <div className="bg-[#0F172A] h-[260px] rounded-xl border border-white/10" />

          </div>

        </div>

        <div className="flex gap-16 mb-16">

          <div>
            <div className="flex items-center gap-2 text-lg">
              <Star className="text-yellow-400" size={18}/>
              <span>4.5</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              SERVICE RATING
            </p>
          </div>

          <div>
            <div className="flex items-center gap-2 text-lg">
              <Users size={18}/>
              <span>4.5 m</span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Customer Globally
            </p>
          </div>

        </div>

        {/* HEADER */}
        <div className="text-center max-w-[640px] mx-auto mb-20">
          <h2 className="mb-4 text-3xl sm:text-4xl font-semibold tracking-[-0.02em]">
            Services you can trust
          </h2>
          <p className="text-slate-300 leading-relaxed">
            Choose verified professionals with clear pricing and guaranteed quality.
          </p>
        </div>

        {/* CATEGORY SECTION */}

        <div className="mb-16">

        <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Home repair & installation</h3>
        <button className="text-slate-400">see more →</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

        {services.slice(0,3).map((service) => (

        <div
        key={service.id}
        className="bg-[#0F172A] rounded-lg border border-white/10 overflow-hidden hover:-translate-y-1 hover:border-white/30 transition"
        >

        <div className="relative h-[160px]">
        <Image
        src={service.imageUrl}
        alt={service.name}
        fill
        className="object-cover"
        />
        </div>

        <div className="p-4">
        <h4 className="font-medium">{service.name}</h4>
        <p className="text-sm text-slate-400">{service.duration}</p>
        <p className="text-sm font-semibold">${service.price}</p>
        </div>

        </div>

        ))}

        </div>

        </div>


        <div className="mb-16">

        <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Salon for women</h3>
        <button className="text-slate-400">see more →</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(3,6).map((service) => (

        <div
        key={service.id}
        className="bg-[#0F172A] rounded-lg border border-white/10 overflow-hidden"
        >

        <div className="relative h-[160px]">
        <Image src={service.imageUrl} alt={service.name} fill className="object-cover"/>
        </div>

        <div className="p-4">
        <h4 className="font-medium">{service.name}</h4>
        <p className="text-sm text-slate-400">{service.duration}</p>
        <p className="text-sm font-semibold">${service.price}</p>
        </div>

        </div>

        ))}
        </div>

        </div>


        <div className="mb-20">

        <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Cleaning Essentials</h3>
        <button className="text-slate-400">see more →</button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {services.slice(0,3).map((service) => (

        <div
        key={service.id}
        className="bg-[#0F172A] rounded-lg border border-white/10 overflow-hidden"
        >

        <div className="relative h-[260px]">
        <Image src={service.imageUrl} alt={service.name} fill className="object-cover"/>
        </div>

        <div className="p-4">
        <h4 className="font-medium">{service.name}</h4>
        <p className="text-sm text-slate-400">{service.duration}</p>
        <p className="text-sm font-semibold">${service.price}</p>
        </div>

        </div>

        ))}
        </div>

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
