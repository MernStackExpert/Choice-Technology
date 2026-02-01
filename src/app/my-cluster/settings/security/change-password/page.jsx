"use client";

import React, { useState, useContext } from "react";
import { motion } from "framer-motion";
import { Mail, ArrowLeft, Send, Loader2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { auth } from "@/config/firebase.config";
import { sendPasswordResetEmail } from "firebase/auth";
import { AuthContext } from "@/Provider/AuthContext";
import Swal from "sweetalert2";

const ChangePassword = () => {
  const { dbUser } = useContext(AuthContext);
  const [email, setEmail] = useState(dbUser?.data?.email || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendPasswordResetEmail(auth, email);
      
      Swal.fire({
        title: "Transmission Success",
        text: "A neural reset link has been dispatched to your email. Check your Inbox and Spam folders.",
        icon: "success",
        background: "#0a0a0a",
        color: "#fff",
        confirmButtonColor: "#22d3ee",
      });
      
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full backdrop-blur-3xl bg-white/[0.02] border border-white/10 p-10 rounded-[3.5rem] shadow-2xl relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl -z-10" />
        
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-cyan-500/10 rounded-2xl flex items-center justify-center text-cyan-500 mx-auto mb-6 border border-cyan-500/20">
            <ShieldCheck size={32} />
          </div>
          <h2 className="text-3xl font-black text-white uppercase tracking-tighter mb-2">Credential_Reset</h2>
          <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em]">Initiate secure password rotation</p>
        </div>

        <form onSubmit={handleReset} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[9px] font-black text-gray-600 uppercase tracking-widest ml-1">Target_Email_Node</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-cyan-500/50 group-focus-within:text-cyan-400 transition-colors" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter registered email"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-xs text-white outline-none focus:border-cyan-500/50 transition-all font-mono"
              />
            </div>
          </div>

          <button
            disabled={isSubmitting}
            className="w-full bg-cyan-500 hover:bg-cyan-400 text-black py-5 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] flex items-center justify-center gap-3 shadow-lg shadow-cyan-500/20 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={16} /> 
                Processing_Link...
              </>
            ) : (
              <>
                Transmit_Reset_Link <Send size={16} />
              </>
            )}
          </button>
        </form>

        <button 
          onClick={() => router.back()} 
          className="mt-10 flex items-center justify-center gap-2 text-gray-500 hover:text-white text-[10px] font-black uppercase tracking-widest transition-all mx-auto cursor-pointer"
        >
          <ArrowLeft size={14} /> Return to Security
        </button>
      </motion.div>
    </div>
  );
};

export default ChangePassword;