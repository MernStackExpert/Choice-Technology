"use client";

import React from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Home, ArrowLeft, TriangleAlert, MoveLeft } from "lucide-react";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center px-4 overflow-hidden relative">
      <div className="absolute inset-0 z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-4xl text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative inline-block"
        >
          <h1 className="text-[12rem] md:text-[20rem] font-black leading-none tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/10 to-transparent select-none">
            404
          </h1>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="flex flex-col items-center">
              <TriangleAlert className="text-cyan-500 w-16 h-16 md:w-24 md:h-24 mb-4 animate-pulse" />
              <h2 className="text-2xl md:text-5xl font-black text-white uppercase tracking-tighter">
                Node Not Found
              </h2>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="mt-10 space-y-6"
        >
          <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-[0.5em] max-w-md mx-auto leading-relaxed">
            The neural link you are trying to access does not exist in our cluster.
          </p>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.back()}
              className="group w-full md:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-3 text-white text-xs font-black uppercase tracking-widest hover:bg-white/10 transition-all"
            >
              <MoveLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Return Back
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => router.push("/")}
              className="w-full md:w-auto px-10 py-4 bg-cyan-600 rounded-2xl flex items-center justify-center gap-3 text-black text-xs font-black uppercase tracking-widest shadow-[0_0_30px_rgba(8,145,178,0.3)] hover:shadow-cyan-500/50 transition-all"
            >
              <Home size={18} />
              Home Base
            </motion.button>
          </div>
        </motion.div>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="h-full w-full bg-[radial-gradient(#ffffff10_1px,transparent_1px)] [background-size:40px_40px]" />
      </div>
    </div>
  );
}