"use client";

import React, { useContext } from "react";
import { AuthContext } from "@/Provider/AuthContext";
import { Bell, Search } from "lucide-react";

const DashNav = () => {
  const { dbUser, user } = useContext(AuthContext);

  return (
    <div className="h-20 px-6 md:px-8 flex items-center justify-between text-white">
      <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-cyan-500/60 uppercase tracking-widest">
        <span>Dashboard</span>
        <span>/</span>
        <span className="text-cyan-400">Overview</span>
      </div>

      <div className="flex-1 lg:flex-none flex justify-end items-center gap-4 md:gap-8">
        <div className="hidden lg:flex items-center gap-4 bg-white/5 border border-cyan-500/10 px-4 py-2 rounded-lg">
          <Search size={16} className="text-cyan-500/50" />
          <input 
            type="text" 
            placeholder="Search Protocol..." 
            className="bg-transparent border-none outline-none text-xs w-48 placeholder:text-gray-600"
          />
        </div>

        <div className="flex items-center gap-4">
          <button className="relative p-2 text-gray-400 hover:text-cyan-400 transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-cyan-500 rounded-full border border-black"></span>
          </button>
          
          <div className="flex items-center gap-3 pl-4 border-l border-cyan-500/10">
            <div className="text-right hidden sm:block">
              <p className="text-xs font-bold text-white uppercase tracking-tight">{dbUser?.name || "MD NIROB ISLAM"}</p>
              <p className="text-[9px] text-cyan-500/60 font-mono tracking-tighter uppercase">{dbUser?.role || "USER"}</p>
            </div>
            <div className="w-9 h-9 rounded-full border border-cyan-500/30 p-0.5 shadow-[0_0_15px_rgba(34,211,238,0.2)] overflow-hidden">
              <img 
                src={dbUser?.photoURL || user?.photoURL || "/default-avatar.png"} 
                alt="profile" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashNav;