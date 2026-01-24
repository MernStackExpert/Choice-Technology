"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, LogIn, ArrowRight } from "lucide-react";
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
      await signInUser(data.email, data.password);
      toast.success("Welcome Back!");
      router.push("/my-cluster");
    } catch (error) {
      toast.error("Invalid email or password");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-md w-full backdrop-blur-2xl bg-white/10 border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-2xl z-10"
      >
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            Welcome Back
          </h2>
          <p className="text-blue-100/60 text-xs tracking-[0.2em] uppercase">Secure Access Portal</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
              <input
                {...register("email", { required: "Email is required" })}
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
              />
              {errors.email && <span className="text-red-400 text-xs mt-1 ml-2">{errors.email.message}</span>}
            </div>

            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 group-focus-within:text-blue-400 transition-colors w-5 h-5" />
              <input
                {...register("password", { required: "Password is required" })}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white placeholder:text-gray-500 outline-none focus:ring-2 focus:ring-blue-500/30 transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-blue-400 transition-colors"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
              {errors.password && <span className="text-red-400 text-xs mt-1 ml-2">{errors.password.message}</span>}
            </div>
          </div>

          <div className="flex justify-end">
            <Link href="/my-cluster/auth/forgot-password" type="button" className="text-xs text-blue-400/70 hover:text-blue-300 transition-colors cursor-pointer">
              Forgot Password?
            </Link>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {isSubmitting ? "Authenticating..." : "Sign In"} 
            {!isSubmitting && <LogIn className="w-5 h-5" />}
          </motion.button>
        </form>

        <div className="mt-10 flex flex-col items-center gap-4">
          <p className="text-blue-200/40 text-sm">
            Don't have an account? 
            <Link href="/my-cluster/auth/register" className="text-blue-400 font-black hover:underline ml-2 inline-flex items-center gap-1">
              Register Now <ArrowRight size={14} />
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;