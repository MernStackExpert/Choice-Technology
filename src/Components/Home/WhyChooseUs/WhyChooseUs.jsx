import React from "react";
import WhyChooseUsContent from "./WhyChooseUsContent";

export default function WhyChooseUs() {
  return (
    <section className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <WhyChooseUsContent />
      </div>
    </section>
  );
}