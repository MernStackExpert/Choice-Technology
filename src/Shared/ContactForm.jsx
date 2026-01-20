"use client";

import React from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Send, User, BookOpen, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    toast.success("Message received! The Choice Technology team will respond shortly.");
    reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      className="relative group p-[1px] rounded-[3rem] overflow-hidden shadow-2xl"
    >
      <div 
        className="absolute inset-[-100%] animate-[spin_4s_linear_infinite] opacity-30 group-hover:opacity-100 transition-opacity"
        style={{ 
          background: `conic-gradient(from 0deg, #22d3ee 0%, #3b82f6 25%, #a855f7 50%, #4ade80 75%, #22d3ee 100%)` 
        }} 
      />

      <div className="relative z-10 bg-[#0a0a0a]/95 backdrop-blur-3xl p-8 md:p-12 rounded-[2.9rem] border border-white/5">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="text"
                  {...register("name", { required: true })}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium"
                />
              </div>
              {errors.name && <p className="text-red-500 text-[10px] uppercase font-bold ml-2 tracking-tighter text-right">Required</p>}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
                <input
                  type="email"
                  {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium"
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] uppercase font-bold ml-2 tracking-tighter text-right">Required</p>}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Subject</label>
            <div className="relative">
              <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" size={18} />
              <input
                type="text"
                {...register("subject", { required: true })}
                placeholder="Project Inquiry"
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium"
              />
            </div>
            {errors.subject && <p className="text-red-500 text-[10px] uppercase font-bold ml-2 tracking-tighter text-right">Required</p>}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">Message Description</label>
            <div className="relative">
              <MessageSquare className="absolute left-4 top-5 text-gray-600" size={18} />
              <textarea
                rows="4"
                {...register("message", { required: true })}
                placeholder="Tell us about your project..."
                className="w-full pl-12 pr-6 py-4 bg-white/5 border border-white/10 rounded-2xl text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-700 resize-none text-sm font-medium"
              ></textarea>
            </div>
            {errors.message && <p className="text-red-500 text-[10px] uppercase font-bold ml-2 tracking-tighter text-right">Required</p>}
          </div>

          <motion.button
            type="submit"
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
  );
}