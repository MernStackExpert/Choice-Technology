"use client";

import React, { useContext, useState } from "react";
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
} from "lucide-react";
import toast from "react-hot-toast";
import Link from "next/link";
import axios from "axios";
import { AuthContext } from "@/Provider/AuthContext";
import axiosInstance from "@/utils/axiosInstance";

const RegisterPage = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const router = useRouter();

  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("upload");
  const [preview, setPreview] = useState(null);

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
      toast.success("Image uploaded successfully!");
    } catch (error) {
      toast.error("Image upload failed!");
    } finally {
      setIsUploading(false);
    }
  };

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const result = await createUser(data.email, data.password);

      await updateUserProfile({
        displayName: data.name,
        photoURL: data.photoURL || "",
      });

      const userData = {
        firebaseUid: result.user.uid,
        email: data.email,
        displayName: data.name,
        photoURL: data.photoURL || "",
        password: data.password,
      };

      const res = await axiosInstance.post("auth/user/create", userData);

      if (res.status === 201 || res.status === 200) {
        toast.success("Registration Successful & Credentials Sent!");
        router.push("/my-cluster");
      }
    } catch (error) {
      toast.error(error.message);
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
        className="max-w-xl w-full backdrop-blur-xl bg-white/10 border border-white/20 p-8 md:p-10 rounded-[2.5rem] shadow-2xl z-10 my-10"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-black bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent mb-2 uppercase">
            Create Identity
          </h2>
          <p className="text-blue-100/60 text-[10px] font-bold tracking-[0.3em] uppercase">
            Join Choice Technology Ecosystem
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
                        <Loader2
                          className="animate-spin text-blue-400"
                          size={20}
                        />
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
                <p className="text-red-400 text-[10px] mt-1 ml-2 font-bold uppercase tracking-widest">
                  {errors.name.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                  type="email"
                  placeholder="Email Address"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition text-sm"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-[10px] mt-1 ml-2 font-bold uppercase tracking-widest">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-400/50 w-5 h-5" />
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Minimum 8 characters required",
                    },
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
                      message: "Must include Uppercase, Lowercase, and Number",
                    },
                  })}
                  type="password"
                  placeholder="Password"
                  className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-4 text-white outline-none focus:ring-2 focus:ring-blue-500/30 transition text-sm"
                />
              </div>
              {errors.password && (
                <p className="text-red-400 text-[10px] mt-1 ml-2 font-bold uppercase tracking-widest leading-relaxed">
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isSubmitting || isUploading}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-4 rounded-2xl font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 hover:shadow-blue-600/40 transition-all duration-300 disabled:opacity-50 cursor-pointer"
          >
            {isSubmitting ? (
              "Generating Node..."
            ) : (
              <>
                Create Account <ArrowRight className="w-5 h-5" />
              </>
            )}
          </motion.button>
        </form>

        <p className="mt-8 text-center text-blue-200/40 text-[10px] font-bold uppercase tracking-widest">
          Already part of the network?{" "}
          <Link
            href="/my-cluster/auth/login"
            className="text-blue-400 font-black hover:underline ml-1"
          >
            Login
          </Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
