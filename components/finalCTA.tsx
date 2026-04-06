import { ArrowRight, Shield, Clock } from "lucide-react";
import { Button } from "./ui/button";

interface FinalCTAProps {
  onScrollToServices: () => void;
}

export function FinalCTA({ onScrollToServices }: FinalCTAProps) {
  return (
    <section className="bg-gradient-to-br from-blue-900 to-[#0a1628] py-20 px-4">
      <div className="container mx-auto max-w-4xl text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to Book Your Service?
        </h2>

        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Choose a service, pick a time, and get a verified professional at your door.
          It's that simple.
        </p>

        <Button
          onClick={onScrollToServices}
          size="lg"
          className="bg-white hover:bg-gray-100 text-blue-900 px-10 py-7 text-lg mb-6"
        >
          Browse All Services
          <ArrowRight className="ml-2 h-5 w-5" />
        </Button>

        <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-300 mt-8">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-green-400" />
            <span>Pay after service completion</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-blue-400" />
            <span>Free cancellation up to 2 hours before</span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-purple-400" />
            <span>7-day service guarantee</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mt-6">
          Join 50,000+ satisfied customers across 45+ cities
        </p>
      </div>
    </section>
  );
}
