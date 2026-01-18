"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Layout, Box, Globe, Cpu, Server } from "lucide-react";

const services = [
  {
    title: "Web Development",
    description: "Building high-performance MERN stack and Next.js applications tailored to your business.",
    icon: <Code2 className="text-cyan-400" size={32} />,
    color: "#22d3ee",
  },
  {
    title: "UI/UX Design",
    description: "Creating modern, user-centric interfaces that provide seamless digital experiences.",
    icon: <Layout className="text-blue-500" size={32} />,
    color: "#3b82f6",
  },
  {
    title: "3D Web Solutions",
    description: "Integrating immersive 3D elements and animations using Three.js and GSAP.",
    icon: <Box className="text-purple-500" size={32} />,
    color: "#a855f7",
  },
  {
    title: "Full Stack Solutions",
    description: "End-to-end scalable architecture and database management for robust systems.",
    icon: <Server className="text-green-400" size={32} />,
    color: "#4ade80",
  },
  {
    title: "SEO Optimization",
    description: "Optimizing your website to rank higher on search engines and attract more traffic.",
    icon: <Globe className="text-pink-500" size={32} />,
    color: "#ec4899",
  },
  {
    title: "IT Consulting",
    description: "Expert advice on scaling your technical infrastructure and choosing the right stack.",
    icon: <Cpu className="text-yellow-400" size={32} />,
    color: "#eab308",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        <header className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-extrabold text-white mb-6"
          >
            Our <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">Premium Services</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-gray-400 max-w-2xl mx-auto text-lg"
          >
            Cutting-edge digital solutions designed for high performance and global scalability.
          </motion.p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-[2px] rounded-2xl overflow-hidden bg-white/5 active:scale-95 transition-transform"
            >
              {/* Rotating Border Effect */}
              <div 
                className="absolute inset-[-1000%] animate-[spin_5s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity"
                style={{
                  background: `conic-gradient(from 0deg, transparent 0%, transparent 30%, ${service.color} 50%, transparent 70%, transparent 100%)`
                }}
              />

              <div className="relative z-20 h-full w-full bg-[#0a0a0a]/90 backdrop-blur-2xl p-8 rounded-[14px] flex flex-col items-center lg:items-start">
                
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10"
                >
                  {service.icon}
                </motion.div>
                
                <motion.h3 
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.2 }}
                  className="text-2xl font-bold text-white mb-4 tracking-tight group-hover:text-cyan-400 transition-colors"
                >
                  {service.title}
                </motion.h3>
                
                <motion.p 
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
                  className="text-gray-400 leading-relaxed text-center lg:text-left font-light"
                >
                  {service.description}
                </motion.p>

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}