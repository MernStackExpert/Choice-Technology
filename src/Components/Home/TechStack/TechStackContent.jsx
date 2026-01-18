"use client";

import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Database, Wrench, Layers, Zap, Lock, CreditCard } from "lucide-react";
import { 
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaGitAlt, FaGithub, FaBootstrap, FaSass 
} from 'react-icons/fa';
import { 
  SiNextdotjs, SiTailwindcss, SiDaisyui, SiExpress, SiJsonwebtokens, SiMongodb, SiPostman, SiFirebase, SiNetlify, SiVercel, 
  SiAxios, SiReactquery, SiCloudinary, SiFramer, SiRedux, SiTypescript, SiClerk, SiStripe, SiSocketdotio, SiFigma, SiThreedotjs, SiReacthookform, SiZod, SiPassport 
} from 'react-icons/si';
import { TbApi, TbBrandVscode } from 'react-icons/tb';

const skillCategories = [
  {
    title: "Frontend Mastery",
    icon: <Code2 />,
    color: "#22d3ee",
    skills: [
      { name: "JavaScript", icon: <FaJs className="text-yellow-400" /> },
      { name: "TypeScript", icon: <SiTypescript className="text-blue-600" /> },
      { name: "React.js", icon: <FaReact className="text-cyan-400" /> },
      { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "HTML5", icon: <FaHtml5 className="text-orange-500" /> },
      { name: "CSS3", icon: <FaCss3Alt className="text-blue-500" /> },
      { name: "Tailwind", icon: <SiTailwindcss className="text-cyan-300" /> },
      { name: "Sass", icon: <FaSass className="text-pink-400" /> },
      { name: "Redux Toolkit", icon: <SiRedux className="text-purple-500" /> },
      { name: "React Hook Form", icon: <SiReacthookform className="text-pink-500" /> },
      { name: "Zod", icon: <SiZod className="text-blue-500" /> },
    ]
  },
  {
    title: "Backend & Payments",
    icon: <Server />,
    color: "#4ade80",
    skills: [
      { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
      { name: "Express.js", icon: <SiExpress className="text-white" /> },
      { name: "SSLCommerz", icon: <CreditCard className="text-blue-400" /> },
      { name: "Stripe", icon: <SiStripe className="text-purple-400" /> },
      { name: "Socket.io", icon: <SiSocketdotio className="text-white" /> },
      { name: "REST API", icon: <TbApi className="text-yellow-400" /> },
      { name: "Axios", icon: <SiAxios className="text-purple-300" /> },
      { name: "TanStack Query", icon: <SiReactquery className="text-red-400" /> },
    ]
  },
  {
    title: "AUTH Systems",
    icon: <Lock />,
    color: "#f87171",
    skills: [
      { name: "JWT", icon: <SiJsonwebtokens className="text-pink-500" /> },
      { name: "Firebase Auth", icon: <SiFirebase className="text-yellow-500" /> },
      { name: "Clerk Auth", icon: <SiClerk className="text-blue-400" /> },
      { name: "NextAuth.js", icon: <SiNextdotjs className="text-white" /> },
      { name: "Passport.js", icon: <SiPassport className="text-green-400" /> },
    ]
  },
  {
    title: "Database & Cloud",
    icon: <Database />,
    color: "#facc15",
    skills: [
      { name: "MongoDB", icon: <SiMongodb className="text-green-500" /> },
      { name: "Mongoose", icon: <Database className="text-red-500" /> },
      { name: "Cloudinary", icon: <SiCloudinary className="text-blue-400" /> },
      { name: "Vercel", icon: <SiVercel className="text-white" /> },
      { name: "Netlify", icon: <SiNetlify className="text-teal-400" /> },
    ]
  },
  {
    title: "Motion & 3D",
    icon: <Zap />,
    color: "#a855f7",
    skills: [
      { name: "Three.js", icon: <SiThreedotjs className="text-white" /> },
      { name: "Framer Motion", icon: <SiFramer className="text-purple-500" /> },
      { name: "AOS", icon: <Layers className="text-cyan-400" /> },
      { name: "DaisyUI", icon: <SiDaisyui className="text-yellow-200" /> },
    ]
  },
  {
    title: "Tools & Git",
    icon: <Wrench />,
    color: "#f472b6",
    skills: [
      { name: "Git", icon: <FaGitAlt className="text-red-500" /> },
      { name: "GitHub", icon: <FaGithub className="text-white" /> },
      { name: "VS Code", icon: <TbBrandVscode className="text-blue-500" /> },
      { name: "Postman", icon: <SiPostman className="text-orange-400" /> },
      { name: "Figma", icon: <SiFigma className="text-pink-400" /> },
    ]
  }
];

const allSkills = skillCategories.flatMap(cat => cat.skills);

export default function TechStackContent() {
  return (
    <div className="space-y-24">
      <header className="text-center space-y-4">
        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} className="text-4xl md:text-6xl font-extrabold text-white">
          Technical <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent italic">Arsenal</span>
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-3xl mx-auto">
          Built on the MERN stack. Powering high-performance web applications with modern tools.
        </p>
      </header>

      <div className="relative flex overflow-hidden py-12 border-y border-white/5 bg-white/[0.02] backdrop-blur-md">
        <motion.div animate={{ x: [0, -3000] }} transition={{ duration: 50, repeat: Infinity, ease: "linear" }} className="flex whitespace-nowrap gap-10 items-center">
          {[...allSkills, ...allSkills].map((skill, i) => (
            <div key={i} className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
              <span className="text-2xl">{skill.icon}</span>
              <span className="text-slate-300 font-bold uppercase tracking-widest text-[10px] md:text-xs">{skill.name}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {skillCategories.map((category, index) => (
          <div key={index} className="group relative p-[2px] rounded-3xl overflow-hidden active:scale-95 transition-transform duration-300">
            
            <div 
              className="absolute inset-[-1000%] animate-[spin_4s_linear_infinity] opacity-40 group-hover:opacity-100 transition-opacity duration-500"
              style={{
                background: `conic-gradient(from 0deg, transparent 0%, transparent 40%, ${category.color} 50%, transparent 60%, transparent 100%)`
              }}
            />

            <div className="relative z-20 h-full w-full bg-[#0a0a0a]/95 backdrop-blur-2xl p-8 rounded-[22px]">
              <div className="flex items-center gap-4 mb-8 border-b border-white/5 pb-4">
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="p-3 bg-white/5 rounded-xl text-2xl"
                  style={{ color: category.color }}
                >
                  {category.icon}
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight">{category.title}</h3>
              </div>

              <div className="flex flex-wrap gap-3">
                {category.skills.map((skill, idx) => (
                  <motion.div 
                    key={idx}
                    whileHover={{ y: -5, scale: 1.05, backgroundColor: "rgba(255,255,255,0.08)" }}
                    animate={category.title === "Motion & 3D" ? { 
                      rotate: [0, 5, -5, 0],
                      scale: [1, 1.05, 1]
                    } : {}}
                    transition={category.title === "Motion & 3D" ? { 
                      duration: 4 + idx, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    } : {}}
                    className="flex items-center gap-2 px-3 py-2 bg-white/5 border border-white/10 rounded-xl transition-all"
                  >
                    <span className="text-lg md:text-xl">{skill.icon}</span>
                    <span className="text-slate-400 text-[10px] md:text-xs font-bold">{skill.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}