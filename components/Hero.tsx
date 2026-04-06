import { ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[#0B1220] text-white">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-8 pt-24 pb-32 md:pt-32 md:pb-40">
        <div className="max-w-[720px] mx-auto text-center">

          {/* TRUST BADGE */}
          <div className="inline-flex items-center gap-2.5 px-4 h-9 bg-white/5 rounded-full border border-white/10 mb-10">
            <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs sm:text-[13px] text-slate-300 font-medium">
              Trusted by 10,000+ customers
            </span>
          </div>

          {/* HERO HEADING */}
          <h1 className="mb-6 text-balance text-[40px] leading-[1.1] sm:text-[52px] sm:leading-[1.1] font-semibold tracking-[-0.02em]">
            Professional Services,
            <br />
            <span className="text-indigo-400">
              Simply Delivered
            </span>
          </h1>

          {/* SUB HEADING */}
          <p className="text-base sm:text-lg text-slate-300 mb-12 max-w-[600px] mx-auto leading-[1.65]">
            Book expert services with confidence. Clear pricing, verified professionals,
            and guaranteed satisfaction — all in one place.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto h-14 px-8 bg-indigo-500 text-white text-[15px] rounded-lg hover:bg-indigo-400 transition-all duration-200 hover:-translate-y-0.5 shadow-md hover:shadow-lg flex items-center justify-center gap-2.5 group font-medium">
              <span>Browse Services</span>
              <ArrowRight
                size={18}
                strokeWidth={2}
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </button>

            <button className="w-full sm:w-auto h-14 px-8 bg-white/10 text-white text-[15px] rounded-lg hover:bg-white/20 transition-all duration-200 hover:-translate-y-0.5 border border-white/20 font-medium">
              Learn More
            </button>
          </div>

          {/* TRUST STATS */}
          <div className="mt-24 pt-12 border-t border-white/10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
              {[
                ["10k+", "Happy Customers"],
                ["500+", "Expert Professionals"],
                ["98%", "Satisfaction Rate"],
                ["24/7", "Customer Support"],
              ].map(([value, label]) => (
                <div key={label} className="space-y-1">
                  <div className="text-[28px] sm:text-[32px] font-semibold tracking-[-0.01em]">
                    {value}
                  </div>
                  <div className="text-xs sm:text-[13px] text-slate-400 font-medium">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
