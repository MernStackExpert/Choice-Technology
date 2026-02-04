import React from "react";
import { Cpu, Terminal } from "lucide-react";

const ArsheBrandLogo = () => {
  return (
    <div className="flex items-center gap-3 group select-none">
      <div className="relative">
        <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full animate-pulse" />
        <div className="relative w-12 h-12 bg-black/40 backdrop-blur-md border border-cyan-500/30 rounded-2xl flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-transparent" />
          <Cpu className="text-cyan-400 group-hover:rotate-90 transition-transform duration-500" size={24} />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tighter text-white uppercase italic">
            Arshe
            <span className="text-cyan-500 not-italic">.</span>
          </span>
          <div className="h-[2px] w-8 bg-gradient-to-r from-cyan-500 to-transparent mt-2" />
        </div>
        <div className="flex items-center gap-1.5">
          <Terminal size={10} className="text-cyan-600" />
          <span className="text-[8px] font-bold text-gray-500 uppercase tracking-[0.4em]">
            Technology_Matrix
          </span>
        </div>
      </div>
    </div>
  );
};

export default ArsheBrandLogo;