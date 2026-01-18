"use client";

import React from "react";
import { motion } from "framer-motion";
import { Search, PenTool, Code, Rocket, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Discovery & Planning",
    desc: "We analyze your requirements and create a strategic roadmap for the project.",
    icon: <Search className="text-cyan-400" size={30} />,
    color: "from-cyan-500"
  },
  {
    title: "UI/UX & 3D Design",
    desc: "Crafting modern, interactive, and visually stunning prototypes for your brand.",
    icon: <PenTool className="text-purple-400" size={30} />,
    color: "from-purple-500"
  },
  {
    title: "Development",
    desc: "Writing clean, high-performance code using Next.js and MERN stack technologies.",
    icon: <Code className="text-blue-400" size={30} />,
    color: "from-blue-500"
  },
  {
    title: "Quality Assurance",
    desc: "Rigorous testing to ensure your product is bug-free and optimized for SEO.",
    icon: <CheckCircle className="text-green-400" size={30} />,
    color: "from-green-500"
  },
  {
    title: "Launch & Support",
    desc: "Deploying the project to production and providing ongoing technical assistance.",
    icon: <Rocket className="text-orange-400" size={30} />,
    color: "from-orange-500"
  }
];

export default function ProcessContent() {
  return (
    <div className="space-y-20">
      <header className="text-center space-y-4">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-extrabold text-white"
        >
          Our Working <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Process</span>
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          From concept to execution, we follow a streamlined path to ensure your digital success.
        </p>
      </header>

      <div className="relative grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
        {/* Connecting Line (Desktop Only) */}
        <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent hidden lg:block z-0" />

        {steps.map((step, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.15 }}
            className="group relative flex flex-col items-center text-center z-10"
          >
            {/* Step Number with Rotating Border */}
            <div className="relative p-[1px] rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
              <div className={`absolute inset-0 rounded-full animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,var(--tw-gradient-from),transparent)] ${step.color} opacity-40`} />
              
              <div className="relative bg-[#0a0a0a] w-20 h-20 rounded-full flex items-center justify-center border border-white/5 backdrop-blur-xl">
                <span className="absolute -top-2 -right-2 w-8 h-8 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-xs font-bold text-cyan-400 backdrop-blur-3xl">
                  0{index + 1}
                </span>
                <motion.div
                  animate={{ rotateY: [0, 360] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
                >
                  {step.icon}
                </motion.div>
              </div>
            </div>

            <h3 className="text-white font-bold text-xl mb-3 group-hover:text-cyan-400 transition-colors">
              {step.title}
            </h3>
            <p className="text-gray-500 text-sm leading-relaxed px-4">
              {step.desc}
            </p>

            {/* Subtle floating glow effect */}
            <motion.div 
              animate={{ opacity: [0.1, 0.3, 0.1] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className={`absolute -bottom-4 w-16 h-4 blur-xl rounded-full bg-gradient-to-r ${step.color} to-transparent`}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
}