"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Box, LayoutDashboard, Zap, Settings, LogOut, Menu, X } from "lucide-react";

export default function ClusterNavbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/my-cluster/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Instances", path: "/my-cluster/instances", icon: <Zap size={18} /> },
    { name: "Settings", path: "/my-cluster/settings", icon: <Settings size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-4 md:py-6">
      {/* Animated Rotating Border Container */}
      <div className="relative max-w-7xl mx-auto p-[1.5px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group">
        
        {/* Border Animation Effect */}
        <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#22d3ee,#a855f7,transparent,transparent)] opacity-60 group-hover:opacity-100 transition-opacity" />

        {/* Navbar Inner Body */}
        <div className="relative flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-[1.95rem] md:rounded-[2.45rem] px-6 md:px-8 py-3 md:py-4 z-10">
          
          <Link href="/my-cluster" className="flex items-center gap-3 group">
            <div className="p-2 bg-cyan-500 rounded-xl group-hover:rotate-12 transition-transform">
              <Box size={22} className="text-black" />
            </div>
            <span className="font-black text-lg md:text-xl tracking-tighter uppercase text-white">
              MY <span className="text-cyan-400">CLUSTER</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-3">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <div className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all cursor-pointer text-sm font-bold ${
                  pathname === link.path ? "bg-white text-black shadow-lg" : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            ))}
          </div>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4">
            <div className="flex flex-col items-end border-r border-white/10 pr-4">
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest leading-none mb-1">Node Active</span>
              <span className="text-xs font-bold text-gray-400 leading-none">Rajshahi-BD</span>
            </div>
            <button className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
              <LogOut size={20} />
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white bg-white/5 rounded-xl border border-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-28 left-4 right-4 z-50 p-[1px] rounded-[2rem] overflow-hidden"
          >
            <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#22d3ee,transparent,transparent)]" />
            
            <div className="relative bg-[#0a0a0a]/95 backdrop-blur-3xl rounded-[1.95rem] p-6 space-y-4">
              {navLinks.map((link) => (
                <Link  key={link.path} href={link.path} onClick={() => setIsOpen(false)}>
                  <div className={`flex items-center mt-3 gap-4 px-6 py-4 rounded-xl font-bold transition-all ${
                    pathname === link.path ? "bg-cyan-500 text-black" : "text-gray-400 bg-white/5"
                  }`}>
                    {link.icon}
                    {link.name}
                  </div>
                </Link>
              ))}
              <hr className="border-white/5" />
              <button className="w-full flex items-center justify-center gap-3 py-4 text-red-500 bg-red-500/10 rounded-xl font-bold">
                <LogOut size={20} /> Logout
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}