"use client";

import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Lock, User, ArrowRight, Camera, Link as LinkIcon, UploadCloud, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/Provider/AuthContext";

const RegisterPage = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();
  const router = useRouter();
  
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [preview, setPreview] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, formData);
      const url = res.data.data.display_url;
      setValue("photoURL", url);
      setPreview(url);
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    try {
      await createUser(data.email, data.password);
      await updateUserProfile({ 
        displayName: data.name, 
        photoURL: data.photoURL || "" 
      });
      toast.success("Registration Successful!");
      router.push("/my-cluster");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-transparent relative overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-xl w-full backdrop-blur-xl bg-white/10 border border-white/20 p-10 rounded-[2.5rem] shadow-2xl z-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2">
            Join the Future
          </h2>
          <p className="text-blue-100/60 text-sm tracking-widest uppercase">Choice Technology Ecosystem</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          <div className="flex flex-col items-center mb-6">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full border-2 border-blue-500/50 p-1 overflow-hidden bg-black/40 backdrop-blur-md">
                {preview ? (
                  <img src={preview} alt="Profile" className="w-full h-full object-cover rounded-full" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-blue-300/30">
                    <User size={40} />
                  </div>
                )}
              </div>
              <div className="absolute -bottom-2 -right-2 bg-blue-600 p-2 rounded-full border-2 border-white/10 text-white cursor-pointer shadow-lg group-hover:scale-110 transition">
                <Camera size={16} />
              </div>
            </div>

            <div className="flex bg-white/5 p-1 rounded-xl mt-6 w-full max-w-[280px] border border-white/10">
              <button
                type="button"
                onClick={() => setActiveTab("upload")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "upload" ? "bg-blue-600 text-white shadow-lg" : "text-blue-200/50 hover:text-blue-200"}`}
              >
                <UploadCloud size={14} /> Upload
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("url")}
                className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-xs font-bold transition-all ${activeTab === "url" ? "bg-blue-600 text-white shadow-lg" : "text-blue-200/50 hover:text-blue-200"}`}
              >
                <LinkIcon size={14} /> URL
              </button>
            </div>

            <div className="mt-4 w-full">
              <AnimatePresence mode="wait">
                {activeTab === "upload" ? (
                  <motion.div
                    key="upload"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                  >
                    <label className="flex flex-col items-center justify-center w-full h-20 border-2 border-dashed border-white/10 rounded-2xl cursor-pointer hover:bg-white/5 transition">
                      {isUploading ? <Loader2 className="animate-spin text-blue-400" /> : <span className="text-blue-200/40 text-xs">Drop image here or click</span>}
                      <input type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                    </label>
                  </motion.div>
                ) : (
                  <motion.div
                    key="url"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                  >
                    <input
                      {...register("photoURL")}
                      onChange={(e) => setPreview(e.target.value)}
                      placeholder="Paste Image URL"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-blue-500/50 transition"
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <div className="grid md:grid-cols-1 gap-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
              <input
                {...register("name", { required: true })}
                placeholder="Full Name"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
              <input
                {...register("email", { required: true })}
                type="email"
                placeholder="Email Address"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>

            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
              <input
                {...register("password", { required: true, minLength: 6 })}
                type="password"
                placeholder="Password"
                className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:shadow-blue-600/40 transition-all duration-300 cursor-pointer"
          >
            Create Account <ArrowRight className="w-5 h-5" />
          </motion.button>
        </form>

        <p className="mt-8 text-center text-blue-200/40 text-sm">
          Already part of the network? <Link href="/login" className="text-blue-400 font-black hover:underline ml-1">Login</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;