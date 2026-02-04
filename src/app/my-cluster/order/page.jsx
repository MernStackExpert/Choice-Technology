import React from "react";
import OrderContent from "./OrderContent";

// Metadata for SEO
export const metadata = {
  title: "Initialize Node | Arshe Technology",
  description: "Request a new service node in the Arshe Technology ecosystem.",
};

export default function OrderPage() {
  return (
    <main className="relative min-h-screen selection:bg-cyan-500/30 bg-[#0505059d] pt-18 max-sm:pt-5 pb-12 rounded-2xl">
      {/* Server Side Rendered Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 uppercase tracking-tighter">
          Initialize Node
        </h1>
        <p className="text-cyan-300/50 mt-2 font-mono tracking-widest text-sm">
          SECURE_ACCESS_POINT // CLUSTER_EXPANSION
        </p>
      </div>

      {/* Client Component for the Form logic */}
      <OrderContent />
    </main>
  );
}
