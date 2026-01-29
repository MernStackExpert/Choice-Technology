"use client";

import React, { useState, useContext } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Box, LayoutDashboard, Zap, Settings, LogOut, Menu, X, User } from "lucide-react";
import { AuthContext } from "@/Provider/AuthContext";

export default function ClusterNavbar() {
  const { user, signOutUser } = useContext(AuthContext);
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Dashboard", path: "/my-cluster/dashboard", icon: <LayoutDashboard size={18} /> },
    { name: "Instances", path: "/my-cluster/instances", icon: <Zap size={18} /> },
    { name: "Add Order", path: "/my-cluster/order", icon: <Zap size={18} /> },
    { name: "Settings", path: "/my-cluster/settings", icon: <Settings size={18} /> },
  ];

  const handleLogout = () => {
    signOutUser();
    setIsOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-[100] px-4 md:px-6 py-4 md:py-6">
      <div className="relative max-w-7xl mx-auto p-[1.5px] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden group">
        <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#22d3ee,#a855f7,transparent,transparent)] opacity-60 group-hover:opacity-100 transition-opacity" />

        <div className="relative flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-3xl rounded-[1.95rem] md:rounded-[2.45rem] px-6 md:px-8 py-3 md:py-4 z-10">
          
          <Link href="/my-cluster" className="flex items-center gap-3 group">
            <div className="p-2 bg-cyan-500 rounded-xl group-hover:rotate-12 transition-transform shadow-[0_0_15px_rgba(34,211,238,0.4)]">
              <Box size={22} className="text-black" />
            </div>
            <span className="font-black text-lg md:text-xl tracking-tighter uppercase text-white">
              MY <span className="text-cyan-400">CLUSTER</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-2">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <div className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl transition-all cursor-pointer text-sm font-bold ${
                  pathname === link.path 
                    ? "bg-white text-black shadow-lg scale-105" 
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}>
                  {link.icon}
                  {link.name}
                </div>
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-5">
            <div className="flex items-center gap-3 border-r border-white/10 pr-5">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest leading-none mb-1">
                  {user?.displayName || "Guest Node"}
                </span>
                <span className="text-[9px] font-bold text-gray-500 leading-none">
                  {user?.email?.length > 20 ? user.email.substring(0, 18) + "..." : user?.email}
                </span>
              </div>
              <div className="w-10 h-10 rounded-full border border-cyan-500/30 overflow-hidden bg-white/5 p-0.5">
                {user?.photoURL ? (
                  <Image 
                    src={user.photoURL} 
                    alt="Profile" 
                    width={40} 
                    height={40} 
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-cyan-400">
                    <User size={20} />
                  </div>
                )}
              </div>
            </div>
            
            <button 
              onClick={handleLogout}
              className="p-3 bg-red-500/10 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all cursor-pointer shadow-lg shadow-red-500/5"
            >
              <LogOut size={20} />
            </button>
          </div>

          <div className="md:hidden flex items-center gap-3">
             <div className="w-9 h-9 rounded-full border border-cyan-500/30 overflow-hidden">
                {user?.photoURL ? (
                  <Image src={user.photoURL} alt="Profile" width={36} height={36} className="object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-cyan-400 bg-white/5">
                    <User size={18} />
                  </div>
                )}
             </div>
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-white bg-white/5 rounded-xl border border-white/10"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="md:hidden absolute top-28 left-4 right-4 z-50 p-[1.5px] rounded-[2rem] overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-[-100%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#22d3ee,transparent,transparent)]" />
            
            <div className="relative bg-[#0a0a0a]/98 backdrop-blur-3xl rounded-[1.95rem] p-6 space-y-4">
              <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 mb-2">
                 <div className="w-12 h-12 rounded-full border border-cyan-400/50 overflow-hidden">
                    {user?.photoURL ? (
                      <Image src={user.photoURL} alt="User" width={48} height={48} className="object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-cyan-400 font-black">
                        {user?.displayName?.charAt(0) || "U"}
                      </div>
                    )}
                 </div>
                 <div className="overflow-hidden">
                    <h4 className="text-sm font-black text-white truncate">{user?.displayName}</h4>
                    <p className="text-[10px] text-gray-500 truncate">{user?.email}</p>
                 </div>
              </div>

              {navLinks.map((link) => (
                <Link key={link.path} href={link.path} onClick={() => setIsOpen(false)}>
                  <div className={`flex items-center gap-4 px-6 py-4 rounded-xl font-bold transition-all ${
                    pathname === link.path 
                      ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/20" 
                      : "text-gray-400 bg-white/5"
                  }`}>
                    {link.icon}
                    {link.name}
                  </div>
                </Link>
              ))}
              <hr className="border-white/5" />
              <button 
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-3 py-4 text-red-500 bg-red-500/10 rounded-xl font-bold active:scale-95 transition-transform"
              >
                <LogOut size={20} /> Logout Account
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}