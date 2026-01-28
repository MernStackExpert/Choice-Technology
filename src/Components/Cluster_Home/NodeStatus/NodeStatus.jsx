import React from "react";
import NodeStatusContent from "./NodeStatusContent";

export default function NodeStatus() {
  return (
    <section className="relative z-10 py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <NodeStatusContent />
      </div>
    </section>
  );
}