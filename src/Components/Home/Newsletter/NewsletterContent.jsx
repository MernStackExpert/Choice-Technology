"use client";

import React from "react";
import { motion } from "framer-motion";
import { Send, Mail, User, BookOpen, MessageSquare } from "lucide-react";

export default function NewsletterContent() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
      
      {/* Left Side: Text Content */}
      <div className="space-y-8 text-center lg:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="space-y-4"
        >
          <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
            Ready to Start Your <br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent italic">
              Digital Journey?
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-md mx-auto lg:mx-0 font-light">
            Have a project in mind or just want to say hi? Feel free to reach out. I&apos;m always open to discussing new ideas and high-performance solutions.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="flex flex-col gap-4 items-center lg:items-start"
        >
          <div className="group flex items-center gap-4 px-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-gray-300 hover:border-cyan-500/50 transition-all duration-300 cursor-pointer">
            <div className="p-2 bg-cyan-500/10 rounded-lg group-hover:bg-cyan-500 group-hover:text-black transition-colors">
              <Mail size={20} />
            </div>
            <span className="text-sm font-semibold tracking-wide">hello@choicetech.com</span>
          </div>
        </motion.div>
      </div>

      {/* Right Side: Professional Contact Form */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="relative group p-[1px] rounded-[3rem] overflow-hidden"
      >
        {/* Continuous Rotating Border Animation */}
        <div className="absolute inset-[-100%] animate-[spin_8s_linear_infinite] bg-[conic-gradient(from_0deg,transparent,transparent,#22d3ee,transparent,transparent)] opacity-30 group-hover:opacity-100 transition-opacity" />

        <div className="relative z-10 bg-[#0a0a0a]/90 backdrop-blur-3xl p-8 md:p-12 rounded-[2.9rem] border border-white/5">
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    type="text" 
                    placeholder="John Doe"
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                  <input 
                    type="email" 
                    placeholder="john@example.com"
                    className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subject</label>
              <div className="relative">
                <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input 
                  type="text" 
                  placeholder="Project Inquiry"
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message Description</label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-5 text-gray-600" size={18} />
                <textarea 
                  rows="4"
                  placeholder="Tell us about your project..."
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-700 resize-none text-sm font-medium"
                ></textarea>
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-500/20 cursor-pointer group-hover:shadow-cyan-500/40"
            >
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              Send Message
            </motion.button>
          </form>
        </div>
      </motion.div>

    </div>
  );
}