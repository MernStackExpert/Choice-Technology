"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Mail, MessageSquare } from "lucide-react";

export default function NewsletterContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
      
      {/* --- Text Content --- */}
      <div className="space-y-6 text-center lg:text-left">
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-4xl md:text-5xl font-black text-white leading-tight"
        >
          Let’s Build Something <br />
          <span className="text-cyan-400 italic">Extraordinary</span>
        </motion.h2>
        <p className="text-gray-400 text-lg">
          Subscribe to our newsletter for tech updates or drop a message to start your project.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          <div className="flex items-center gap-3 px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-gray-300">
            <Mail className="w-5 h-5 text-cyan-400" />
            <span className="text-sm font-medium">info@choicetech.com</span>
          </div>
        </div>
      </div>

      {/* --- Newsletter & Contact Form --- */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        className="relative group"
      >
        {/* Glass Box */}
        <div className="relative z-10 bg-white/[0.03] backdrop-blur-2xl border border-white/10 p-8 md:p-10 rounded-[40px] shadow-2xl overflow-hidden">
          
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Your Email</label>
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message (Optional)</label>
              <textarea 
                rows="3"
                placeholder="Briefly describe your project..."
                className="w-full px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-600 resize-none"
              ></textarea>
            </div>

            <button className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-cyan-500/20 cursor-pointer">
              <Send className="w-5 h-5" />
              Subscribe & Connect
            </button>
          </form>

          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-3xl -z-10" />
        </div>
      </motion.div>

    </div>
  );
}