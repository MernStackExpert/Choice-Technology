"use client";

import React, { useState } from "react";

import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { auth } from "@/config/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Reset link sent to your email!");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full backdrop-blur-2xl bg-white/10 border border-white/20 p-8 rounded-[2.5rem] shadow-2xl"
      >
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-white mb-2">Reset Password</h2>
          <p className="text-blue-200/50 text-sm">Enter your email to receive a recovery link</p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="relative group">
            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email Address"
              className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
            />
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? "Sending..." : "Send Link"} <Send size={18} />
          </button>
        </form>

        <Link href="/my-cluster/auth/login" className="mt-8 flex items-center justify-center gap-2 text-blue-400 text-sm hover:underline">
          <ArrowLeft size={16} /> Back to Login
        </Link>
      </motion.div>
    </div>
  );
};

export default ForgotPassword;