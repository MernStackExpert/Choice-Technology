"use client";

import React from "react";
import { motion } from "framer-motion";
import { Target, Eye, Rocket, Heart } from "lucide-react";

export default function MissionContent({ mission, vision }) {
  const data = [
    {
      title: mission?.title || "Our Mission",
      desc: mission?.description || "Loading...",
      icon: <Target className="text-cyan-400" size={32} />,
      borderColor: "after:from-cyan-500",
    },
    {
      title: vision?.title || "Our Vision",
      desc: vision?.description || "Loading...",
      icon: <Eye className="text-purple-500" size={32} />,
      borderColor: "after:from-purple-500",
    },
  ];

  return (
    <div className="space-y-16">
      <header className="text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-extrabold text-white"
        >
          Our{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
            Purpose
          </span>
        </motion.h2>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {data.map((item, index) => (
          <div
            key={index}
            className={`group relative p-[1px] rounded-3xl overflow-hidden bg-white/10 after:content-[''] after:absolute after:top-[-50%] after:left-[-50%] after:w-[200%] after:h-[200%] after:bg-[conic-gradient(transparent,transparent,transparent,var(--tw-gradient-from))] ${item.borderColor} after:animate-[spin_10s_linear_infinite]`}
          >
            <div className="relative z-20 h-full w-full bg-[#0a0a0a]/90 backdrop-blur-3xl p-10 rounded-[23px] flex flex-col items-center text-center space-y-6">
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.5,
                }}
                className="p-5 bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(255,255,255,0.05)]"
              >
                {item.icon}
              </motion.div>

              <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-cyan-400 transition-colors">
                {item.title}
              </h3>

              <p className="text-gray-400 text-lg leading-relaxed max-w-md">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        className="flex flex-wrap justify-center gap-8 pt-10"
      >
        <div className="flex items-center gap-3 text-slate-400">
          <Heart className="text-red-500" size={20} />
          <span className="font-medium">Passion Driven</span>
        </div>
        <div className="flex items-center gap-3 text-slate-400">
          <Rocket className="text-orange-500" size={20} />
          <span className="font-medium">Growth Focused</span>
        </div>
      </motion.div>
    </div>
  );
}
