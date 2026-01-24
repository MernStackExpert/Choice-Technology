"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle } from "lucide-react";
import { AuthContext } from "@/Provider/AuthContext";

export default function OnboardingModal({ isOpen, setIsOpen }) {
  const { setDbUser, dbUser } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstanc.patch("/auth/user/profile", {
        ...data,
        onForm: true 
      });

      if (response.status === 200) {
        toast.success("Onboarding Completed!");
        setDbUser({ ...dbUser, onForm: true });
        setIsOpen(false);
      }
    } catch (error) {
      toast.error("Update failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          />
          
          <motion.div 
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-6">
              <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-white transition-colors">
                <X size={24} />
              </button>
            </div>

            <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Final Step</h3>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-8">Verification Required</p>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input 
                {...register("name", { required: true })}
                placeholder="Confirm Full Name"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-yellow-500 transition-all text-white text-sm"
              />
              <input 
                {...register("address", { required: true })}
                placeholder="Full Address"
                className="w-full bg-white/5 border border-white/10 p-4 rounded-2xl outline-none focus:border-yellow-500 transition-all text-white text-sm"
              />
              
              <button 
                disabled={loading}
                className="w-full py-4 bg-yellow-500 text-black font-black uppercase rounded-2xl flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50"
              >
                {loading ? "Syncing Node..." : <>Complete Now <CheckCircle size={18} /></>}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}