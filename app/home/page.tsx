"use client";

import CardNav, { CardNavItem } from "@/components/CardNav";
import { Button } from "@/components/ui/button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import {
  Car,
  Droplets,
  Hammer,
  Laptop,
  Link,
  Paintbrush,
  Snowflake,
  Zap,
} from "lucide-react";
import React from "react";
import { useRouter } from "next/navigation";
import UploadAvatars from "@/components/ui/upload";

const services = [
  {
    name: "Cooler Repair",
    icon: Snowflake,
    description: "AC & Cooler maintenance",
    color: "bg-[#E3F2FD] text-[#007BFF]",
  },
  {
    name: "Laptop Repair",
    icon: Laptop,
    description: "Computer & laptop fixes",
    color: "bg-[#F3E5F5] text-[#9C27B0]",
  },
  {
    name: "Car Mechanic",
    icon: Car,
    description: "Auto repair services",
    color: "bg-[#FFEBEE] text-[#F44336]",
  },
  {
    name: "Plumber",
    icon: Droplets,
    description: "Water & pipe solutions",
    color: "bg-[#E0F2F1] text-[#00BCD4]",
  },
  {
    name: "Electrician",
    icon: Zap,
    description: "Electrical installations",
    color: "bg-[#FFF8E1] text-[#FF9800]",
  },
  {
    name: "AC Service",
    icon: Snowflake,
    description: "Air conditioning repair",
    color: "bg-[#E8EAF6] text-[#3F51B5]",
  },
  {
    name: "Carpenter",
    icon: Hammer,
    description: "Wood work & furniture",
    color: "bg-[#FFF3E0] text-[#FF5722]",
  },
  {
    name: "Painter",
    icon: Paintbrush,
    description: "Interior & exterior painting",
    color: "bg-[#E8F5E8] text-[#4CAF50]",
  },
];


const items: CardNavItem[] = [
  {
    label: "About",
    bgColor: "#0D0716",
    textColor: "#fff",
    links: [
      { label: "Company", href: "/about", ariaLabel: "About Company" },
      { label: "Careers", href: "/careers", ariaLabel: "About Careers" },
    ],
  },
  {
    label: "Projects",
    bgColor: "#170D27",
    textColor: "#fff",
    links: [
      {
        label: "Featured",
        href: "/features",
        ariaLabel: "Featured Projects",
      },
      {
        label: "Case Studies",
        href: "/Projects",
        ariaLabel: "Project Case Studies",
      },
    ],
  },
  {
    label: "Contact",
    bgColor: "#271E37",
    textColor: "#fff",
    links: [
      { label: "Email", href: "/email", ariaLabel: "Email us" },
      { label: "Twitter", href: "/twitter", ariaLabel: "Twitter" },
      { label: "LinkedIn", href: "/linkedin", ariaLabel: "LinkedIn" },
    ],
  },
];

export default function HomePage() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/home"); // must match folder name exactly
  };

  return (
    <div className="bg-black flex min-h-screen items-center justify-center text-2xl font-semibold">
      <CardNav
        items={items}
        baseColor="rgba(235, 222, 222, 0.05)"
        menuColor="#0e0c0cff"
        buttonBgColor="#111"
        buttonTextColor="#fff"
        ease="power3.out"
        showSearch={true}
        onSearch={(query) => console.log("Search for:", query)}
        UploadAvatarComponent={<UploadAvatars/>}
      />
      <section id="services" className="py-12 sm:py-16 lg:py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-2xl mx-auto">
              Professional repair and maintenance services for your home and
              office needs
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {services.map((service, index) => {
              return (
                <Card
                  key={index}
                  className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:-translate-y-2 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#007BFF] bg-white touch-manipulation"
                  role="link"
                  tabIndex={0}
                  onClick={goToHome}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      router.push(`/login`);
                    }
                  }}
                >
                  <CardContent className="p-4 sm:p-6 text-center">
                    <div
                      className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-3 sm:mb-4 rounded-2xl ${service.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                    >
                      <service.icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#343A40] mb-2">
                      {service.name}
                    </h3>
                    <p className="text-[#6C757D] text-sm">
                      {service.description}
                    </p>
                    <Button
                      asChild
                      variant="ghost"
                      size="sm"
                      className="mt-3 sm:mt-4 text-[#00C49A] hover:text-[#00B894] text-sm"
                    >
                      <Link href={`/home`}>Book Now →</Link>
                      
                    </Button>
                   
                    
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
