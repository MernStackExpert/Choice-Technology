import React from "react";
import HeroContent from "./HeroContent";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen w-full flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent pointer-events-none" />
      
      <div className="px-6 lg:px-12 z-10">
        <HeroContent />
      </div>
    </section>
  );
}