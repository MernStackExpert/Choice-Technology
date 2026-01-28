"use client";

import React from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, Radio, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ClusterHeroContent({ content }) {
  const { title, highlight, subtitle, description } = content;

  return (
    <div className="flex flex-col items-center text-center">
      {/* Animated Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-10"
      >
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
        </span>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-400">
          {subtitle}
        </span>
      </motion.div>

      {/* Hero Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-none mb-10"
      >
        {title} <br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
          {highlight}
        </span>
      </motion.h1>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="max-w-2xl text-gray-400 text-lg md:text-xl font-medium leading-relaxed mb-14 italic"
      >
        {description}
      </motion.p>

      {/* Tech Indicator Icons */}
      <div className="flex gap-12 items-center justify-center">
        <TechIcon icon={<Terminal size={22} />} label="Access" delay={0.5} />
        <TechIcon icon={<Cpu size={22} />} label="Compute" delay={0.7} />
        <TechIcon icon={<Radio size={22} />} label="Pulse" delay={0.9} />
      </div>
    </div>
  );
}

const TechIcon = ({ icon, label, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="flex flex-col items-center gap-3"
  >
    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.1)]">
      {icon}
    </div>
    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
      {label}
    </span>
  </motion.div>
);