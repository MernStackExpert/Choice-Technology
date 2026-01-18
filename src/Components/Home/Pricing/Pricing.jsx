import React from "react";
import PricingContent from "./PricingContent";

export default function Pricing() {
  return (
    <section id="pricing" className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-purple-500/5 via-transparent to-transparent pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <PricingContent />
      </div>
    </section>
  );
}