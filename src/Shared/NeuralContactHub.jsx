"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Phone, Mail, X, MessageCircleMore} from "lucide-react";

const NeuralContactHub = () => {
  const [isOpen, setIsOpen] = useState(false);

  const contactOptions = [
    {
      icon: <MessageCircle size={20} />,
      label: "WhatsApp",
      href: "https://wa.me/8801908716502?text=Hello Arshe Technology!",
      color: "hover:text-emerald-400",
      shadow: "shadow-emerald-500/20",
    },
    {
      icon: <Phone size={20} />,
      label: "Call",
      href: "tel:+8801908716502",
      color: "hover:text-blue-400",
      shadow: "shadow-blue-500/20",
    },
    {
      icon: <Mail size={20} />,
      label: "Email",
      href: "mailto:hellochoicetechnology@gmail.com",
      color: "hover:text-cyan-400",
      shadow: "shadow-cyan-500/20",
    },
  ];

  return (
    <div className="fixed bottom-8 right-8 z-[9999] flex flex-col items-center gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.8 }}
            className="flex flex-col gap-3 mb-2"
          >
            {contactOptions.map((option, index) => (
              <motion.a
                key={index}
                href={option.href}
                target={option.label === "WhatsApp" ? "_blank" : "_self"}
                rel="noreferrer"
                whileHover={{ scale: 1.1, x: -5 }}
                className={`w-12 h-12 bg-black/60 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center justify-center text-gray-400 ${option.color} transition-all shadow-xl ${option.shadow} group relative`}
              >
                {option.icon}
                <span className="absolute right-16 px-3 py-1 bg-black/80 border border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-2xl">
                  {option.label}
                </span>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative group">
        {!isOpen && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-[1.5rem] -z-10"
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-[2px] bg-gradient-to-r from-cyan-500 via-transparent to-purple-500 rounded-[1.6rem] opacity-70 blur-[1px]"
            />
          </>
        )}

        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          animate={!isOpen ? { y: [0, -6, 0] } : {}}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          className={`w-14 h-14 rounded-[1.5rem] flex items-center justify-center transition-all shadow-2xl cursor-pointer relative overflow-hidden group border ${
            isOpen
              ? "bg-cyan-500 text-black border-cyan-400 scale-90 opacity-100"
              : "bg-[#0a0a0a]/80 text-cyan-400 border-cyan-500/50 opacity-80 hover:opacity-100"
          }`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent group-hover:opacity-100 transition-opacity" />
          {isOpen ? (
            <X size={24} />
          ) : (
            <MessageCircleMore size={24} className="animate-pulse" />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default NeuralContactHub;
