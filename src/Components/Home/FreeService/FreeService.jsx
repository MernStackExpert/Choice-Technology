import React from "react";
import FreeServiceContent from "./FreeServiceContent";

export default function FreeService() {
  return (
    <section id="free-services" className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <FreeServiceContent />
      </div>
    </section>
  );
}