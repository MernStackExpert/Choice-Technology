"use client";

import React from "react";
import { motion } from "framer-motion";
import { Zap, Code, Globe, ShieldCheck } from "lucide-react";

const stats = [
  { label: "Performance Score", value: "99%", icon: <Zap className="text-yellow-400" />, color: "#eab308" },
  { label: "Clean Code", value: "100%", icon: <Code className="text-cyan-400" />, color: "#22d3ee" },
  { label: "SEO Optimized", value: "High", icon: <Globe className="text-green-400" />, color: "#4ade80" },
  { label: "Security First", value: "Verified", icon: <ShieldCheck className="text-purple-400" />, color: "#a855f7" },
];

export default function StatsContent() {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
      {stats.map((stat, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.1 }}
          className="group relative p-[1px] rounded-2xl overflow-hidden bg-white/5"
        >
          {/* Rotating Border Effect */}
          <div 
            className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] opacity-20 group-hover:opacity-100 transition-opacity"
            style={{
              background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${stat.color} 50%, transparent 60%, transparent 100%)`
            }}
          />

          <div className="relative z-10 bg-[#0a0a0a]/90 backdrop-blur-xl p-6 flex flex-col items-center text-center rounded-[15px] border border-white/5">
            <div className="mb-4 p-3 bg-white/5 rounded-xl group-hover:scale-110 transition-transform">
              {stat.icon}
            </div>
            <h3 className="text-2xl md:text-4xl font-black text-white mb-2">{stat.value}</h3>
            <p className="text-gray-500 text-[10px] md:text-sm font-bold uppercase tracking-widest leading-tight">
              {stat.label}
            </p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}