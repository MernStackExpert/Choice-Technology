import React from "react";
import NodeTrackerContent from "./NodeTrackerContent";

export default function NodeTracker() {
  return (
    <section className="relative z-10 py-12">
      <div className="flex flex-col mb-10">
        <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
          Active <span className="text-cyan-400">Nodes</span>
        </h2>
        <div className="h-1 w-20 bg-gradient-to-r from-cyan-500 to-transparent mt-2" />
      </div>
      <NodeTrackerContent />
    </section>
  );
}