import React from "react";
import MissionContent from "./MissionContent";

export default function MissionVision() {
  return (
    <section id="mission" className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-500/5 via-transparent to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto">
        <MissionContent />
      </div>
    </section>
  );
}