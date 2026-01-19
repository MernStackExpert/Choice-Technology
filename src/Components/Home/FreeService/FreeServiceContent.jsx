"use client";

import React from "react";
import { motion } from "framer-motion";
import { Gift, Search, Gauge, LayoutTemplate, MessageCircle } from "lucide-react";

const freeOffers = [
  {
    title: "Free SEO Audit",
    desc: "We will analyze your website's SEO and provide a detailed improvement report.",
    icon: <Search className="text-cyan-400" />,
    color: "#22d3ee"
  },
  {
    title: "Performance Check",
    desc: "Get a full report on your site's speed and core web vitals performance.",
    icon: <Gauge className="text-green-400" />,
    color: "#4ade80"
  },
  {
    title: "UI/UX Consultation",
    desc: "A 15-minute expert review of your current website design and user flow.",
    icon: <LayoutTemplate className="text-purple-400" />,
    color: "#a855f7"
  },
  {
    title: "Technical Support",
    desc: "First-time technical consultation for your MERN stack project ideas.",
    icon: <MessageCircle className="text-pink-400" />,
    color: "#f472b6"
  }
];

export default function FreeServiceContent() {
  return (
    <div className="space-y-16">
      <header className="text-center space-y-4">
        <motion.div 
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-cyan-400 text-xs font-bold uppercase tracking-widest"
        >
          <Gift size={16} /> Exclusive Trial
        </motion.div>
        <h2 className="text-4xl md:text-6xl font-black text-white">
          Try Before You <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Commit</span>
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Experience our expertise for free. Choose a service below to start your digital transformation journey today.
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {freeOffers.map((offer, i) => (
          <motion.div
            key={i}
            whileHover={{ y: -10 }}
            className="group relative p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden transition-all duration-500"
          >
            {/* Animated Glow Background */}
            <div 
              className="absolute -top-24 -right-24 w-48 h-48 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity"
              style={{ backgroundColor: offer.color }}
            />

            <div className="relative z-10 space-y-6 text-center lg:text-left">
              <div className="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-3xl mx-auto lg:mx-0 group-hover:scale-110 transition-transform duration-500">
                {offer.icon}
              </div>
              <h3 className="text-xl font-bold text-white tracking-tight">{offer.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{offer.desc}</p>
              
              <button 
                className="mt-4 text-xs font-bold uppercase tracking-tighter transition-all"
                style={{ color: offer.color }}
              >
                Claim Now →
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}