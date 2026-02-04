"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Cpu,
  Activity,
  Zap,
  Terminal,
  Settings,
  Construction,
  Loader2,
  Binary,
} from "lucide-react";

export default function InstancePage() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 0));
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative overflow-hidden bg-transparent">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 blur-[150px] rounded-full animate-pulse delay-1000" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-4xl w-full backdrop-blur-3xl bg-white/[0.02] border border-white/10 rounded-[4rem] p-10 md:p-20 shadow-2xl relative z-10"
      >
        <div className="absolute top-10 right-10 flex gap-2">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.2, 1, 0.2] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.3 }}
              className="w-1.5 h-1.5 rounded-full bg-cyan-500"
            />
          ))}
        </div>

        <div className="flex flex-col items-center text-center space-y-10">
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 md:w-48 md:h-48 border-2 border-dashed border-cyan-500/30 rounded-full flex items-center justify-center"
            >
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="w-24 h-24 md:w-36 md:h-36 border-2 border-white/5 rounded-full flex items-center justify-center bg-cyan-500/5 shadow-[0_0_50px_rgba(34,211,238,0.1)]"
              >
                <Cpu className="text-cyan-400 w-10 h-10 md:w-16 md:h-16 animate-pulse" />
              </motion.div>
            </motion.div>

            <motion.div
              animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="absolute -top-2 -right-2 bg-black border border-cyan-500/30 p-2 rounded-xl"
            >
              <Settings size={14} className="text-cyan-400 animate-spin-slow" />
            </motion.div>
          </div>

          <div className="space-y-4">
            <motion.h2
              animate={{ opacity: [1, 0.8, 1] }}
              transition={{ repeat: Infinity, duration: 0.1, repeatDelay: 3 }}
              className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white"
            >
              Instance_<span className="text-cyan-500">Building</span>
            </motion.h2>
            <p className="text-[10px] md:text-xs text-gray-500 font-bold uppercase tracking-[0.5em] max-w-md mx-auto leading-relaxed">
              Establishing Neural Framework & Project_Matrix Synchronization
            </p>
          </div>

          <div className="w-full max-w-md space-y-4">
            <div className="flex justify-between items-end mb-2">
              <span className="text-[10px] font-black text-cyan-500 uppercase tracking-widest flex items-center gap-2">
                <Loader2 size={12} className="animate-spin" />{" "}
                Node_Construction: {progress}%
              </span>
              <span className="text-[10px] font-mono text-gray-600">
                RA_INST_0982
              </span>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden border border-white/5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                className="h-full bg-gradient-to-r from-cyan-600 to-blue-500 shadow-[0_0_15px_#06b6d4]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full pt-10">
            <StatusBox
              icon={<Binary size={16} />}
              label="Source_Code"
              value="Encrypting"
            />
            <StatusBox
              icon={<Zap size={16} />}
              label="Neural_Core"
              value="Optimizing"
            />
            <StatusBox
              icon={<Activity size={16} />}
              label="Grid_Link"
              value="Pending"
            />
          </div>

          <div className="flex items-center gap-4 p-6 bg-black/40 border border-white/5 rounded-[2rem] w-full max-w-lg">
            <Construction className="text-amber-500 shrink-0" size={20} />
            <p className="text-[10px] text-gray-500 text-left font-bold uppercase tracking-widest leading-relaxed">
              Arshe Technology is architecting a new node. Your latest projects
              will be synchronized upon{" "}
              <span className="text-cyan-500">Matrix_Completion</span>.
            </p>
          </div>
        </div>
      </motion.div>

      <div className="absolute bottom-10 left-10 flex flex-col gap-2 font-mono text-[8px] text-gray-700 uppercase tracking-widest">
        <p>&gt; sys_ver: 2.0.26</p>
        <p>&gt; status: build_mode_active</p>
      </div>
    </div>
  );
}

const StatusBox = ({ icon, label, value }) => (
  <div className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl flex flex-col items-center gap-2 group hover:bg-white/[0.06] transition-all">
    <div className="text-gray-600 group-hover:text-cyan-400 transition-colors">
      {icon}
    </div>
    <p className="text-[8px] font-black text-gray-600 uppercase tracking-widest">
      {label}
    </p>
    <p className="text-[10px] font-bold text-white uppercase tracking-tighter">
      {value}
    </p>
  </div>
);
