"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Box, LayoutDashboard, Zap, Settings, LogOut } from "lucide-react";

export default function ClusterNavbar() {
  const pathname = usePathname();

  const navLinks = [
    { name: "Dashboard", path: "/my-cluster/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Instances", path: "/my-cluster/instances", icon: <Zap size={18} /> },
    { name: "Settings", path: "/my-cluster/settings", icon: <Settings size={18} /> },
  ];

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-6 py-6">
      <div className="max-w-7xl mx-auto flex items-center justify-between bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-8 py-4 shadow-2xl">
        
        <Link href="/my-cluster" className="flex items-center gap-3 group">
          <div className="p-2 bg-cyan-500 rounded-xl group-hover:rotate-12 transition-transform">
            <Box size={22} className="text-black" />
          </div>
          <span className="font-black text-xl tracking-tighter uppercase text-white">
            MY <span className="text-cyan-400">CLUSTER</span>
          </span>
        </Link>

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

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex flex-col items-end border-r border-white/10 pr-4">
            <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest leading-none mb-1">Node Active</span>
            <span className="text-xs font-bold text-gray-400 leading-none">Rajshahi-BD</span>
          </div>
          <button className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all cursor-pointer">
            <LogOut size={20} />
          </button>
        </div>
      </div>
    </nav>
  );
}