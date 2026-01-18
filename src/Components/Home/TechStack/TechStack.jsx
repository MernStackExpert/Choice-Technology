import React from "react";
import TechStackContent from "./TechStackContent";

export default function TechStack() {
  return (
    <section id="skills" className="relative z-10 py-24 px-4 md:px-6 overflow-hidden w-full max-w-xl md:max-w-3xl lg:max-w-7xl mx-auto">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="">
        <TechStackContent />
      </div>
    </section>
  );
}