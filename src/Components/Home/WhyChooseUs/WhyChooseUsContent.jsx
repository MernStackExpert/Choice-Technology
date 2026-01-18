"use client";

import React from "react";
import { motion } from "framer-motion";
import { ShieldCheck, Zap, Users, Clock, CheckCircle2 } from "lucide-react";

const reasons = [
  {
    title: "Expert Team",
    desc: "A dedicated group of developers and designers committed to excellence.",
    icon: <Users className="text-cyan-400" size={28} />,
  },
  {
    title: "Modern Tech Stack",
    desc: "We use Next.js, Three.js, and Tailwind for high-performance results.",
    icon: <ShieldCheck className="text-green-400" size={28} />,
  },
  {
    title: "Fast Delivery",
    desc: "Optimized workflow to ensure your project goes live on time.",
    icon: <Zap className="text-yellow-400" size={28} />,
  },
  {
    title: "Dedicated Support",
    desc: "24/7 technical support to keep your business running smoothly.",
    icon: <Clock className="text-purple-400" size={28} />,
  },
];

export default function WhyChooseUsContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      <motion.div 
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="space-y-8"
      >
        <header className="text-center lg:text-left">
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            Why Partner With <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
              Choice Technology?
            </span>
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
            We deliver more than just code. We provide scalable digital solutions 
            designed to maximize your business performance and security.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {reasons.map((item, index) => (
            <motion.div
              key={index}
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.5 }}
              className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:border-cyan-500/50 transition-colors relative overflow-hidden"
            >
              <div className="mb-4 relative z-10">{item.icon}</div>
              <h3 className="text-white font-bold text-xl mb-2 relative z-10">{item.title}</h3>
              <p className="text-gray-500 text-sm relative z-10 leading-relaxed">{item.desc}</p>
              
              {/* Subtle background glow on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Right Side: Animated Image/Visual */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative flex justify-center lg:justify-end"
      >
        <div className="relative p-[2px] rounded-3xl overflow-hidden group">
          {/* Constant Rotating Border Glow */}
          <div className="absolute inset-[-1000%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#22d3ee,transparent,transparent)] opacity-40 group-hover:opacity-100 transition-opacity" />
          
          <div className="relative z-10 bg-[#0a0a0a] rounded-[22px] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2070&auto=format&fit=crop" 
              alt="Choice Tech Team collaboration" 
              className="w-full h-[400px] md:h-[550px] object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 hover:scale-105"
            />
            
            {/* Overlay Info Card */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-8 left-8 right-8 p-6 bg-black/60 backdrop-blur-xl border border-white/10 rounded-2xl"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-cyan-500/20 rounded-full">
                  <CheckCircle2 className="text-cyan-400" size={24} />
                </div>
                <div>
                  <h4 className="text-white font-bold">Guaranteed Quality</h4>
                  <p className="text-gray-400 text-xs">High performance standards met.</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

    </div>
  );
}