"use client";

import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Camera,
  Link as LinkIcon,
  UploadCloud,
  Loader2,
  ShieldAlert,
  ArrowLeft,
  Eye,
  EyeOff,
} from "lucide-react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";
import Swal from "sweetalert2";
import { secondaryAuth } from "@/config/firebase.config";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";

const RegisterPage = () => {
  const { updateUserProfile, dbUser, loading: authLoading } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (!authLoading) {
      const isAdmin = dbUser?.data?.role === "admin";
      const isDevEmail = dbUser?.data?.email === "mdnirob30k@gmail.com";

      if (!isAdmin && !isDevEmail) {
        toast.error("Access Denied: Administrative Clearance Required");
        router.replace("/my-cluster");
      }
    }
  }, [dbUser, authLoading, router]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);
    try {
      const res = await axios.post(
        `https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`,
        formData,
      );
      const url = res.data.data.display_url;
      setValue("photoURL", url);
      setPreview(url);
      toast.success("Neural asset uploaded!");
    } catch (error) {
      toast.error("Upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await createUserWithEmailAndPassword(secondaryAuth, data.email, data.password);

      const userData = {
        firebaseUid: result.user.uid,
        email: data.email,
        displayName: data.name,
        photoURL: data.photoURL || "",
        password: data.password,
      };

      const res = await axiosInstance.post("auth/user/create", userData);

      if (res.status === 201 || res.status === 200) {
        await signOut(secondaryAuth);
        
        Swal.fire({
          title: "Identity Authorized",
          text: `Neural node for ${data.name} has been successfully integrated into the system.`,
          icon: "success",
          background: "#0a0a0a",
          color: "#fff",
          confirmButtonColor: "#2563eb",
          customClass: {
            popup: "rounded-[2rem] border border-blue-500/20 backdrop-blur-xl",
          },
        });
        reset();
        setPreview(null);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-500" size={40} />
      </div>
    );
  }

  if (!dbUser || (dbUser.data?.role !== "admin" && dbUser.data?.email !== "mdnirob30k@gmail.com")) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-transparent relative overflow-hidden py-10">
      <div className="w-full max-w-xl mb-6">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-blue-400/60 hover:text-blue-400 transition-all font-black uppercase text-[10px] tracking-[0.3em] group cursor-pointer"
        >
          <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
          Back to System
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full backdrop-blur-xl bg-white/10 border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-600/20 rounded-2xl border border-blue-500/30">
              <ShieldAlert className="text-blue-400" size={32} />
            </div>
          </div>
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2 uppercase tracking-tighter">
            Admin Portal
          </h2>
          <p className="text-blue-100/60 text-[10px] font-bold tracking-[0.3em] uppercase">
            Create Authorized Identity
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 p-1 overflow-hidden bg-black/40 backdrop-blur-md">
                {preview ? (
                  <img
                    src={preview}
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-300/30">
                    <User size={40} />
                  </div>
                )}
              </div>
              <label className="absolute -bottom-1 -right-1 bg-blue-600 p-2 rounded-full border-2 border-white/10 text-white cursor-pointer shadow-lg hover:scale-110 transition active:scale-95">
                <Camera size={14} />
                <input
                  type="file"
                  className="hidden"
                  onChange={handleImageUpload}
                  accept="image/*"
                />
              </label>
            </div>

            <div className="flex bg-white/5 p-1 rounded-xl mt-6 w-full max-w-[280px] border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === "upload" ? "bg-blue-600 text-white shadow-lg" : "text-blue-200/40 hover:text-blue-200"}`}
              >
                <UploadCloud size={12} /> Upload
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("url")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-[10px] font-black uppercase transition-all ${activeTab === "url" ? "bg-blue-600 text-white shadow-lg" : "text-blue-200/40 hover:text-blue-200"}`}
              >
                <LinkIcon size={12} /> URL
              </button>
            </div>

            <div className="mt-4 w-full">
              <AnimatePresence mode="wait">
                {activeTab === "upload" ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <div className="flex items-center justify-center w-full h-14 border-2 border-dashed border-white/10 rounded-2xl bg-white/5">
                      {isUploading ? (
                        <Loader2 className="animate-spin text-blue-400" size={20} />
                      ) : (
                        <span className="text-blue-200/30 text-[10px] font-bold uppercase tracking-widest">
                          Select profile image
                        </span>
                      )}
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="url"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                  >
                    <input
                      {...register("photoURL")}
                      onChange={(e) => setPreview(e.target.value)}
                      placeholder="PASTE IMAGE URL"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[10px] font-bold text-white outline-none focus:border-blue-500/50 transition tracking-widest uppercase"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
                <input
                  {...register("name", { required: "Full Name is required" })}
                  placeholder="Full Name"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition text-sm"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-[10px] mt-1 ml-2 font-bold uppercase tracking-widest">{errors.name.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" },
                  })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[10px] mt-1 ml-2 font-bold uppercase tracking-widest">{errors.email.message}</p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum 8 characters required" },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message: "Must include Uppercase, Lowercase, and Number",
                    },
                  })}
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-12 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition text-sm font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-blue-400/50 hover:text-blue-400 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-[10px] mt-1 ml-2 font-bold uppercase tracking-widest leading-relaxed">{errors.password.message}</p>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || isUploading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="animate-spin" size={20} /> Syncing Node...
              </>
            ) : (
              <>
                Authorize Identity <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;