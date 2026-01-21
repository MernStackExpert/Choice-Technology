"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Zap, Shield, Activity } from "lucide-react";

export default function MyClusterLanding() {
  const features = [
    { 
      title: "Smart Instances", 
      icon: <Zap className="text-cyan-400" />, 
      desc: "Monitor all your live projects from a centralized cloud interface." 
    },
    { 
      title: "Cloud Security", 
      icon: <Shield className="text-purple-500" />, 
      desc: "Your data is protected with enterprise-grade encryption within our cluster." 
    },
    { 
      title: "Real-time Pulse", 
      icon: <Activity className="text-green-400" />, 
      desc: "Get instant live updates on server status and application performance." 
    }
  ];

  return (
    <div className="relative min-h-screen">
      <div className="max-w-7xl mx-auto w-full relative z-10 pt-44 pb-20 px-6">
        <header className="text-center mb-32">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-7xl md:text-[10rem] font-black text-white tracking-tighter leading-none mb-10"
          >
            THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">HUB</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 max-w-2xl mx-auto text-xl font-medium italic mb-14"
          >
            Everything within your Choice Technology ecosystem, unified in one powerful space.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-6"
          >
            <Link href="/my-cluster/dashboard">
              <button className="px-12 py-5 bg-white text-black rounded-[2rem] font-black text-xl flex items-center gap-3 hover:bg-cyan-400 hover:scale-105 transition-all cursor-pointer shadow-2xl">
                Enter Dashboard <ArrowRight size={24} />
              </button>
            </Link>
          </motion.div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="p-10 rounded-[3rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:bg-white/[0.05] transition-all"
            >
              <div className="mb-6 p-4 w-fit bg-white/5 rounded-2xl">
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-500 leading-relaxed font-medium">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}