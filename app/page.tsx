"use client";

import { Button } from "@/components/ui/button";


import { Badge } from "@/components/ui/badge";
import {
  Search,
  Wrench,

  Shield,
  Clock,
  Star,
  MapPin,
  Phone,
  Mail,
  Facebook,
  Twitter,
  Instagram,


} from "lucide-react";


import Image from "next/image";
import CardNav, { CardNavItem } from "@/components/CardNav";
import ServicesSection from "@/components/services/ServicesSection";
import ReviewForm from "@/components/reviews/ReviewForm";
import TopReviews from "@/components/reviews/TopReviews";

export default function HomePage() {


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

  const features = [
    {
      icon: Shield,
      title: "Verified Professionals",
      description: "All service providers are background checked",
    },
    {
      icon: Clock,
      title: "Quick Response",
      description: "Get service within 2 hours of booking",
    },
    {
      icon: Star,
      title: "Quality Guaranteed",
      description: "100% satisfaction or money back guarantee",
    },
  ];
  const items: CardNavItem[] = [
    {
      label: "About",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "Company",
          href: "/information/about",
          ariaLabel: "About Company",
        },
        {
          label: "Careers",
          href: "/information/careers",
          ariaLabel: "About Careers",
        },
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
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-[#0F172A]">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <CardNav
            items={items}
            baseColor="rgba(235, 222, 222, 0.05)"
            menuColor="#0e0c0cff"
            buttonBgColor="#3e0fb6"
            buttonTextColor="#fff"
            ease="power3.out"
            showSearch={true}
            onSearch={(query) => console.log("Search for:", query)}
            navButtons={[
              {
                label: "GET START",
                bgColor: "rgb(8, 76, 248)",
              },
            ]}
          />
        </div>

        {/* Mobile Navigation */}
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#0F172A] to-[#0F172A] py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="flex items-center space-x-2">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-[#007BFF]" />
                <span className="text-xl sm:text-5xl font-bold text-white">
                  Nexcyn
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 leading-tight">
                Your Home Services,
                <span className="text-[#60a5fa]"> On-Demand</span>
              </h1>

              <p className="text-lg sm:text-xl text-[#cbd5e1] mb-6 sm:mb-8 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Book trusted local professionals for all your repair and
                maintenance needs. From plumbing to electronics, we have got you
                covered.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="flex-1 relative">

                </div>

              </div>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 sm:gap-6 text-xs sm:text-sm text-[#cbd5e1]">
                <div className="flex items-center space-x-1">
                  <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-400 fill-current" />
                  <span>4.8/5 Rating</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Shield className="h-3 w-3 sm:h-4 sm:w-4 text-green-500" />
                  <span>Verified Pros</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400" />
                  <span>Same Day Service</span>

                  <Badge className="mb-4 bg-[#E3F2FD] text-[#007BFF] hover:bg-[#E3F2FD] text-xs sm:text-sm">
                    Trusted by 10,000+ customers
                  </Badge>
                </div>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <div className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8 transform rotate-1 lg:rotate-2">
                <Image
                  src="/home-repair-technician.png"
                  alt="Professional technician"
                  width={800}
                  height={600}
                  className="w-full h-60 sm:h-72 lg:h-80 object-cover rounded-xl"
                  loading="eager"
                />
              </div>
              <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-blue-600 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                {/* <div className="text-xl sm:text-2xl font-bold">2hrs</div> */}
                <div className="text-xs sm:text-sm opacity-90">
                  Quick Response
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Services Section */}
      <section id="services" className="py-12 lg:py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3">
              Our Services
            </h2>
            <p className="text-lg sm:text-xl text-[#cbd5e1] max-w-2xl mx-auto">
              Professional repair and maintenance services for your home and
              office needs
            </p>
          </div>
          <ServicesSection services={services} />
        </div>
      </section>

      {/* How It Works */}
      <section
        id="how-it-works"
        className="py-12 sm:py-16 lg:py-20 bg-[#0F172A]"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              How FixMate Works
            </h2>
            <p className="text-lg sm:text-xl text-[#cbd5e1]">
              Simple steps to get your problems fixed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E3F2FD] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Search className="h-8 w-8 sm:h-10 sm:w-10 text-[#007BFF]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                1. Choose Service
              </h3>
              <p className="text-[#cbd5e1] text-sm sm:text-base">
                Select the service you need from our wide range of options
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#E8F5E8] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <MapPin className="h-8 w-8 sm:h-10 sm:w-10 text-[#00C49A]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                2. Book Appointment
              </h3>
              <p className="text-[#cbd5e1] text-sm sm:text-base">
                Schedule a convenient time and provide your location details
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-[#F3E5F5] rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <Wrench className="h-8 w-8 sm:h-10 sm:w-10 text-[#9C27B0]" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-white">
                3. Get It Fixed
              </h3>
              <p className="text-[#cbd5e1] text-sm sm:text-base">
                Our verified professional arrives and fixes your problem
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6 text-center lg:text-left">
                Why Choose FixMate?
              </h2>
              <div className="space-y-4 sm:space-y-6">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 sm:space-x-4"
                  >
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#E3F2FD] rounded-xl flex items-center justify-center flex-shrink-0">
                      <feature.icon className="h-5 w-5 sm:h-6 sm:w-6 text-[#0F172A]" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-semibold text-white mb-1 sm:mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-[#cbd5e1] text-sm sm:text-base">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative order-1 lg:order-2">
              <Image
                src="/happy-customer-repairman.png"
                alt="Happy customer"
                width={800}
                height={600}
                unoptimized
                className="w-full h-64 sm:h-80 lg:h-96 object-cover rounded-2xl shadow-2xl"
                priority // optional: improves LCP for above-the-fold images
              />
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-green-500 text-white p-3 sm:p-4 rounded-xl shadow-lg">
                <div className="text-xl sm:text-2xl font-bold">98%</div>
                <div className="text-xs sm:text-sm opacity-90">
                  Satisfaction
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Testimonials */}


      {/* Review Submission Section - Simplified for mobile */}
      <section className="py-12 sm:py-16 lg:py-20 bg-[#0F172A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Share Your Experience
            </h2>
            <p className="text-lg sm:text-xl text-[#cbd5e1]">
              Help others by sharing your experience with FixMate services
            </p>
          </div>

         <ReviewForm />
        </div>
      </section>
            <section className="py-12 sm:py-16 lg:py-20 bg-[#0F172A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">

          </div>
         <TopReviews />

          {/* Trust Indicators */}
          <div className="mt-12 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 text-center">
            {[
              {
                number: "10,000+",
                label: "Happy Customers",
                color: "text-[#00C49A]",
              },
              {
                number: "98%",
                label: "Satisfaction Rate",
                color: "text-[#007BFF]",
              },
              {
                number: "2,847",
                label: "5-Star Reviews",
                color: "text-[#FF9800]",
              },
              {
                number: "24/7",
                label: "Customer Support",
                color: "text-[#9C27B0]",
              },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-[#FFFFFF] rounded-xl p-4 sm:p-6 shadow-md"
              >
                <div
                  className={`text-2xl sm:text-3xl font-bold ${stat.color} mb-1 sm:mb-2`}
                >
                  {stat.number}
                </div>
                <div className="text-[#6C757D] text-xs sm:text-sm">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-[#1e40af] to-[#1e3a8a]">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
            Ready to Fix Your Problems?
          </h2>
          <p className="text-lg sm:text-xl text-[#E3F2FD] mb-6 sm:mb-8">
            Join thousands of satisfied customers who trust FixMate for their
            home service needs
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto sm:max-w-none">
            <Button
              // href="/services"
              size="lg"
              variant="secondary"
              className="h-11 sm:h-12 px-6 sm:px-8 rounded-xl bg-[#00C49A] hover:bg-[#00B894] text-white text-sm sm:text-base"
              onClick={() => {
                window.location.href = "#";
              }}
            >
              Browse Services
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0f172a] text-white py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="sm:col-span-2 md:col-span-1">
              <div className="flex items-center space-x-2 mb-4">
                <Wrench className="h-6 w-6 sm:h-8 sm:w-8 text-[#007BFF]" />
                <span className="text-xl sm:text-2xl font-bold">Nexcyn</span>
              </div>
              <p className="text-[#cbd5e1] mb-4 text-sm sm:text-base">
                Your trusted partner for all home repair and maintenance
                services.
              </p>
              <div className="flex space-x-4">
                <Facebook className="h-5 w-5 text-[#cbd5e1] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                <Twitter className="h-5 w-5 text-[#cbd5e1] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
                <Instagram className="h-5 w-5 text-[#cbd5e1] hover:text-[#FFFFFF] cursor-pointer transition-colors" />
              </div>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Services
              </h3>
              <ul className="space-y-2 text-[#cbd5e1] text-sm sm:text-base">
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Plumbing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Electrical
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    AC Repair
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Carpentry
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Company
              </h3>
              <ul className="space-y-2 text-[#cbd5e1] text-sm sm:text-base">
                <li>
                  <a
                    href="/information/about"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="/information/careers"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Careers
                  </a>
                </li>

                <li>
                  <a
                    href="/legal/terms"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#FFFFFF] transition-colors"
                  >
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
                Contact
              </h3>
              <div className="space-y-2 text-[#cbd5e1] text-sm sm:text-base">
                <div className="flex items-center space-x-2">
                  <Phone className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>+91 xxx </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>support@nexsyn.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
                  <span>Madhya Pradesh, India</span>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-[#cbd5e1] text-sm sm:text-base">
            <p>&copy; 2024 FixMate. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
