"use client";

import React from "react";
import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Cpu, 
  Layers, 
  Rocket, 
  ShieldCheck, 
  Users, 
  Zap, 
  Globe 
} from "lucide-react";
import Link from "next/link";

const expertise = [
  {
    title: "Next-Gen Architecture",
    desc: "We leverage Next.js 15 and React 19 to build SEO-friendly, blazing-fast applications that rank higher and perform better.",
    icon: <Cpu className="text-cyan-400" />,
    color: "#22d3ee"
  },
  {
    title: "Immersive 3D Experiences",
    desc: "By integrating Three.js and GSAP, we create websites that aren't just tools, but interactive digital journeys.",
    icon: <Layers className="text-purple-500" />,
    color: "#a855f7"
  },
  {
    title: "Secure Scalability",
    desc: "Our MERN stack solutions are designed with enterprise-grade security and the ability to scale as your users grow.",
    icon: <ShieldCheck className="text-green-400" />,
    color: "#4ade80"
  }
];

export default function AboutClient() {
  return (
    <section className="relative z-10 py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 mb-6"
          >
            <span className="h-[2px] w-12 bg-cyan-500"></span>
            <span className="text-cyan-400 font-mono tracking-widest uppercase text-sm">Founded on Innovation</span>
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-8xl font-black text-white leading-tight mb-8"
          >
            Empowering the <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Future.</span>
          </motion.h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-400 text-xl leading-relaxed font-light"
            >
              Choice Technology is more than just a development agency; we are your strategic technology partner. Based on a foundation of cutting-edge MERN stack expertise, we bridge the gap between complex business logic and stunning visual storytelling.
            </motion.p>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-gray-500 text-lg leading-relaxed"
            >
              Our mission is to democratize high-end technology. Whether through our managed subscription models for small businesses or bespoke enterprise architectures, we ensure that every brand has access to a premium digital presence.
            </motion.p>
          </div>
        </header>

        {/* The Choice Technology Advantage */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-40">
          {expertise.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="relative group p-8 rounded-3xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-all"
            >
              <div className="mb-6 p-4 w-fit bg-white/5 rounded-2xl text-3xl group-hover:scale-110 transition-transform" style={{ color: item.color }}>
                {item.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Specialized Business Model Details */}
        <div className="bg-[#0d0d0d]/40 border border-white/5 rounded-[3rem] p-12 md:p-20 mb-40 backdrop-blur-xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">How We Work</h2>
              <ul className="space-y-6">
                {[
                  { t: "Customized Builds", d: "Tailored to your specific industry needs using Next.js." },
                  { t: "Subscription Excellence", d: "Continuous maintenance and hosting at a competitive $5/mo rate." },
                  { t: "Partnership Growth", d: "We invest in your vision as technical equity partners." },
                  { t: "Global Standards", d: "Performance and SEO optimized for a global audience." }
                ].map((feature, i) => (
                  <li key={i} className="flex gap-4">
                    <CheckCircle2 className="text-cyan-500 shrink-0" size={24} />
                    <div>
                      <h4 className="text-white font-bold">{feature.t}</h4>
                      <p className="text-gray-500 text-sm">{feature.d}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-purple-500/20 flex items-center justify-center border border-white/10">
              <div className="text-center p-10">
                <Globe className="mx-auto text-cyan-400 mb-6 animate-pulse" size={80} />
                <h3 className="text-2xl font-bold text-white mb-2">Global Presence</h3>
                <p className="text-gray-400 text-sm italic">Delivering digital excellence across borders, powered by modern infrastructure.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Vision CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          className="text-center pb-24"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white mb-10 leading-tight">
            Building the next <br /> 
            chapter of your brand.
          </h2>
          <Link href="/start-us" className="px-12 py-5 bg-white text-black rounded-full font-black text-lg hover:bg-cyan-400 hover:scale-105 transition-all cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.1)]">
            Start a Project with Choice Technology
          </Link>
        </motion.div>

      </div>
    </section>
  );
}