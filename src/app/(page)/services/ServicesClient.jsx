"use client";

import React from "react";
import Services from "@/Components/Home/Services/Services";
import { motion } from "framer-motion";
import PricingContent from "@/Components/Home/Pricing/PricingContent";
import Link from "next/link";

export default function ServicesClient() {
  return (
    <>
      {/* Premium Services Section */}
      <Services />

      {/* Choice Technology Business Models & Pricing */}
      <section id="pricing" className="relative z-10 py-24 px-6 overflow-hidden">
        {/* Subtle background glow to match your 3D theme */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cyan-500/5 via-transparent to-transparent pointer-events-none" />
        
        <div className="max-w-7xl mx-auto">
          <PricingContent />
        </div>
      </section>

      {/* Final Call to Action Section */}
      <section className="py-24 text-center px-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto p-12 rounded-[3rem] bg-gradient-to-b from-white/5 to-transparent border border-white/5 backdrop-blur-sm"
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6 font-sans">
            Ready to scale your digital presence?
          </h3>
          <p className="text-gray-400 mb-10 max-w-xl mx-auto">
            Whether it's a free build or a massive enterprise system, we ensure top-tier quality for Choice Technology clients.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact" className="px-10 py-4 bg-cyan-500 text-black rounded-2xl font-bold hover:bg-cyan-400 transition-all cursor-pointer shadow-[0_0_20px_rgba(34,211,238,0.3)]">
              Contact Sales
            </Link>
            <Link href="/start-us" className="px-10 py-4 border border-white/10 text-white rounded-2xl font-bold hover:bg-white/5 transition-all cursor-pointer">
              START US NOW
            </Link>
          </div>
        </motion.div>
      </section>
    </>
  );
}