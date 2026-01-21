"use client";

import React from "react";
import { motion } from "framer-motion";
import { Globe, Cpu, Server, Activity } from "lucide-react";

export default function DashboardOverview() {
  return (
    <div className="max-w-7xl mx-auto px-6">
      <header className="mb-12">
        <h1 className="text-4xl md:text-6xl font-black text-white">
          System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Pulse</span>
        </h1>
        <p className="text-gray-500 mt-2 font-medium">Hello Nirob, here is your project status for Choice Technology.</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        {[
          { label: "Active Sites", val: "02", icon: <Globe className="text-cyan-400" /> },
          { label: "Server Health", val: "99.9%", icon: <Server className="text-green-400" /> },
          { label: "CPU Usage", val: "12%", icon: <Cpu className="text-purple-400" /> },
          { label: "Requests", val: "1.2k", icon: <Activity className="text-blue-400" /> },
        ].map((stat, i) => (
          <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-[2rem] hover:border-cyan-500/30 transition-all">
            <div className="mb-4">{stat.icon}</div>
            <p className="text-gray-500 text-[10px] uppercase font-bold tracking-widest">{stat.label}</p>
            <h2 className="text-3xl font-black mt-1">{stat.val}</h2>
          </div>
        ))}
      </div>

      {/* Project Tracking List */}
      <div className="bg-white/[0.02] border border-white/10 rounded-[3rem] p-8 md:p-12">
        <h3 className="text-2xl font-bold mb-8">Ongoing Deployments</h3>
        
        <div className="space-y-8">
          {[
            { name: "Personal Portfolio", type: "MERN Stack", progress: 85, status: "Coding" },
            { name: "Freshness Grocery", type: "Next.js E-com", progress: 40, status: "Design" }
          ].map((project, idx) => (
            <div key={idx} className="group">
              <div className="flex justify-between items-end mb-4">
                <div>
                  <h4 className="text-xl font-bold group-hover:text-cyan-400 transition-colors">{project.name}</h4>
                  <p className="text-gray-500 text-xs uppercase font-bold tracking-widest mt-1">{project.type}</p>
                </div>
                <div className="text-right">
                  <span className="text-cyan-400 text-xs font-black uppercase tracking-widest">{project.status}</span>
                  <p className="text-white font-black text-xl">{project.progress}%</p>
                </div>
              </div>
              <div className="h-3 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: `${project.progress}%` }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(34,211,238,0.5)]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}