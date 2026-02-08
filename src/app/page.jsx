"use client";

import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import SequenceScroll from "@/components/SequenceScroll";
import AboutSection from "@/components/AboutSection";
import BentoGrid from "@/components/BentoGrid";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { useEffect, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Force scroll to top on reload
    window.scrollTo(0, 0);
  }, []);

  return (
    <SmoothScroll>
      <Preloader isLoading={isLoading} />
      <Navbar />

      <main className="bg-[#0a0a0a] min-h-screen">
        <SequenceScroll onLoad={() => setIsLoading(false)} />

        <div className="relative z-10 -mt-[100vh] bg-[#0a0a0a] rounded-t-[3rem] overflow-hidden shadow-2xl">
          <AboutSection />
          <BentoGrid />
          <Stats />
          <Testimonials />
          <CTA />
          <Footer />
        </div>
      </main>
    </SmoothScroll>
  );
}
