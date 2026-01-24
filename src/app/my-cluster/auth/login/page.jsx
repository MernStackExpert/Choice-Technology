"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import { AuthContext } from "@/Provider/AuthContext";

const LoginPage = () => {
  const { signInUser } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await signInUser(data.email, data.password);
      if (result?.user) {
        toast.success("Welcome Back!");
        router.push("/my-cluster");
      }
    } catch (error) {
      toast.error("Invalid email or password");
      setIsSubmitting(false); 
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-md w-full backdrop-blur-3xl bg-black/40 border border-white/10 p-8 rounded-[2.5rem] shadow-2xl relative z-50"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Choice Tech
          </h2>
          <p className="text-blue-100/40 text-[10px] font-black uppercase tracking-[0.3em] mt-2">
            Secure Access Portal
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/30 w-5 h-5" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:border-blue-500/50 transition-all"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/30 w-5 h-5" />
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white outline-none focus:border-blue-500/50 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-blue-600 py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 transition-all active:scale-95 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>Authenticating... <Loader2 className="animate-spin" size={20} /></>
            ) : (
              <>Sign In <LogIn size={20} /></>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <Link href="/my-cluster/auth/register" className="text-blue-400 text-[10px] font-black uppercase tracking-widest hover:underline">
            Request New Access Node <ArrowRight className="inline ml-1" size={12} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;