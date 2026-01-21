"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { Mail, Send, User, BookOpen, MessageSquare } from "lucide-react";
import toast from "react-hot-toast";
import axiosInstance from "@/utils/axiosInstance";

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange"
  });

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const response = await axiosInstance.post("/contact", data);

      if (response.status === 200 || response.status === 201) {
        toast.success(
          "Message received! The Choice Technology team will respond shortly."
        );
        reset();
      }
    } catch (error) {
      console.error("Contact Error:", error);
      toast.error(
        error.response?.data?.message ||
          "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
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
          background: `conic-gradient(from 0deg, #22d3ee 0%, #3b82f6 25%, #a855f7 50%, #4ade80 75%, #22d3ee 100%)`,
        }}
      />

      <div className="relative z-10 bg-[#0a0a0a]/95 backdrop-blur-3xl p-8 md:p-12 rounded-[2.9rem] border border-white/5">
        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Full Name
              </label>
              <div className="relative">
                <User
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.name ? 'text-red-500' : 'text-gray-600'}`}
                  size={18}
                />
                <input
                  type="text"
                  {...register("name", { 
                    required: "Name is required",
                    minLength: { value: 3, message: "Minimum 3 characters" }
                  })}
                  placeholder="John Doe"
                  className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.name ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium`}
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-[10px] uppercase font-bold ml-2 tracking-tighter">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.email ? 'text-red-500' : 'text-gray-600'}`}
                  size={18}
                />
                <input
                  type="email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: "Invalid email address"
                    }
                  })}
                  placeholder="john@example.com"
                  className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-[10px] uppercase font-bold ml-2 tracking-tighter">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
              Subject
            </label>
            <div className="relative">
              <BookOpen
                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors ${errors.subject ? 'text-red-500' : 'text-gray-600'}`}
                size={18}
              />
              <input
                type="text"
                {...register("subject", { required: "Subject is required" })}
                placeholder="Project Inquiry"
                className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.subject ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-700 text-sm font-medium`}
              />
            </div>
            {errors.subject && (
              <p className="text-red-500 text-[10px] uppercase font-bold ml-2 tracking-tighter">
                {errors.subject.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-gray-500 uppercase tracking-widest ml-1">
              Message Description
            </label>
            <div className="relative">
              <MessageSquare
                className={`absolute left-4 top-5 transition-colors ${errors.message ? 'text-red-500' : 'text-gray-600'}`}
                size={18}
              />
              <textarea
                rows="4"
                {...register("message", { 
                  required: "Message is required",
                  minLength: { value: 10, message: "Minimum 10 characters" }
                })}
                placeholder="Tell us about your project..."
                className={`w-full pl-12 pr-6 py-4 bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-2xl text-white focus:outline-none focus:border-purple-500/50 transition-all placeholder:text-gray-700 resize-none text-sm font-medium`}
              ></textarea>
            </div>
            {errors.message && (
              <p className="text-red-500 text-[10px] uppercase font-bold ml-2 tracking-tighter">
                {errors.message.message}
              </p>
            )}
          </div>

          <motion.button
            type="submit"
            disabled={isSubmitting}
            whileHover={!isSubmitting ? { scale: 1.02 } : {}}
            whileTap={!isSubmitting ? { scale: 0.98 } : {}}
            className={`w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold rounded-2xl flex items-center justify-center gap-3 transition-all shadow-xl shadow-cyan-500/20 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer group-hover:shadow-cyan-500/40'}`}
          >
            {isSubmitting ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
            )}
            {isSubmitting ? <span>Sending Message <span className="loading loading-dots loading-xs"></span></span> : "Send Message"}
          </motion.button>
        </form>
      </div>
    </motion.div>
  );
}