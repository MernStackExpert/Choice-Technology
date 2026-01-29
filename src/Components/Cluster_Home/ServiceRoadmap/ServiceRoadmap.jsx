import React from "react";
import ServiceRoadmapContent from "./ServiceRoadmapContent";

export default function ServiceRoadmap() {
  return (
    <section className="relative z-10 py-12">
      <div className="flex flex-col mb-10 text-right items-end">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
          Service <span className="text-indigo-400">Roadmap</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-l from-indigo-500 to-transparent mt-2" />
      </div>
      <ServiceRoadmapContent />
    </section>
  );
}